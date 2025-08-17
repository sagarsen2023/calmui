import { nextJsConfig } from "./next-js/initiator";
import { viteReactConfig } from "./vite-react/initiator";

interface TemplateConfig {
  [key: string]: {
    init: (folderName: string) => ConfigOptions;
  };
}

export interface ConfigOptions {
  name: string;
  command: string;
}

export const templateConfigs: TemplateConfig = {
  "vite-react": {
    init: (folderName: string) => viteReactConfig(folderName),
  },
  "next-js": {
    init: (folderName: string) => nextJsConfig(folderName),
  },
};
