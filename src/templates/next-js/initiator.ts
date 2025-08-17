import { ConfigOptions } from "..";

export const nextJsConfig = (folderName: string): ConfigOptions => {
  return {
    name: "Next Js",
    command: `npx create-next-app@latest ${folderName}`,
    postInstallCommands: [],
  };
};
