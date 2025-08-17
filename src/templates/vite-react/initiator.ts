import { ConfigOptions } from "..";

export const viteReactConfig = (folderName: string): ConfigOptions => {
  return {
    name: "Vite React",
    command: `npm create vite@latest ${folderName} -- --template react`,
    postInstallCommands: [
      `cd ${folderName}`,
      "npm install tailwindcss @tailwindcss/vite @tanstack/react-router -D @tanstack/router-plugin",
    ],
  };
};
