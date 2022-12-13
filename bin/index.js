#!/usr/bin/env node
const chalk = require('chalk');
const prompt = require('prompt-sync')();
const fetch = require('cross-fetch');

const { fetchRoom, fetchUserItem } = require('../fetch-utils');

const {
  cabin,
  lockbox,
  window,
  doorAndPad,
  deskLampJournal,
  bunkbeds,
  keypadNums,
  terminalForestCosmike,
  keyItem,
  bunkbeds2,
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
let user_items;

async function askName() {
  const name = prompt(chalk.italic.bgWhite.blue('What is your name? '));
  console.log(
    chalk.bold.bgYellowBright.green(`Hello, ${name}. Are you ready to begin?`)
  );
  console.log(terminalForestCosmike);
  prompt(chalk.bgGray.green('Press any key to continue'));
  user_items = await fetchUserItem();
  console.log(cabin);

}

async function loadPrompts() {
  // opening image of cabin, needs description of user predicament
  // console.log(logCabinHC);

  // call API, gets room description, prompts for user action
  //      later --> display room options (room1, room2, etc.)
  // need fetch-utils

  let room = await fetchRoom();
  console.log(room[0].room_description);
  console.log(user_items);

  console.log(`The Objects in the room are...
  1. Desk
  2. Bunk Beds
  3. A Small metal Lock Box
  4. Window
  5. Door
  `);

  // -- test --
  // let { user_items } = await fetchUserItem();

  // console.log(user_items[1].item_true);

  let object = prompt('Which object would you like to investigate? ');
  if (object === '1') {
    if (
      user_items[2].item_true === false &&
      user_items[3].item_true === false
    ) {
      console.log(deskLampJournal);
      console.log(room[0].rooms_objects[0].object_description);
      console.log(`Which do you wish to investigate?
      1. Lantern
      2. Journal
      `);

      let deskPrompt = prompt();
      if (deskPrompt === '1') {
        // ASCII needed of just the lantern
        console.log('You pick up the lantern.');
        user_items[2].item_true = true;
        loadPrompts();
      } else if (deskPrompt === '2') {
        // ASCII needed of just the journal
        //  console.log(journal);
        console.log('You pick up and flip through the journal');
        console.log('A worn leather bound journal.');
        console.log(
          'The final page has been ripped out but the following can be read from top to bottom on the remaining scraps of page: Doo... Co... 7'
        );
        user_items[3].item_true = true;
        console.log(user_items[3].item_true);
        loadPrompts();
      }
    } else if (
      user_items[2].item_true === true &&
      user_items[3].item_true === false
    ) {
      //  console.log(journal);
      console.log(room[0].rooms_objects[0].object_secret_one);
      console.log('You pick up and flip through the journal');
      console.log('A worn leather bound journal.');
      console.log(
        'The final page has been ripped out but the following can be read from top to bottom on the remaining scraps of page: Doo... Co... 7'
      );
      user_items[3].item_true = true;
      loadPrompts();
    } else if (
      user_items[2].item_true === false &&
      user_items[3].item_true === true
    ) {
      console.log(room[0].rooms_objects[0].object_secret_two);
      //  console.log(lantern);
      console.log('You pick up the lantern.');
      user_items[2].item_true = true;
      loadPrompts();
    } else if (
      user_items[2].item_true === true &&
      user_items[3].item_true === true
    ) {
      console.log(room[0].rooms_objects[0].object_secret_three);
      loadPrompts();
    }
    // user will be prompted to investigate the lamp or the journal.
    console.log(deskLampJournal);
  } else if (object === '2') {
    if (user_items[0].item_true === false) {
      console.log(room[0].rooms_objects[1].object_description);
      user_items[0].item_true = true;
      console.log(keyItem);
      loadPrompts();
    } else if (user_items[0].item_true === true) {
      console.log(bunkbeds2);
      console.log(room[0].rooms_objects[1].object_secret_one);
      loadPrompts();
    }
  } else if (object === '3') {
    // need to loop back to beginning of game if user cannot open box.
    if (
      user_items[0].item_true === false &&
      user_items[1].item_true === false
    ) {
      console.log(room[0].rooms_objects[2].object_description);
      loadPrompts();
    } else if (
      user_items[0].item_true === true &&
      user_items[1].item_true === false
    ) {
      console.log(room[0].rooms_objects[2].object_secret_one);
      user_items[1].item_true = true;
      loadPrompts();
      console.log(lockbox);
    } else if (
      user_item[0].item_true === true &&
      user_items[1].item_true === true
    ) {
      console.log(room[0].rooms_objects[2].objects_secret_two);
      loadPrompts();
    }
  } else if (object === '4') {
    if (user_items[2].item_true === false) {
      console.log(window);
      console.log(room[0].rooms_objects[3].object_description);
      loadPrompts();
    } else if (user_items[2].item_true === true) {
      // ASCII needed of window with '4, 2, 6'
      // console.log(windowText);
      console.log(window);
      console.log(room[0].rooms_objects[3].object_secret_one);
      loadPrompts();
    }
  } else if (object === '5') {
    console.log(room[0].rooms_objects[4].object_description);
    console.log(doorAndPad);
    console.log(user_items[0].item_true);
    console.log(user_items[1].item_true);
    console.log(user_items[2].item_true);
    console.log(user_items[3].item_true);
    console.log(user_items[4].item_true);
    if (
      user_items[1].item_true === true &&
      user_items[3].item_true === true &&
      user_items[2].item_true === true &&
      user_items[0].item_true === true
    ) {
      console.log(keypadNums);
      const doorPrompt = prompt('Enter code to open door');
      if (doorPrompt === '513426') {
        // ASCII needed of outdoor freedom scene
        console.log(room[0].rooms_objects[4].object_secret_one);
        // const continue = prompt('
        //    Do you wish to travel to the border, or continue to the path?
        //    1. Border
        //    2. Path
        // ');
        //  if (continue === '1') {
        //    console.log(skyrimCart);  
        //    console.log(`Ralof: "Hey you, ${name} you\'re finally awake"`);  
        //  } else if (continue === '2') {
        //    console.log('some other ending || option for another room');
        //  }
      } else {
        console.log('Incorrect code entered');
        loadPrompts();
      }
    } else {
      // console.log(room[0].rooms_objects[4].object_description);
      loadPrompts();
    }
  } else {
    console.log('Unacceptable Input please try again.');
    loadPrompts();
  }
}

// console.log(object);
// const temp = await fetchObjects(object);
askName();
loadPrompts();
