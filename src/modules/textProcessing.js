import { pipe } from './helpers';

const NEWLINE_PATTERN = /[\r\n|\r|\n]+./g;
const WORD_PATTERN = /[A-Za-z]+/gm;
const LETTER_PATTERN = /[A-Za-z]/gm

export function getLetters(string) {
    return pipe(
        sanitizeInput,
        matchLetters,
    )(string);
}

export function getWords(string) {
    return pipe(
        sanitizeInput,
        matchWholeWords,
    )(string);
}

export function getLineCount(string) {
    return pipe(
        sanitizeInput,
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
    return string.match(LETTER_PATTERN) ?? [];
}

function matchWholeWords(string) {
    return string.match(WORD_PATTERN) ?? [];
}

function sanitizeInput(string) {
    if (typeof string === "string" && string.length !== 0) {
        return string;
    }

    return '';
}