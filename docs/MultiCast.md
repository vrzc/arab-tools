# MultiCast Bot

Multi-cast bots are like personal assistants for your online server members. Imagine having a group of bots that can send different messages to different smaller server members. These bots can divide a big group into smaller ones, making it easy to send specific messages to each smaller group. It's like having a personal newsletter for every part of your server!

## Features

- **MultiCast Function**: let's send message to all your members with group of bots
- **Customized MultiCast**: You can obtain all data such as duration, successes, failures, etc., on the MultiCast status by using the MultiCast function.

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

### Import the Bot Class

In your bot’s code, import and initialize the `Bot` Class.

```typescript
const arabtools = require("arab-tools");

// Create a new Discord clients
const client = new Discord.Client({intents:["Guilds", "GuildMembers", "GuildMessages","MessageContent"]});

const client1 = new Discord.Client({intents:["Guilds", "GuildMembers", "GuildMessages","MessageContent"]});

const client2 = new Discord.Client({intents:["Guilds", "GuildMembers", "GuildMessages","MessageContent"]});

// Create a new class bot
const Bot = new arabtools.bot(client);
```
# Start MultiCast

To start sending message to all your members, use the `MultiCast` method:
```typescript
// Start the MultiCast
const data = await Bot.MultiCast({
    guildID: '12345677890',
    message: "Hi, Here !",
    bots:[client2,client1]
    timeout: 2000,
    mention: true,
    logInfo: false,
});


// Check the MultiCast status
console.log(data);

```
