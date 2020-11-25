
// TODO: SHOULD THIS BE PRIVATE?
function getWords(string) {
    // return string?.match(/[\w-]+/gm) ?? [];
    // WILL COUNT 3RD AS RD
    return string?.match(/[A-Za-z]+/gm) ?? [];
}

export function getWordCount(string) {
    // THIS IS REPEATED LOGIC - COULD IT BE EXTRACTED SOMEHOW - E.G. VALIDATE INPUT AND RETURN EITHER ORIG STRING OR EMPTY STRING?
    if (typeof string !== "string" || string.length === 0) {
        return 0;
    }

    return getWords(string).length;
}

export function getLineCount(string) {
    // TODO: DO I NEED TO CHECK TYPE OF INPUT?
    if (typeof string !== "string" || string.length === 0) {
        return 0;
    }

    const nNewlines = string.match(/[\r\n|\r|\n]+./g)?.length ?? 0;
    return (nNewlines > 1) ? nNewlines + 1 : 1
}

// TODO: SHOULD THIS BE PRIVATE??
function getLetters(string) {
    // CONSIDER NUMBERS & SPECIAL CHARS - ARE WE IGNORING THESE?
    return string?.match(/[A-Za-z]/gm) ?? []
}

// TODO: ARE THEY AFTER THE ABILITY TO SPECIFY PRECISION HERE E.G. BY ROUND FUNCTION?
export function getMeanWordLength(string) {
    if (typeof string !== "string" || string.length === 0) {
        return 0;
    }

    const mean = getLetters(string).length / getWords(string).length
    return Math.round(mean * 10) / 10;
}

export function getModalWordLength(string) {

    if (typeof string !== "string" || string.length === 0) {
        return 0;
    }
    // TODO: IS IT WORTH USING CURRYING AND/OR COMPOSITION??
    const wordLengths = getWordLengths(getWords(string));
    const mode = Object.keys(wordLengths).reduce((prevMax, current) => { // COULD THIS BE EXTRACTED TO BE GETMAXFREQ TO USE IN MOST COMMON LETTER
        return wordLengths[current] > wordLengths[prevMax] ? current : prevMax
    });

    return parseInt(mode);
}

export function getMedianWordLength(string) {

    if (typeof string !== "string" || string.length === 0) {
        return 0;
    }
    // TODO: IS IT WORTH USING CURRYING AND/OR COMPOSITION??
    const wordLengthFreqs = getWordLengths(getWords(string));
    const wordLengths = Object.keys(wordLengthFreqs);

    // EXTRACT TO OWN export function?? 
    if (wordLengths.length % 2 === 0) {
        const mid = Math.floor(wordLengths.length / 2);
        const median = (parseInt(wordLengths[mid - 1]) + parseInt(wordLengths[mid])) / 2;
        return Math.ceil(median);
    }

    return parseInt(wordLengths[Math.floor(wordLengths.length / 2)]); // ZERO INDEXING!!
}

export function getMostCommonLetter(string) {
    if (typeof string !== "string" || string.length === 0) {
        return undefined;
    }

    const letterFreqs = getLetterFreqs(string)
    return Object.keys(letterFreqs).reduce((prevMax, current) => {
        return letterFreqs[current] > letterFreqs[prevMax] ? current : prevMax;
    });
}

// TODO: DO I NEED A export function FOR GETTING THE FREQUENCY OF SOMETHING?? (FOR BOTH WORD LENGTH & MOST COMMON LETTER)

function getLetterFreqs(string) {
    // TODO: DON'T FORGET UPPER LOWER CASE
    // WHAT ABOUT NUMBERS / SPECIAL CHARS?
    const stuff = getLetters(string).reduce((allLetters, lttr) => {
        const letter = lttr.toLowerCase();
        if (letter in allLetters) { // TODO: CAN THIS BE EXTRACTED TO OWN FUNCTION
            allLetters[letter]++
        } else {
            allLetters[letter] = 1
        }

        return allLetters;
    }, {});

    return stuff;
}

function getWordLengths(words) {
    // TODO: DON'T FORGET TO CHANGE VARIABLE NAMES!!
    const stuff = words.reduce((allWords, word) => {
        if (word.length in allWords) {
            allWords[word.length]++
        } else {
            allWords[word.length] = 1
        }
        return allWords;
    }, {});

    return stuff;
}