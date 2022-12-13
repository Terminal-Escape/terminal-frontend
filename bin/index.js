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

  let roomObjects =  prompt(`
  Objects in the room:
  1. Desk
  2. Lamp
  3. Bunkbeds  
  `);

  console.log(await getObjectById(`${roomObjects}`));


  if (roomObjects === '1') {
    await getObjectById(1);
    console.log('description of Desk object')
  } else if (roomObjects === '2') {
    await getObjectById(2); 
  } else if (roomObjects === '3') {
    await getObjectById(3);
  } else {
    console.log('please input the number of the object you wish to investigate');
  }

}
loadPrompts();
