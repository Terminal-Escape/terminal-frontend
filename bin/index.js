#!/usr/bin/env node
const chalk = require("chalk");
const prompt = require("prompt-sync")();
const fetch = require("cross-fetch");

const { fetchRoom, fetchUserItem } = require("../fetch-utils");

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
  
  console.log(`The Objects in the room are...
  1. Desk
  2. Bunk Beds
  3. A Small metal Lock Box
  4. Window
  5. Door
  `);
  
  let user_items = await fetchUserItem();
  // -- test -- 
  // let { user_items } = await fetchUserItem();

  console.log(user_items[1].item_true);

  let object = prompt("Which object would you like to investigate? ");
  if(object === '1') {
    if(user_items[2].item_true === false && user_items[3].item_true === false) {
      console.log(room[0].rooms_objects[0].object_description);
      let deskPrompt = prompt(`Which do you wish to investigate?
      1. Lantern
      2. Journal
      `)  
      if (deskPrompt === '1') {
        console.log('You pick up the lantern.');
        user_items[2].item_true = true;
      } else if(deskPrompt === '2'){
        console.log('You pick up and flip through the journal');
        console.log('A worn leather bound journal.');
        console.log('The final page has been ripped out but the following can be read from top to bottom on the remaining scraps of page: Doo... Co... 7')
        user_items[3].item_true = true;
        console.log(user_items[3].item_true);
      }
      } else if(user_items[2].item_true === true && user_items[3].item_true === false) {
          console.log(room[0].rooms_objects[0].object_secret_one);
          console.log('You pick up and flip through the journal');
          console.log('A worn leather bound journal.');
          console.log('The final page has been ripped out but the following can be read from top to bottom on the remaining scraps of page: Doo... Co... 7')
          user_items[3].item_true = true;
      } else if(user_items[2].item_true === false && user_items[3].item_true === true) {
          console.log(room[0].rooms_objects[0].object_secret_two);
          console.log('You pick up the lantern.');
          user_items[2].item_true = true;
      } else if (user_items[2].item_true === true && user_items[3].item_true === true) {
          console.log(room[0].rooms_objects[0].object_secret_three);    
      }
      // user will be prompted to investigate the lamp or the journal.
      // console.log(desk);
    }
    else if(object === '2') {
      if(user_items[0].item_true === false) {
        console.log(room[0].rooms_objects[1].object_description);
        user_items[0].item_true = true;
      } else if(user_items[0].item_true === true) {
        console.log(room[0].rooms_objects[1].object_secret_one);
        // console.log(bunkbeds);
      }
  }
  
  else if(object === '3') {
    // need to loop back to beginning of game if user cannot open box. 
    if(user_items[0].item_true === false && user_items[1].item_true === false) {
      console.log(room[0].rooms_objects[2].object_description);
    } else if(user_items[0].item_true === true && user_items[1].item_true === false) {
      console.log(room[0].rooms_objects[2].object_secret_one);
      // console.log(lockbox);
    } else if (user_item[0].item_true === true && user_items[1].item_true === true) {
      console.log(room[0].rooms_objects[2].objects_secret_two);
    }
  }

  else if(object === '4') {
    if(user_items[2].item_true === false) {
    console.log(room[0].rooms_objects[2].object_description); }

    else if(user_items[2].item_true === true) {
      console.log(room[0].rooms_objects[2].object_secret_one);
    }
    console.log(window);
  }
  else if(object === '5') {
    console.log(room[0].rooms_objects[4].object_description);
    // console.log(door);
    if (user_items[1].item_true === true && user_items[3].item_true === true && user_items[2].item_true === true && user_items[0].item_true === true) {
      // console.log(keypadNums);
      const doorPrompt = prompt('Enter code to open door');
      if (doorPrompt === '513426') {
        console.log(room[0].rooms_objects[4].object_secret_one);
      } else {
        console.log('Incorrect code entered');
      }      
    } else {
      console.log(room[0].rooms_objects[4].object_description);
    }
  } 
  
  else {
    console.log('Unacceptable Input please try again.')
  }
} 

  
  
  // console.log(object);
  // const temp = await fetchObjects(object);

loadPrompts();
