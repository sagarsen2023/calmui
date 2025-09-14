"use client";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import ThemeSwitch from "@/components/ui/theme-switch";
import BreadCrumb from "./breadcrumb";

function Header() {
  const sideBar = useSidebar();
  return (
    <header
      className={`flex py-4 items-center justify-between bg-background/30 backdrop-blur-md px-6 fixed ${sideBar.open ? "w-[100vw] md:w-[calc(100vw-16rem)]" : "w-[100vw] md:w-[calc(100vw-5rem)]"} z-[10]`}
    >
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <BreadCrumb />
      </div>
      <div className="flex items-center gap-4">
        <ThemeSwitch />
      </div>
    </header>
  );
}

export default Header;
