import { EventEmitter } from "events";
import { APIButtonComponent, ActionRow, ActionRowBuilder, ButtonBuilder, ButtonComponent, ButtonComponentData, ButtonInteraction, ButtonStyle, Client, Interaction, InteractionButtonComponentData, Message, MessageActionRowComponent, TextChannel, Webhook } from "discord.js";
import { createRouletteGifImage, createRouletteImage, getRandomDarkHexCode, shuffleArray } from "../utils/roulette";
import path from "path";
import fs from "fs";

//TODO, Make more games, Make roulette using an image. Add function definitions and stuff


interface Player {
    id: string,
    username: string,
    avatarURL: string,
    color: string,
    number: number
}

class Games extends EventEmitter {
    private static players: Player[] = []; 
    private client: Client;
    private message: Message;

    constructor(client?: Client, message?: Message) {
        super();
        this.client = client as Client;
        this.message = message as Message;
        this.checkSetup(message as Message);
    }

    protected async setup({ channel, guild }: { channel: string | TextChannel, guild: string }): Promise<Webhook | undefined> {
        let webhook: Webhook | undefined;
        channel = this.client?.guilds.cache.get(guild)?.channels.cache.get(channel as string) as TextChannel;
        if (channel?.isTextBased() && !(await channel.fetchWebhooks()).find(n => n.name === 'Arab Tools Games Webhook')) {
            webhook = await channel.createWebhook({ name: 'Arab Tools Games Webhook', avatar: channel.guild.iconURL() || undefined });
        }
        return webhook;
    }

    private async checkSetup(message: Message) {
        if (message?.channel?.isTextBased() && !(await (message.channel as TextChannel)?.fetchWebhooks()).find(n => n.name === 'Arab Tools Games Webhook')) {
            throw new Error("Please run the Setup command before using the Games class.");
        }
    }

    private async addPlayer(player: Player, message: Message) {
        if (player && message) {
            Games.players.push(player);
            console.log(Games.players)
            const updatedEmbed = {
                title: "Roulette",
                description: `
                    How to play:
                    **1-** Choose the number that will represent you in the game.
                    **2-** The first game will start and the wheel will spin choosing a random player
                    **3-** If you're the chosen player, you'll get to kick someone from the game.
                    **4-** The player chosen to be kicked will be kicked and the game will continue till the last one is standing.
    
                    __Player Numbers :__
                    ${Games.players.map(player => `${player.number} : <@${player.id}>`).join("\n")}
                `
            };
            await message.edit({ embeds: [updatedEmbed] });
        }
    }
    public async handleInteraction(interaction: Interaction) {
        if (interaction.isButton()) {
            if (interaction.customId === 'join') {
                const existingPlayer = Games.players.find(plr => plr.id === interaction.user.id);
                if (existingPlayer) {
                    if (!interaction.replied) {
                        await interaction.reply({ content: "You're already in the game!", ephemeral: true });
                    }
                    return;
                }
    
                const player = {
                    id: interaction.user.id,
                    username: interaction.user.username,
                    avatarURL: interaction.user.avatarURL() as string,
                    color: getRandomDarkHexCode(),
                    number: Games.players.length + 1
                };
    
                await this.addPlayer(player, interaction.message);
                if (!interaction.replied) {
                    await interaction.reply({ content: "You've joined the game", ephemeral: true });
                }
            }
        }
    }
    public async roulette({ mentionEveryone = false, startingTimer = 30, maxPeople = 10, timerForPlayer = 10 }: { mentionEveryone?: boolean, startingTimer?: number, maxPeople?: number, timerForPlayer?: number | 30 }) {
        if (this.message?.author?.bot) return;
        if (timerForPlayer > 30) {
            throw new Error("Max Timer for Player is 30 Seconds.");
        }
        if (maxPeople > 30) {
            throw new Error("Max People for Roulette is 30.");
        }
    
        // const rows = [];
        // let actionRow = new ActionRowBuilder();
        // for (let i = 1; i <= maxPeople; i++) {
        //     const button = new ButtonBuilder()
        //         .setCustomId(`button_${i}`)
        //         .setLabel(`${i}`)
        //         .setStyle(ButtonStyle.Primary);
    
        //     actionRow.addComponents(button);
    
        //     if (i % 5 === 0 || i === maxPeople) {
        //         rows.push(actionRow);
        //         actionRow = new ActionRowBuilder();
        //     }
        // }
        const btn = new ButtonBuilder()
        .setCustomId('join')
        .setLabel("Join")
        .setStyle(ButtonStyle.Success)

        const row = new ActionRowBuilder().addComponents(btn);
        
        let embedMessage = await this.message?.channel?.send({
            embeds: [{
                title: "Roulette",
                description: `
                    How to play:
                    **1-** Choose the number that will represent you in the game.
                    **2-** The first game will start and the wheel will spin choosing a random player
                    **3-** If you're the chosen player, you'll get to kick someone from the game.
                    **4-** The player chosen to be kicked will be kicked and the game will continue till the last one is standing.
        
                    __Player Numbers :__
                    ${Games.players.map(player => `${player.number} : <@${player.id}>`).join("\n")}
                `
            }],
            components: [row as any]
        });
    
        const filter = (interaction: Interaction) => interaction.isButton();
        const collector = embedMessage.createMessageComponentCollector({ filter, time: timerForPlayer * 1000 });
    
        collector.on('collect', async interaction => {
            await this.handleInteraction(interaction);
        });

        collector.on('end', async collected => {
            // Disable the join button after the timer ends
            const disabledRow = new ActionRowBuilder().addComponents(
                btn.setDisabled(true)
            );
    
            await embedMessage.edit({
                components: [disabledRow as any]
            });
            

            let start = await this.startRoulette(this.message)
            await this.message.channel.send({
                content: `Winner: <@${start.winner.id}>`,
                files: [{
                    attachment: start.filePath,
                    name: 'roulette.gif'
                }]
            });
        });



}

    private async startRoulette(message: Message) {
        const shuffledPlayers = shuffleArray(Games.players);
        const {buffer, winner} = await createRouletteGifImage(shuffledPlayers, false, 15, message);
        const filePath = path.join(__dirname, 'roulette.gif');
        fs.writeFileSync(filePath, buffer);
        return {filePath, winner}
    }

}
export class Setup extends Games {
    private channel: string;
    private guild: string;

    constructor(channel: string, guild: string) {
        super();
        this.channel = channel;
        this.guild = guild;
        this.init();
    }

    private async init() {
        const webhook = await this.setup({ channel: this.channel, guild: this.guild });
        if (webhook) {
            this.emit("webhookCreated", webhook);
        } else {
            this.emit('webhookError', webhook);
        }
    }
}

export default Games;