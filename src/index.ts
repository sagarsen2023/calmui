#!/usr/bin/env node
import { Command } from "commander";
import { initCommand } from "./config/initialize-project.config";
import { generateRouteCommand } from "./config/generate-route.config";

const program = new Command();

program
  .name("calmui")
  .description("CLI to scaffold projects and generate modules for frontend")
  .version("1.0.0");

// Initialize project command
program.addCommand(initCommand);

// Route generation command
program.addCommand(generateRouteCommand);

program.parse();
