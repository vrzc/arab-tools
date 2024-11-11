# AutoLeveling SelfBOT

it just spams in a specific TextChannel to farm exp.

## Features

- **2 Languages**: You can use English or arabic.
- **Gibberish Spamming**: spams random letters instead of words


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
# Start Auto Leveling

To start the auto leveling, use the `leveling` method.
```typescript
let lang = "eng"

Bot.leveling({
    channel: "channel you want the bot to spam in",

    randomLetters: false, // if true it spams random letters

    time: 10000, // delay between each message in ms

    type: lang == 'eng' ? 'eng' : 'ar' // The language, can be "ar"
})

```
