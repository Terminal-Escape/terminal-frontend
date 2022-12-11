#!/usr/bin/env node
const chalk = require('chalk');
const prompt = require('prompt-sync')();

const {
  skyrimCart,
  cabin,
  skyrim200,
  cabin200,
  terminalWoodsColossal,
  terminalForestBolger,
  terminalForestCosmike,
  terminalForestKban,
  terminalGrove08,
  terminalGroveThick,
  cabinSm,
  logCabin,
  logCabinHC,
  logCabinEx,
} = require('../ascii');
require('dotenv').config();

async function loadPrompts() {
  //   console.log(chalk.bold.green('Welcome to the game!'));
  console.log(terminalForestBolger);
  prompt(chalk.bgGray.green('Press any key to continue'));
  console.log(logCabinHC);
  //   const name = prompt(chalk.italic.bgWhite.blue('What is your name?'));
  //   console.log(chalk.bold.bgYellowBright.green(`Hello, ${name}. Are you ready to begin?`));
  //   prompt(chalk.bgGray.green('Press any key to continue'));
  //   console.log(chalk.bold.bgYellowBright.magentaBright('It\'s time to make your escape'));
  //   prompt(chalk.bgGray.green('Press any key to start your escape!'));
  //   console.log(chalk.bold.bgBlueBright.magenta('You find yourself in a lonely cabin in a lonely wood'));
}
loadPrompts();
