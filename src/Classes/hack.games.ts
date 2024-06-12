import { EventEmitter  } from "events";
import { Client, Message } from "discord.js-selfbot-v13";
enum game {
    Roulette = "Roulette",
    XO = "XO",
    Mafia = "Mafia",
    Chairs = "Chairs",
    RPS = "Rock Paper Scissors"
}


class Games2 extends EventEmitter {
    private client: Client;
    constructor(client: Client) {
        super();
        this.client = client;
        this.DetectGame()
    };
    private isWebHook(message: Message): boolean {
        return message.hasOwnProperty('webhookId');
    }
    
    private async webhookOwner(message: Message): Promise<string | null> {
        if (this.isWebHook(message)) {
            return message?.applicationId;
        }
        return null;
    }
    
    private async checkWebhookAndOwner(message: Message): Promise<{is: boolean, owner: string | null}> {
        const is = this.isWebHook(message);
        const owner = is ? await this.webhookOwner(message) : null;
        return { is, owner };
    }
    

    private checkEmbed(message: Message): boolean {
        return message.embeds.length > 0 ? true : false;
    }
    private isInEnum(value: string, enumObj: object) {
        return Object.values(enumObj).includes(value)
    }

    private DetectGame() {
        let detectedGame;
        this.client.on("messageCreate", async(message: Message) => {
            if(message.guild?.id === '489424959270158356') return;
            console.log(await this.checkWebhookAndOwner(message))
            if((await this.checkWebhookAndOwner(message)).is) {
                if((await this.checkWebhookAndOwner(message)).owner === '995698729225027694') {
                    if(this.checkEmbed(message)) {
                        const embeds = message.embeds;
                        if(this.isInEnum(embeds[0].title as string, game)) {
                            detectedGame = embeds[0].title;
                        }
                    }
                }
            }
        })
        return detectedGame;
    }
}
export default Games2;
