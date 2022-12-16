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
const { thomas, charlie, sam, ryan } = require('../devAscii');

const {
  rv90,
  rv70,
  tent90,
  tent70,
  firepit,
  campfireRing,
  grizzly,
  grizzly2,
  boatDock,
  firstAidKit,
  firstAidKit60,
  axe,
  woodsmansFriend,
  bearboxOpen,
  bearboxClosed,
} = require('../campgroundAscii');

require('dotenv').config();

const pause = (ms = 1000) => new Promise((r) => setTimeout(r, ms));
const shortPause = (ms = 500) => new Promise((r) => setTimeout(r, ms));

let validUser = false;
let userCookie;
let user_items;
let items;
let room;


function lineBreak() {
  console.log(`                     `);
}

async function signUpPrompt() {
  console.log(chalk.italic.bgWhite.blue('Enter your Username '));
  let userName = prompt();
  lineBreak();

  console.log(chalk.italic.bgWhite.blue('Enter your Password '));
  let password = prompt();
  lineBreak();

  try {
    await signUpUser(userName, password);
    signInPrompt();
  } catch (e) {
    lineBreak();
    console.log(chalk.bold.red(e.message));
  }
}

async function signInPrompt() {
  console.log(chalk.italic.bgWhite.blue('What is your Username? '));
  let userName = prompt();
  lineBreak();

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

    lineBreak();
    console.log(chalk.bold.red('Invalid username/password'));
    lineBreak();

    signInPrompt();
  }
}

async function initialPrompt() {
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
    
    user_items = await fetchUserItem();
    items = await fetchItemsTable();
    
    await pause();
    await shortPause();
    lineBreak();

    console.log(`
      ================================

      ${chalk.italic.bgWhite.blue(`Are you ready to begin? `)}`);
    console.log(`
      ================================
      `);
    await shortPause();
    lineBreak();

    prompt(chalk.bgGray.green('Press enter to continue'));
    console.log(cabin);
    await pause();
    lineBreak();

    loadPrompts();
  }
}

async function loadDevs() {
  // thomas
  console.log(thomas);

  lineBreak();
  await shortPause();
  console.log(chalk.hex('#b100cd').bold('Thomas Jenkins'));
  await pause();
  lineBreak();

  console.log(
    chalk.green.bold(
      'Thomas is a battle-hardened warrior from the line of Durin of the Dwarves of Erebor. He believes the greatest treasure are the friends we made along the journey.'
    )
  );
  await pause();
  lineBreak();

  console.log(
    chalk.blue('Linkedin: https://www.linkedin.com/in/thomas-p-jenkins/>')
  );
  await shortPause();
  lineBreak();

  console.log(chalk.blue('GitHub: https://github.com/Thomas-Jenkins'));
  await pause();
  lineBreak();

  // sam
  console.log(sam);

  lineBreak();
  await shortPause();
  console.log(chalk.hex('#b100cd').bold('Sam Adams'));
  await pause();
  lineBreak();

  console.log(
    chalk.green.bold(
      "Sam is an enigmatic figure from parts unknown. Whispers speak of his mastery of digital alchemy, and he is said to have the secret of the Developer's Stone."
    )
  );
  await pause();
  lineBreak();

  console.log(chalk.blue('Linkedin: https://www.linkedin.com/in/samsadams/'));
  await shortPause();
  lineBreak();

  console.log(chalk.blue('GitHub: https://github.com/soup1e'));
  await pause();
  lineBreak();

  // charlie
  console.log(charlie);

  lineBreak();
  await shortPause();
  console.log(chalk.hex('#b100cd').bold('Charles Crabtree'));
  await pause();
  lineBreak();

  console.log(
    chalk.green.bold(
      "Charlie is a man with a cabin. Legend holds that he hunts by convincing animals to walk into traps. Some say he's still out there, somewhere. Waiting..."
    )
  );
  await pause();
  lineBreak();

  console.log(
    chalk.blue('Linkedin: https://www.linkedin.com/in/charles-crabtree/')
  );
  await shortPause();
  lineBreak();

  console.log(chalk.blue('Github: https://github.com/charlescrabtree'));
  await pause();
  lineBreak();

  // ryan
  console.log(ryan);

  lineBreak();
  await shortPause();
  console.log(chalk.hex('#b100cd').bold('Ryan Parker'));
  await pause();
  lineBreak();

  console.log(
    chalk.green.bold(
      "Ryan is said to conjure images before one's eyes, coaxing specters from the shadows, bending the very fabric of reality. Ooh, pretty colors!"
    )
  );
  await pause();
  lineBreak();

  console.log(
    chalk.blue('Linkedin: https://www.linkedin.com/in/ryanparkerdev/')
  );
  await shortPause();
  lineBreak();

  console.log(chalk.blue('GitHub: https://github.com/ryan-j-parker'));
  lineBreak();
  await pause();

  // pressing enter runs the game again
  //   prompt(chalk.bgYellow.blue('Press enter to play again'));
  //   lineBreak();
  //   loadPrompts();
}

// async function switchArray() {
//   room = await fetchRoom();
//   room.unshift(room.pop());
// }

async function loadPrompts() {
  // await switchArray();
  room = await fetchRoom();
  console.log(room[1].room_description);
  lineBreak();

  // Inventory Check

  const filtered = user_items.filter(
    (user_item) => user_item.item_true === true
  );
  const filteredMap = filtered.map((item) => ' ' + item.item_name);
  const stringItem = filteredMap.toString();
  const capitalized = (stringItem) =>
    stringItem.charAt(1).toUpperCase() + stringItem.slice(2);
  const itemsList = capitalized(stringItem);
  console.log('Current Inventory: ' + itemsList);
  await pause();
  lineBreak();

  console.log(`The Objects in the room are...
  1. Desk
  2. Bunk Beds
  3. A small metal lock box
  4. Window
  5. Door
  `);

  lineBreak();
  let object = prompt('Which object would you like to investigate? ');
  lineBreak();

  //DESK
  if (object === '1') {
    if (
      user_items[2].item_true === false && //Lantern
      user_items[3].item_true === false //Journal
    ) {
      // Desk with lantern and Journal
      console.log(deskLampJournal);
      await pause();
      lineBreak();

      console.log(room[0].rooms_objects[0].object_description);
      lineBreak();

      console.log(`Which do you wish to investigate?
      1. Lantern
      2. Journal
      `);
      let deskPrompt = prompt();
      lineBreak();

      //user investigates lantern
      if (deskPrompt === '1') {
        console.log(lanternSm);
        await pause();
        lineBreak();

        console.log(chalk.yellow.bold('You pick up the lantern.'));
        user_items[2].item_true = true;
        await shortPause();
        lineBreak();

        prompt(chalk.bgGray.green('Press enter to continue'));
        lineBreak();

        loadPrompts();
      } else if (deskPrompt === '2') {
        console.log(journal);
        await pause();
        lineBreak();

        console.log(
          chalk.yellow.bold('You pick up and flip through the journal')
        );
        lineBreak();

        console.log(items[3].item_description);
        lineBreak();

        console.log(items[3].item_secret);
        lineBreak();

        user_items[3].item_true = true;

        // console.log(emptyDesk);
        console.log(user_items[3].item_true);
        await shortPause();
        lineBreak();

        prompt(chalk.bgGray.green('Press enter to continue'));
        lineBreak();

        loadPrompts();
      }
    } else if (
      user_items[2].item_true === true &&
      user_items[3].item_true === false
    ) {
      console.log(deskJournal);
      await pause();
      lineBreak();

      console.log(room[0].rooms_objects[0].object_secret_one);
      console.log(
        chalk.yellow.bold('You pick up and flip through the journal')
      );
      console.log(items[3].item_description);
      console.log(items[3].item_secret);
      user_items[3].item_true = true;
      await shortPause();
      lineBreak();

      prompt(chalk.bgGray.green('Press enter to continue'));
      lineBreak();

      loadPrompts();
    } else if (
      user_items[2].item_true === false &&
      user_items[3].item_true === true
    ) {
      console.log(deskLantern);
      await pause();
      lineBreak();

      console.log(room[0].rooms_objects[0].object_secret_two);
      console.log(chalk.yellow.bold('You pick up the lantern.'));
      user_items[2].item_true = true;
      await shortPause();
      lineBreak();

      prompt(chalk.bgGray.green('Press enter to continue'));
      lineBreak();

      loadPrompts();
    } else if (
      user_items[2].item_true === true &&
      user_items[3].item_true === true
    ) {
      console.log(emptyDesk);
      await pause();
      lineBreak();

      console.log(
        chalk.green.bold(room[0].rooms_objects[0].object_secret_three)
      );
      await shortPause();
      lineBreak();

      prompt(chalk.bgGray.green('Press enter to continue'));
      lineBreak();

      loadPrompts();
    }

    // user will be prompted to investigate the lamp or the journal.
    // console.log(deskLampJournal);

    //BUNK BEDS
  } else if (object === '2') {
    if (user_items[0].item_true === false) {
      console.log(keyItem);
      await pause();
      lineBreak();

      console.log(room[0].rooms_objects[1].object_description);
      user_items[0].item_true = true;
      await shortPause();
      lineBreak();

      prompt(chalk.bgGray.green('Press enter to continue'));
      lineBreak();

      loadPrompts();
    } else if (user_items[0].item_true === true) {
      console.log(bunkbeds2);
      await pause();
      lineBreak();

      console.log(chalk.blue(room[0].rooms_objects[1].object_secret_one));
      await shortPause();
      lineBreak();

      prompt(chalk.bgGray.green('Press enter to continue'));
      lineBreak();

      loadPrompts();
    }

    //LOCK BOX
  } else if (object === '3') {
    if (
      user_items[0].item_true === false &&
      user_items[1].item_true === false
    ) {
      console.log(lockboxWee);
      await pause();
      lineBreak();

      console.log(chalk.blue(room[0].rooms_objects[2].object_description));
      await shortPause();
      lineBreak();

      prompt(chalk.bgGray.green('Press enter to continue'));
      lineBreak();

      loadPrompts();
    } else if (
      user_items[0].item_true === true &&
      user_items[1].item_true === false
    ) {
      console.log(paperNums);
      await pause();
      lineBreak();

      console.log(chalk.blue(room[0].rooms_objects[2].object_secret_one));
      user_items[1].item_true = true;
      await shortPause();
      lineBreak();

      prompt(chalk.bgGray.green('Press enter to continue'));
      lineBreak();

      loadPrompts();
    } else if (
      user_items[0].item_true === true &&
      user_items[1].item_true === true
    ) {
      console.log(lockboxSm);
      await pause();
      lineBreak();

      console.log(chalk.blue(room[0].rooms_objects[2].object_secret_two));
      await shortPause();
      lineBreak();

      prompt(chalk.bgGray.green('Press enter to continue'));
      lineBreak();

      loadPrompts();
    }

    //WINDOW
  } else if (object === '4') {
    if (user_items[2].item_true === false) {
      console.log(window);
      await pause();
      lineBreak();

      console.log(chalk.blue(room[0].rooms_objects[3].object_description));
      await shortPause();
      lineBreak();

      prompt(chalk.bgGray.green('Press enter to continue'));
      lineBreak();

      loadPrompts();
    } else if (user_items[2].item_true === true) {
      // ASCII needed of window with '4, 2, 6'
      console.log(windowNums);
      await pause();
      lineBreak();

      // console.log(window);
      console.log(
        chalk.yellow.bold(room[0].rooms_objects[3].object_secret_one)
      );
      await shortPause();
      lineBreak();

      prompt(chalk.bgGray.green('Press enter to continue'));
      lineBreak();

      loadPrompts();
    }

    //DOOR
  } else if (object === '5') {
    console.log(doorAndPadSm);
    await pause();
    lineBreak();

    console.log(chalk.blue(room[0].rooms_objects[4].object_description));
    // console.log(user_items[0].item_true);
    // console.log(user_items[1].item_true);
    // console.log(user_items[2].item_true);
    // console.log(user_items[3].item_true);
    // console.log(user_items[4].item_true);
    await pause();
    lineBreak();

    if (
      user_items[1].item_true === true &&
      user_items[3].item_true === true &&
      user_items[2].item_true === true &&
      user_items[0].item_true === true
    ) {
      console.log(keypadNums);
      await pause();
      lineBreak();

      const doorPrompt = prompt('Enter code to open door... ');
      lineBreak();

      if (doorPrompt === '513426') {
        console.log(freedom);
        await pause();
        lineBreak();

        console.log(
          chalk.green.bold(room[0].rooms_objects[4].object_secret_one)
        );
        await pause();
        lineBreak();
        
        const devs = prompt(
          chalk.bgGray.green(`
          What would you like to do now?
          1. Continue
          2. About the developers
          `)
        );
        if (devs === '1') {
          loadCampground();
        } else if (devs === '2') {
          await loadDevs();
        }
        prompt('Play again?');
        initialPrompt();
      } else if (doorPrompt === '426513') {
        console.log(skyrim);
        await pause();
        lineBreak();

        console.log(
          chalk
            .hex('#b100cd')
            .bold(
              'Hey, you. You’re finally awake. You were trying to cross the border, right? Walked right into that Imperial ambush, same as us, and that thief over there.'
            )
        );
        await pause();

        console.log(
          chalk.bgGray.green(`
        What would you like to do now?
        1. Play again
        2. About the developers
        `)
        );
        const devs = prompt();
        if (devs === '1') {
          initialPrompt();
        } else if (devs === '2') {
          await loadDevs();
        }
        prompt('Play again?');
        initialPrompt();
      } else {
        console.log('Incorrect code entered');
        lineBreak();
        await pause();

        loadPrompts();
      }
    } else {
      lineBreak();

      loadPrompts();
    }
  } else {
    lineBreak();

    console.log('Unacceptable Input please try again.');
    lineBreak();
    await pause();

    loadPrompts();
  }
}

// initialPrompt();

async function loadCampground() {
  // await switchArray();
  room = await fetchRoom();
  console.log(room);
  console.log(room[1].room_description);

  console.log(
    chalk.blue(
      `
    You see:
    1. Dock
    2. Fire pit
    3. Tent
    4. Bear box
    5. RV
    `
    )
  );
  const where = prompt(`Which would you like to investigate?`);
  if (where === '1') {
    // dock
    // console.log(room[1].object[5].object_description);
    if (user_items[7].item_true === false) {
      console.log(boatDock);
      await pause();
      lineBreak();

      console.log(room[1].objects[5].object_description);
      await pause();
      lineBreak();

      console.log(items[7].item_description);
      lineBreak();

      user_items[7].item_true === true;
      prompt(chalk.bgGray.green('Press enter to continue'));
      lineBreak();
      
      loadCampground();
      
    } else if (user_items[7].item_true === true) {
      console.log(room[1].objects[5].object_secret_one);
      prompt(chalk.bgGray.green('Press enter to continue'));

      loadCampground();
      
    }
  }
  if (where === '2') {
    if (user_items[5].item_true === false) {
      console.log(firepit);
      lineBreak();

      console.log(room[1].objects[6].object_description);
      await pause();
      lineBreak();

      console.log(items[4].item_description);
      user_items[5].item_true === true;
      console.log(woodsmansFriend);
      prompt(chalk.bgGray.green('Press enter to continue'));
      loadCampground();

    } else if (user_items[5].item_true === true) {
      console.log(room[1].objects[6].object_secret_one);
      prompt(chalk.bgGray.green('Press enter to continue'));
      loadCampground();

    }
    // fire pit
    // axe
    user_items[5].item_true === true;
  }
  if (where === '3') {
    // tent
    if (user_items[8].item_true === false) {
      console.log(tent70);
      await pause();
      lineBreak();

      console.log(room[1].objects[7].object_description);
      await pause();
      lineBreak();
      
      console.log(items[7].item_description);
      user_items[8].item_true === true;
      prompt(chalk.bgGray.green('Press enter to continue'));
      lineBreak();

      loadCampground();
    } else if (user_items[8].item_true === true) {
      console.log(room[1].objects[7].object_secret_one);
      prompt(chalk.bgGray.green('Press enter to continue'));
      loadCampground();
    }
    // first aid kit
  }
  if (where === '4') {
    // bear box
    //                            ASCII needed for bear box
    if (user_items[6].item_true === false) {
      console.log(bearboxClosed);
      console.log(room[1].objects[8].object_description);
      prompt(chalk.bgGray.green('Press enter to continue'));
      loadCampground();
    } else if (
      user_items[6].item_true === true &&
      user_items[5].item_true === false
    ) {
      console.log(bearBoxOpen);
      await pause();
      console.log(room[1].objects[8].object_secret_one);
      await pause();
      console.log(grizzly)
      console.log(room[1].objects[10].object_description);
      //ending
      console.log(
        chalk.bgGray.green(`
      What would you like to do now?
      1. Play again
      2. About the developers
      `)
      );
      const devs = prompt();
      if (devs === '1') {
        initialPrompt();
      } else if (devs === '2') {
        await loadDevs();
      }
      prompt('Play again?');
      initialPrompt();
    } else if (
      user_items[6].item_true === true &&
      user_items[5].item_true === true &&
      user_items[8].item_true === false
    ) {
      console.log(bearBoxOpen);
      await pause();
      console.log(room[1].objects[8].object_secret_one);
      await pause();
      console.log(grizzly)
      console.log(room[1].objects[10].object_secret_one);
      //ending
      console.log(
        chalk.bgGray.green(`
      What would you like to do now?
      1. Play again
      2. About the developers
      `)
      );
      const devs = prompt();
      if (devs === '1') {
        initialPrompt();
      } else if (devs === '2') {
        await loadDevs();
      }
      prompt('Play again?');
      initialPrompt();
    } else if (
      user_items[6].item_true === true &&
      user_items[5].item_true === true &&
      user_items[8].item_true === true
    ) {
      console.log(bearBoxOpen);
      await pause()
      console.log(room[1].objects[8].object_secret_one);
      await pause();
      console.log(grizzly);
      console.log(room[1].objects[10].object_secret_two);
      //ending
      console.log(
        chalk.bgGray.green(`
      What would you like to do now?
      1. Play again
      2. About the developers
      `)
      );
      const devs = prompt();
      if (devs === '1') {
        initialPrompt();
      } else if (devs === '2') {
        await loadDevs();
      }
      prompt('Play again?');
      initialPrompt();
    }
    // food stuffs
    // user_items[9].item_true === true; (i dont think we need this here)
  }
  if (where === '5') {
    // RV
    if (user_items[6].item_true === false) {
      console.log(rv70);
      await pause();
      lineBreak();

      console.log(room[1].objects[9].object_description);
      await pause();
      lineBreak();

      console.log(items[5].item_description);
      user_items[6].item_true === true;
      prompt(chalk.bgGray.green('Press enter to continue'));
      loadCampground();
    } else if (user_items[6].item_true === true) {
      console.log(room[1].objects[9].object_secret_one);
      prompt(chalk.bgGray.green('Press enter to continue'));
      loadCampground();
    }
    // key ring
    user_items[6].item_true === true;
  }
}

initialPrompt();

// loadCampground();
// loadPrompts();
