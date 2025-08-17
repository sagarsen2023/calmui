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
    "folder to initialize project in (default: current folder)"
  )
  .description(
    "Initialize project in the specified folder (default: current folder)"
  )
  .showHelpAfterError()
  .action(async (folder?: string) => {
    try {
      // Asking user to select template
      // ? The templates will be automatically fetched from the templates directory
      const choice = await customPrompt({
        message: "Choose a template",
        choices: getTemplates(),
      });
      log(chalk.greenBright(`Creating template: ${choice}`));

      const target = folder || ".";
      const projectConfig = templateConfigs[choice].init(target);

      // Initialize the project
      execSync(projectConfig.command, {
        stdio: "inherit",
      });

      // Running post-install commands
      projectConfig.postInstallCommands?.forEach((cmd) => {
        log(chalk.blue(`Running: ${cmd}`));
        execSync(cmd, {
          stdio: "inherit",
        });
      });

      // Copy template files if available
      if (projectConfig.templateFiles) {
        log(chalk.blue("📂 Copying template files..."));
        projectConfig.templateFiles.forEach(({ source, target }) => {
          try {
            const targetDir = path.dirname(target);
            fs.ensureDirSync(targetDir);
            fs.copyFileSync(source, target);
            log(chalk.gray(`   ✓ ${target}`));
          } catch (error: any) {
            log(
              chalk.yellow(
                `   ⚠️  Warning: Could not copy ${source} to ${target}: ${error.message}`
              )
            );
          }
        });
      }

      log(chalk.green("✅ Project initialized successfully!"));
    } catch (e) {
      const error = e as Error;
      log(chalk.redBright("Project initialization cancelled!"));
      log(chalk.redBright(error.message));
      process.exit(0);
    }
  });
