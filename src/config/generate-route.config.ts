import { Command } from "commander";
import path from "path";
import fs from "fs-extra";
import chalk from "chalk";
import { templateConfigs } from "../templates";
import { CalmUiJson } from "../types/calmui-json.type";

const log = console.log;

export const generateRouteCommand = new Command("generate-route")
  .argument("<route>", "The route to generate")
  .description("Generates a new route. Like /users, /accounts/create")
  .action((route: string) => {
    try {
      log(chalk.blueBright(`Generating route: ${route}`));

      const cwd = process.cwd(); // Getting current directory
      const calmUiJson: CalmUiJson = fs.readJsonSync(
        path.join(cwd, "calmui.json")
      );

      // Generating route
      templateConfigs[calmUiJson.template].generateRoute?.(route);
    } catch (e) {
      const error = e as Error;
      log(
        chalk.redBright(`Error generating route "${route}": ${error.message}`)
      );
    }
  });
