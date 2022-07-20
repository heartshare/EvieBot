# EvieBot
A Telegram reminder bot written with JavaScript, Node, and Mongoose that will help remind you on your tasks.

# At a Glance
Demo             |  Demo
:------------------------:|:-------------------------:
![](https://i.imgur.com/YiCqWIS.png)  |  ![](https://i.imgur.com/rng3rb4.png)
> - `/remind [message],[time]` : Create a reminder
> - `/list` : View reminders list
> - `/clear` : Delete all reminders

# Get Started
1. Clone repository and run:
```
$ npm install
```
2. Run bot
```
$ node .
```

# Configure
Create a `.env` file, fill out values:
```
TOKEN = BOT_TOKEN_HERE
MONGO = MONGOOSE_URI
```
> Retrieve bot token from [Bot Father](https://t.me/botfather)
