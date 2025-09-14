import { atom } from "jotai";
import type { BreadCrumbItem } from "@/constants/menu-items";

export const breadCrumbAtom = atom<BreadCrumbItem[]>([]);
