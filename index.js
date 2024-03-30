#!/usr/bin/env node
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import inquirer from "inquirer";
import { execSync } from "child_process";

const userChoices = {
  packageInput: "",
  envInput: "",
};

const cmd = {
  npm: {
    "Create React App": "npx create-react-app my-app",
    "Vite.js": "npm init vite@latest",
    "Next.js": "npx create-next-app",
    "Nest.js": "npm i -g @nestjs/cli",
    Hardhat: " npx hardhat init",
  },
  pnpm: {
    "Create React App": "pnpm create-react-app my-app",
    "Vite.js": "pnpm create vite",
    "Next.js": "pnpx create-next-app@latest",
    "Nest.js": "pnpm i -g @nestjs/cli",
    Hardhat: "pnpx hardhat init",
  },
};

const sleep = (ms = 1000) => new Promise((resolve) => setTimeout(resolve, ms));
async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow(figlet.textSync("DevEase"));
  await sleep();
  rainbowTitle.stop();

  console.log(`${chalk.blue("Making your dev env setup easier!")}`);
}

async function packageInput() {
  const answer = await inquirer.prompt({
    name: "package",
    type: "list",
    message: "Choose a package manager",
    choices: ["npm", "pnpm"],
  });
  userChoices.packageInput = answer.package;
}

async function envInput() {
  const answer = await inquirer.prompt({
    name: "env",
    type: "list",
    message: "Choose a environment",
    choices: ["Create React App", "Vite.js", "Next.js", "Nest.js", "Hardhat"],
  });
  userChoices.envInput = answer.env;
}

async function executeCommand(command) {
  console.log(`Executing command: ${command}`);
  try {
    execSync(`${command}`, { stdio: "inherit" });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return false;
  }
  return true;
}

async function executeCommands() {
  console.log("Executing commands in the terminal...");
  if (
    userChoices.packageInput === "npm" ||
    userChoices.packageInput === "pnpm"
  ) {
    const packageCommands = cmd[userChoices.packageInput];
    const command = packageCommands[userChoices.envInput];
    if (command) {
      await executeCommand(command);
    } else {
      console.log("Invalid choice");
    }
  } else {
    console.log("Invalid package manager choice");
  }
}

(async () => {
  await welcome();
  await packageInput();
  await envInput();
  await executeCommands();
})();
