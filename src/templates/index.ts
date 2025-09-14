import { ConfigOptions } from "../types/initiator.types";
import { nextJsConfig } from "./next-js/initiator";
import { nextRouteGenerator } from "./next-js/route-generator";
import { viteReactConfig } from "./vite-react/initiator";
import { viteRouteGenerator } from "./vite-react/route-generator";

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
