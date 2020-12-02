import {
    getWordCount,
    getMeanWordLength,
    getModalWordLength,
    getMedianWordLength,
    getMostCommonLetter,
    getMostCommonWord,
    getWordLengthFreqs
} from '../../modules/statistics'

const faker = require('faker');

describe('getWordCount', () => {

    test('returns 0 for invalid input', () => {
        expect(getWordCount(undefined)).toBe(0);
        expect(getWordCount(null)).toBe(0);
        expect(getWordCount('')).toBe(0);
        expect(getWordCount(123)).toBe(0);
        expect(getWordCount({})).toBe(0);
    });

    test('gets correct word count for empty word array', () => {
        expect(getWordCount([])).toBe(0);
    });

    test('gets correct word count from word array', () => {
        const words = faker.lorem.words(10).split(' ');
        expect(getWordCount(words)).toBe(10);
    });
});

describe('getWordLengthFreqs', () => {
    test('returns empty freqency table when supplied with invalid input', () => {
        expect(getWordLengthFreqs(undefined)).toEqual({});
        expect(getWordLengthFreqs(null)).toEqual({});
        expect(getWordLengthFreqs('')).toEqual({});
        expect(getWordLengthFreqs(123)).toEqual({});
        expect(getWordLengthFreqs({})).toEqual({});
    });

    test('returns empty freqency table when supplied with emtpy array of words', () => {
        expect(getWordLengthFreqs([])).toEqual({});
    });

    test('returns table with single entry - word length as key, freq as value', () => {
        const words = Array(5).fill().map(() => faker.lorem.word(3));

        expect(getWordLengthFreqs(words)).toEqual({ 3: 5 });
    });

    test('returns table with multiple entries - word length as key, freq as value', () => {
        const words3 = Array(6).fill().map(() => faker.lorem.word(3));
        const words4 = Array(5).fill().map(() => faker.lorem.word(4));
        const words5 = Array(4).fill().map(() => faker.lorem.word(5));
        const words = [...words3, ...words4, ...words5];

        expect(getWordLengthFreqs(words)).toEqual({ 3: 6, 4: 5, 5: 4 });
    });
});

// describe('getMeanWordLength', () => {

//     test('return 0 mean word length for empty word array', () => {
//         expect(getMeanWordLength([])).toBe(0)
//     });

//     test('gets correct mean word length for text containing words of uniform length', () => {
//         const words = faker.lorem.word(10).split(' ');
//         expect(getMeanWordLength(words)).toBe(10)
//     });

//     test('gets correct mean for text containing words of varying length', () => {
//         const words3 = Array(5).fill().map(() => faker.lorem.word(3));
//         const words4 = Array(5).fill().map(() => faker.lorem.word(4));
//         const words5 = Array(5).fill().map(() => faker.lorem.word(5));
//         const words = [...words3, ...words4, ...words5];

//         expect(getMeanWordLength(words)).toBe(4)
//     });

//     test('correctly rounds down mean to 1 decimal place', () => {
//         const words3 = Array(5).fill().map(() => faker.lorem.word(3));
//         const words4 = Array(5).fill().map(() => faker.lorem.word(4));
//         const words6 = Array(5).fill().map(() => faker.lorem.word(6));
//         const words = [...words3, ...words4, ...words6];

//         expect(getMeanWordLength(words)).toBe(4.3)
//     });

//     test('correctly rounds up mean to 1 decimal place', () => {
//         const words3 = Array(5).fill().map(() => faker.lorem.word(3));
//         const words4 = Array(5).fill().map(() => faker.lorem.word(4));
//         const words7 = Array(5).fill().map(() => faker.lorem.word(7));
//         const words = [...words3, ...words4, ...words7];

//         expect(getMeanWordLength(words)).toBe(4.7)
//     });
// });

describe('getMeanWordLength', () => {

    test('returns 0 mean word length for empty freq table', () => {
        expect(getMeanWordLength({})).toEqual(0);
    });

    test('gets correct mean word length freq table containing single entry', () => {
        expect(getMeanWordLength({ 5: 10 })).toEqual(5);
    });

    test('gets correct mean word length freq table containing multiple entries', () => {
        expect(getMeanWordLength({ 4: 6, 5: 10, 6: 7 })).toEqual(5);
    });

    test('correctly rounds up mean to 1 decimal place where applicable', () => {
        expect(getMeanWordLength({ 4: 10, 5: 10, 6: 10, 7: 5 })).toEqual(5.3);
    });
});

// describe('getModalWordLength', () => {

//     test('returns 0 modal word length for empty word array', () => {
//         expect(getModalWordLength([])).toEqual([0]);
//     });

//     test('gets correct modal word length for text containing words of uniform length', () => {
//         const text = Array(10).fill().map(() => faker.lorem.word(10));
//         expect(getModalWordLength(text)).toEqual([10]);
//     });

//     test('gets correct modal word length for text containing words of varying length', () => {
//         const words3 = Array(5).fill().map(() => faker.lorem.word(3));
//         const words4 = Array(5).fill().map(() => faker.lorem.word(4));
//         const words5 = Array(7).fill().map(() => faker.lorem.word(5));
//         const text = [...words3, ...words4, ...words5];

//         expect(getModalWordLength(text)).toEqual([5]);
//     });

//     test('returns all modal values if max freqs are equal for more than 1 key', () => {
//         const words3 = Array(5).fill().map(() => faker.lorem.word(3));
//         const words4 = Array(7).fill().map(() => faker.lorem.word(4));
//         const words5 = Array(7).fill().map(() => faker.lorem.word(5));
//         const text = [...words3, ...words4, ...words5];

//         expect(getModalWordLength(text)).toEqual([4, 5]);
//     });
// });

describe('getModalWordLength', () => {

    test('returns 0 modal word length for empty freq table', () => {
        expect(getModalWordLength({})).toEqual([0]);
    });

    test('gets correct modal word length freq table containing single entry', () => {
        expect(getModalWordLength({ 5: 10 })).toEqual([5]);
    });

    test('gets correct modal word length freq table containing multiple entries', () => {
        expect(getModalWordLength({ 4: 6, 5: 10, 6: 7 })).toEqual([5]);
    });

    test('gets several values for modal word length when there is a tie break', () => {
        expect(getModalWordLength({ 4: 10, 5: 10, 6: 10, 7: 5 })).toEqual([4, 5, 6]);
    });
});

describe('getMedianWordLength', () => {

    test('returns 0 modal word length for empty freq table', () => {
        expect(getMedianWordLength({})).toEqual(0);
    });

    test('gets correct modal word length freq table containing single entry', () => {
        expect(getMedianWordLength({ 5: 10 })).toEqual(5);
    });

    test('gets correct modal word length freq table containing multiple entries', () => {
        expect(getMedianWordLength({ 4: 'anything', 5: 'anything', 6: 'anything' })).toEqual(5);
    });

    test('gets calculates correct median from even-numbered range of values', () => {
        expect(getMedianWordLength({ 4: 'anything', 5: 'anything', 6: 'anything', 7: 'anything' })).toEqual(6);
    });

    test('gets calculates correct median from even-numbered range of values with unequal spacing', () => {
        expect(getMedianWordLength({ 4: 'anything', 5: 'anything', 42: 'anything', 100: 'anything' })).toEqual(24);
    });
});

// describe('getMedianWordLength', () => {

//     test('returns 0 median word length for empty word array', () => {
//         expect(getMedianWordLength([])).toBe(0);
//     });

//     test('gets correct median word length for text containing words of uniform length', () => {
//         const text = Array(10).fill().map(() => faker.lorem.word(10));
//         expect(getMedianWordLength(text)).toBe(10);
//     });

//     test('gets correct median word length for text containing words of varying length', () => {
//         const words3 = Array(2).fill().map(() => faker.lorem.word(3));
//         const words4 = Array(5).fill().map(() => faker.lorem.word(4));
//         const words5 = Array(7).fill().map(() => faker.lorem.word(5));
//         const text = [...words3, ...words4, ...words5];

//         expect(getMedianWordLength(text)).toBe(4);
//     });

//     test('gets correct median word length for even number of word lengths', () => {
//         const words3 = Array(2).fill().map(() => faker.lorem.word(3));
//         const words4 = Array(5).fill().map(() => faker.lorem.word(4));
//         const words5 = Array(3).fill().map(() => faker.lorem.word(5));
//         const words6 = Array(4).fill().map(() => faker.lorem.word(6));
//         const text = [...words3, ...words4, ...words5, ...words6];

//         expect(getMedianWordLength(text)).toBe(5);
//     });
// });

describe('getMostCommonLetter', () => {

    test('returns the single most frequently occurring letter in a string', () => {
        const letters = 'The quick brown fox jumps over the lazy dog.'.match(/[A-Za-z]/gm);
        expect(getMostCommonLetter(letters)).toEqual(['o']);
    });

    test('returns all most common letters if there is a tiebreak', () => {
        const letters = 'a a b b c c d e f g h i j k l m n o p q r s t u v w x y z'.match(/[A-Za-z]/gm);
        expect(getMostCommonLetter(letters)).toEqual(['a', 'b', 'c']);
    });

    test('ignores case when calculating most common letter', () => {
        const letters = 'A a A a b b b c c d e'.match(/[A-Za-z]/gm);
        expect(getMostCommonLetter(letters)).toEqual(['a']);
    });
});

describe('getMostCommonWord', () => {

    test('returns the single most frequently occurring word in a text', () => {
        const words = ['the', 'a', 'I', 'the', 'lots', 'of', 'other', 'words'];
        expect(getMostCommonWord(words)).toEqual(['the']);
    });

    test('returns all most common words if there is a tiebreak', () => {
        const words = ['the', 'a', 'I', 'I', 'of', 'the', 'lots', 'of', 'other', 'words'];
        expect(getMostCommonWord(words)).toEqual(['the', 'i', 'of']);
    });

    test('ignores case when counting most common words', () => {
        const words = ['the', 'a', 'The', 'I', 'I', 'of', 'the', 'lots', 'of', 'other', 'words'];
        expect(getMostCommonWord(words)).toEqual(['the']);
    });
});