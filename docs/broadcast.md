# BroadCast Bot

Broadcast bots are like super-fast messengers that can send important messages to all your members at once, without ban

## Features

- **BroadCast Function**: let's send message to all your members without ban
- **Customized Broadcast**: You can obtain all data such as duration, successes, failures, etc., on the broadcast status by using the Broadcast function.

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

// Create a new Discord client
const client = new Discord.Client({intents:["Guilds", "GuildMembers", "GuildMessages","MessageContent"]});

// Create a new class bot
const Bot = new arabtools.bot(client);
```
# Start Broadcast

To start sending message to all your members, use the `Broadcast` method:
```typescript
// Start the Broadcast
const data = await Bot.Broadcast({
    guildID: '12345677890',
    message: "Hi, Here !",
    timeout: 2000,
    mention: true,
    logInfo: false,
});


// data will be returned after the broadcast has finished.
console.log(data);

```
