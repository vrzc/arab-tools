import { Client } from "discord.js";
export interface BroadCastOptions {
    guildID: string;
    message: string;
    timeout?: number;
    mention?: boolean;
    logInfo?: boolean;
}
export interface MultiCastOptions {
    guildID: string;
    message: string;
    bots: Client[];
    timeout?: number;
    mention?: boolean;
    logInfo?: boolean;
}
