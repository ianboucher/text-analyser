import { pipe } from './helpers'

export function getWordCount(words) {
    return words?.length ?? 0;
}

export function getWordLengthFreqs(words) {

    if (!Array.isArray(words)) {
        return {};
    }

    return words.reduce((wordLengthFreqs, word) => {
        (word.length in wordLengthFreqs) ? wordLengthFreqs[word.length]++ : wordLengthFreqs[word.length] = 1
        return wordLengthFreqs;
    }, {});
}

export function getMeanWordLength(wordLengthFreqs) {
    const roundedMean = pipe(
        computeMeanFromFreqs,
        roundToOneDp
    )(wordLengthFreqs);

    return roundedMean || 0;
}

export function getModalWordLength(wordLengthFreqs) {
    const modeValues = takeKeysAtMaxFreq(wordLengthFreqs);

    return (modeValues.length > 0) ? modeValues : [0]
}

export function getMedianWordLength(wordLengthFreqs) {
    const median = pipe(
        getWordLengths, // this may not have been in sorted order 
        computeMedian
    )(wordLengthFreqs);

    return median || 0;
}

export function getMostCommonLetter(letters) {
    return pipe(
        getStringFreqs,
        takeKeysAtMaxFreq
    )(letters);
}

export function getMostCommonWord(words) {
    return getMostCommonWords(words)
}

export function getMostCommonWords(words) {
    return pipe(
        getStringFreqs,
        getKeysSortedByValue
    )(words);
}

function getKeysSortedByValue(obj) {
    return Object.entries(obj).sort(([_k1, val1], [_k2, val2]) => {
        return val2 - val1;
    }).reduce((acc, curr) => {
        acc.push(curr[0]);
        return acc;
    }, []);
}

// TODO: SHOULD THIS BE EXPORTED??
function getWordLengths(wordLengthFreqs) {
    // object keys is not necessarily sorted - thought it was...
    return Object.keys(wordLengthFreqs);
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

function getStringFreqs(strings) {
    return strings.reduce((stringFreqs, str) => {
        const string = str.toLowerCase();
        (string in stringFreqs) ? stringFreqs[string]++ : stringFreqs[string] = 1;
        return stringFreqs;
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