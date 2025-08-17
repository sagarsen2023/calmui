import { ConfigOptions } from "..";

export const viteReactConfig = (folderName: string): ConfigOptions => {
  const templateDir = `${__dirname}/project-files`;

  return {
    name: "Vite React",
    command: `npm create vite@latest ${folderName} -- --template react-ts`,
    postInstallCommands: [
      // Install dependencies
      `cd ${folderName} && npm i tailwindcss postcss autoprefixer @tailwindcss/vite @tanstack/react-router @tanstack/router-plugin lucide-react js-cookie`,
      `cd ${folderName} && npm i -D @tanstack/router-devtools -D @vitejs/plugin-react-swc -D @types/node -D @types/js-cookie > /dev/null 2>&1`,
      // Cleanup unnecessary files
      `rm -f ${folderName}/src/App.tsx`,
      `rm -f ${folderName}/src/App.css`,
    ],
    templateFiles: [
      {
        source: `${templateDir}/calmui.json`,
        target: `${folderName}/calmui.json`,
      },
      // ? Updating Files based on configuration and ready to development
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
        source: `${templateDir}/src/routes/index.tsx`,
        target: `${folderName}/src/routes/index.tsx`,
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
      `git add . > /dev/null 2>&1`,
      `git branch -M main`,
      `git commit -m "Initialized base project" > /dev/null 2>&1`,
    ],
  };
};
