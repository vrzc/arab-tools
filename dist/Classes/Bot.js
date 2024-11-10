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
const chalk_1 = __importDefault(require("chalk"));
const Islam_1 = __importDefault(require("./Islam/Islam"));
/**
 * Class representing a bot-related utility for broadcasting and multicasting messages in Discord guilds.
 * Extends the `EventEmitter` class to emit events at the end of broadcasts or multicasts.
 */
class BotRelatedClass extends events_1.default {
    /**
     * Creates an instance of BotRelatedClass.
     * @param {Client} client - The Discord client instance.
     */
    constructor(client) {
        super();
        this.client = client;
        this.quran = new Islam_1.default();
    }
    /**
     * Broadcasts a message to all members of a specified guild.
     * @param {BroadCastOptions} options - Options for the broadcast.
     * @param {string} options.guildID - The ID of the guild to broadcast to.
     * @param {string} options.message - The message to send.
     * @param {boolean} [options.mention=true] - Whether to mention each user in the message.
     * @param {number} [options.timeout=1000] - Time to wait before sending each message.
     * @param {boolean} [options.logInfo=false] - Whether to log information about the message sending status.
     * @returns {Promise<void>} A promise that resolves when the broadcast is complete.
     * @throws {Error} If required options are missing or invalid.
     */
    broadcast(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const { guildID, message, mention = true, timeout = 1000, logInfo = false } = options;
            if (!guildID) {
                console.log(chalk_1.default.bgBlack.white.bold("Please add this guildID option\n"));
                process.exit(0);
            }
            if (!message) {
                console.log(chalk_1.default.bgBlack.white.bold("Please add the 'message' option\n"));
                process.exit(0);
            }
            const guild = yield this.client.guilds.fetch(guildID);
            if (!guild) {
                console.log(chalk_1.default.bgBlack.white.bold("No guild was found with that ID\n"));
                process.exit(0);
            }
            let successLength = 0;
            let failedLength = 0;
            let startTime = Date.now();
            let membersFetched = yield guild.members.fetch();
            let membersFiltred = membersFetched.filter((m) => !m.user.bot).map((m) => { return m; });
            let data;
            for (let i = 0; i < membersFiltred.length; i++) {
                let member = membersFiltred[i];
                (0, promises_1.setTimeout)(timeout);
                yield member.send({
                    content: `${message} \n ${mention ? member : ''}`
                }).then(_ => {
                    successLength++;
                    logInfo ? console.log("Sent to ", member.user.displayName) : '';
                }).catch(_ => {
                    logInfo ? console.log("Failed to send to ", member.user.displayName) : '';
                    failedLength++;
                });
                if (i == membersFiltred.length - 1) {
                    let endTime = Date.now();
                    let duration = endTime - startTime;
                    data = { guildID, successLength, failedLength, duration };
                }
            }
            return data ? data : null;
        });
    }
    /**
     * Multicasts a message to all members of a specified guild, using multiple bots to send the message.
     * @param {MultiCastOptions} options - Options for the multicasting process.
     * @param {string} options.guildID - The ID of the guild to multicast to.
     * @param {string} options.message - The message to send.
     * @param {Client[]} options.bots - The array of bots to use for sending the message.
     * @param {boolean} [options.mention=true] - Whether to mention each user in the message.
     * @param {number} [options.timeout=1000] - Time to wait before sending each message.
     * @param {boolean} [options.logInfo=false] - Whether to log information about the message sending status.
     * @returns {Promise<void>} A promise that resolves when the multicast is complete.
     * @throws {Error} If required options are missing or invalid.
     */
    MultiCast(options) {
        return __awaiter(this, void 0, void 0, function* () {
            var { guildID, message, bots, mention = true, timeout = 1000, logInfo = false } = options;
            if (!guildID) {
                console.log(chalk_1.default.bgBlack.white.bold("Please add this guildID option\n"));
            }
            if (!message) {
                console.log(chalk_1.default.bgBlack.white.bold("Please add the 'message' option\n"));
                process.exit(0);
            }
            if (!bots || bots.length == 0) {
                console.log(chalk_1.default.bgBlack.white.bold("Please add the 'bots' option\n"));
                process.exit(0);
            }
            if (bots.length == 1) {
                console.log(chalk_1.default.bgBlack.white.bold("Please add at least 2 bots in option\n"));
                process.exit(0);
            }
            const guild = yield this.client.guilds.fetch(guildID);
            if (!guild) {
                console.log(chalk_1.default.bgBlack.white.bold("No guild was found with that ID\n"));
                process.exit(0);
            }
            let successLength = 0;
            let failedLength = 0;
            let startTime = Date.now();
            let membersFetched = yield guild.members.fetch();
            let membersFiltred = membersFetched.filter((m) => !m.user.bot).map((m) => { return m; });
            const FilterdBots = bots.filter((m) => m.guilds.cache.get(guildID));
            if (FilterdBots.length < 2) {
                console.log(chalk_1.default.bgBlack.white.bold("Please add bots to your server first\n"));
                process.exit(0);
            }
            bots = FilterdBots;
            for (let i = 0; i < membersFiltred.length; i++) {
                const member = membersFiltred[i];
                const bot = bots[Math.floor(Math.random() * bots.length)];
                const user = bot.users.cache.get(member.user.id);
                (0, promises_1.setTimeout)(timeout);
                yield user.send({
                    content: `${message} \n ${mention ? member : ''}`
                }).then(_ => {
                    var _a;
                    successLength++;
                    logInfo ? console.log("Sent to ", member.user.displayName) : '', 'With Bot ', `${(_a = bot.user) === null || _a === void 0 ? void 0 : _a.username}`;
                }).catch(_ => {
                    var _a;
                    logInfo ? console.log("Failed Sent to ", member.user.displayName) : '', 'With Bot ', `${(_a = bot.user) === null || _a === void 0 ? void 0 : _a.username}`;
                    failedLength++;
                });
                if (i == membersFiltred.length - 1) {
                    let endTime = Date.now();
                    let duration = endTime - startTime;
                    this.emit('MultiCastEnd', { guildID, successLength, failedLength, duration, bots });
                }
            }
        });
    }
}
module.exports = BotRelatedClass;
