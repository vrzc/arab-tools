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
import { Quran } from './path/to/Quran';
import { VoiceConnection } from '@discordjs/voice';

// Create a new Quran player instance
const quran = new Quran();
```
# Play a Sura
To play a sura by its name or number, use the `play` method. This will automatically fetch the corresponding audio and play it in the provided voice connection.
```typescript
// Play a sura by name
await quran.play("Al-Fatiha", voiceConnection);

// Play a sura by number
await quran.play(1, voiceConnection);

//Play a sura by a stringified number
await quran.play('1', voiceConnection)
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