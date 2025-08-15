import { fetchPosts } from "@/utils/server";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(req: Request): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query") || "";

    // Используем универсальную функцию
    const posts = await fetchPosts(query);

    return new NextResponse(
      JSON.stringify({ success: true, data: posts }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.log("[SEARCH_POSTS_ERROR]", error);
    return new NextResponse(
      JSON.stringify({ success: false, error: "Internal Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
