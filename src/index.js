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