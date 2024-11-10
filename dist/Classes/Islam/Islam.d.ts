import Quran from "./Quran";
import { QuizQuestion } from "../../Interfaces/IslamInterfaces";
declare class Islam extends Quran {
    private message;
    constructor();
    private gToJD;
    private jdToHejri;
    quiz(): QuizQuestion;
    getRandomZekr(): {
        arabic: string;
        english: string;
    };
    getRandomHadith(): {
        arabic: string;
        english: string;
    };
    convertToHejri(date: Date): {
        year: number;
        month: number;
        day: number;
        monthName: string;
    };
    randomStory(): string;
}
export = Islam;
