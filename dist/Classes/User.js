"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const events_1 = __importDefault(require("events"));
const promises_1 = require("timers/promises");
const DB_1 = __importDefault(require("../utils/DB"));
const chalk_1 = __importDefault(require("chalk"));
const languages_json_1 = require("../utils/JSON/languages.json");
/**
 * Default bot IDs.
 */
const bots = [
    "294882584201003009",
    "824119071556763668"
];
/**
 * Class for handling user-related auto-reactions and leveling interactions.
 * @extends EventEmitter
 */
class UserRelatedClass extends events_1.default {
    /**
     * Initializes a new instance of UserRelatedClass.
     * @param client - The Discord client instance.
     */
    constructor(client) {
        super();
        this.client = client;
        this.db = new DB_1.default({ filePath: './autoreactiondata.json', autoSave: true });
        this.checkServerJoin('1000710976343134289');
    }
    /**
     * Checks if the client has joined a specified server.
     * @param serverid - The server ID to check.
     * @returns Promise that resolves if the client has joined the server; otherwise, exits the process.
     */
    checkServerJoin(serverid) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield this.hasJoined(serverid))) {
                console.log(chalk_1.default.bgRed.white.bold("\n⚠️  ALERT: You have not joined the server!\n") +
                    chalk_1.default.bgBlack.white.bold("Please join the discord server to use this code: https://discord.gg/2tdmKFKA.\n"));
                process.exit(0);
            }
            else {
                console.log("This code was made by Sphinx. Discord: (3yl)");
            }
        });
    }
    /**
     * Verifies if the client is a member of the specified server.
     * @param serverid - The ID of the server to check.
     * @returns Promise that resolves to true if the client is a member; otherwise, false.
     */
    hasJoined(serverid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.guilds.fetch(serverid);
                return true;
            }
            catch (_a) {
                return false;
            }
        });
    }
    //------------------------------------------------------------------------------------------------------------------------------------------------------//
    /**
     * Initiates the automatic reaction feature based on provided options.
     * @param {string} [options.sessionid="cdcbf8c16f0221eb1c147700f95e0038"] - The session ID for component interactions.
     * @param {string[]} [options.customBotID=[]] - Array of custom bot IDs to monitor for interactions.
     * @param {string} [options.reactionName] - The reaction emoji name to use, if applicable.
     * @param {number} [options.timeout=5000] - Delay in milliseconds before auto-reacting or interacting.
     * @param {string[]} [options.blacklistedwords=[]] - Array of words to ignore in message content or embed titles.
     * @param {string} [options.ownerId] - Optional ID of the owner for tracking and handling.
     * @returns {Promise<void>} - Promise that resolves when the auto-reaction process starts.
     */
    autoreaction() {
        return __awaiter(this, arguments, void 0, function* (options = {}) {
            const { sessionid = "cdcbf8c16f0221eb1c147700f95e0038", customBotID = [], timeout = 5000, blacklistedwords = [], ownerId } = options;
            customBotID.push(...bots);
            if (!Array.isArray(blacklistedwords) || !Array.isArray(customBotID)) {
                console.error("[SYNTAX ERROR]: Ensure blacklistedwords and customBotID are arrays.");
                return;
            }
            this.client.on("messageCreate", (message) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                if (!customBotID.includes(message.author.id))
                    return;
                if (message.content.includes((_a = this.client.user) === null || _a === void 0 ? void 0 : _a.id)) {
                    yield this.handleWin(message, ownerId);
                }
                if (message.components.length > 0) {
                    yield this.handleComponentInteraction(message, sessionid, timeout, blacklistedwords);
                }
                else {
                    yield this.handleReactions(message, timeout, blacklistedwords);
                }
            }));
        });
    }
    /**
     * @param message - The message indicating a win.
     * @param ownerId - The owner ID.
     * @returns Promise that resolves when the win is processed.
     */
    handleWin(message, ownerId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const serverInvite = yield ((_a = message.guild) === null || _a === void 0 ? void 0 : _a.invites.create(message.channel.id));
                this.db.increment('/wins');
                this.emit('wins', { data: message, owner: ownerId, inv: serverInvite });
            }
            catch (error) {
                console.error("Error handling win:", error);
            }
        });
    }
    /**
     * Handles component interactions in messages.
     * @param message - The message containing components.
     * @param sessionid - The session ID for interaction.
     * @param timeout - The delay before interacting.
     * @param blacklistedwords - Words to ignore in the interaction.
     * @returns Promise that resolves when the interaction is processed.
     */
    handleComponentInteraction(message, sessionid, timeout, blacklistedwords) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            const embedTitle = (_a = message.embeds[0]) === null || _a === void 0 ? void 0 : _a.title;
            const embedAuthor = (_c = (_b = message.embeds[0]) === null || _b === void 0 ? void 0 : _b.author) === null || _c === void 0 ? void 0 : _c.name;
            if (!embedTitle || blacklistedwords.includes(embedTitle) || blacklistedwords.includes(embedAuthor))
                return;
            yield (0, promises_1.setTimeout)(timeout);
            try {
                yield fetch('https://discord.com/api/v9/interactions', {
                    method: 'POST',
                    headers: {
                        Authorization: this.client.token,
                        "Content-Type": 'application/json'
                    },
                    body: JSON.stringify({
                        application_id: message.author.id,
                        channel_id: message.channel.id,
                        data: {
                            component_type: 2,
                            custom_id: message.components[0].components[0].customId
                        },
                        guild_id: (_d = message.guild) === null || _d === void 0 ? void 0 : _d.id,
                        message_flags: 0,
                        message_id: message.id,
                        type: 3,
                        session_id: sessionid
                    })
                });
                this.db.increment('/joins');
                this.emit('giveawayCreated', { url: message.url, embed: message.embeds[0], bot: message.author.id });
            }
            catch (error) {
                console.error("Error interacting with component:", error);
            }
        });
    }
    /**
     * Handles reacting to a message based on specified conditions.
     * @param message - The message to react to.
     * @param timeout - The delay before reacting.
     * @param blacklistedwords - Words to avoid in reactions.
     * @returns Promise that resolves when the reactions are handled.
     */
    handleReactions(message, timeout, blacklistedwords) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const embedTitle = (_a = message.embeds[0]) === null || _a === void 0 ? void 0 : _a.title;
            const embedAuthor = (_b = message.embeds[0]) === null || _b === void 0 ? void 0 : _b.author;
            if (!(!embedAuthor || !embedTitle) || blacklistedwords.includes(embedTitle))
                return;
            yield (0, promises_1.setTimeout)(timeout);
            try {
                for (const react of message.reactions.cache.values()) {
                    yield message.react(react.emoji);
                    this.db.increment('/joins');
                    this.emit('giveawayCreated', { url: message.url, embed: message.embeds[0], bot: message.author.id });
                }
            }
            catch (error) {
                console.error("Error reacting to message:", error);
            }
        });
    }
    //------------------------------------------------------------------------------------------------------------------------------------------------------//
    /**
     * Initiates the leveling process.
     * @param {string} [options.channel] - channel that the bot will spam in.
     * @param {boolean} [options.randomLetters] - Wether it's random letters or not.
     * @param {number} [options.time] - Timeout between each message.
     * @param {LevelingLanguage} [options.type] - Language "ar | eng"
     */
    leveling(options = { channel: '' }) {
        const { channel, randomLetters = false, time = 15000, type = 'eng' } = options;
        if (!channel) {
            console.log(chalk_1.default.bgRed.white.bold("\n⚠️  THE 'channel' PARAM IS A REQUIRED PARAMETER IN THE LEVELING FUNCTION\n"));
            return process.exit(0);
        }
        ;
        function makeid(length) {
            let result = "";
            let chars = type == 'eng' ? "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789" : "ابتثجحخدذرزسشصضطظعغفقكلمنهويء";
            let charslength = chars.length;
            for (let i = 0; i < length; i++) {
                result += chars.charAt(Math.floor(Math.random() * charslength));
            }
            return result;
        }
        this.client.on("ready", () => __awaiter(this, void 0, void 0, function* () {
            let mainChannel = yield this.client.channels.fetch(channel);
            let random = Math.floor(Math.random() * 15);
            if (random === 0)
                return;
            setInterval(() => __awaiter(this, void 0, void 0, function* () {
                let randomStr = Math.floor(Math.random() * (type == 'eng' ? languages_json_1.eng.length : languages_json_1.ar.length));
                yield mainChannel.send(randomLetters ? makeid(random) : (type == 'eng' ? languages_json_1.eng[randomStr] : languages_json_1.ar[randomStr]));
            }), time);
        }));
    }
    //------------------------------------------------------------------------------------------------------------------------------------------------------//
    /**
     * Initiates the VoiceStay process.
     * @param {string} [options.guild] - The guild
     * @param {string} [options.channel] - The channel
     */
    VoiceStay(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const { guild, channel, } = options;
            try {
                let ChannelToJoin = yield (yield this.client.guilds.fetch(guild)).channels.fetch(channel);
                if (ChannelToJoin === null || ChannelToJoin === void 0 ? void 0 : ChannelToJoin.isVoice()) {
                    const connectToChannel = () => __awaiter(this, void 0, void 0, function* () {
                        try {
                            const connection = yield this.client.voice.joinChannel(ChannelToJoin);
                            connection.on('disconnect', () => __awaiter(this, void 0, void 0, function* () {
                                yield connectToChannel();
                            }));
                            connection.on('failed', (error) => __awaiter(this, void 0, void 0, function* () {
                                if (error.message.includes('VOICE_CONNECTION_TIMEOUT')) {
                                    yield connectToChannel();
                                }
                            }));
                        }
                        catch (error) {
                            throw error;
                        }
                    });
                    yield connectToChannel();
                    setInterval(() => __awaiter(this, void 0, void 0, function* () {
                        if (!this.client.voice.connection) {
                            yield connectToChannel();
                        }
                    }), 5000);
                }
            }
            catch (e) {
                console.error('Error in VoiceStay:', e);
            }
        });
    }
}
module.exports = UserRelatedClass;
