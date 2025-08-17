import { ConfigOptions } from "..";

export const viteReactConfig = (folderName: string): ConfigOptions => {
  // Get the current template directory pointing to project-files
  const templateDir = `${__dirname}/project-files`;
  console.log("templateDir:", templateDir);
  console.log("folderName:", folderName);

  return {
    name: "Vite React",
    command: `npm create vite@latest ${folderName} -- --template react-ts`,
    postInstallCommands: [
      
      // Install dependencies
      `cd ${folderName} && npm install tailwindcss postcss autoprefixer @tailwindcss/vite @tanstack/react-router @tanstack/router-plugin lucide-react clsx tailwind-merge -D @tanstack/router-devtools`,
      
      `echo "✅ Vite React project with TanStack Router and Tailwind CSS setup complete!"`,
      `echo "📁 Project structure created with routes, modules, hooks, constants, and contexts folders"`,
      `echo "🎨 Tailwind CSS configured and ready to use"`,
      `echo "🚀 Run 'npm run dev' to start the development server"`
    ],
    templateFiles: [
      {
        source: `${templateDir}/vite.config.ts`,
        target: `${folderName}/vite.config.ts`
      },
      {
        source: `${templateDir}/tailwind.config.js`,
        target: `${folderName}/tailwind.config.js`
      },
      {
        source: `${templateDir}/src/main.tsx`,
        target: `${folderName}/src/main.tsx`
      },
      {
        source: `${templateDir}/src/index.css`,
        target: `${folderName}/src/index.css`
      },
      {
        source: `${templateDir}/src/routes/__root.tsx`,
        target: `${folderName}/src/routes/__root.tsx`
      },
      {
        source: `${templateDir}/src/routes/index.tsx`,
        target: `${folderName}/src/routes/index.tsx`
      },
      {
        source: `${templateDir}/src/routes/about.tsx`,
        target: `${folderName}/src/routes/about.tsx`
      },
      {
        source: `${templateDir}/src/lib/utils.ts`,
        target: `${folderName}/src/lib/utils.ts`
      },
      {
        source: `${templateDir}/src/constants/index.ts`,
        target: `${folderName}/src/constants/index.ts`
      },
      {
        source: `${templateDir}/src/hooks/index.ts`,
        target: `${folderName}/src/hooks/index.ts`
      },
      {
        source: `${templateDir}/src/contexts/index.ts`,
        target: `${folderName}/src/contexts/index.ts`
      },
      {
        source: `${templateDir}/src/modules/index.ts`,
        target: `${folderName}/src/modules/index.ts`
      },
      {
        source: `${templateDir}/src/components/index.ts`,
        target: `${folderName}/src/components/index.ts`
      },
      {
        source: `${templateDir}/src/utils/index.ts`,
        target: `${folderName}/src/utils/index.ts`
      }
    ],
  };
};
