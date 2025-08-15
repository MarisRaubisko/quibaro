import MainScreen from "@/components/screens/main-screen";
import { fetchPosts } from "@/utils/server";

export default async function MainPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {

  const queryParam = searchParams?.query;

  const query = Array.isArray(queryParam) ? queryParam[0] : queryParam || "";

  const posts: Post[] | [] = await fetchPosts(query);

  return <MainScreen posts={posts} />;
}
