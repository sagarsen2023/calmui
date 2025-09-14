import os from "os";
import { customPrompt } from "../../utils/custom-prompt";
import chalk from "chalk";
import { ConfigOptions, TemplateFile } from "../../types/initiator.types";

const choices = ["Blank Template", "Admin Template"];

export const viteReactConfig = async (
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
      source: `${templateDir}/calmui.json`,
      target: `${folderName}/calmui.json`,
    },
    {
      source: `${templateDir}/.gitignore`,
      target: `${folderName}/.gitignore`,
    },
    {
      source: `${templateDir}/vite.config.ts`,
      target: `${folderName}/vite.config.ts`,
    },
    {
      source: `${templateDir}/tsconfig.json`,
      target: `${folderName}/tsconfig.json`,
    },
    {
      source: `${templateDir}/tsconfig.app.json`,
      target: `${folderName}/tsconfig.app.json`,
    },
    {
      source: `${templateDir}/src/context/theme-context.tsx`,
      target: `${folderName}/src/context/theme-context.tsx`,
    },
    {
      source: `${templateDir}/src/main.tsx`,
      target: `${folderName}/src/main.tsx`,
    },
    {
      source: `${templateDir}/src/index.css`,
      target: `${folderName}/src/index.css`,
    },
    {
      source: `${templateDir}/src/modules/home/index.tsx`,
      target: `${folderName}/src/modules/home/index.tsx`,
    },
    {
      source: `${templateDir}/src/routes/__root.tsx`,
      target: `${folderName}/src/routes/__root.tsx`,
    },
    {
      source: `${templateDir}/src/services/config/fetch-api.ts`,
      target: `${folderName}/src/services/config/fetch-api.ts`,
    },
    {
      source: `${templateDir}/src/services/config/query-urls.ts`,
      target: `${folderName}/src/services/config/query-urls.ts`,
    },
    {
      source: `${templateDir}/src/utils/cookie-storage.ts`,
      target: `${folderName}/src/utils/cookie-storage.ts`,
    },
    {
      source: `${templateDir}/src/utils/query-params-formatter.ts`,
      target: `${folderName}/src/utils/query-params-formatter.ts`,
    },
  ];

  const blankSpecificFiles: TemplateFile[] = [
    // ? Routes
    {
      source: `${templateDir}/src/routes/index.tsx`,
      target: `${folderName}/src/routes/index.tsx`,
    },
    // ? Blank folders to start with
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
    // ? Hooks
    {
      source: `${templateDir}/src/context/breadcrumb-context.ts`,
      target: `${folderName}/src/context/breadcrumb-context.ts`,
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
    // ? Routes
    {
      source: `${templateDir}/src/routes/(auth)/sign-in.tsx`,
      target: `${folderName}/src/routes/(auth)/sign-in.tsx`,
    },
    {
      source: `${templateDir}/src/routes/(authenticated)/route.tsx`,
      target: `${folderName}/src/routes/(authenticated)/route.tsx`,
    },
    {
      source: `${templateDir}/src/routes/(authenticated)/index.tsx`,
      target: `${folderName}/src/routes/(authenticated)/index.tsx`,
    },
    {
      source: `${templateDir}/src/routes/(authenticated)/settings/index.tsx`,
      target: `${folderName}/src/routes/(authenticated)/settings/index.tsx`,
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
    name: "Vite React",
    command: `npm create vite@latest ${folderName} -- --template react-ts`,
    postInstallCommands: [
      // Install dependencies
      `cd ${folderName} && npm i tailwindcss postcss autoprefixer @tailwindcss/vite @tanstack/react-router @tanstack/router-plugin lucide-react js-cookie jotai`,
      `cd ${folderName} && npm i -D @tanstack/router-devtools -D @vitejs/plugin-react-swc -D @types/node -D @types/js-cookie ${
        isWindows ? "> NUL 2>&1" : "> /dev/null 2>&1"
      }`,
      // Cleanup unnecessary files
      isWindows
        ? `del /f ${folderName}\\src\\App.tsx`
        : `rm -f ${folderName}/src/App.tsx`,
      isWindows
        ? `del /f ${folderName}\\src\\App.css`
        : `rm -f ${folderName}/src/App.css`,
    ],
    templateFiles: [
      // ? Updating Files based on configuration and ready to development
      ...baseTemplateFiles,

      // ? Initializing folders for template structure
      ...getTemplateFilesBasedOnChoice(),
    ],
    finalizationCommands: [
      (isAdmin && "npx shadcn@latest init && npx shadcn@latest add sidebar card label") ||
        "",
      "git init",
      `git add . ${isWindows ? "> NUL 2>&1" : "> /dev/null 2>&1"}`,
      "git branch -M main",
      `git commit -m "Initialized base project" ${
        isWindows ? "> NUL 2>&1" : "> /dev/null 2>&1"
      }`,
    ],
  };
};
