"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const voice_1 = require("@discordjs/voice");
const play_dl_1 = __importDefault(require("play-dl"));
const spotify_web_api_node_1 = __importDefault(require("spotify-web-api-node"));
const googleapis_1 = require("googleapis");
const events_1 = require("events");
function isVoiceChannel(channel) {
    return channel.speakable !== undefined;
}
class Music extends events_1.EventEmitter {
    constructor(spotifyClientId, spotifyClientSecret, youtubeApiKey) {
        super();
        this.voiceConnection = null;
        this.audioPlayer = (0, voice_1.createAudioPlayer)();
        this.stopped = false;
        this.queue = [];
        this.isPlaying = false;
        this.nowPlaying = null;
        this.repeat = false;
        this.playlist = [];
        this.textChannel = null;
        this.spotifyApi = new spotify_web_api_node_1.default({
            clientId: spotifyClientId,
            clientSecret: spotifyClientSecret,
        });
        this.youtubeApiKey = youtubeApiKey;
        this.initializeSpotify();
        this.setupAudioPlayer();
    }
    async initializeSpotify() {
        try {
            const data = await this.spotifyApi.clientCredentialsGrant();
            this.spotifyApi.setAccessToken(data.body['access_token']);
        }
        catch (err) {
            this.emit('error', 'Something went wrong when retrieving an access token', err);
        }
    }
    setupAudioPlayer() {
        this.audioPlayer.on(voice_1.AudioPlayerStatus.Idle, () => {
            if (this.queue.length > 0) {
                const nextSong = this.queue.shift();
                if (nextSong) {
                    this.play(nextSong, this.textChannel);
                }
            }
        });
    }
    async joinChannel(channel) {
        if (!isVoiceChannel(channel)) {
            throw new Error('The channel is not a voice channel.');
        }
        this.voiceConnection = (0, voice_1.joinVoiceChannel)({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator,
        });
        this.voiceConnection.on(voice_1.VoiceConnectionStatus.Ready, () => {
            this.emit('connected', 'Connected to voice channel');
        });
        this.voiceConnection.on(voice_1.VoiceConnectionStatus.Disconnected, async () => {
            if (this.voiceConnection) {
                try {
                    await Promise.race([
                        (0, voice_1.entersState)(this.voiceConnection, voice_1.VoiceConnectionStatus.Signalling, 5000),
                        (0, voice_1.entersState)(this.voiceConnection, voice_1.VoiceConnectionStatus.Connecting, 5000),
                    ]);
                }
                catch (error) {
                    this.voiceConnection.destroy();
                    this.voiceConnection = null;
                }
            }
        });
        this.voiceConnection.subscribe(this.audioPlayer);
    }
    addPlaylist(url) {
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
    async play(url, textChannel, caller) {
        if (caller === 'skip') { }
        else if (this.isPlaying) {
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
            this.audioPlayer.on(voice_1.AudioPlayerStatus.Playing, () => {
                this.emit('playing', this.nowPlaying);
            });
            this.audioPlayer.on(voice_1.AudioPlayerStatus.Idle, () => {
                this.isPlaying = false;
                if (this.repeat && this.playlist.length > 0 && !this.stopped) {
                    this.play(this.nowPlaying, textChannel).catch(console.error);
                }
            });
        }
        catch (error) {
            this.emit('error', 'Error playing the track', error);
        }
    }
    stop() {
        this.audioPlayer.stop();
        this.playlist.length = 0;
        this.queue.length = 0;
        this.stopped = true;
    }
    skip() {
        if (this.queue.length > 0) {
            const nextSong = this.queue.shift();
            if (nextSong) {
                this.play(nextSong, this.textChannel, 'skip');
            }
        }
        else {
            this.textChannel?.send("There's nothing in the queue");
        }
    }
    async addToQueue(url) {
        if (this.isPlaying) {
            this.queue.push(url);
        }
        else {
            await this.play(url, this.textChannel);
        }
    }
    isSpotifyUrl(url) {
        return url.includes('spotify.com/track/');
    }
    async getSpotifyTrackUrl(url) {
        const trackId = this.extractSpotifyTrackId(url);
        const track = await this.spotifyApi.getTrack(trackId);
        return await this.getYouTubeUrlFromSpotifyTrack(track.body.name, track.body.artists[0].name);
    }
    extractSpotifyTrackId(url) {
        const regex = /spotify\.com\/track\/([a-zA-Z0-9]+)/;
        const match = url.match(regex);
        if (!match) {
            throw new Error('Invalid Spotify URL');
        }
        return match[1];
    }
    async getYouTubeUrlFromSpotifyTrack(trackName, artistName) {
        const searchTerm = `${trackName} ${artistName}`;
        const youtube = googleapis_1.google.youtube({
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
    async getResourceFromUrl(url) {
        if (play_dl_1.default.yt_validate(url) === 'video') {
            const stream = await play_dl_1.default.stream(url);
            return (0, voice_1.createAudioResource)(stream.stream, { inputType: stream.type });
        }
        else if (this.isSpotifyUrl(url)) {
            const trackUrl = await this.getSpotifyTrackUrl(url);
            const stream = await play_dl_1.default.stream(trackUrl);
            return (0, voice_1.createAudioResource)(stream.stream, { inputType: stream.type });
        }
        else {
            throw new Error('Invalid URL. Only YouTube and Spotify URLs are supported.');
        }
    }
}
exports.default = Music;
