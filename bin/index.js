#!/usr/bin/env node
const chalk = require("chalk");
const prompt = require("prompt-sync")();
const fetch = require("cross-fetch");

const { fetchRoom } = require("../fetch-utils");

const { logCabinHC } = require("../ascii");
require("dotenv").config();

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
  const name = prompt(chalk.italic.bgWhite.blue("What is your name? "));
  console.log(
    chalk.bold.bgYellowBright.green(`Hello, ${name}. Are you ready to begin?`)
  );
  prompt(chalk.bgGray.green("Press any key to continue"));

  // opening image of cabin, needs description of user predicament
  // console.log(logCabinHC);

  // call API, gets room description, prompts for user action
  //      later --> display room options (room1, room2, etc.)
  // need fetch-utils
  let room = await fetchRoom();
  console.log(room[0].room_description);
  console.log("The Objects in the room are...");
  console.log("1. Desk");
  console.log("2. Bunk Beds");
  console.log("3. A Small metal Lock Box");
  console.log("4. Window");
  console.log("5. Door");
  let object = prompt("Which object would you like to investigate? ");
  if(object === '1') {
    console.log(room[0].rooms_objects[0].object_description);
  } 
  else if(object === '2') {
    console.log(room[0].rooms_objects[1].object_description);
  }
  else if(object === '3') {
    console.log(room[0].rooms_objects[2].object_description);
  }
  else if(object === '4') {
    console.log(room[0].rooms_objects[3].object_description);
  }
  else if(object === '5') {
    console.log(room[0].rooms_objects[4].object_description);
  } else {
    console.log('Unacceptable')
  }

  
  
  // console.log(object);
  // const temp = await fetchObjects(object);
}
loadPrompts();
