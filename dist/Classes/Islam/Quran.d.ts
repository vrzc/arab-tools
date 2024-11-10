import { AudioPlayer, VoiceConnection } from "@discordjs/voice";
/**
 * Class for interacting with Quran suras and managing audio playback.
 */
declare class Quran {
    audioPlayer: AudioPlayer;
    /**
     * Creates an instance of the Quran class with an audio player.
     */
    constructor();
    /**
     * Returns all the suras in the Quran.
     * @returns {Array} - An array of all suras.
     */
    returnAllSuras(): {
        "001": {
            eng: string;
            ar: string;
        };
        "002": {
            eng: string;
            ar: string;
        };
        "003": {
            eng: string;
            ar: string;
        };
        "004": {
            eng: string;
            /**
             * Levenshtein distance algorithm to compute the minimum number of edits needed to change one string into another.
             * @param {string} a - The first string.
             * @param {string} b - The second string.
             * @returns {number} - The Levenshtein distance between the two strings.
             */
            ar: string;
        };
        "005": {
            eng: string;
            ar: string;
        };
        "006": {
            eng: string;
            ar: string;
        };
        "007": {
            eng: string;
            ar: string;
        };
        "008": {
            eng: string;
            ar: string;
        };
        "009": {
            eng: string;
            ar: string;
        };
        "010": {
            eng: string;
            ar: string;
        };
        "011": {
            eng: string;
            ar: string;
        };
        "012": {
            eng: string;
            ar: string;
        };
        "013": {
            eng: string;
            ar: string;
        };
        "014": {
            eng: string;
            ar: string;
        };
        "015": {
            eng: string;
            ar: string;
        };
        "016": {
            eng: string;
            ar: string;
        };
        "017": {
            eng: string;
            ar: string;
        };
        "018": {
            eng: string;
            ar: string;
        };
        "019": {
            eng: string;
            ar: string;
        };
        "020": {
            eng: string;
            ar: string;
        };
        "021": {
            eng: string;
            ar: string;
        };
        "022": {
            eng: string;
            ar: string;
        };
        "023": {
            eng: string;
            ar: string;
        };
        "024": {
            eng: string;
            ar: string;
        };
        "025": {
            eng: string;
            ar: string;
        };
        "026": {
            eng: string;
            ar: string;
        };
        "027": {
            eng: string;
            ar: string;
        };
        "028": {
            eng: string;
            ar: string;
        };
        "029": {
            eng: string;
            ar: string;
        };
        "030": {
            eng: string;
            ar: string;
        };
        "031": {
            eng: string;
            ar: string;
        };
        "032": {
            eng: string;
            ar: string;
        };
        "033": {
            eng: string;
            ar: string;
        };
        "034": {
            eng: string;
            ar: string;
        };
        "035": {
            eng: string;
            ar: string;
        };
        "036": {
            eng: string;
            ar: string;
        };
        "037": {
            eng: string;
            ar: string;
        };
        "038": {
            eng: string;
            ar: string;
        };
        "039": {
            eng: string;
            ar: string;
        };
        "040": {
            eng: string;
            ar: string;
        };
        "041": {
            eng: string;
            ar: string;
        };
        "042": {
            eng: string;
            ar: string;
        };
        "043": {
            eng: string;
            ar: string;
        };
        "044": {
            eng: string;
            ar: string;
        };
        "045": {
            eng: string;
            ar: string;
        };
        "046": {
            eng: string;
            ar: string;
        };
        "047": {
            eng: string;
            ar: string;
        };
        "048": {
            eng: string;
            ar: string;
        };
        "049": {
            eng: string;
            ar: string;
        };
        "050": {
            eng: string;
            ar: string;
        };
        "051": {
            eng: string;
            ar: string;
        };
        "052": {
            eng: string;
            /**
             * Finds a sura by its number.
             * @param {Object} id - An object containing the sura number.
             * @returns {Sura} - The sura associated with the given number.
             */
            ar: string;
        };
        "053": {
            eng: string;
            ar: string;
        };
        "054": {
            eng: string;
            ar: string;
        };
        "055": {
            eng: string;
            ar: string;
        };
        "056": {
            eng: string;
            ar: string;
        };
        "057": {
            eng: string;
            ar: string;
        };
        "058": {
            eng: string;
            ar: string;
        };
        "059": {
            eng: string;
            ar: string;
        };
        "060": {
            eng: string;
            ar: string;
        };
        "061": {
            eng: string;
            ar: string;
        };
        "062": {
            eng: string;
            ar: string;
        };
        /**
         * Plays the audio of a sura by its name or number.
         * @param {string | number} suraName - The name or number of the sura to play.
         * @param {VoiceConnection} voiceConnection - The voice connection to play the audio in.
         * @param {boolean} [useLevenshtein=false] - Whether to use fuzzy matching.
         * @returns {Promise<void>} - A promise that resolves when the sura is played.
         * @throws {Error} - If the sura cannot be found.
         */
        "063": {
            eng: string;
            ar: string;
        };
        "064": {
            eng: string;
            ar: string;
        };
        "065": {
            eng: string;
            ar: string;
        };
        "066": {
            eng: string;
            ar: string;
        };
        "067": {
            eng: string;
            ar: string;
        };
        "068": {
            eng: string;
            ar: string;
        };
        "069": {
            eng: string;
            ar: string;
        };
        "070": {
            eng: string;
            ar: string;
        };
        "071": {
            eng: string;
            ar: string;
        };
        "072": {
            eng: string;
            ar: string;
        };
        "073": {
            eng: string;
            ar: string;
        };
        "074": {
            eng: string;
            ar: string;
        };
        "075": {
            eng: string;
            ar: string;
        };
        "076": {
            eng: string;
            ar: string;
        };
        "077": {
            eng: string;
            ar: string;
        };
        "078": {
            eng: string;
            ar: string;
        };
        "079": {
            eng: string;
            ar: string;
        };
        "080": {
            eng: string;
            ar: string;
        };
        "081": {
            eng: string;
            ar: string;
        };
        "082": {
            eng: string;
            ar: string;
        };
        "083": {
            eng: string;
            ar: string;
        };
        "084": {
            eng: string;
            ar: string;
        };
        "085": {
            eng: string;
            ar: string;
        };
        "086": {
            /**
             * Stops the audio playback and destroys the voice connection.
             * @param {VoiceConnection} voiceConnection - The voice connection to destroy.
             * @returns {Promise<void>} - A promise that resolves when the voice connection is destroyed.
             */
            eng: string;
            ar: string;
        };
        "087": {
            eng: string;
            ar: string;
        };
        "088": {
            eng: string;
            ar: string;
        };
        "089": {
            eng: string;
            ar: string;
        };
        "090": {
            eng: string;
            ar: string;
        };
        "091": {
            eng: string;
            ar: string;
        };
        "092": {
            eng: string;
            ar: string;
        };
        "093": {
            eng: string;
            ar: string;
        };
        "094": {
            eng: string;
            ar: string;
        };
        "095": {
            eng: string;
            ar: string;
        };
        "096": {
            eng: string;
            ar: string;
        };
        "097": {
            eng: string;
            ar: string;
        };
        "098": {
            eng: string;
            ar: string;
        };
        "099": {
            eng: string;
            ar: string;
        };
        "100": {
            eng: string;
            ar: string;
        };
        "101": {
            eng: string;
            ar: string;
        };
        "102": {
            eng: string;
            ar: string;
        };
        "103": {
            eng: string;
            ar: string;
        };
        "104": {
            eng: string;
            ar: string;
        };
        "105": {
            eng: string;
            ar: string;
        };
        "106": {
            eng: string;
            ar: string;
        };
        "107": {
            eng: string;
            ar: string;
        };
        "108": {
            eng: string;
            ar: string;
        };
        "109": {
            eng: string;
            ar: string;
        };
        "110": {
            eng: string;
            ar: string;
        };
        "111": {
            eng: string;
            ar: string;
        };
        "112": {
            eng: string;
            ar: string;
        };
        "113": {
            eng: string;
            ar: string;
        };
        "114": {
            eng: string;
            ar: string;
        };
    };
    /**
     * Finds a sura by its name, with an option to use Levenshtein distance for fuzzy matching.
     * @param {string} name - The name of the sura to search for.
     * @param {boolean} [useLevenshtein=false] - Whether to use fuzzy matching.
     * @returns {Sura | null} - The found sura or null if no match is found.
     */
    private findSuraFromName;
    /**
     * Finds a sura by its number.
     * @param {Object} id - An object containing the sura number.
     * @returns {Sura} - The sura associated with the given number.
     */
    private findSuraFromNumber;
    /**
     * Checks if a string is a valid number.
     * @param {string} str - The string to check.
     * @returns {boolean} - True if the string is a number, false otherwise.
     */
    private isNumber;
    /**
     * Plays the audio of a sura by its name or number.
     * @param {string | number} suraName - The name or number of the sura to play.
     * @param {VoiceConnection} voiceConnection - The voice connection to play the audio in.
     * @param {boolean} [useLevenshtein=false] - Whether to use fuzzy matching.
     * @returns {Promise<void>} - A promise that resolves when the sura is played.
     * @throws {Error} - If the sura cannot be found.
     */
    play(suraName: string | number, voiceConnection: VoiceConnection, useLevenshtein?: boolean): Promise<void>;
    /**
     * Stops the audio playback and destroys the voice connection.
     * @param {VoiceConnection} voiceConnection - The voice connection to destroy.
     * @returns {Promise<void>} - A promise that resolves when the voice connection is destroyed.
     */
    stop(voiceConnection: VoiceConnection): Promise<void>;
}
export = Quran;
