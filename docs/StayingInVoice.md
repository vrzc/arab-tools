# Staying in Voice SelfBOT

Sits in a voice channel.

## Features

- **Sits in voice 24h**: That's all it does.


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
# Start VoiceStay

```typescript
Bot.VoiceStay({
    guild: "The guild",
    channel: "The voice channel"
});

```
