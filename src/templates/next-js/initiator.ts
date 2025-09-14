import os from "os";
import { ConfigOptions, TemplateFile } from "../../types/initiator.types";
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

  const baseTemplateFiles: TemplateFile[] = [
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
    {
      source: `${templateDir}/src/app/layout.tsx`,
      target: `${folderName}/src/app/layout.tsx`,
    },
  ];

  const blankSpecificFiles: TemplateFile[] = [
    {
      source: `${templateDir}/src/components/.gitkeep`,
      target: `${folderName}/src/components/.gitkeep`,
    },
    {
      source: `${templateDir}/src/constants/.gitkeep`,
      target: `${folderName}/src/constants/.gitkeep`,
    },
    {
      source: `${templateDir}/src/context/next-theme-context.tsx`,
      target: `${folderName}/src/context/next-theme-context.tsx`,
    },
    {
      source: `${templateDir}/src/hooks/.gitkeep`,
      target: `${folderName}/src/hooks/.gitkeep`,
    },
    {
      source: `${templateDir}/src/modules/.gitkeep`,
      target: `${folderName}/src/modules/.gitkeep`,
    },
    {
      source: `${templateDir}/src/lib/.gitkeep`,
      target: `${folderName}/src/lib/.gitkeep`,
    },
    {
      source: `${templateDir}/src/types/.gitkeep`,
      target: `${folderName}/src/types/.gitkeep`,
    },
  ];

  const adminSpecificFiles: TemplateFile[] = [
    // ? Components
    {
      source: `${templateDir}/src/components/ui/theme-switch.tsx`,
      target: `${folderName}/src/components/ui/theme-switch.tsx`,
    },
    // ? Constants
    {
      source: `${templateDir}/src/constants/menu-items.tsx`,
      target: `${folderName}/src/constants/menu-items.tsx`,
    },
    // ? Contexts
    {
      source: `${templateDir}/src/context/breadcrumb-context.ts`,
      target: `${folderName}/src/context/breadcrumb-context.ts`,
    },
    {
      source: `${templateDir}/src/context/next-theme-context.tsx`,
      target: `${folderName}/src/context/next-theme-context.tsx`,
    },
    // ? Modules
    {
      source: `${templateDir}/src/modules/layout/breadcrumb.tsx`,
      target: `${folderName}/src/modules/layout/breadcrumb.tsx`,
    },
    {
      source: `${templateDir}/src/modules/layout/header.tsx`,
      target: `${folderName}/src/modules/layout/header.tsx`,
    },
    {
      source: `${templateDir}/src/modules/layout/sidebar.tsx`,
      target: `${folderName}/src/modules/layout/sidebar.tsx`,
    },
    {
      source: `${templateDir}/src/modules/auth/login-form.tsx`,
      target: `${folderName}/src/modules/auth/login-form.tsx`,
    },
    // ? Pages
    {
      source: `${templateDir}/src/app/layout.tsx`,
      target: `${folderName}/src/app/layout.tsx`,
    },
    {
      source: `${templateDir}/src/app/(authenticated)/layout.tsx`,
      target: `${folderName}/src/app/(authenticated)/layout.tsx`,
    },
    {
      source: `${templateDir}/src/app/(authenticated)/page.tsx`,
      target: `${folderName}/src/app/(authenticated)/page.tsx`,
    },
    {
      source: `${templateDir}/src/app/(authenticated)/settings/page.tsx`,
      target: `${folderName}/src/app/(authenticated)/settings/page.tsx`,
    },
    {
      source: `${templateDir}/src/app/(auth)/sign-in/page.tsx`,
      target: `${folderName}/src/app/(auth)/sign-in/page.tsx`,
    },
  ];

  const getTemplateFilesBasedOnChoice = (): TemplateFile[] => {
    switch (choice) {
      case "Blank Template":
        return blankSpecificFiles;
      case "Admin Template":
        return adminSpecificFiles;
      default:
        return blankSpecificFiles;
    }
  };

  return {
    name: "Next Js",
    command: `npx create-next-app@latest ${folderName} --tailwind --typescript --app --src-dir --no-import-alias`,
    postInstallCommands: [
      `cd ${folderName} && npm i jotai next-themes`,
      (isWindows
        ? isAdmin && `del /f ${folderName}\\src\\app\\page.tsx`
        : isAdmin && `rm -f ${folderName}/src/app/page.tsx`) || "",
    ],
    templateFiles: [
      {
        source: `${templateDir}/calmui.json`,
        target: `${folderName}/calmui.json`,
      },
      // ? Updating Files based on configuration and ready to development
      ...baseTemplateFiles,

      // ? Initializing folders for template structure
      ...getTemplateFilesBasedOnChoice(),
    ],
    finalizationCommands: [
      (isAdmin &&
        `cd ${folderName} && npx shadcn@latest init && npx shadcn@latest add sidebar card label`) ||
        "",
      `cd ${folderName} && git init`,
      `cd ${folderName} && git add . ${isWindows ? "> NUL 2>&1" : "> /dev/null 2>&1"}`,
      `cd ${folderName} && git branch -M main`,
      `cd ${folderName} && git commit -m "Initialized base project" ${
        isWindows ? "> NUL 2>&1" : "> /dev/null 2>&1"
      }`,
    ],
  };
};
