import fs from "fs-extra";
import path from "path";
import { execSync } from "child_process";
import chalk from "chalk";

const srcDir = path.resolve("src/templates");
const distDir = path.resolve("dist/templates");

const templates: string[] = [];
const templatesDir = path.resolve(process.cwd(), "src/templates");
fs.readdirSync(templatesDir).forEach((folder) => {
  const folderPath = path.join(templatesDir, folder);
  if (fs.statSync(folderPath).isDirectory()) {
    templates.push(folder);
  }
});

for (const template of templates) {
  // Ensure template directory exists
  const templateDir = path.join(distDir, template);
  fs.ensureDirSync(templateDir);
  
  // Copy project files folder (keep the folder structure)
  const projectSrc = path.join(srcDir, template, "project-files");
  const projectDest = path.join(distDir, template, "project-files");
  if (fs.existsSync(projectSrc)) {
    fs.copySync(projectSrc, projectDest);
  }

  // Compile initiator.ts to initiator.js in the template directory
  const initiatorTs = path.join(srcDir, template, "initiator.ts");
  const initiatorJs = path.join(templateDir, "initiator.js");
  if (fs.existsSync(initiatorTs) && !fs.existsSync(initiatorJs)) {
    execSync(
      `tsc "${initiatorTs}" --outDir "${templateDir}" --module ESNext --target ESNext`
    );
  }
}

console.log(chalk.greenBright("Templates copied and initiators compiled!"));
