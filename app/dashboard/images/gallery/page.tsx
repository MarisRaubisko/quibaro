import GalleryScreen from "@/components/screens/gallery-screen";
import { fetchUserPosts } from "@/utils/server";

export default async function ImageGalleryPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {

  const queryParam = searchParams?.query;

  const query = Array.isArray(queryParam) ? queryParam[0] : queryParam || "";

  const posts: Post[] | [] = await fetchUserPosts(query);

  return <GalleryScreen posts={posts} />;
}
