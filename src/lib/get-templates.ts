import fs from "fs-extra";
import path from "path";

export const getTemplates = (): string[] => {
  const templates: string[] = [];
  const templatesDir = path.join(__dirname, "../templates");
  fs.readdirSync(templatesDir).forEach((folder) => {
    const folderPath = path.join(templatesDir, folder);
    if (fs.statSync(folderPath).isDirectory()) {
      templates.push(folder);
    }
  });
  return templates;
};
