#!/usr/bin/env node
const chalk = require('chalk');
const prompt = require('prompt-sync')();
const fetch = require('cross-fetch');
const cookie = require('cookie');

const { fetchRoom, fetchUserItem, fetchItemsTable } = require('../fetch-utils');
const { signInUser, signUpUser } = require('../auth-utils');

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
  freedom,
} = require('../ascii');
require('dotenv').config();

const pause = (ms = 1000) => new Promise((r) => setTimeout(r, ms));
const shortPause = (ms = 500) => new Promise((r) => setTimeout(r, ms));

let validUser = false;
let userCookie;
let user_items;
let items;

async function signUpPrompt() {
  console.log(chalk.italic.bgWhite.blue('Enter your Username '));
  console.log(`                     `);

  let userName = prompt();
  console.log(chalk.italic.bgWhite.blue('Enter your Password '));
  console.log(`                     `);

  let password = prompt();
  try {
    await signUpUser(userName, password);
    signInPrompt();
  } catch (e) {
    console.log(`                     `);

    console.log(chalk.bold.red(e.message));
  }
}

async function signInPrompt() {
  console.log(chalk.italic.bgWhite.blue('What is your Username? '));
  console.log(`                     `);

  let userName = prompt();
  console.log(`
    ================================

    Hello, ${chalk.bold.bgYellowBright.green(`${userName}`)} . 
                                                              
    What is your password?
    
    ================================
    `);
  let password = prompt.hide();
  try {
    validUser = true;
    userCookie = await signInUser(userName, password);
    initialPrompt();
  } catch (e) {
    validUser = false;
    console.log(`                     `);

    console.log(chalk.bold.red('Invalid username/password'));
    console.log(`                     `);

    signInPrompt();
  }
}

async function initialPrompt() {
  console.log(validUser);
  let authType;
  if (validUser === false) {
    await pause();
    console.log(`
    ================================
                                                          
    Do you have a login?
                                                          
          1. Yes
                                                          
          2. No
                                                          
    ================================
  `);
    authType = prompt();
    if (authType === '1') {
      signInPrompt();
    }
    if (authType === '2') {
      signUpPrompt();
    }
  } else if (validUser === true) {
    console.log(terminalForestCosmike);
    console.log(`                     `);
    user_items = await fetchUserItem();
    items = await fetchItemsTable();
    // console.log('user_items: ', user_items);
    // console.log('items: ', items);
    await pause();
    await shortPause();
    console.log(chalk.italic.bgWhite.blue(`Are you ready to begin? `));
    console.log(`                     `);

    await shortPause();
    console.log(`                     `);
    prompt(chalk.bgGray.green('Press any key to continue'));
    console.log(cabin);
    console.log(`                     `);

    await pause();
    loadPrompts();
  }
}

async function loadPrompts() {
  let room = await fetchRoom();
  console.log(room[0].room_description);
  console.log(`                     `);
  // Inventory Check
  let filtered = user_items.filter((user_item) => user_item.item_true === true);

  filteredMap = filtered.map((item) => ' ' + item.item_name);

  const stringItem = filteredMap.toString();

  const capitalized = (stringItem) =>
    stringItem.charAt(1).toUpperCase() + stringItem.slice(2);

  const itemsList = capitalized(stringItem);
  console.log(`                     `);
  console.log('Current Inventory: ' + itemsList);
  await pause();
  console.log(`                     `);
  console.log(`The Objects in the room are...
  1. Desk
  2. Bunk Beds
  3. A Small metal Lock Box
  4. Window
  5. Door
  `);
  console.log(`                     `);
  let object = prompt('Which object would you like to investigate? ');
  console.log(`                     `);
  //DESK
  if (object === '1') {
    if (
      user_items[2].item_true === false && //Lantern
      user_items[3].item_true === false //Journal
    ) {
      // Desk with lantern and Journal
      console.log(deskLampJournal);
      console.log(`                     `);
      await pause();
      console.log(`                     `);
      console.log(room[0].rooms_objects[0].object_description);
      //asks user for which to investigate.
      console.log(`                     `);

      console.log(`Which do you wish to investigate?
      1. Lantern
      2. Journal
      `);
      console.log(`                     `);
      let deskPrompt = prompt();
      //user investigates lantern
      if (deskPrompt === '1') {
        console.log(lanternSm);
        console.log(
          `                                                          `
        );

        await pause();
        console.log('You pick up the lantern.');
        user_items[2].item_true = true;
        console.log(`                     `);

        await shortPause();
        prompt(chalk.bgGray.green('Press any key to continue'));
        console.log(`                     `);

        loadPrompts();
      } else if (deskPrompt === '2') {
        console.log(journal);
        console.log(
          `                                                          `
        );

        await pause();
        console.log('You pick up and flip through the journal');
        console.log(
          `                                                          `
        );

        console.log(items[3].item_description);
        console.log(
          `                                                          `
        );

        console.log(items[3].item_secret);
        user_items[3].item_true = true;
        // console.log(emptyDesk);
        console.log(user_items[3].item_true);
        console.log(`                     `);
        await shortPause();
        prompt(chalk.bgGray.green('Press any key to continue'));
        console.log(`                     `);

        loadPrompts();
      }
    } else if (
      user_items[2].item_true === true &&
      user_items[3].item_true === false
    ) {
      console.log(deskJournal);
      console.log(`                     `);

      await pause();
      console.log(room[0].rooms_objects[0].object_secret_one);
      console.log('You pick up and flip through the journal');
      console.log(items[3].item_description);
      console.log();
      user_items[3].item_true = true;
      console.log(`                     `);
      await shortPause();
      prompt(chalk.bgGray.green('Press any key to continue'));
      console.log(`                     `);

      loadPrompts();
    } else if (
      user_items[2].item_true === false &&
      user_items[3].item_true === true
    ) {
      console.log(deskLantern);
      console.log(`                     `);

      await pause();
      console.log(room[0].rooms_objects[0].object_secret_two);
      console.log('You pick up the lantern.');
      user_items[2].item_true = true;
      console.log(`                     `);
      await shortPause();
      prompt(chalk.bgGray.green('Press any key to continue'));
      console.log(`                     `);

      loadPrompts();
    } else if (
      user_items[2].item_true === true &&
      user_items[3].item_true === true
    ) {
      console.log(emptyDesk);
      console.log(`                     `);

      await pause();
      console.log(room[0].rooms_objects[0].object_secret_three);
      console.log(`                     `);
      await shortPause();
      prompt(chalk.bgGray.green('Press any key to continue'));
      console.log(`                     `);

      loadPrompts();
    }
    // user will be prompted to investigate the lamp or the journal.
    // console.log(deskLampJournal);

    //BUNK BEDS
  } else if (object === '2') {
    if (user_items[0].item_true === false) {
      console.log(keyItem);
      console.log(`                     `);

      await pause();
      console.log(room[0].rooms_objects[1].object_description);
      user_items[0].item_true = true;
      console.log(`                     `);
      await shortPause();
      prompt(chalk.bgGray.green('Press any key to continue'));
      console.log(`                     `);

      loadPrompts();
    } else if (user_items[0].item_true === true) {
      console.log(bunkbeds2);
      console.log(`                     `);

      await pause();
      console.log(room[0].rooms_objects[1].object_secret_one);
      console.log(`                     `);
      await shortPause();
      prompt(chalk.bgGray.green('Press any key to continue'));
      console.log(`                     `);

      loadPrompts();
    }

    //LOCK BOX
  } else if (object === '3') {
    if (
      user_items[0].item_true === false &&
      user_items[1].item_true === false
    ) {
      console.log(lockboxWee);
      console.log(`                     `);

      await pause();
      console.log(room[0].rooms_objects[2].object_description);
      console.log(`                     `);
      await shortPause();
      prompt(chalk.bgGray.green('Press any key to continue'));
      console.log(`                     `);

      loadPrompts();
    } else if (
      user_items[0].item_true === true &&
      user_items[1].item_true === false
    ) {
      console.log(paperNums);
      console.log(`                     `);

      await pause();
      console.log(room[0].rooms_objects[2].object_secret_one);
      user_items[1].item_true = true;
      console.log(`                     `);
      await shortPause();
      prompt(chalk.bgGray.green('Press any key to continue'));
      console.log(`                     `);

      loadPrompts();
    } else if (
      user_items[0].item_true === true &&
      user_items[1].item_true === true
    ) {
      console.log(lockboxSm);
      console.log(`                     `);

      await pause();
      console.log(room[0].rooms_objects[2].objects_secret_two);
      console.log(`                     `);
      await shortPause();
      prompt(chalk.bgGray.green('Press any key to continue'));
      console.log(`                     `);

      loadPrompts();
    }

    //WINDOW
  } else if (object === '4') {
    if (user_items[2].item_true === false) {
      console.log(window);
      console.log(`                     `);

      await pause();
      console.log(room[0].rooms_objects[3].object_description);
      console.log(`                     `);

      await shortPause();
      prompt(chalk.bgGray.green('Press any key to continue'));
      console.log(`                     `);

      loadPrompts();
    } else if (user_items[2].item_true === true) {
      // ASCII needed of window with '4, 2, 6'
      console.log(windowNums);
      console.log(`                     `);

      await pause();
      // console.log(window);
      console.log(room[0].rooms_objects[3].object_secret_one);
      console.log(`                     `);

      await shortPause();
      prompt(chalk.bgGray.green('Press any key to continue'));
      console.log(`                     `);

      loadPrompts();
    }

    //DOOR
  } else if (object === '5') {
    console.log(doorAndPadSm);
    console.log(`                     `);

    await pause();
    console.log(room[0].rooms_objects[4].object_description);
    // console.log(user_items[0].item_true);
    // console.log(user_items[1].item_true);
    // console.log(user_items[2].item_true);
    // console.log(user_items[3].item_true);
    // console.log(user_items[4].item_true);
    console.log(`                     `);

    await pause();
    if (
      user_items[1].item_true === true &&
      user_items[3].item_true === true &&
      user_items[2].item_true === true &&
      user_items[0].item_true === true
    ) {
      console.log(keypadNums);
      console.log(`                     `);

      await pause();
      const doorPrompt = prompt('Enter code to open door ');
      console.log(`                     `);
      if (doorPrompt === '513426') {
        // ASCII needed of outdoor freedom scene
        console.log(freedom);
        console.log(
          `                                                          `
        );
        await pause();
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
        console.log(skyrim);
        console.log(
          `                                                          `
        );

        await pause();
        console.log(
          'Hey, you. You’re finally awake. You were trying to cross the border, right? Walked right into that Imperial ambush, same as us, and that thief over there.'
        );
      } else {
        console.log('Incorrect code entered');
        console.log(
          `                                                          `
        );
        await pause();
        loadPrompts();
      }
    } else {
      // console.log(room[0].rooms_objects[4].object_description);
      console.log(`                     `);

      loadPrompts();
    }
  } else {
    console.log(`                     `);

    console.log('Unacceptable Input please try again.');
    console.log(`                     `);
    await pause();
    loadPrompts();
  }
}

initialPrompt();
// loadPrompts();
