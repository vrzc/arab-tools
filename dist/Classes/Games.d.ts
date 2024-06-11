/// <reference types="node" />
import { EventEmitter } from "events";
import { Client } from "discord.js-selfbot-v13";
declare class Games extends EventEmitter {
    private client;
    constructor(client: Client);
    private isWebHook;
    private webhookOwner;
    private checkWebhookAndOwner;
    private checkEmbed;
    private isInEnum;
    private DetectGame;
}
export default Games;
