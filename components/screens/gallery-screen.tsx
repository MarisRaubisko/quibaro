"use client";

import { FC, useState } from "react";
import Gallery from "@/components/search/feeds";
import Input from "@/components/ui/forms/input";
import { SearchIcon } from "../icons/search";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import Loader from "../ui/loader";
import toast from "react-hot-toast";
import { GridSwitcher } from "@/components/search/greed-switcher";

interface MainScreen {
  posts: Post[];
}

const GalleryScreen: FC<MainScreen> = ({ posts }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [allPosts, setAllPosts] = useState<Post[]>(posts);

  const [searchText, setSearchText] = useState<string>(
    searchParams.get("query") || ""
  );
  const [searchTimeout, setSearchTimeout] = useState<
    NodeJS.Timeout | number | null
  >(null);
  const [searching, setSearching] = useState(false);

  const handleSearch = async (query: string) => {
    try {
      const response = await axios.get(`/api/v1/post/search-user-posts`, {
        params: { query: query },
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        setAllPosts(response.data.data);
      } else {
        setAllPosts([]);
      }
    } catch (err) {
      toast.error("Some error, try again later");
      setAllPosts([]);
    } finally {
      setSearching(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearching(true);
    const newSearchText = e.target.value;
    setSearchText(newSearchText);

    if (searchTimeout !== null) {
      clearTimeout(searchTimeout);
    }

    setSearchTimeout(
      setTimeout(() => {
        if (newSearchText) {
          router.push(`?query=${encodeURIComponent(newSearchText)}`);
          handleSearch(newSearchText);
        } else {
          router.push("/dashboard/images/gallery");
          handleSearch("");
        }
      }, 1000)
    );
  };

  const handleDelete = (id: string) => {
    setAllPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    router.refresh();
  };

  const handleShare = (id: string) => {
    setAllPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id ? { ...post, shared: true } : post
      )
    );
    router.refresh();
  };

  const handleUnshare = (id: string) => {
    setAllPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id ? { ...post, shared: false } : post
      )
    );
    router.refresh();
  };

  return (
    <>
      <div className="grid lg:px-8 xl:px-10 2xl:px-0">
        <div className="relative z-10 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-5">
          {searchText ? (
            <span className="text-xs font-medium text-gray-900 dark:text-white sm:text-lg">
              Showing Results for {searchText}
            </span>
          ) : (
            <h2 className="text-lg font-medium uppercase tracking-wider text-gray-900 dark:text-white sm:text-2xl">
              The images you have created
            </h2>
          )}

          <div className="flex items-center justify-center gap-5">
            <div className="relative w-full md:w-80">
              <Input
                inputClassName="w-full md:w-80 dark:border-input-light-dark"
                type="text"
                placeholder="Enter search params"
                value={searchText}
                onChange={handleSearchChange}
              />
              <span className="pointer-events-none absolute top-0.5 right-0 flex h-full cursor-pointer items-center justify-center px-4 text-gray-600 hover:text-gray-900 dark:text-white ">
                <SearchIcon className="h-4 w-4" />
              </span>
            </div>
            <div className="hidden 3xl:flex gap-6 3xl:gap-8">
              <GridSwitcher />
            </div>
          </div>
        </div>
        {searching ? (
          <Loader className="justify-center mt-64" />
        ) : allPosts.length > 0 ? (
          <Gallery
            className="md:!grid-cols-2 lg:!grid-cols-3"
            posts={allPosts}
            isGallery={true}
            onDelete={handleDelete}
            onShare={handleShare}
            onUnshare={handleUnshare}
          />
        ) : (
          <p className="text-center mt-64">Images not found</p>
        )}
      </div>
    </>
  );
};

export default GalleryScreen;
