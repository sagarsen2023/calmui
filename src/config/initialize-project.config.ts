import { Command } from "commander";
import { customPrompt } from "../utils/custom-prompt";
import { execSync } from "child_process";
import chalk from "chalk";
import { getTemplates } from "../lib/get-templates";
import { templateConfigs } from "../templates";

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
    const choice = await customPrompt({
      message: "Choose a template",
      choices: getTemplates(),
    });
    log(chalk.greenBright(`Selected template: ${choice}`));
    const target = folder || ".";
    log(chalk.greenBright(`Selected folder: ${target}`));
    log(chalk.magenta(templateConfigs[choice].init(target).command));

    try {
      execSync(templateConfigs[choice].init(target).command, {
        stdio: "inherit",
      });
      log(chalk.green("✅ Project initialized successfully!"));
    } catch (e) {
      const error = e as Error;
      log(chalk.redBright("Project initialization cancelled!"));
      log(chalk.redBright(error.message));
      process.exit(0);
    }
  });
