import React, { useEffect } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  sideMenuItems,
  type BreadCrumbItem,
  type DropdownMenuItem,
} from "@/constants/menu-items";
import { useRouter, useRouterState } from "@tanstack/react-router";
import { useAtom } from "jotai";
import { breadCrumbAtom } from "@/context/breadcrumb-context";

function SideBar() {
  const router = useRouter();
  const { location } = useRouterState();
  const currentPath = location.pathname;
  const [, setBreadCrumb] = useAtom(breadCrumbAtom);

  useEffect(() => {
    for (const item of sideMenuItems) {
      if (item.dropdownItems) {
        for (const sub of item.dropdownItems) {
          if (sub.link === currentPath) {
            if (sub.breadCrumb) setBreadCrumb(sub.breadCrumb);
            return;
          }
        }
      } else if (item.link === currentPath && item.breadCrumb) {
        setBreadCrumb(item.breadCrumb);
        return;
      }
    }
  }, [currentPath, setBreadCrumb]);

  const handleMenuItemClick = (
    item: { link: string; breadCrumb?: BreadCrumbItem[] },
    e: React.MouseEvent,
  ) => {
    e.preventDefault();
    if (item.link !== currentPath) {
      router.navigate({ to: item.link });
    }
    if (item.breadCrumb) {
      setBreadCrumb(item.breadCrumb);
    }
  };

  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarHeader></SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {sideMenuItems.map((item) => {
                // If item has dropdown items, render them as a group
                if (item.dropdownItems) {
                  return (
                    <div key={item.key} className="mb-2">
                      <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
                      {item.dropdownItems.map((sub: DropdownMenuItem) => {
                        const isActive = sub.link === currentPath;
                        return (
                          <SidebarMenuItem key={sub.key}>
                            <SidebarMenuButton
                              asChild={false}
                              onClick={(e) => handleMenuItemClick(sub, e)}
                              className={`transition-colors duration-200 ${
                                isActive
                                  ? "text-secondary hover:text-secondary bg-primary hover:bg-primary"
                                  : "hover:bg-zinc-200 dark:hover:bg-zinc-900"
                              }`}
                              style={{ position: "relative" }}
                            >
                              <>
                                {sub.icon && <span>{sub.icon}</span>}
                                <span className="ml-1">{sub.title}</span>
                              </>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        );
                      })}
                    </div>
                  );
                } else {
                  const isActive = item.link === currentPath;
                  return (
                    <SidebarMenuItem key={item.key}>
                      <SidebarMenuButton
                        asChild={false}
                        onClick={(e) => handleMenuItemClick(item, e)}
                        className={`transition-colors duration-200 ${
                          isActive
                            ? "text-secondary hover:text-secondary bg-primary hover:bg-primary"
                            : "hover:bg-zinc-200 dark:hover:bg-zinc-900"
                        }`}
                        style={{ position: "relative" }}
                      >
                        <>
                          {item.icon}
                          <span className="ml-2">{item.title}</span>
                        </>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                }
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export default SideBar;
