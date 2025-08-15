import { useGridSwitcher } from "@/lib/hooks/use-grid-switcher";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { NormalGridIcon } from "../icons/normal-grid";
import { CompactGridIcon } from "../icons/compact-grid";

export function GridSwitcher() {
    const { isGridCompact, setIsGridCompact } = useGridSwitcher();
    return (
      <div className="flex overflow-hidden rounded-lg">
        <button
          className={cn(
            "relative flex h-11 w-11 items-center justify-center bg-gray-100 transition dark:bg-brand/80",
            {
              "z-10 text-white": !isGridCompact,
              "text-brand dark:text-white": isGridCompact,
            }
          )}
          onClick={() => setIsGridCompact(!isGridCompact)}
          aria-label="Normal Grid"
        >
          {!isGridCompact && (
            <motion.span
              className="absolute bottom-0 left-0 right-0 h-full w-full bg-brand shadow-large"
              layoutId="gridSwitchIndicator"
            />
          )}
          <NormalGridIcon className="relative" />
        </button>
        <button
          className={cn(
            "relative flex h-11 w-11 items-center justify-center bg-gray-100 transition dark:bg-brand/80",
            {
              "z-10 text-white": isGridCompact,
              "text-brand dark:text-white": !isGridCompact,
            }
          )}
          onClick={() => setIsGridCompact(!isGridCompact)}
          aria-label="Normal Grid"
        >
          {isGridCompact && (
            <motion.span
              className="absolute bottom-0 left-0 right-0 h-full w-full  bg-brand shadow-large"
              layoutId="gridSwitchIndicator"
            />
          )}
          <CompactGridIcon className="relative" />
        </button>
      </div>
    );
  }