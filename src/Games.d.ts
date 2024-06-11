import { EventEmitter } from "events";
import { Client, GuildChannel, Message, TextChannel, Webhook } from "discord.js";

export declare interface Player {
    id: string,
    username: string,
    avatarURL: string,
    color: string,
    number: number
}

declare class Games extends EventEmitter {
    private static players: Player[];
    private  client: Client;
    private message: Message;

    constructor(client?: Client, message?: Message);

    protected setup({ channel, guild }: {channel: string | TextChannel, guild: string | GuildChannel}): Promise<Webhook | undefined>;
    private checkSetup(message: Message): void;
    private addPlayer(player: Player, message: Message, number: number): void;

    public roulette({ mentionEveryone, startingTimer, maxPeople, timerForPlayer }: { mentionEveryone?: boolean, startingTimer?: number, maxPeople?: number | 30, timerForPlayer?: number | 30 }): void;
}

declare class Setup extends Games {
    private channel: string;
    private guild: string;

    constructor(channel: string, guild: string);
    
    private init(): void;
}
