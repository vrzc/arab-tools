"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const voice_1 = require("@discordjs/voice");
const suras_json_1 = __importDefault(require("../../utils/JSON/suras.json"));
/**
 * Levenshtein distance algorithm to compute the minimum number of edits needed to change one string into another.
 * @param {string} a - The first string.
 * @param {string} b - The second string.
 * @returns {number} - The Levenshtein distance between the two strings.
 */
function levenshtein(a, b) {
    const tmp = [];
    for (let i = 0; i <= a.length; i++) {
        tmp[i] = [i];
    }
    for (let j = 0; j <= b.length; j++) {
        tmp[0][j] = j;
    }
    for (let i = 1; i <= a.length; i++) {
        for (let j = 1; j <= b.length; j++) {
            const cost = a[i - 1] === b[j - 1] ? 0 : 1;
            tmp[i][j] = Math.min(tmp[i - 1][j] + 1, tmp[i][j - 1] + 1, tmp[i - 1][j - 1] + cost);
        }
    }
    return tmp[a.length][b.length];
}
/**
 * Class for interacting with Quran suras and managing audio playback.
 */
class Quran {
    /**
     * Creates an instance of the Quran class with an audio player.
     */
    constructor() {
        this.audioPlayer = (0, voice_1.createAudioPlayer)();
    }
    /**
     * Returns all the suras in the Quran.
     * @returns {Array} - An array of all suras.
     */
    returnAllSuras() {
        return suras_json_1.default;
    }
    /**
     * Finds a sura by its name, with an option to use Levenshtein distance for fuzzy matching.
     * @param {string} name - The name of the sura to search for.
     * @param {boolean} [useLevenshtein=false] - Whether to use fuzzy matching.
     * @returns {Sura | null} - The found sura or null if no match is found.
     */
    findSuraFromName(name, useLevenshtein = false) {
        let closestKey = null;
        let closestDistance = Infinity;
        let suraTobeFound = null;
        for (const key in suras_json_1.default) {
            if (suras_json_1.default.hasOwnProperty(key)) {
                const sura = suras_json_1.default[key];
                if (useLevenshtein) {
                    const engDistance = levenshtein(sura.eng.toLowerCase(), name.toLowerCase());
                    const arDistance = levenshtein(sura.ar.toLowerCase(), name.toLowerCase());
                    const minDistance = Math.min(engDistance, arDistance);
                    if (minDistance < closestDistance) {
                        closestDistance = minDistance;
                        closestKey = Object.assign({ number: key }, suras_json_1.default[key]);
                    }
                }
                else {
                    if (sura.eng === name || sura.ar === name) {
                        suraTobeFound = Object.assign({ number: key }, suras_json_1.default[key]);
                    }
                }
            }
        }
        return useLevenshtein ? closestKey : suraTobeFound;
    }
    /**
     * Finds a sura by its number.
     * @param {Object} id - An object containing the sura number.
     * @returns {Sura} - The sura associated with the given number.
     */
    findSuraFromNumber(id) {
        return suras_json_1.default[String(id === null || id === void 0 ? void 0 : id.number).padStart(3, '0')];
    }
    /**
     * Checks if a string is a valid number.
     * @param {string} str - The string to check.
     * @returns {boolean} - True if the string is a number, false otherwise.
     */
    isNumber(str) {
        return /^[+-]?\d+(\.\d+)?$/.test(str);
    }
    /**
     * Plays the audio of a sura by its name or number.
     * @param {string | number} suraName - The name or number of the sura to play.
     * @param {VoiceConnection} voiceConnection - The voice connection to play the audio in.
     * @param {boolean} [useLevenshtein=false] - Whether to use fuzzy matching.
     * @returns {Promise<void>} - A promise that resolves when the sura is played.
     * @throws {Error} - If the sura cannot be found.
     */
    play(suraName_1, voiceConnection_1) {
        return __awaiter(this, arguments, void 0, function* (suraName, voiceConnection, useLevenshtein = false) {
            let sura;
            let url = null;
            if (typeof suraName === "string") {
                if (this.isNumber(suraName)) {
                    sura = this.findSuraFromName(this.findSuraFromNumber({ number: suraName }).ar, useLevenshtein);
                }
                else {
                    sura = this.findSuraFromName(suraName, useLevenshtein);
                }
            }
            else if (typeof suraName === "number") {
                sura = this.findSuraFromName(this.findSuraFromNumber({ number: suraName }).ar, useLevenshtein);
            }
            if (!sura) {
                throw new Error("Sura not found");
            }
            url = `https://server8.mp3quran.net/afs/${sura.number}.mp3`;
            const resource = (0, voice_1.createAudioResource)(url);
            this.audioPlayer.play(resource);
            voiceConnection.subscribe(this.audioPlayer);
        });
    }
    /**
     * Stops the audio playback and destroys the voice connection.
     * @param {VoiceConnection} voiceConnection - The voice connection to destroy.
     * @returns {Promise<void>} - A promise that resolves when the voice connection is destroyed.
     */
    stop(voiceConnection) {
        return __awaiter(this, void 0, void 0, function* () {
            return voiceConnection.destroy();
        });
    }
}
module.exports = Quran;
