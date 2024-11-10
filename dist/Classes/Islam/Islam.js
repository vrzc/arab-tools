"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Quran_1 = __importDefault(require("./Quran"));
const quran_json_1 = require("../../utils/JSON/quran.json");
class Islam extends Quran_1.default {
    constructor() {
        super();
        this.message = "This method has not been made yet. Please wait for the next version.";
    }
    gToJD(year, month, day) {
        const a = Math.floor((14 - month) / 12);
        const y = year + 4800 - a;
        const m = month + 12 * a - 3;
        const jd = day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
        return jd;
    }
    jdToHejri(jd) {
        const jd1 = 1948439.5;
        const diff = jd - jd1;
        const hijriYear = Math.floor(diff / 354.367);
        const hijriYearDays = Math.floor(hijriYear * 354.367);
        const remainingDays = diff - hijriYearDays;
        const hijriMonth = Math.floor(remainingDays / 29.5305882) + 1;
        const hijriDay = Math.floor(remainingDays - (hijriMonth - 1) * 29.5305882) + 1;
        return { year: hijriYear + 1, month: hijriMonth, day: hijriDay };
    }
    quiz() {
        const randomQuestionI = Math.floor(Math.random() * quran_json_1.questions.length);
        const { name, correct_answer, wrong_answers } = quran_json_1.questions[randomQuestionI];
        const answers = [
            { answer: correct_answer, wrong: false },
            ...wrong_answers.map(answer => ({ answer, wrong: true }))
        ];
        const shuffledAnswers = answers.sort(() => Math.random() - 0.5);
        return {
            name,
            answers: shuffledAnswers
        };
    }
    getRandomZekr() {
        const getRandomZekrI = Math.floor(Math.random() * quran_json_1.azkar.length);
        const { zekr } = quran_json_1.azkar[getRandomZekrI];
        return zekr;
    }
    getRandomHadith() {
        const getRandomHadith = Math.floor(Math.random() * quran_json_1.ahadith.length);
        const { hadith } = quran_json_1.ahadith[getRandomHadith];
        return hadith;
    }
    convertToHejri(date) {
        const gYear = date.getFullYear();
        const gMonth = date.getMonth() + 1;
        const gDay = date.getDate();
        const jd = this.gToJD(gYear, gMonth, gDay);
        const hD = this.jdToHejri(jd);
        const hijriMonthNames = [
            "Muharram", "Safar", "Rabi' al-Awwal", "Rabi' al-Thani", "Jumada al-Awwal", "Jumada al-Thani",
            "Rajab", "Sha'ban", "Ramadan", "Shawwal", "Dhul-Qi'dah", "Dhul-Hijjah"
        ];
        const monthName = hijriMonthNames[hD.month - 1];
        return Object.assign(Object.assign({}, hD), { monthName });
    }
    randomStory() {
        return this.message;
    }
}
module.exports = Islam;
