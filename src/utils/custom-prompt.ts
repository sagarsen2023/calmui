import readline from "readline";
import chalk from "chalk";
import firstLetterCapitalize from "./first-letter-capitalize";

interface PromptOptions {
  message: string;
  choices: string[];
}

export function customPrompt({
  message,
  choices,
}: PromptOptions): Promise<string> {
  const log = console.log;
  return new Promise((resolve) => {
    let selected = 0;

    const render = () => {
      console.clear();
      log(message);
      choices.forEach((c, i) => {
        const option = firstLetterCapitalize({
          str: c,
          separator: "-",
        });
        if (i === selected) {
          log(chalk.cyan(`> ${option}`));
        } else {
          log(`  ${option}`);
        }
      });
    };

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.emitKeypressEvents(process.stdin, rl);

    if (process.stdin.isTTY) process.stdin.setRawMode(true);

    render();

    process.stdin.on("keypress", (_, key: any) => {
      if (key.name === "up") {
        selected = (selected - 1 + choices.length) % choices.length;
        render();
      } else if (key.name === "down") {
        selected = (selected + 1) % choices.length;
        render();
      } else if (key.name === "return") {
        rl.close();
        process.stdin.setRawMode(false);
        resolve(choices[selected]);
      } else if (key.ctrl && key.name === "c") {
        rl.close();
        process.exit();
      }
    });
  });
}
