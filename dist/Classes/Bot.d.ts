/// <reference types="node" />
import EventEmitter from "events";
import { Client } from "discord.js";
import { BroadCastOptions, MultiCastOptions } from "../Interfaces/BotInterfaces";
import Islam from "./Islam/Islam";
/**
 * Class representing a bot-related utility for broadcasting and multicasting messages in Discord guilds.
 * Extends the `EventEmitter` class to emit events at the end of broadcasts or multicasts.
 */
declare class BotRelatedClass extends EventEmitter {
    private client;
    quran: Islam;
    /**
     * Creates an instance of BotRelatedClass.
     * @param {Client} client - The Discord client instance.
     */
    constructor(client: Client);
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
    broadcast(options: BroadCastOptions): Promise<void>;
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
    MultiCast(options: MultiCastOptions): Promise<void>;
}
export = BotRelatedClass;
