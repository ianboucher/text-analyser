import {
    getWordCount,
    getMeanWordLength,
    getModalWordLength,
    getMedianWordLength,
    getMostCommonLetter,
} from '../../modules/statistics'

const faker = require('faker');

describe('getWordCount', () => {

    test('returns 0 for invalid input', () => {
        expect(getWordCount(undefined)).toBe(0)
        expect(getWordCount(null)).toBe(0)
        expect(getWordCount('')).toBe(0)
        expect(getWordCount(123)).toBe(0)
    });

    test('gets correct word count for empty word array', () => {
        expect(getWordCount([])).toBe(0);
    });

    test('gets correct word count from word array', () => {
        const words = faker.lorem.words(10).split(' ');
        expect(getWordCount(words)).toBe(10);
    });
});

describe('getMeanWordLength', () => {

    test('return 0 mean word length for empty word array', () => {
        expect(getMeanWordLength([])).toBe(0)
    });

    test('gets correct mean word length for text containing words of uniform length', () => {
        const words = faker.lorem.word(10).split(' ');
        expect(getMeanWordLength(words)).toBe(10)
    });

    test('gets correct mean for text containing words of varying length', () => {
        const words3 = Array(5).fill().map(() => faker.lorem.word(3));
        const words4 = Array(5).fill().map(() => faker.lorem.word(4));
        const words5 = Array(5).fill().map(() => faker.lorem.word(5));
        const words = [...words3, ...words4, ...words5];

        expect(getMeanWordLength(words)).toBe(4)
    });

    test('correctly rounds down mean to 1 decimal place', () => {
        const words3 = Array(5).fill().map(() => faker.lorem.word(3));
        const words4 = Array(5).fill().map(() => faker.lorem.word(4));
        const words6 = Array(5).fill().map(() => faker.lorem.word(6));
        const words = [...words3, ...words4, ...words6];

        expect(getMeanWordLength(words)).toBe(4.3)
    });

    test('correctly rounds up mean to 1 decimal place', () => {
        const words3 = Array(5).fill().map(() => faker.lorem.word(3));
        const words4 = Array(5).fill().map(() => faker.lorem.word(4));
        const words7 = Array(5).fill().map(() => faker.lorem.word(7));
        const words = [...words3, ...words4, ...words7];

        expect(getMeanWordLength(words)).toBe(4.7)
    });
});

describe('getModalWordLength', () => {

    test('returns 0 modal word length for empty word array', () => {
        expect(getModalWordLength([])).toEqual([0]);
    });

    test('gets correct modal word length for text containing words of uniform length', () => {
        const text = Array(10).fill().map(() => faker.lorem.word(10));
        expect(getModalWordLength(text)).toEqual([10]);
    });

    test('gets correct modal word length for text containing words of varying length', () => {
        const words3 = Array(5).fill().map(() => faker.lorem.word(3));
        const words4 = Array(5).fill().map(() => faker.lorem.word(4));
        const words5 = Array(7).fill().map(() => faker.lorem.word(5));
        const text = [...words3, ...words4, ...words5];

        expect(getModalWordLength(text)).toEqual([5]);
    });

    test('returns all modal values if max freqs are equal for more than 1 key', () => {
        const words3 = Array(5).fill().map(() => faker.lorem.word(3));
        const words4 = Array(7).fill().map(() => faker.lorem.word(4));
        const words5 = Array(7).fill().map(() => faker.lorem.word(5));
        const text = [...words3, ...words4, ...words5];

        expect(getModalWordLength(text)).toEqual([4, 5]);
    });
});

describe('getMedianWordLength', () => {

    test('returns 0 median word length for empty word array', () => {
        expect(getMedianWordLength([])).toBe(0);
    });

    test('gets correct median word length for text containing words of uniform length', () => {
        const text = Array(10).fill().map(() => faker.lorem.word(10));
        expect(getMedianWordLength(text)).toBe(10);
    });

    test('gets correct median word length for text containing words of varying length', () => {
        const words3 = Array(2).fill().map(() => faker.lorem.word(3));
        const words4 = Array(5).fill().map(() => faker.lorem.word(4));
        const words5 = Array(7).fill().map(() => faker.lorem.word(5));
        const text = [...words3, ...words4, ...words5];

        expect(getMedianWordLength(text)).toBe(4);
    });

    test('gets correct median word length for even number of word lengths', () => {
        const words3 = Array(2).fill().map(() => faker.lorem.word(3));
        const words4 = Array(5).fill().map(() => faker.lorem.word(4));
        const words5 = Array(3).fill().map(() => faker.lorem.word(5));
        const words6 = Array(4).fill().map(() => faker.lorem.word(6));
        const text = [...words3, ...words4, ...words5, ...words6];

        expect(getMedianWordLength(text)).toBe(5);
    });
});

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