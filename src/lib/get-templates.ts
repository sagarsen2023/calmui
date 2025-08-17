import fs from "fs-extra";
import path from "path";

export const getTemplates = (): string[] => {
  const templates: string[] = [];
  // Resolve from the installed package directory, not the current working directory
  const templatesDir = path.resolve(__dirname, "../templates");
  fs.readdirSync(templatesDir).forEach((folder) => {
    const folderPath = path.join(templatesDir, folder);
    if (fs.statSync(folderPath).isDirectory()) {
      templates.push(folder);
    }
  });
  return templates;
};
