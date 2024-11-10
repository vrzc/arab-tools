export interface Sura {
    eng?: string;
    ar?: string;
    number?: string | number;
}
export type Answer = {
    answer: string;
    wrong: boolean;
};
export type QuizQuestion = {
    name: string;
    answers: Answer[];
};
