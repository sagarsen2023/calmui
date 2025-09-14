import { nextJsConfig } from "./next-js/initiator";
import { nextRouteGenerator } from "./next-js/route-generator";
import { viteReactConfig } from "./vite-react/initiator";
import { viteRouteGenerator } from "./vite-react/route-generator";

export interface ConfigOptions {
  name: string;
  command: string;
  postInstallCommands?: string[];
  templateFiles?: {
    source: string;
    target: string;
  }[];
  finalizationCommands?: string[];
}

interface TemplateConfig {
  [key: string]: {
    init: (folderName: string) => Promise<ConfigOptions>;
    generateRoute?: (route: string) => void;
  };
}

export const templateConfigs: TemplateConfig = {
  "vite-react": {
    init: (folderName: string) => viteReactConfig(folderName),
    generateRoute: viteRouteGenerator,
  },
  "next-js": {
    init: (folderName: string) => nextJsConfig(folderName),
    generateRoute: nextRouteGenerator,
  },
};
