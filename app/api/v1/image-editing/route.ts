import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import axios from "axios";
import { checkUserCredits, decreaseCredits } from "@/lib/actions/user.actions";
import { calculateEditingPrice } from "@/utils/server";
import prismadb from "@/lib/prismadb";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadSchema = z.object({
  prompt: z.string().optional(),
  style: z.enum(["3D", "Emoji", "Video game", "Pixels", "Clay", "Toy"]),
  file: z.instanceof(File).refine((file) => file.size > 0, {
    message: "File is required",
  }),
});

const uploadToCloudinary = (buffer: Buffer) => {
  return new Promise<CloudinaryUploadResponse>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "auto" },
      (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result as CloudinaryUploadResponse);
      }
    );

    uploadStream.end(buffer);
  });
};

export async function POST(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ success: false, error: "Unauthorized" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    const formData = await req.formData();

    const validationResult = uploadSchema.safeParse({
      prompt: formData.get("prompt"),
      style: formData.get("style"),
      file: formData.get("file"),
    });

    if (!validationResult.success) {
      return new NextResponse(
        JSON.stringify({ success: false, error: "Incorrect parameters" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const generationsPrice = calculateEditingPrice(validationResult.data.style);

    if (!generationsPrice || Number.isNaN(generationsPrice)) {
      return new NextResponse(
        JSON.stringify({ success: false, error: "Generation Error" }),
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

    const file = formData.get("file") as File; // Получаем файл

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result: CloudinaryUploadResponse = await uploadToCloudinary(buffer);

    if (!result) {
      return new NextResponse(
        JSON.stringify({ success: false, error: "Cloudinary Error" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const repticateResponse = await axios.post(
      "https://api.replicate.com/v1/predictions",
      {
        version:
          "a07f252abbbd832009640b27f063ea52d87d7a23a185ca165bec23b5adc8deaf",
        input: {
          image: result.secure_url,
          style: formData.get("style"),
          prompt: formData.get("prompt"),
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REPLICATE_API_TOKEN}`,
          Prefer: "wait",
        },
      }
    );

    if (
      !repticateResponse ||
      !repticateResponse.data ||
      !repticateResponse.data.output ||
      !Array.isArray(repticateResponse.data.output) ||
      !repticateResponse.data.output[0]
    ) {
      return new NextResponse(
        JSON.stringify({ success: false, error: "Generation Error" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    await decreaseCredits(userId, generationsPrice);

    const photo = await cloudinary.uploader.upload(
      repticateResponse.data.output[0]
    );

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

    const newPostData: EditPostData = {
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      photo: photo.url,
      public_id: photo.public_id,
      prompt: validationResult.data.prompt || "",
      generationType: "Portrait Editing",
      style: validationResult.data.style,
      size: `${photo.width}x${photo.height}`,
      authorId: user.id,
    };

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
    console.log("[IMAGE_EDITING_ERROR]", error);
    return new NextResponse(
      JSON.stringify({ success: false, error: "Internal Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
