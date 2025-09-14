import { Database, LayoutDashboard, Lock, Settings } from "lucide-react";
import type { ReactNode } from "react";

export interface BreadCrumbItem {
  name: string;
  link: string;
  icon: ReactNode;
}

export interface DropdownMenuItem {
  title: string;
  link: string;
  icon: ReactNode;
  key: string;
  breadCrumb?: BreadCrumbItem[];
}

export interface SideMenuItem {
  title: string;
  icon: ReactNode;
  link: string;
  key: string;
  breadCrumb?: BreadCrumbItem[];
  dropdownItems?: DropdownMenuItem[];
}

export const sideMenuItems: SideMenuItem[] = [
  {
    title: "Dashboard",
    icon: <LayoutDashboard size={20} />,
    link: "/",
    key: "Dashboard",
    breadCrumb: [
      {
        name: "Dashboard",
        link: "/",
        icon: <LayoutDashboard size={16} />,
      },
    ],
  },
  {
    title: "Settings",
    icon: <Settings size={20} />,
    link: "/settings",
    key: "settings",
    breadCrumb: [
      {
        name: "Dashboard",
        link: "/",
        icon: <LayoutDashboard size={16} />,
      },
      {
        name: "Settings",
        link: "/settings",
        icon: <Settings size={16} />,
      },
    ],
  },
  {
    title: "Auth Routes",
    icon: <Lock size={20} />,
    link: "#",
    key: "auth-routes",
    dropdownItems: [
      {
        title: "Sign In",
        link: "/sign-in",
        icon: <Lock size={20} />,
        key: "sign-in",
      },
    ],
    breadCrumb: [
      {
        name: "Resources",
        link: "/dashboard/resources",
        icon: <Database size={20} />,
      },
    ],
  },
];
