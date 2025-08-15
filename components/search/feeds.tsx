import cn from "classnames";
import { useGridSwitcher } from "@/lib/hooks/use-grid-switcher";
import Card from "@/components/gallery/ImageCard";

interface GalleryInterface {
  posts: Post[];
  className?: string;
  isGallery?: boolean;
  onDelete?: (id: string) => void;
  onShare?: (id: string) => void;
  onUnshare?: (id: string) => void;
}

export default function Gallery({
  className,
  posts,
  isGallery = false,
  onDelete,
  onShare,
  onUnshare,
}: GalleryInterface) {
  const { isGridCompact } = useGridSwitcher();
  return (
    <div
      className={cn(
        "grid gap-5 sm:grid-cols-2 md:grid-cols-3",
        isGridCompact
          ? "3xl:!grid-cols-4 4xl:!grid-cols-5"
          : "3xl:!grid-cols-3 4xl:!grid-cols-4",
        className
      )}
    >
      {posts.map((post, index) => (
        <Card
          key={post.id}
          post={post}
          index={index}
          isGridCompact={isGridCompact}
          isGallery={isGallery}
          onDelete={onDelete}
          onShare={onShare}
          onUnshare={onUnshare}
        />
      ))}
    </div>
  );
}
