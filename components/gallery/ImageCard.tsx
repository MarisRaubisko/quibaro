import React from "react";

import DownloadImage from "@/assets/images/download.png";
import DeleteImage from "@/assets/images/delete.png";
import ShareImage from "@/assets/images/share.png";
import UnshareImage from "@/assets/images/unshare.png";
import OpenImage from "@/assets/images/open.png";
import {
  deleteImage,
  downloadImage,
  shareImage,
  unshareImage,
} from "@/utils/client";
import Image from "next/legacy/image";
import { useModal } from "@/components/modal-views/context";

const Card = ({
  post,
  isGridCompact,
  isGallery,
  onDelete,
  onShare,
  onUnshare,
}: {
  post: Post;
  index: number;
  isGridCompact: boolean;
  isGallery: boolean;
  onDelete?: (id: string) => void;
  onShare?: (id: string) => void;
  onUnshare?: (id: string) => void;
}) => {
  const { openModal } = useModal();

  return (
    <div className="relative flex flex-col justify-between h-full overflow-hidden rounded-lg bg-white shadow-card transition-all duration-200 hover:shadow-large dark:bg-input-light-dark">
      {/* <div className="px-6 py-4">
        <div className="flex items-center text-sm font-medium text-gray-600 transition hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
          <Image
            src={post.author.photo}
            className="rounded-full"
            alt=""
            width={24}
            height={24}
          />
          <span className="overflow-hidden text-ellipsis ml-3">
            {post?.firstName} {post?.lastName ? post.lastName : ""}
          </span>
        </div>
      </div> */}
      <div
        onClick={() => openModal("GALLERY_IMAGE_VIEW", post)}
        className="relative block w-full cursor-pointer pt-[100%]"
      >
        <Image
          className="absolute inset-0 object-cover"
          src={post.photo}
          alt={post.prompt || "Generated image"}
          layout="fill"
          objectFit="cover"
          priority={true}
          sizes={`
            (max-width: 640px) 100vw, 
            (min-width: 640px) and (max-width: 1024px) 50vw,
            (min-width: 1024px) and (max-width: 1780px) 33vw
            (min-width: 1780px) and (max-width: 2160px) ${
              isGridCompact ? "25vw" : "33vw"
            }
            (min-width: 2160px) ${isGridCompact ? "20vw" : "25vw"}
          `}
        />
      </div>

      <div className="relative p-6 flex flex-col justify-between h-full">
        <div>
          {post.generationType && (
            <div className="text-sm font-medium text-black dark:text-white">
              {post.generationType}
            </div>
          )}
          <div className="space-x-2">
            {post.model && (
              <div className="inline-flex items-center text-xs text-gray-600 dark:text-gray-400">
                Model: {post.model}
              </div>
            )}
            {post.quality && (
              <div className="inline-flex items-center text-xs text-gray-600 dark:text-gray-400">
                Quality: {post.quality}
              </div>
            )}
            {post.style && (
              <div className="inline-flex items-center text-xs text-gray-600 dark:text-gray-400">
                Style: {post.style}
              </div>
            )}
          </div>
          {post.prompt && (
            <div className="mt-1.5 flex overflow-auto max-h-[6em]">
              <div className="text-sm font-medium text-black dark:text-white">
                {post.prompt}
              </div>
            </div>
          )}
        </div>

        <div className="pt-3 flex justify-end gap-2 flex-shrink-0">
          {isGallery && onShare && !post?.shared && (
            <button
              type="button"
              onClick={() =>
                openModal("SHARE_IMAGE_VIEW", () =>
                  shareImage(post.id, onShare)
                )
              }
              className="outline-none bg-transparent border-none flex"
            >
              <Image
                src={ShareImage.src}
                alt="share"
                className="object-contain dark:invert"
                width={24}
                height={24}
              />
            </button>
          )}
          {isGallery && onUnshare && post?.shared && (
            <button
              type="button"
              onClick={() =>
                openModal("UNSHARE_IMAGE_VIEW", () =>
                  unshareImage(post.id, onUnshare)
                )
              }
              className="outline-none bg-transparent border-none flex"
            >
              <Image
                src={UnshareImage.src}
                alt="unshare"
                className="object-contain dark:invert"
                width={24}
                height={24}
              />
            </button>
          )}
          <button
            type="button"
            onClick={() => openModal("GALLERY_IMAGE_VIEW", post)}
            className="outline-none bg-transparent border-none flex"
          >
            <Image
              src={OpenImage.src}
              alt="download"
              className="object-contain dark:invert"
              width={24}
              height={24}
            />
          </button>
          <button
            type="button"
            onClick={() => downloadImage(post.id, post.photo)}
            className="outline-none bg-transparent border-none flex"
          >
            <Image
              src={DownloadImage.src}
              alt="download"
              className="object-contain dark:invert"
              width={24}
              height={24}
            />
          </button>
          {isGallery && onDelete && (
            <button
              type="button"
              onClick={() =>
                openModal("DELETE_IMAGE_VIEW", () =>
                  deleteImage(post.id, onDelete)
                )
              }
              className="outline-none bg-transparent border-none flex"
            >
              <Image
                src={DeleteImage.src}
                alt="delete"
                className="object-contain dark:invert"
                width={24}
                height={24}
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
