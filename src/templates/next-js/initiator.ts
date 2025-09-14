import os from "os";
import { ConfigOptions } from "../../types/initiator.types";
import { customPrompt } from "../../utils/custom-prompt";
import chalk from "chalk";

const choices = ["Blank Template", "Admin Template"];

export const nextJsConfig = async (
  folderName: string,
): Promise<ConfigOptions> => {
  const templateDir = `${__dirname}/project-files`;
  const isWindows = os.platform() === "win32";

  const choice = await customPrompt({
    message: "Select a template to initialize the project:",
    choices,
  });

  const isAdmin = choice === "Admin Template";

  isAdmin &&
    console.log(
      chalk.blueBright(
        "\nYour admin template will be initialized with Shadcn UI\n",
      ),
    );

  return {
    name: "Next Js",
    command: `npx create-next-app@latest ${folderName} --tailwind --typescript --app --src-dir --no-import-alias`,
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
        source: `${templateDir}/src/types/.gitkeep`,
        target: `${folderName}/src/types/.gitkeep`,
      },
    ],
    finalizationCommands: [
      `cd ${folderName} && git init`,
      `cd ${folderName} && git add . ${isWindows ? "> NUL 2>&1" : "> /dev/null 2>&1"}`,
      `cd ${folderName} && git branch -M main`,
      `cd ${folderName} && git commit -m "Initialized base project" ${
        isWindows ? "> NUL 2>&1" : "> /dev/null 2>&1"
      }`,
    ],
  };
};
