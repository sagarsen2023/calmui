import { ConfigOptions } from "..";
import os from "os";

export const nextJsConfig = (folderName: string): ConfigOptions => {
  const templateDir = `${__dirname}/project-files`;
  const isWindows = os.platform() === "win32";

  return {
    name: "Next Js",
    command: `npx create-next-app@latest ${folderName} --typescript --app --no-git`,
    postInstallCommands: [],
    templateFiles: [
      {
        source: `${templateDir}/calmui.json`,
        target: `${folderName}/calmui.json`,
      },
      // ? Updating Files based on configuration and ready to development
      {
        source: `${templateDir}/src/services/config/fetch-api.ts`,
        target: `${folderName}/src/services/config/fetch-api.ts`,
      },
      {
        source: `${templateDir}/src/services/config/query-urls.ts`,
        target: `${folderName}/src/services/config/query-urls.ts`,
      },
      {
        source: `${templateDir}/src/services/config/request.ts`,
        target: `${folderName}/src/services/config/request.ts`,
      },
      {
        source: `${templateDir}/src/utils/cookie-storage.ts`,
        target: `${folderName}/src/utils/cookie-storage.ts`,
      },
      {
        source: `${templateDir}/src/utils/query-params-formatter.ts`,
        target: `${folderName}/src/utils/query-params-formatter.ts`,
      },

      // ? Initializing blank folders for consistent development
      {
        source: `${templateDir}/src/components/.gitkeep`,
        target: `${folderName}/src/components/.gitkeep`,
      },
      {
        source: `${templateDir}/src/constants/.gitkeep`,
        target: `${folderName}/src/constants/.gitkeep`,
      },
      {
        source: `${templateDir}/src/hooks/.gitkeep`,
        target: `${folderName}/src/hooks/.gitkeep`,
      },
      {
        source: `${templateDir}/src/lib/.gitkeep`,
        target: `${folderName}/src/lib/.gitkeep`,
      },
      {
        source: `${templateDir}/src/models/.gitkeep`,
        target: `${folderName}/src/models/.gitkeep`,
      },
    ],
    finalizationCommands: [
      `git init`,
      `git add . ${isWindows ? "> NUL 2>&1" : "> /dev/null 2>&1"}`,
      `git branch -M main`,
      `git commit -m "Added base project files" ${
        isWindows ? "> NUL 2>&1" : "> /dev/null 2>&1"
      }`,
    ],
  };
};
