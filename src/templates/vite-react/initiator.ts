import { ConfigOptions } from "..";

export const viteReactConfig = (folderName: string): ConfigOptions => {
  return {
    name: "Vite React",
    command: `npm create vite@latest ${folderName} -- --template react`,
  };
};
