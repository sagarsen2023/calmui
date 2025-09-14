import { Command } from "commander";
import { customPrompt } from "../utils/custom-prompt";
import { execSync } from "child_process";
import chalk from "chalk";
import { getTemplates } from "../lib/get-templates";
import { templateConfigs } from "../templates";
import fs from "fs-extra";
import path from "path";

const log = console.log;

export const initCommand = new Command("init")
  .argument(
    "[folder]",
    "folder to initialize project in (default: current folder)",
  )
  .description(
    "Initialize project in the specified folder (default: current folder)",
  )
  .showHelpAfterError()
  .action(async (folder?: string) => {
    try {
      // Asking user to select template
      // ? The templates will be automatically fetched from the templates directory
      const choice = await customPrompt({
        message: "Choose a framework",
        choices: getTemplates(),
      });
      log(chalk.greenBright(`Initializing framework ---> ${choice}\n`));

      const target = folder || ".";
      const {
        command,
        postInstallCommands,
        templateFiles,
        finalizationCommands,
      } = await templateConfigs[choice].init(target);

      // Initialize the project
      execSync(command, {
        stdio: "inherit",
      });

      // Running post-install commands
      postInstallCommands?.forEach((cmd) => {
        if (cmd === "") return;
        execSync(cmd, {
          stdio: "inherit",
        });
      });

      // Copy template files if available
      if (templateFiles) {
        log(chalk.blueBright("📂 Copying template files..."));
        templateFiles.forEach(({ source, target }) => {
          try {
            const targetDir = path.dirname(target);
            fs.ensureDirSync(targetDir);
            fs.copyFileSync(source, target);
            log(chalk.greenBright(`   ✓ ${target}`));
          } catch (error: any) {
            log(
              chalk.yellow(
                `   ⚠️  Warning: Could not copy ${source} to ${target}: ${error.message}`,
              ),
            );
          }
        });
      }

      // ? Finalizing project setup
      finalizationCommands?.forEach((cmd) => {
        if (cmd === "") return;
        execSync(cmd, {
          stdio: "inherit",
        });
      });

      log(chalk.green("✅ Project initialized successfully!"));
    } catch (e) {
      const error = e as Error;
      log(chalk.redBright("Project initialization cancelled!"));
      log(chalk.redBright(error.message));
      process.exit(0);
    }
  });
