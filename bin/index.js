#!/usr/bin/env node
const chalk = require('chalk');
const prompt = require('prompt-sync')();
const fetch = require('cross-fetch');
const cookie = require('cookie');

const { fetchRoom, fetchUserItem, fetchItemsTable } = require('../fetch-utils');

const {
  terminalForestBolger,
  terminalForestCosmike,
  cabin,
  lockbox,
  window,
  doorAndPad,
  deskLampJournal,
  bunkbeds,
  keypadNums,
  cabinAsciiSm,
  cabin50Col,
  bunkbeds2,
  keyItem,
  doorAndPadSm,
  skyrim,
  lantern,
  journal,
  deskLampJournalSm,
  deskBoth,
  deskJournal,
  deskLantern,
  lanternSm,
  paperNums,
  lockboxSm,
  lockboxWee,
  windowNums,
  emptyDesk,
} = require('../ascii');
const { signInUser, signUpUser } = require('../auth-utils');
require('dotenv').config();



let user_items;
let items;

async function initialPrompt() {
  // const User = await signInUser();
  let validUser = false;
  let userCookie;
  let userName;
  let password;
  let authType;
  console.log('authType');
  console.log(authType);
  while (!validUser) {
  console.log(`Do you have a login?
  1. Yes
  2. No
  `);
  authType = prompt();
  if(authType === '2') {
    userName = prompt(chalk.italic.bgWhite.blue('Enter your Username '));
    password = prompt(chalk.italic.bgWhite.blue('Enter your Password '));
    authType = undefined;
    try {
      const data = await signUpUser(userName, password);
      initialPrompt();
    } catch (e) {
      console.log(chalk.bold.red(e.message));
      initialPrompt();
    }
  }
  if(authType === '1') {
    userName = prompt(chalk.italic.bgWhite.blue('What is your Username? '))
    console.log(
      chalk.bold.bgYellowBright.green(`Hello, ${userName}.`)
      );
      password = prompt.hide("what is your password? ");
    }
  try {
    userCookie = await signInUser(username, password);
    validUser = true;
  } catch (e) {
    console.log(chalk.bold.red("Invalid username/password"));
  }
}
  console.log(chalk.italic.bgWhite.blue(`Are you ready to begin ${userName}? `));
  console.log(terminalForestCosmike);
  prompt(chalk.bgGray.green('Press any key to continue'));
  user_items = await fetchUserItem();
  items = await fetchItemsTable();
  console.log(cabin);
}


async function loadPrompts() {
  let room = await fetchRoom();

  console.log(room[0].room_description);
  
  // Temp Inventory Check
  console.log(user_items);

  console.log(`The Objects in the room are...
  1. Desk
  2. Bunk Beds
  3. A Small metal Lock Box
  4. Window
  5. Door
  `);

  let object = prompt('Which object would you like to investigate? ');
  

  //DESK
  if (object === '1') {
    if (
      user_items[2].item_true === false && //Lantern
      user_items[3].item_true === false //Journal
    ) {
      // Desk with lantern and Journal
      console.log(deskLampJournal);
      console.log(room[0].rooms_objects[0].object_description); 
      //asks user for which to investigate. 
      console.log(`Which do you wish to investigate?
      1. Lantern
      2. Journal
      `);

      let deskPrompt = prompt();
      //user investigates lantern
      if (deskPrompt === '1') {
        console.log(lanternSm);
        console.log('You pick up the lantern.');
        user_items[2].item_true = true;
        prompt(chalk.bgGray.green('Press any key to continue'));
        loadPrompts();
      } else if (deskPrompt === '2') {
        console.log(journal);
        console.log('You pick up and flip through the journal');
        console.log(items[3].item_description);
        console.log(items[3].item_secret);
        user_items[3].item_true = true;
        console.log(emptyDesk);
        console.log(user_items[3].item_true);
        prompt(chalk.bgGray.green('Press any key to continue'));
        loadPrompts();
      }
    } else if (
      user_items[2].item_true === true &&
      user_items[3].item_true === false
    ) {
      console.log(room[0].rooms_objects[0].object_secret_one);
      console.log('You pick up and flip through the journal');
      console.log(items[3].item_description);
      console.log();
      user_items[3].item_true = true;
      prompt(chalk.bgGray.green('Press any key to continue'));
      loadPrompts();
    } else if (
      user_items[2].item_true === false &&
      user_items[3].item_true === true
    ) {
      console.log(room[0].rooms_objects[0].object_secret_two);
      console.log('You pick up the lantern.');
      user_items[2].item_true = true;
      prompt(chalk.bgGray.green('Press any key to continue'));
      loadPrompts();
    } else if (
      user_items[2].item_true === true &&
      user_items[3].item_true === true
    ) {
      console.log(room[0].rooms_objects[0].object_secret_three);
      prompt(chalk.bgGray.green('Press any key to continue'));
      loadPrompts();
    }
    // user will be prompted to investigate the lamp or the journal.
    console.log(deskLampJournal);
  
  
    //BUNK BEDS
  } else if (object === '2') {
    if (user_items[0].item_true === false) {
      console.log(room[0].rooms_objects[1].object_description);
      user_items[0].item_true = true;
      console.log(keyItem);
      prompt(chalk.bgGray.green('Press any key to continue'));
      loadPrompts();
    } else if (user_items[0].item_true === true) {
      console.log(bunkbeds2);
      console.log(room[0].rooms_objects[1].object_secret_one);
      prompt(chalk.bgGray.green('Press any key to continue'));
      loadPrompts();
    }


 //LOCK BOX
  } else if (object === '3') {
    if (
      user_items[0].item_true === false &&
      user_items[1].item_true === false
    ) {
      console.log(room[0].rooms_objects[2].object_description);
      prompt(chalk.bgGray.green('Press any key to continue'));
      loadPrompts();
    } else if (
      user_items[0].item_true === true &&
      user_items[1].item_true === false
    ) {
      console.log(room[0].rooms_objects[2].object_secret_one);
      user_items[1].item_true = true;
      prompt(chalk.bgGray.green('Press any key to continue'));
      loadPrompts();
      console.log(lockbox);
    } else if (
      user_item[0].item_true === true &&
      user_items[1].item_true === true
    ) {
      console.log(room[0].rooms_objects[2].objects_secret_two);
      prompt(chalk.bgGray.green('Press any key to continue'));
      loadPrompts();
    }


    //WINDOW
  } else if (object === '4') {
    if (user_items[2].item_true === false) {
      console.log(window);
      console.log(room[0].rooms_objects[3].object_description);
      prompt(chalk.bgGray.green('Press any key to continue'));
      loadPrompts();
    } else if (user_items[2].item_true === true) {
      // ASCII needed of window with '4, 2, 6'
      console.log(windowText);
      console.log(window);
      console.log(room[0].rooms_objects[3].object_secret_one);
      prompt(chalk.bgGray.green('Press any key to continue'));
      loadPrompts();
    }
    

    //DOOR
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

initialPrompt();
loadPrompts();
