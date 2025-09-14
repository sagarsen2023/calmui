export interface TemplateFile {
  source: string;
  target: string;
}

export interface ConfigOptions {
  name: string;
  command: string;
  postInstallCommands?: string[];
  templateFiles?: TemplateFile[];
  finalizationCommands?: string[];
}
