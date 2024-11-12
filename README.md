### This module is protected by a license so if you're thinking of stealing it or modifying it to harm other users, think again. Any modified items can be passed down to my <a href="https://github.com/vrzc/arab-tools">github</a> by a push request.

# Arab-Tools

A simple npm package that makes it easier for the user to break discord TOS.

## Features

- **Autoreaction**: Auto reacts on giveaways so you can win alot of them without moving a muscle
- **Auto leveling**: Just spams in a specific channel so you can level up for any bot
- **Staying in voice**: same thing as auto leveling but for farming vc exp
- **BroadCast**: Advertises to everyone in the server using a discord bot. Very usefull for advertisment `(Will be released later this week)`
- **MultiCast**: BroadCast but with multiple bots incase one of the bots gets banned `(Will be released later this week)`
- **Quran**: A class featuring alot of Islamic useful functions. (random azkar, random ahadith, **`playing the holy quran in the vc`**)`(Will be released later this week)`
- **Games**: WORKING ON IT!! `(No ETA.)`

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
<details><summary>Auto Reaction</summary>

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

</details>
<details><summary>Auto Leveling</summary>

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
</details>

<details><summary>Staying in voice</summary>

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


const Bot = new arabtools.user(client);
```
# Start VoiceStay

```typescript
Bot.VoiceStay({
    guild: "The guild",
    channel: "The voice channel"
});

```

</details>
<details><summary>BroadCast</summary>

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

</details>
<details><summary>MultiCast</summary>

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

</details>
<details><summary>Quran</summary>

# Quran Audio Player

A simple Quran audio player for Discord bots. This project allows you to play Quran suras using Discord's voice system. The suras can be searched by their name or number, with an optional fuzzy search using the Levenshtein distance algorithm for improved matching.

## Features

- **Play Quran Sura**: Play a specific sura by name or number in a Discord voice channel.
- **Fuzzy Search**: Optionally search suras by name with Levenshtein distance for approximate matches.
- **Voice Connection**: Integrates seamlessly with Discord's voice connection for audio playback.

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

3. **Set up your Discord bot**: Ensure that your Discord bot is configured and has permission to join and speak in voice channels. You can find instructions on setting up a Discord bot [here](https://discordjs.guide/).

## Usage

### Import the Quran Class

In your bot’s code, import and initialize the `Quran` class.

```typescript
const arabtools = require("arabtools");

const client = new Discord.Client({intents:["Guilds", "GuildMembers", "GuildMessages","MessageContent"]});
// Create a new Quran player instance
const arabtools = new arabtools.bot(client)
```
# Play a Sura
To play a sura by its name or number, use the `play` method. This will automatically fetch the corresponding audio and play it in the provided voice connection.
```typescript
// Play a sura by name
await arabtools.quran.play("Al-Fatiha", voiceConnection);

// Play a sura by number
await arabtools.quran.play(1, voiceConnection);

//Play a sura by a stringified number
await arabtools.quran.play('1', voiceConnection)

//Play a sura by the arabic name
await arabtools.quran.play('الفاتحة', voiceConnection)
```
# Stop the Playback
To stop the audio playback and disconnect from the voice channel, use the `stop` method:
```typescript
await quran.stop(voiceConnection);
```

## API

### `Quran` Class

The `Quran` class provides methods to play suras and manage the audio playback.

#### `play(suraName: string | number, voiceConnection: VoiceConnection, useLevenshtein: boolean = false): Promise<void>`

Plays the audio of a sura based on its name or number.

- **Parameters**:
  - `suraName` (string | number): The name or number of the sura to play.
  - `voiceConnection` (VoiceConnection): The voice connection to subscribe to.
  - `useLevenshtein` (boolean, optional): If `true`, performs fuzzy searching for the sura name using Levenshtein distance. Default is `false`.
- **Returns**: A promise that resolves when the sura starts playing.
- **Throws**: An error if the sura is not found.

#### `stop(voiceConnection: VoiceConnection): Promise<void>`

Stops the current audio playback and disconnects from the voice channel.

- **Parameters**:
  - `voiceConnection` (VoiceConnection): The voice connection to destroy.
- **Returns**: A promise that resolves once the connection is destroyed.

#### Private Methods (Used Internally)

- `findSuraFromName(name: string, useLevenshtein: boolean = false): Sura | null` - Searches for a sura by name, optionally using Levenshtein distance.
- `findSuraFromNumber(id: {number: string | number} | null): Sura | null` - Searches for a sura by its number.
- `isNumber(str: string): boolean` - Utility function to check if a string represents a number.

### Sura Data

The suras data is stored in a JSON file (`suras.json`) in the following format:

```json
{
  "001": {
    "ar": "الفاتحة",
    "eng": "Al-Fatiha",
    "number": "001"
  },
  "002": {
    "ar": "البقرة",
    "eng": "Al-Baqarah",
    "number": "002"
  },
  ...
}
```
Each sura has the following fields:
- `ar`: Arabic name of the sura.
- `eng`: English name of the sura.
- `number`: The sura's number.

</details>

### If you have any questions regarding the npm module please join our <a href="https://discord.gg/graphicode">`discord`</a> server for support.

