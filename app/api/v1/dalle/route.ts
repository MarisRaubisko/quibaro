import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import OpenAI from "openai";
import { v2 as cloudinary } from "cloudinary";
import { auth } from "@clerk/nextjs/server";
import { checkUserCredits, decreaseCredits } from "@/lib/actions/user.actions";
import { calculateGenerationsPrice } from "@/utils/server";
import { z } from "zod";

const configuration = {
  apiKey: process.env.OPEN_API_KEY,
};

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

if (!configuration.apiKey) {
  throw new Error("OpenAI API Key not configured.");
}

const openai = new OpenAI(configuration);

const dallE2Schema = z.object({
  prompt: z
    .string()
    .min(1, "Prompt is required")
    .max(1000, "The maximum length is 1000 characters"),
  model: z.literal("dall-e-2").default("dall-e-2"),
  size: z.enum(["256x256", "512x512", "1024x1024"]).default("1024x1024"),
});

const dallE3Schema = z.object({
  prompt: z
    .string()
    .min(1, "Prompt is required")
    .max(4000, "The maximum length is 4000 characters"),
  model: z.literal("dall-e-3").default("dall-e-3"),
  size: z.enum(["1024x1024", "1792x1024", "1024x1792"]).default("1024x1024"),
  quality: z.enum(["standard", "hd"]).default("standard"),
  style: z.enum(["vivid", "natural"]).default("vivid"),
});

type DallE2Params = z.infer<typeof dallE2Schema>;
type DallE3Params = z.infer<typeof dallE3Schema>;

type ImageGenerationParams = DallE2Params | DallE3Params;

async function generateImage(params: ImageGenerationParams) {
  const { prompt, model, size } = params;

  const options: ImageGenerationOptions = { prompt, model, size };

  if (model === "dall-e-3" && "quality" in params && "style" in params) {
    options.quality = params.quality;
    options.style = params.style;
  }

  const aiResponse = await openai.images.generate(options);
  if (!aiResponse.data || !aiResponse.data[0]?.url) {
    throw new Error("Failed to generate image");
  }
  return aiResponse.data[0].url;
}

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ success: false, error: "Unauthorized" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    const body = await req.json();

    const {
      prompt,
      model = "dall-e-2",
      size = "1024x1024",
      quality = "Standard",
      style = "Vivid",
    } = body;

    let parsedBody;
    switch (body.model) {
      case "dall-e-2":
        parsedBody = dallE2Schema.safeParse(body);
        break;
      case "dall-e-3":
        parsedBody = dallE3Schema.safeParse(body);
        break;
      default:
        return new NextResponse(
          JSON.stringify({ success: false, error: "Invalid model specified" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
    }

    if (!parsedBody.success) {
      return new NextResponse(
        JSON.stringify({ success: false, error: "Wrong parameters" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const generationsPrice = calculateGenerationsPrice(
      model,
      size,
      quality,
      style
    );

    if (!prompt) {
      return new NextResponse(
        JSON.stringify({ success: false, error: "Prompt is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const hasCredits = await checkUserCredits(userId, generationsPrice);

    if (!hasCredits) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          error:
            "Your generation limit has been reached. Please purchase additional generations.",
        }),
        { status: 403, headers: { "Content-Type": "application/json" } }
      );
    }

    const image = await generateImage({ prompt, model, size, quality, style });
    if (!image) {
      return new NextResponse(
        JSON.stringify({ success: false, error: "Generation Error." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    await decreaseCredits(userId, generationsPrice);

    const photo = await cloudinary.uploader.upload(image);

    const user = await prismadb.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      return new NextResponse(
        JSON.stringify({ success: false, error: "User not found." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!photo) {
      return new NextResponse(
        JSON.stringify({ success: false, error: "Cloudinary error." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const newPostData: PostData = {
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      photo: photo.url,
      public_id: photo.public_id,
      prompt,
      generationType: "Image Generaion",
      model: model.toUpperCase(),
      size: size,
      authorId: user.id,
    };

    if (model === "dall-e-3") {
      newPostData.quality =
        quality === "hd"
          ? "HD"
          : quality.charAt(0).toUpperCase() + quality.slice(1);
      newPostData.style = style.charAt(0).toUpperCase() + style.slice(1);
    }

    const newPost = await prismadb.post.create({
      data: newPostData,
    });

    return new NextResponse(
      JSON.stringify({
        success: true,
        image: newPost.photo,
        imageId: newPost.id,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.log("[GENERATE_IMAGE_ERROR]", error);
    return new NextResponse(
      JSON.stringify({ success: false, error: "Internal Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
