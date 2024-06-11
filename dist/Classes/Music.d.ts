/// <reference types="node" />
import { VoiceBasedChannel, TextChannel } from 'discord.js';
import { VoiceConnection } from '@discordjs/voice';
import { EventEmitter } from 'events';
declare class Music extends EventEmitter {
    voiceConnection: VoiceConnection | null;
    private audioPlayer;
    private spotifyApi;
    private youtubeApiKey;
    private stopped;
    queue: string[];
    isPlaying: boolean;
    nowPlaying: string | null;
    repeat: boolean;
    playlist: string[];
    textChannel: TextChannel | null;
    constructor(spotifyClientId: string, spotifyClientSecret: string, youtubeApiKey: string);
    private initializeSpotify;
    private setupAudioPlayer;
    joinChannel(channel: VoiceBasedChannel): Promise<void>;
    private addPlaylist;
    /**
     * Play a song from a given URL.
     * @param {string} url - The URL of the song.
     * @param {TextChannel} textChannel - The text channel for sending messages.
     * @param {string} caller - The caller of the play function.
     * @returns {Promise<void>}
     * @author Sphinx
     */
    play(url: string, textChannel: TextChannel, caller?: string): Promise<void>;
    stop(): void;
    skip(): void;
    addToQueue(url: string): Promise<void>;
    private isSpotifyUrl;
    private getSpotifyTrackUrl;
    private extractSpotifyTrackId;
    private getYouTubeUrlFromSpotifyTrack;
    private getResourceFromUrl;
}
export default Music;
