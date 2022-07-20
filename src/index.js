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
    });
});