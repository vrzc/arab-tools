/// <reference types="node" />
import EventEmitter from "events";
import { Client } from "discord.js-selfbot-v13";
import { AutoReactionOptions, LevelingOptions, VoiceStayOptions } from "../Interfaces/UserInterfaces";
/**
 * Class for handling user-related auto-reactions and leveling interactions.
 * @extends EventEmitter
 */
declare class UserRelatedClass extends EventEmitter {
    private client;
    private db;
    /**
     * Initializes a new instance of UserRelatedClass.
     * @param client - The Discord client instance.
     */
    constructor(client: Client);
    /**
     * Checks if the client has joined a specified server.
     * @param serverid - The server ID to check.
     * @returns Promise that resolves if the client has joined the server; otherwise, exits the process.
     */
    private checkServerJoin;
    /**
     * Verifies if the client is a member of the specified server.
     * @param serverid - The ID of the server to check.
     * @returns Promise that resolves to true if the client is a member; otherwise, false.
     */
    private hasJoined;
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
    autoreaction(options?: AutoReactionOptions): Promise<void>;
    /**
     * @param message - The message indicating a win.
     * @param ownerId - The owner ID.
     * @returns Promise that resolves when the win is processed.
     */
    private handleWin;
    /**
     * Handles component interactions in messages.
     * @param message - The message containing components.
     * @param sessionid - The session ID for interaction.
     * @param timeout - The delay before interacting.
     * @param blacklistedwords - Words to ignore in the interaction.
     * @returns Promise that resolves when the interaction is processed.
     */
    private handleComponentInteraction;
    /**
     * Handles reacting to a message based on specified conditions.
     * @param message - The message to react to.
     * @param timeout - The delay before reacting.
     * @param blacklistedwords - Words to avoid in reactions.
     * @returns Promise that resolves when the reactions are handled.
     */
    private handleReactions;
    /**
     * Initiates the leveling process.
     * @param {string} [options.channel] - channel that the bot will spam in.
     * @param {boolean} [options.randomLetters] - Wether it's random letters or not.
     * @param {number} [options.time] - Timeout between each message.
     * @param {LevelingLanguage} [options.type] - Language "ar | eng"
     */
    leveling(options?: LevelingOptions): void;
    /**
     * Initiates the VoiceStay process.
     * @param {string} [options.guild] - The guild
     * @param {string} [options.channel] - The channel
     */
    VoiceStay(options: VoiceStayOptions): Promise<void>;
}
export = UserRelatedClass;
