import { VoiceChannel, VoiceBasedChannel, TextChannel } from 'discord.js';
import {
  createAudioPlayer,
  createAudioResource,
  joinVoiceChannel,
  AudioPlayer,
  VoiceConnection,
  VoiceConnectionStatus,
  entersState,
  AudioPlayerStatus
} from '@discordjs/voice';
import play from 'play-dl';
import SpotifyWebApi from 'spotify-web-api-node';
import { google, youtube_v3 } from 'googleapis';
import { EventEmitter } from 'events';

function isVoiceChannel(channel: VoiceBasedChannel): channel is VoiceChannel {
  return (channel as VoiceChannel).speakable !== undefined;
}

//TEST PUSH TO NPM

// TODO, maybe use lavalink, if can't just remake it in other package
// TODO, make music better with more options each week.

class Music extends EventEmitter {
  public voiceConnection: VoiceConnection | null = null;
  private audioPlayer: AudioPlayer = createAudioPlayer();
  private spotifyApi: SpotifyWebApi;
  private youtubeApiKey: string;
  private stopped: boolean = false;

  public queue: string[] = [];
  public isPlaying: boolean = false;
  public nowPlaying: string | null = null;
  public repeat: boolean = false;
  public playlist: string[] = [];
  public textChannel: TextChannel | null = null;

  constructor(spotifyClientId: string, spotifyClientSecret: string, youtubeApiKey: string) {
    super();
    this.spotifyApi = new SpotifyWebApi({
      clientId: spotifyClientId,
      clientSecret: spotifyClientSecret,
    });
    this.youtubeApiKey = youtubeApiKey;

    this.initializeSpotify();
    this.setupAudioPlayer();
  }

  /**
   * Initialize Spotify API by retrieving an access token.
   * @returns {Promise<void>}
   */
  private async initializeSpotify(): Promise<void> {
    try {
      const data = await this.spotifyApi.clientCredentialsGrant();
      this.spotifyApi.setAccessToken(data.body['access_token']);
    } catch (err) {
      this.emit('error', 'Something went wrong when retrieving an access token', err);
    }
  }

  /**
   * Setup the audio player to handle events when tracks are idle or playing.
   */
  private setupAudioPlayer(): void {
    this.audioPlayer.on(AudioPlayerStatus.Idle, () => {
      if (this.queue.length > 0) {
        const nextSong = this.queue.shift();
        if (nextSong) {
          this.play(nextSong, this.textChannel as TextChannel);
        }
      }
    });
  }

  /**
   * Join a voice channel.
   * @param {VoiceBasedChannel} channel - The voice channel to join.
   * @returns {Promise<void>}
   */
  public async joinChannel(channel: VoiceBasedChannel): Promise<void> {
    if (!isVoiceChannel(channel)) {
      throw new Error('The channel is not a voice channel.');
    }

    this.voiceConnection = joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      adapterCreator: channel.guild.voiceAdapterCreator,
    });

    this.voiceConnection.on(VoiceConnectionStatus.Ready, () => {
      this.emit('connected', 'Connected to voice channel');
    });

    this.voiceConnection.on(VoiceConnectionStatus.Disconnected, async () => {
      if (this.voiceConnection) {
        try {
          await Promise.race([
            entersState(this.voiceConnection, VoiceConnectionStatus.Signalling, 5000),
            entersState(this.voiceConnection, VoiceConnectionStatus.Connecting, 5000),
          ]);
        } catch (error) {
          this.voiceConnection.destroy();
          this.voiceConnection = null;
        }
      }
    });

    this.voiceConnection.subscribe(this.audioPlayer);
  }

  /**
   * Add a URL to the playlist.
   * @param {string} url - The URL to add to the playlist.
   */
  private addPlaylist(url: string): void {
    if (!this.playlist.includes(url)) {
      this.playlist.push(url);
    }
  }

  /**
   * Play a song from a given URL.
   * @param {string} url - The URL of the song.
   * @param {TextChannel} textChannel - The text channel for sending messages.
   * @param {string} caller - The caller of the play function.
   * @returns {Promise<void>}
   * @author Sphinx
   */
  public async play(url: string, textChannel: TextChannel, caller?: string): Promise<void> {
    if (caller === 'skip') {
      // handle skip logic
    } else if (this.isPlaying) {
      this.addPlaylist(url);
      return this.addToQueue(url);
    }

    this.textChannel = textChannel;
    if (!this.voiceConnection) {
      throw new Error('Bot is not connected to a voice channel.');
    }

    try {
      const resource = await this.getResourceFromUrl(url);
      this.audioPlayer.play(resource);
      this.isPlaying = true;
      this.nowPlaying = url;
      this.addPlaylist(url);

      this.audioPlayer.on(AudioPlayerStatus.Playing, () => {
        this.emit('playing', this.nowPlaying);
      });

      this.audioPlayer.on(AudioPlayerStatus.Idle, () => {
        this.isPlaying = false;
        if (this.repeat && this.playlist.length > 0 && !this.stopped) {
          this.play(this.nowPlaying!, textChannel).catch(console.error);
        }
      });
    } catch (error) {
      this.emit('error', 'Error playing the track', error);
    }
  }

  /**
   * Stop playing music and clear the queue.
   */
  public stop(): void {
    this.audioPlayer.stop();
    this.playlist.length = 0;
    this.queue.length = 0;
    this.stopped = true;
  }

  /**
   * Skip the currently playing song.
   */
  public skip(): void {
    if (this.queue.length > 0) {
      const nextSong = this.queue.shift();
      if (nextSong) {
        this.play(nextSong, this.textChannel!, 'skip');
      }
    } else {
      this.textChannel?.send("There's nothing in the queue");
    }
  }

  /**
   * Add a song to the queue.
   * @param {string} url - The URL of the song to add to the queue.
   * @returns {Promise<void>}
   */
  public async addToQueue(url: string): Promise<void> {
    if (this.isPlaying) {
      this.queue.push(url);
    } else {
      await this.play(url, this.textChannel!);
    }
  }

  /**
   * Check if a URL is a Spotify track URL.
   * @param {string} url - The URL to check.
   * @returns {boolean}
   */
  private isSpotifyUrl(url: string): boolean {
    return url.includes('spotify.com/track/');
  }

  /**
   * Get a YouTube URL from a Spotify track URL.
   * @param {string} url - The Spotify track URL.
   * @returns {Promise<string>}
   */
  private async getSpotifyTrackUrl(url: string): Promise<string> {
    const trackId = this.extractSpotifyTrackId(url);
    const track = await this.spotifyApi.getTrack(trackId);
    return await this.getYouTubeUrlFromSpotifyTrack(track.body.name, track.body.artists[0].name);
  }

  /**
   * Extract the track ID from a Spotify URL.
   * @param {string} url - The Spotify URL.
   * @returns {string}
   */
  private extractSpotifyTrackId(url: string): string {
    const regex = /spotify\.com\/track\/([a-zA-Z0-9]+)/;
    const match = url.match(regex);
    if (!match) {
      throw new Error('Invalid Spotify URL');
    }
    return match[1];
  }

  /**
   * Get a YouTube URL from a Spotify track's name and artist.
   * @param {string} trackName - The name of the track.
   * @param {string} artistName - The name of the artist.
   * @returns {Promise<string>}
   */

  private async getYouTubeUrlFromSpotifyTrack(trackName: string, artistName: string): Promise<string> {
    const searchTerm = `${trackName} ${artistName}`;
    const youtube = google.youtube({
      version: 'v3',
      auth: this.youtubeApiKey,
    });

    const searchResponse = await youtube.search.list({
      part: ['id'],
      q: searchTerm,
      type: ['video'],
      maxResults: 1,
    });

    const videoId = searchResponse.data.items?.[0]?.id?.videoId;

    if (!videoId) {
      throw new Error('No video found on YouTube.');
    }

    return `https://www.youtube.com/watch?v=${videoId}`;
  }

  private async getResourceFromUrl(url: string) {
    if (play.yt_validate(url) === 'video') {
      const stream = await play.stream(url);
      return createAudioResource(stream.stream, { inputType: stream.type });
    } else if (this.isSpotifyUrl(url)) {
      const trackUrl = await this.getSpotifyTrackUrl(url);
      const stream = await play.stream(trackUrl);
      return createAudioResource(stream.stream, { inputType: stream.type });
    } else {
      throw new Error('Invalid URL. Only YouTube and Spotify URLs are supported.');
    }
  }
}

export default Music;
