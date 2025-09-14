"use client";
import type { BreadCrumbItem } from "@/constants/menu-items";
import { breadCrumbAtom } from "@/context/breadcrumb-context";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

function BreadCrumb() {
  const router = useRouter();
  const [breadCrumb, setBreadCrumb] = useAtom(breadCrumbAtom);
  const [currentBreadcrumb, setCurrentBreadcrumb] = useState<BreadCrumbItem[]>(
    []
  );
  const [lastBreadcrumb, setLastBreadcrumb] = useState<BreadCrumbItem | null>(
    null
  );
  const [icon, setIcon] = useState<ReactNode>();

  const handleBreadcrumbClick = ({
    link,
    index,
  }: {
    link: string;
    index: number;
  }) => {
    const newBreadCrumb = currentBreadcrumb.slice(0, index + 1);
    setBreadCrumb(newBreadCrumb);
    setCurrentBreadcrumb(newBreadCrumb);
    setIcon(lastBreadcrumb?.icon);
    router.push(link);
  };

  useEffect(() => {
    setCurrentBreadcrumb(breadCrumb || []);
    const lastBreadcrumb = breadCrumb[breadCrumb.length - 1];
    setLastBreadcrumb(lastBreadcrumb);
    setIcon(lastBreadcrumb?.icon || <></>);
  }, [breadCrumb]);

  if (currentBreadcrumb.length === 0) {
    return null;
  }

  return (
    <>
      <div className="lg:hidden flex gap-4 items-center text-sm font-bold">
        {lastBreadcrumb?.icon} {lastBreadcrumb?.name ?? ""}
      </div>
      <div className="hidden lg:flex text-xs lg:text-base items-center gap-2 lg:gap-3 tracking-wide theme-transition">
        {icon}
        {currentBreadcrumb.map((item, index) => (
          <button
            key={index + item.name + item.link}
            onClick={() => handleBreadcrumbClick({ link: item.link, index })}
            className="cursor-pointer"
          >
            <span
              className={`mr-2 lg:mr-4 ${
                index === currentBreadcrumb.length - 1
                  ? "font-bold text-black dark:text-white"
                  : ""
              }`}
            >
              {item.name}
            </span>
            {index < currentBreadcrumb.length - 1 && <span>/</span>}
          </button>
        ))}
      </div>
    </>
  );
}

export default BreadCrumb;
