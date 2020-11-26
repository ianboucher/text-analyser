import { pipe } from './helpers'

export function getWordCount(words) {
    return words?.length ?? 0;
}

export function getMeanWordLength(words) {
    const roundedMean = pipe(
        getWordLengthFreqs,
        computeMeanFromFreqs,
        roundToOneDp
    )(words);

    return roundedMean || 0;
}

export function getModalWordLength(words) {
    const wordLengthFreqs = pipe(
        getWordLengthFreqs,
        takeKeysAtMaxFreq
    )(words);

    return (wordLengthFreqs.length > 0) ? wordLengthFreqs : [0]
}

export function getMedianWordLength(words) {
    const median = pipe(
        getWordLengthFreqs,
        getWordLengths,
        computeMedian
    )(words);

    return median || 0;
}

export function getMostCommonLetter(letters) {
    return pipe(
        getLetterFreqs,
        takeKeysAtMaxFreq
    )(letters);
}

function getWordLengths(wordLengthFreqs) {
    return Object.keys(wordLengthFreqs)
}

function roundToOneDp(num) {
    return Math.round(num * 10) / 10;
}

function computeMeanFromFreqs(freqs) {
    const nValues = Object.values(freqs).reduce((acc, freq) => (acc += freq), 0);
    const sum = Object.entries(freqs).reduce((acc, [key, value]) => {
        return acc += (parseInt(key) * value)
    }, 0);

    return sum / nValues;
}

function computeMedian(values) {
    if (values.length % 2 === 0) {
        const mid = Math.floor(values.length / 2);
        const median = (parseInt(values[mid - 1]) + parseInt(values[mid])) / 2;
        return Math.ceil(median);
    }

    return parseInt(values[Math.floor(values.length / 2)]);
}

function getLetterFreqs(letters) {
    return letters.reduce((letterFreqs, lttr) => {
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

function takeKeysAtMaxFreq(freqTable) {
    const maxFreq = Math.max(...Object.values(freqTable));

    return Object.keys(freqTable).reduce((acc, key) => {
        if (freqTable[key] === maxFreq) {
            acc.push(parseInt(key) || key);
        }
        return acc;
    }, []);
}