import dotenv from 'dotenv';
dotenv.config();

import db from './db/connection.js'; // importing mongo db
db.Connect();

import TelegramBot from 'node-telegram-bot-api';
import remindSchema from './models/remindSchema.js';

const Token = process.env.TOKEN; // retrieve bot token from bot father

const Evie = new TelegramBot(Token, {
    polling: true
});

Evie.getMe().then((me) => {
    console.log(`Hi! I'm ${me.first_name}.`); // logs when bot online
});

Evie.on('polling_error', console.log); // logs syntax errors

Evie.onText(/\/remind (.+)/, (msg, match) => {
    const chatId = msg.chat.id;

    let Reminder = match[1].split(',')[0]; // reminder message
    let Timer = match[1].split(',')[1]; // reminder timer

    let Time;
    let timeFormat;

    const Match = Timer.match(/\d+|\D+/g);
    Time = parseInt(Match[0]);
    timeFormat = Match[1].toLowerCase(); // case insensitive time format input

    if (timeFormat === 'h') {
        Time *= 60;
    } else if (timeFormat === 'd') {
        Time *= 60 * 24;
    } else if (timeFormat !== 'm') {
        Evie.sendMessage(chatId, `Provide a valid time format.\n'm' = minutes\n'h' = hours\n'd' = days`); // return if input does not match time format
    }

    const endsAt = new Date();
    endsAt.setMinutes(endsAt.getMinutes() + Time);

    remindSchema.create({
        userId: msg.from.id,
        reminder: Reminder,
        timer: endsAt
    }).then(() => { // when data saves to db return bot response
        Evie.sendMessage(chatId, `Reminder "${Reminder}" set. I will remind you in ${Timer}.`);
    }).catch((e) => console.error(e));

    const remindNotif = async () => {
        const data = {
            timer: {
                $lt: new Date()
            }
        };

        const results = await remindSchema.find(data);
        for (const result of results) {
            const { userId, reminder } = result; // looping through schema for specified data

            const user = await Evie.getChatMember(chatId, userId); // fetch user by id
            if (!user) return; // return if user id does not exist

            Evie.sendMessage(chatId, `📌 Reminder: "${reminder}"`); // sending reminder to user
        }
        await remindSchema.deleteMany(data); // delete reminder data after reminder has been sent
        setTimeout(remindNotif, 1000 * 10);
    }
    remindNotif(); // execute function
});

Evie.onText(/\/clear/, (msg) => {
    const chatId = msg.chat.id;

    remindSchema.deleteMany().then(() => { // searches for data and deletes all
        Evie.sendMessage(chatId, `Cleared reminders.`);
    }).catch((e) => console.error(e));
});

Evie.onText(/\/list/, (msg) => {
    const chatId = msg.chat.id;

    const remindList = async () => {
        const data = {
            userId: msg.from.id, // searching for data by author id
        };

        let list = [];
        let newList = [];

        list.push(await remindSchema.find(data));
        for(let i = 0; i < list[0].length; i++) {
            newList.push(list[0][i].reminder); // adding data to a list
        }

        Evie.sendMessage(chatId, `Reminders 📝\n${newList.join('\n')}`); // list reminders and separate by new line
    }
    remindList(); // execute function
});