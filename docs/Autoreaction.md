# AutoReaction SelfBOT

AutoReaction allows the selfbot to join giveaways automatically, provides the message links and win updates also includes stat system.

## Features

- **Interaction buttons**: Clicks on button interactions
- **Normal emoji reacts**: Clicks on normal reacts
- **Stats**: `JSON DB` with `win` and `joins` data

## Installation

### Prerequisites

To use this library, you need to have:

- **Node.js** (v16 or higher recommended)
- A Discord bot with voice channel access

### Steps

1. **Install the arab-tools npm module**:

```bash
    npm i arab-tools@latest
```

3. **Set up your Discord bot**: Ensure that your Discord bot is configured and has permission to send messages in channels. You can find instructions on setting up a Discord bot [here](https://discordjs.guide/).

## Usage

### Import the User Class

In your bot’s code, import and initialize the `User` Class.

```typescript
const arabtools = require("arab-tools");

const { Client } = require('discord.js-selfbot-v13'); // works with any library that uses discord.js-like syntax;

const client = new Discord.Client();

// Create a new class bot
const Bot = new arabtools.user(client);
```
# Start Autoreaction

To start sending message to all your members, use the `Broadcast` method:
```typescript
Bot.autoreaction({
    customBotID: ["bot id's that you want the account to react on"], // optional option, There is 2 default bots


    timeout: 5000, // time you want the account to delay the reaction


    blacklistedwords: ["word1", "word2"], // Some admins like to see the accounts that uses autoreaction so this is a secuirty measure, put words like "test" so the bot won't react on these giveaways


    ownerId: "your id", //kind of an optional option, but you can put your id and that id will be returned when you win a giveaway

    
});

Bot.on("giveawayCreated", (data) => {
    console.log(data)
    // output: {url: messageURL, embed: the embed of the giveaway, bot: the bot that made the giveaway}
})

Bot.on('wins', (data) => {
    console.log(data)
    //output: {data: message(Message Object), owner: the id you put in ownerId, inv: server Invite}
})

```
