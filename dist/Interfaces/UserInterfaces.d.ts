/**
 * Options for the auto-reaction feature.
 */
export interface AutoReactionOptions {
    sessionid?: string;
    customBotID?: string[];
    reactionName?: string;
    timeout?: number;
    blacklistedwords?: string[];
    ownerId?: string;
}
export type LevelingLanguage = 'eng' | 'ar';
/**
  * Options for the auto-leveling feature
*/
export interface LevelingOptions {
    channel: string;
    randomLetters?: boolean;
    time?: number;
    type?: LevelingLanguage;
}
export interface VoiceStayOptions {
    guild: string;
    channel: string;
}
