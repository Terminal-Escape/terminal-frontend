#!/usr/bin/env node
const chalk = require('chalk');
const prompt = require('prompt-sync')();
const fetch = require('cross-fetch');
const cookie = require('cookie');

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
  cabin50Col,
  lanternSm,
} = require('../ascii');
const { signInUser } = require('../auth-utils');
require('dotenv').config();



let user_items;

async function askName() {
  // const User = await signInUser();
  let validUser = false;
  
  let userCookie;
  while (!validUser) {
    const Username = prompt(chalk.italic.bgWhite.blue('What is your Username? '))
    console.log(
      chalk.bold.bgYellowBright.green(`Hello, ${Username}.`)
      );
      const password = prompt.hide("what is your password? ");
    }
  try {
    validUser = true;
    userCookie = await signInUser(username, password);
  } catch (e) {
    console.log(chalk.bold.red("Invalid username/password"));
  }
  console.log(chalk.italic.bgWhite.blue(`Are you ready to begin ${Username}? `));
  console.log(terminalForestCosmike);
  prompt(chalk.bgGray.green('Press any key to continue'));
  user_items = await fetchUserItem();
  console.log(cabin);
}

async function loadPrompts() {
  let room = await fetchRoom();

  console.log(room[0].room_description);
  
  // Inventory Check
  console.log(user_items);

  console.log(`The Objects in the room are...
  1. Desk
  2. Bunk Beds
  3. A Small metal Lock Box
  4. Window
  5. Door
  `);

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
        // ASCII of the lantern
        console.log(lanternSm);
        console.log('You pick up the lantern.');
        user_items[2].item_true = true;
        loadPrompts();
      } else if (deskPrompt === '2') {
        // ASCII needed of just the journal
         console.log(journal);
        console.log('You pick up and flip through the journal');
        console.log(room[0].rooms_objects);
        console.log(room[0].items[3].item_secret // ryan placeholder
          'The final page has been ripped out but the following can be read from top to bottom on the remaining scraps of page: Doo... Co... 7'
        );
        user_items[3].item_true = true;
        console.log(emptyDesk);
        console.log(user_items[3].item_true);
        loadPrompts();
      }
    } else if (
      user_items[2].item_true === true &&
      user_items[3].item_true === false
    ) {
      console.log(room[0].rooms_objects[0].object_secret_one);
      console.log('You pick up and flip through the journal');
      console.log('A worn leather bound journal.');
      console.log();
      user_items[3].item_true = true;
      loadPrompts();
    } else if (
      user_items[2].item_true === false &&
      user_items[3].item_true === true
    ) {
      console.log(room[0].rooms_objects[0].object_secret_two);
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
      } else if (doorPrompt === '426513') {
        console.log(skyrimCart);
        console.log(
          'Hey, you. You’re finally awake. You were trying to cross the border, right? Walked right into that Imperial ambush, same as us, and that thief over there.'
        );
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

askName();
loadPrompts();
