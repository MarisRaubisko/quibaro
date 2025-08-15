import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary"
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

const requestBodySchema = z.object({
    imageID: z.string().min(1, "ImageID is required"),
});

export async function PUT(req: Request): Promise<NextResponse> {
    try{
        const { userId } = auth();

        if (!userId) {
            return new NextResponse(
                JSON.stringify({ success: false, error: "Unauthorized" }),
                { status: 401, headers: { 'Content-Type': 'application/json' } }
            );
        }
        
        const user = await prismadb.user.findUnique({
            where: { clerkId: userId },
        });
      
        if (!user) {
            return new NextResponse(
                JSON.stringify({ success: false, error: "User not found" }),
                { status: 404, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const body = await req.json();
        const parsedBody = requestBodySchema.safeParse(body);
        if (!parsedBody.success) {
            const errorMessage = parsedBody.error.errors.map((err) => err.message).join(', ');
            return new NextResponse(
                JSON.stringify({ success: false, error: errorMessage }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const photo = await prismadb.post.findUnique({
            where: { id: body.imageID}    
        })

        if(!photo){
            return new NextResponse(
                JSON.stringify({ success: false, error: "Photo not found" }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        if(photo.authorId !== user.id){
            return new NextResponse(
                JSON.stringify({ success: false, error: "This photo does not belong to your account" }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        await prismadb.post.update({
            where: { id: body.imageID },
            data: { shared: !photo.shared },
        });

        return new NextResponse(
            JSON.stringify({ success: true, data: photo }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    }
    catch(error){
        console.log("[POST_IMAGE_ERROR]", error);
        return new NextResponse(
            JSON.stringify({ success: false, error: "Internal Error" }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}

export async function DELETE(req: Request): Promise<NextResponse> {
    try{
        const { userId } = auth();

        if (!userId) {
            return new NextResponse(
                JSON.stringify({ success: false, error: "Unauthorized" }),
                { status: 401, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const user = await prismadb.user.findUnique({
            where: { clerkId: userId },
        });
      
        if (!user) {
            return new NextResponse(
                JSON.stringify({ success: false, error: "User not found" }),
                { status: 404, headers: { 'Content-Type': 'application/json' } }
            );
        }
        const {id} = await req.json();

        const image = await prismadb.post.findUnique({
            where: { id: id },
        });


        if(!image || !image.public_id){
            return new NextResponse(
                JSON.stringify({ success: false, error: "Image not found" }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            ) 
        }


        if(user.id !== image.authorId){
            return new NextResponse(
                JSON.stringify({ success: false, error: "This image does not belong to you" }),
                { status: 401, headers: { 'Content-Type': 'application/json' } }
            ) 
        }

        const deleteResult = await cloudinary.uploader.destroy(image.public_id);
        
        if(deleteResult.result !== 'ok'){
            return new NextResponse(
                JSON.stringify({ success: false, error: "Image not found" }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            )
        }

        await prismadb.post.delete({
            where: { id: id },
        });

        return new NextResponse(
            JSON.stringify({ success: true, message: "Image deleted successfully" }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    }
    catch(error){
        console.log(error)
        return new NextResponse(
            JSON.stringify({ success: true }),
            { status: 201, headers: { 'Content-Type': 'application/json' } }
        )
    }

}