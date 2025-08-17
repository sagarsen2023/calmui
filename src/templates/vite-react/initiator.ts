import { ConfigOptions } from "..";

export const viteReactConfig = (folderName: string): ConfigOptions => {
  const templateDir = `${__dirname}/project-files`;

  return {
    name: "Vite React",
    command: `npm create vite@latest ${folderName} -- --template react-ts`,
    postInstallCommands: [
      // Install dependencies
      `cd ${folderName} && npm install tailwindcss postcss autoprefixer @tailwindcss/vite @tanstack/react-router @tanstack/router-plugin lucide-react -D @tanstack/router-devtools -D @vitejs/plugin-react-swc -D @types/node`,

      // Cleanup unnecessary files
      `rm -f ${folderName}/src/App.tsx`,
      `rm -f ${folderName}/src/App.css`,

      `echo "✅ Vite React project with TanStack Router and Tailwind CSS setup complete using CalmUi!"`,
      `git init`,
      `git add .`,
      `git commit -m "Initialized base project"`,
    ],
    templateFiles: [
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
        source: `${templateDir}/src/routes/__root.tsx`,
        target: `${folderName}/src/routes/__root.tsx`,
      },
      {
        source: `${templateDir}/src/routes/index.tsx`,
        target: `${folderName}/src/routes/index.tsx`,
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
      {
        source: `${templateDir}/src/services/.gitkeep`,
        target: `${folderName}/src/services/.gitkeep`,
      },
      {
        source: `${templateDir}/src/utils/.gitkeep`,
        target: `${folderName}/src/utils/.gitkeep`,
      },
    ],
  };
};
