// Music.d.ts

import { VoiceChannel, VoiceBasedChannel, TextChannel } from 'discord.js';
import { AudioPlayer, VoiceConnection } from '@discordjs/voice';
import SpotifyWebApi from 'spotify-web-api-node';
import { EventEmitter } from 'events';

declare function isVoiceChannel(channel: VoiceBasedChannel): channel is VoiceChannel;

declare class Music extends EventEmitter {
  public voiceConnection: VoiceConnection | null;
  private audioPlayer: AudioPlayer;
  private spotifyApi: SpotifyWebApi;
  private youtubeApiKey: string;
  private stopped: boolean;

  public queue: string[];
  public isPlaying: boolean;
  public nowPlaying: string | null;
  public repeat: boolean;
  public playlist: string[];
  public textChannel: TextChannel | null;

  constructor(spotifyClientId: string, spotifyClientSecret: string, youtubeApiKey: string);

  private initializeSpotify(): Promise<void>;
  private setupAudioPlayer(): void;

  public joinChannel(channel: VoiceBasedChannel): Promise<void>;
  private addPlaylist(url: string): void;

  /**
   * Play a song from a given URL.
   * @param {string} url - The URL of the song.
   * @param {TextChannel} textChannel - The text channel for sending messages.
   * @param {string} [caller] - The caller of the play function.
   * @returns {Promise<void>}
   * @author Sphinx
   */
  public play(url: string, textChannel: TextChannel, caller?: string): Promise<void>;

  public stop(): void;
  public skip(): void;
  public addToQueue(url: string): Promise<void>;

  private isSpotifyUrl(url: string): boolean;
  private getSpotifyTrackUrl(url: string): Promise<string>;
  private extractSpotifyTrackId(url: string): string;
  private getYouTubeUrlFromSpotifyTrack(trackName: string, artistName: string): Promise<string>;
  private getResourceFromUrl(url: string): Promise<any>;
}

export default Music;
