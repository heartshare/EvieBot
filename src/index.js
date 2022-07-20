import dotenv from 'dotenv';
dotenv.config();

import db from './db/connection.js'; // importing mongo db
db.Connect();

import TelegramBot from 'node-telegram-bot-api';

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

    Evie.sendMessage(chatId, `Reminder "${Reminder}" set. I will remind you in ${Timer}.`);
});