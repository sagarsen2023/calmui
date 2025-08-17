#!/usr/bin/env node
import { Command } from "commander";
import fs from "fs-extra";
import path from "path";
import { initCommand } from "./config/initialize-project.config";

const program = new Command();

program
  .name("calmui")
  .description("CLI to scaffold projects and generate modules for frontend")
  .version("1.0.0");

program.addCommand(initCommand);

program
  .command("generate <type> <name>")
  .description("Generate a module")
  .action((type: string, name: string) => {
    const cwd = process.cwd();
    const framework = fs.existsSync(path.join(cwd, "next.config.js"))
      ? "nextjs"
      : "vite";

    const templateDir = path.join(__dirname, "../templates", framework, type);
    const targetDir = path.join(cwd, "src/modules", name);

    fs.copySync(templateDir, targetDir);
    console.log(`✅ Module "${name}" generated for ${framework}`);
  });

program.parse();
