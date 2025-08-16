#!/usr/bin/env node
import { Command } from "commander";
import { execSync } from "child_process";
import fs from "fs-extra";
import path from "path";
import { customPrompt } from "./utils/custom-prompt";

const program = new Command();

program
  .name("calmui")
  .description("CLI to scaffold projects and generate modules")
  .version("1.0.0");

program
  .command("init [folder]")
  .description(
    "Initialize project in the specified folder (default: current folder)"
  )
  .action(async (folder?: string) => {
    const choice = await customPrompt({
      message: "Choose a template",
      choices: ["Vite", "Next.js"],
    });
    const target = folder || ".";
    if (choice === "Vite") {
      execSync(`npm create vite@latest ${target} -- --template react`, {
        stdio: "inherit",
      });
    } else {
      execSync(`npx create-next-app@latest ${target}`, { stdio: "inherit" });
    }
  });

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
