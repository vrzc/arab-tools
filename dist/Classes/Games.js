"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
var game;
(function (game) {
    game["Roulette"] = "Roulette";
    game["XO"] = "XO";
    game["Mafia"] = "Mafia";
    game["Chairs"] = "Chairs";
    game["RPS"] = "Rock Paper Scissors";
})(game || (game = {}));
class Games extends events_1.EventEmitter {
    constructor(client) {
        super();
        this.client = client;
        this.DetectGame();
    }
    ;
    isWebHook(message) {
        return message.hasOwnProperty('webhookId');
    }
    async webhookOwner(message) {
        if (this.isWebHook(message)) {
            return message?.applicationId;
        }
        return null;
    }
    async checkWebhookAndOwner(message) {
        const is = this.isWebHook(message);
        const owner = is ? await this.webhookOwner(message) : null;
        return { is, owner };
    }
    checkEmbed(message) {
        return message.embeds.length > 0 ? true : false;
    }
    isInEnum(value, enumObj) {
        return Object.values(enumObj).includes(value);
    }
    DetectGame() {
        let detectedGame;
        this.client.on("messageCreate", async (message) => {
            if (message.guild?.id === '489424959270158356')
                return;
            console.log(await this.checkWebhookAndOwner(message));
            if ((await this.checkWebhookAndOwner(message)).is) {
                if ((await this.checkWebhookAndOwner(message)).owner === '995698729225027694') {
                    if (this.checkEmbed(message)) {
                        const embeds = message.embeds;
                        if (this.isInEnum(embeds[0].title, game)) {
                            detectedGame = embeds[0].title;
                        }
                    }
                }
            }
        });
        return detectedGame;
    }
}
exports.default = Games;
