"use client";

import { useRef, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import cn from "classnames";
import { ChevronDown } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { useMeasure } from "react-use";
import ActiveLink from "@/components/ui/links/active-link";

type MenuItemProps = {
  name?: string;
  icon: React.ReactNode;
  href: string;
  dropdownItems?: DropdownItemProps[];
  isActive?: boolean;
  hideForLoggedIn: boolean;
  hideForGuests: boolean;
};

type DropdownItemProps = {
  name: string;
  icon?: React.ReactNode;
  href: string;
};

export function MenuItem({
  name,
  icon,
  href,
  dropdownItems,
  isActive,
  hideForLoggedIn,
  hideForGuests,
}: MenuItemProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [ref, { height }] = useMeasure<HTMLUListElement>();
  const isChildrenActive =
    dropdownItems && dropdownItems.some((item) => item.href === pathname);
  const { isSignedIn } = useAuth();
  const [currentPathName, setCurrentPathName] = useState(pathname);

  useEffect(() => {
    if (currentPathName !== pathname) {
      setCurrentPathName(pathname);
    }
  }, [pathname, currentPathName]);

  useEffect(() => {
    if (isChildrenActive) {
      setIsOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isSignedIn && hideForLoggedIn) {
    return null;
  }

  if (!isSignedIn && hideForGuests) {
    return null;
  }

  return (
    <div className="mb-2 min-h-[48px] list-none last:mb-0">
      {dropdownItems?.length ? (
        <>
          <div
            className={cn(
              "relative flex h-12 cursor-pointer items-center justify-between whitespace-nowrap  rounded-lg px-4 text-sm transition-all",
              isChildrenActive
                ? "text-white"
                : "text-gray-500 hover:text-brand dark:hover:text-white"
            )}
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="z-[1] flex items-center ltr:mr-3 rtl:ml-3">
              <span className={cn("ltr:mr-3 rtl:ml-3")}>{icon}</span>
              {name}
            </span>
            <span
              className={`z-[1] transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            >
              <ChevronDown />
            </span>

            {isChildrenActive && (
              <span
                className={cn(
                  "absolute bottom-0 left-0 right-0 h-full w-full rounded-lg bg-brand opacity-100 shadow-large transition-opacity duration-500"
                )}
              />
            )}
          </div>

          <div
            style={{
              height: isOpen ? height : 0,
            }}
            className="ease-[cubic-bezier(0.33, 1, 0.68, 1)] overflow-hidden transition-all duration-350 delay-300 xl:delay-0"
          >
            <ul ref={ref}>
              {dropdownItems.map((item: DropdownItemProps, index: number) => (
                <li className="first:pt-2" key={index}>
                  <ActiveLink
                    href={item.href}
                    className="flex items-center rounded-lg p-3 text-sm text-gray-500 transition-all before:h-1 before:w-1 before:rounded-full before:bg-gray-500 hover:text-brand ltr:pl-6 before:ltr:mr-5 rtl:pr-6 before:rtl:ml-5 dark:hover:text-white"
                    activeClassName="!text-brand dark:!text-white dark:before:!bg-white before:!bg-brand before:!w-2 before:!h-2 before:-ml-0.5 before:ltr:!mr-[18px] before:rtl:!ml-[18px] !font-medium"
                  >
                    {item.name}
                  </ActiveLink>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <ActiveLink
          href={href}
          className={cn(
            "relative flex h-12 items-center whitespace-nowrap rounded-lg px-4 text-sm text-gray-500 transition-all hover:text-brand dark:hover:text-white",
            {
              "bg-brand": isActive,
            }
          )}
          activeClassName="!text-white"
        >
          <span
            className={cn(
              "relative z-[1] duration-100 before:absolute before:-right-3 before:top-[50%] before:h-1 before:w-1 before:-translate-y-2/4 before:rounded-full before:bg-none ltr:mr-3 rtl:ml-3",
              {
                "text-white": isActive,
                "text-gray-500": !isActive && !name,
              }
            )}
          >
            {icon}
          </span>
          <span className="relative z-[1] "> {name}</span>

          {href === pathname && (
            <span
              className={cn(
                "absolute bottom-0 left-0 right-0 h-full w-full rounded-lg bg-brand opacity-100 shadow-large transition-opacity duration-500"
              )}
            />
          )}
        </ActiveLink>
      )}
    </div>
  );
}
