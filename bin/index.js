#!/usr/bin/env node
const chalk = require('chalk');
const prompt = require('prompt-sync')();
const fetch = require('cross-fetch');

const { fetchRoom } = require('../fetch-utils');

const {
  logCabinHC,
} = require('../ascii');
require('dotenv').config();

// prompt to enter name
// call API to load room 1
// prompt for user action
// 'investigate table' --> return table data w/objects


//          console commands
// console.log(chalk.bold.green('Welcome to the game!'));
// console.log(terminalForestBolger);
//   prompt(chalk.bgGray.green('Press any key to continue'));
//   console.log(chalk.bold.bgYellowBright.magentaBright('It\'s time to make your escape'));
//   prompt(chalk.bgGray.green('Press any key to start your escape!'));
//   console.log(chalk.bold.bgBlueBright.magenta('You find yourself in a lonely cabin in a lonely wood'));


async function loadPrompts() {
  const name = prompt(chalk.italic.bgWhite.blue('What is your name?'));
  console.log(chalk.bold.bgYellowBright.green(`Hello, ${name}. Are you ready to begin?`));
  prompt(chalk.bgGray.green('Press any key to continue'));
  
  // opening image of cabin, needs description of user predicament
  // console.log(logCabinHC);


  // call API, gets room description, prompts for user action
  //      later --> display room options (room1, room2, etc.)
  // need fetch-utils
  const room = await fetchRoom();
  console.log(room);
}
loadPrompts();
