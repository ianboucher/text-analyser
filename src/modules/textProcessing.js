import { pipe } from './helpers'

const NEWLINE_PATTERN = /[\r\n|\r|\n]+./g;
const WORD_PATTERN = /[A-Za-z]+/gm;
const LETTER_PATTERN = /[A-Za-z]/gm

export function getLetters(string) {
    return pipe(
        validateInput,
        matchLetters,
    )(string);
}

export function getWords(string) {
    return pipe(
        validateInput,
        matchWholeWords,
    )(string);
}

export function getLineCount(string) {
    return pipe(
        validateInput,
        adjustForFirstLine,
        countNewlineChars
    )(string);
}

function countNewlineChars(string) {
    return string.match(NEWLINE_PATTERN)?.length ?? 0;
}

function adjustForFirstLine(string) {
    if (string.length !== 0) {
        return `\n${string}`;
    }

    return string;
}

function matchLetters(string) {
    return string.match(LETTER_PATTERN) ?? []
}

function matchWholeWords(string) {
    return string?.match(WORD_PATTERN) ?? [];
}

function validateInput(string) {
    if (typeof string === "string" && string.length !== 0) {
        return string;
    }

    return '';
}