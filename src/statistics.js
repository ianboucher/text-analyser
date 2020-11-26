const NEWLINE_PATTERN = /[\r\n|\r|\n]+./g;
const WORD_PATTERN = /[A-Za-z]+/gm;
const LETTER_PATTERN = /[A-Za-z]/gm

export function getWordCount(string) {
    if (!validInput(string)) {
        return 0;
    }

    return getWords(string).length;
}

export function getLineCount(string) {
    if (!validInput(string)) {
        return 0;
    }

    const nNewlines = string.match(NEWLINE_PATTERN)?.length ?? 0;

    return (nNewlines > 1) ? nNewlines + 1 : 1
}

export function getMeanWordLength(string) {
    if (!validInput(string)) {
        return 0;
    }

    const mean = getLetters(string).length / getWords(string).length;

    return Math.round(mean * 10) / 10;
}

export function getModalWordLength(string) {
    if (!validInput(string)) {
        return [0];
    }

    const wordLengthFreqs = getWordLengthFreqs(getWords(string));

    return takeKeysAtMaxFreq(wordLengthFreqs);
}

export function getMedianWordLength(string) {
    if (!validInput(string)) {
        return 0;
    }

    const wordLengths = Object.keys(getWordLengthFreqs(getWords(string)));

    if (wordLengths.length % 2 === 0) {
        const mid = Math.floor(wordLengths.length / 2);
        const median = (parseInt(wordLengths[mid - 1]) + parseInt(wordLengths[mid])) / 2;
        return Math.ceil(median);
    }

    return parseInt(wordLengths[Math.floor(wordLengths.length / 2)]);
}

export function getMostCommonLetter(string) {
    if (!validInput(string)) {
        return undefined;
    }

    const letterFreqs = getLetterFreqs(string)

    return takeKeysAtMaxFreq(letterFreqs);
}

//TODO: MOVE THIS:
function takeKeysAtMaxFreq(freqTable) {
    const maxFreq = Math.max(...Object.values(freqTable));

    return Object.keys(freqTable).reduce((acc, key) => {
        if (freqTable[key] === maxFreq) {
            acc.push(parseInt(key) || key);
        }
        return acc;
    }, []);
}


function validInput(string) {
    return (typeof string === "string" && string.length !== 0);
}

function getWords(string) {
    return string?.match(WORD_PATTERN) ?? [];
}

function getLetters(string) {
    return string.match(LETTER_PATTERN) ?? []
}

function getLetterFreqs(string) {
    return getLetters(string).reduce((letterFreqs, lttr) => {
        const letter = lttr.toLowerCase();
        (letter in letterFreqs) ? letterFreqs[letter]++ : letterFreqs[letter] = 1;
        return letterFreqs;
    }, {});
}

function getWordLengthFreqs(words) {
    return words.reduce((wordLengthFreqs, word) => {
        (word.length in wordLengthFreqs) ? wordLengthFreqs[word.length]++ : wordLengthFreqs[word.length] = 1
        return wordLengthFreqs;
    }, {});
}