import {
    getLineCount,
    getWordCount,
    getMeanWordLength,
    getModalWordLength,
    getMedianWordLength,
    getMostCommonLetter,
} from '../statistics'

const faker = require('faker');

describe('getWordCount', () => {

    test('returns 0 for invalid input', () => {
        expect(getWordCount(undefined)).toBe(0)
        expect(getWordCount(null)).toBe(0)
        expect(getWordCount([])).toBe(0)
        expect(getWordCount(123)).toBe(0)
    });

    test('gets correct word count for empty string', () => {
        expect(getWordCount('')).toBe(0);
    });

    test('gets correct word count from single line string', () => {
        const words = faker.lorem.words(10);
        expect(getWordCount(words)).toBe(10);
    });

    test('gets correct word count from multiline string', () => {
        const sentence1 = `${faker.lorem.words(10)}\n`;
        const sentence2 = `${faker.lorem.words(10)}\r`;
        const sentence3 = `${faker.lorem.words(10)}\n\n\n`;
        const words = [sentence1, sentence2, sentence3].join(' ')

        expect(getWordCount(words)).toBe(30);
    });

    test('ignores words made entirely from numbers', () => {
        const words = `0 ${faker.lorem.words(10)} 1234 ${faker.lorem.words(10)} 5678`;
        expect(getWordCount(words)).toBe(20);
    });

    test('ignores words made entirely from special characters', () => {
        const words = `$ ${faker.lorem.words(10)} !@£^ ${faker.lorem.words(10)} *()%`;
        expect(getWordCount(words)).toBe(20);
    });

    test('counts words that have both numbers and letters', () => {
        const words = `${faker.lorem.words(10)} 11th ${faker.lorem.words(10)} 22nd`;
        expect(getWordCount(words)).toBe(22);
    });
});

describe('getLineCount', () => {

    test('returns 0 for invalid input', () => {
        expect(getLineCount(undefined)).toBe(0)
        expect(getLineCount(null)).toBe(0)
        expect(getLineCount([])).toBe(0)
        expect(getLineCount(123)).toBe(0)
    });

    test('gets correct line count for empty string', () => {
        expect(getLineCount('')).toBe(0)
    });

    test('gets correct line count for single line text with no newline', () => {
        const sentence = `${faker.lorem.sentences(1)}`;
        expect(getLineCount(sentence)).toBe(1)
    });

    test('gets correct line count for single line text with newline', () => {
        const sentence = `${faker.lorem.sentences(1)}\n`;
        expect(getLineCount(sentence)).toBe(1)
    });

    test('gets correct line count for single line text with carriage return', () => {
        const sentence = `${faker.lorem.sentences(1)}\r`;
        expect(getLineCount(sentence)).toBe(1)
    });

    test('gets correct line count for multi line text with newlines', () => {
        const sentences = faker.lorem.lines(10);
        expect(getLineCount(sentences)).toBe(10)
    });

    test('gets correct line count for multi line text with newline at end of file', () => {
        const sentences = `${faker.lorem.lines(10)}\n`;
        expect(getLineCount(sentences)).toBe(10)
    });

    test('gets correct line count for multi line text with multiple newlines at end of file', () => {
        const sentences = `${faker.lorem.lines(10)}\n\n\n\n`;
        expect(getLineCount(sentences)).toBe(10)
    });

    test('gets correct line count for multi line text with mixed newline chars', () => {

        const newlineChars = ['\r\n', '\r', '\n', '\n\n\n'];
        const splitSentences = faker.lorem.sentences(100).split('. ');
        const sentences = splitSentences.map(sentence => {
            const newLine = newlineChars[Math.floor(Math.random() * newlineChars.length)]
            return `${sentence}${newLine}`
        }).join(' ');

        expect(getLineCount(sentences)).toBe(100)
    });
});

describe('getMeanWordLength', () => {
    test('returns 0 for invalid input', () => {
        expect(getMeanWordLength(undefined)).toBe(0)
        expect(getMeanWordLength(null)).toBe(0)
        expect(getMeanWordLength([])).toBe(0)
        expect(getMeanWordLength(123)).toBe(0)
    });

    test('return 0 mean word length for empty string', () => {
        expect(getMeanWordLength('')).toBe(0)
    });

    test('gets correct mean word length for text containing words of uniform length', () => {
        const text = Array(10).fill().map(() => faker.lorem.word(10)).join(' ');
        expect(getMeanWordLength(text)).toBe(10)
    });

    test('gets correct mean for text containing words of varying length', () => {
        const words3 = Array(5).fill().map(() => faker.lorem.word(3)).join(' ');
        const words4 = Array(5).fill().map(() => faker.lorem.word(4)).join(' ');
        const words5 = Array(5).fill().map(() => faker.lorem.word(5)).join(' ');
        const text = [words3, words4, words5].join(' ');

        expect(getMeanWordLength(text)).toBe(4)
    });

    test('correctly rounds down mean to 1 decimal place', () => {
        const words3 = Array(5).fill().map(() => faker.lorem.word(3)).join(' ');
        const words4 = Array(5).fill().map(() => faker.lorem.word(4)).join(' ');
        const words6 = Array(5).fill().map(() => faker.lorem.word(6)).join(' ');
        const text = [words3, words4, words6].join(' ');

        expect(getMeanWordLength(text)).toBe(4.3)
    });

    test('correctly rounds up mean to 1 decimal place', () => {
        const words3 = Array(5).fill().map(() => faker.lorem.word(3)).join(' ');
        const words4 = Array(5).fill().map(() => faker.lorem.word(4)).join(' ');
        const words7 = Array(5).fill().map(() => faker.lorem.word(7)).join(' ');
        const text = [words3, words4, words7].join(' ');

        expect(getMeanWordLength(text)).toBe(4.7)
    });

    test('ignores numbers when calculating modal word length', () => {
        const words3 = Array(5).fill().map(() => faker.lorem.word(3)).join(' ');
        const words4 = Array(5).fill().map(() => faker.lorem.word(4)).join(' ');
        const words7 = Array(5).fill().map(() => faker.lorem.word(7)).join(' ');
        const numbers = Array(10).fill('111111111111  22222222 333333333333333').join(' ');
        const text = [words3, words4, words7, numbers].join(' ');

        expect(getMeanWordLength(text)).toBe(4.7);
    });

    test('ignores special characters when calculating modal word length', () => {
        const words3 = Array(5).fill().map(() => faker.lorem.word(3)).join(' ');
        const words4 = Array(5).fill().map(() => faker.lorem.word(4)).join(' ');
        const words7 = Array(5).fill().map(() => faker.lorem.word(7)).join(' ');
        const specialChars = Array(10).fill('@@@@@@@@@@  !!!!!!!!!!!! &&&&&&&&&&&&').join(' ');
        const text = [words3, words4, words7, specialChars].join(' ');

        expect(getMeanWordLength(text)).toBe(4.7);
    });
});

describe('getModalWordLength', () => {
    test('returns 0 for invalid inputs', () => {
        expect(getModalWordLength(undefined)).toBe(0)
        expect(getModalWordLength(null)).toBe(0)
        expect(getModalWordLength([])).toBe(0)
        expect(getModalWordLength(123)).toBe(0)
    });

    test('returns 0 mean word length for empty string', () => {
        expect(getModalWordLength('')).toBe(0)
    });

    test('gets correct modal word length for text containing words of uniform length', () => {
        const text = Array(10).fill().map(() => faker.lorem.word(10)).join(' ');
        expect(getModalWordLength(text)).toBe(10)
    });

    test('gets correct modal word length for text containing words of varying length', () => {
        const words3 = Array(5).fill().map(() => faker.lorem.word(3)).join(' ');
        const words4 = Array(5).fill().map(() => faker.lorem.word(4)).join(' ');
        const words5 = Array(7).fill().map(() => faker.lorem.word(5)).join(' ');
        const text = [words3, words4, words5].join(' ');

        expect(getModalWordLength(text)).toBe(5)
    });

    test('returns lowest modal word length for in cases where there is more than 1 mode', () => {
        // TODO: Return more than one mode value if max freqs are equal for more than 1 key

        const words3 = Array(5).fill().map(() => faker.lorem.word(3)).join(' ');
        const words4 = Array(7).fill().map(() => faker.lorem.word(4)).join(' ');
        const words5 = Array(7).fill().map(() => faker.lorem.word(5)).join(' ');
        const text = [words3, words4, words5].join(' ');

        expect(getModalWordLength(text)).toBe(4);
    });

    test('ignores numbers when calculating modal word length', () => {
        const words3 = Array(5).fill().map(() => faker.lorem.word(3)).join(' ');
        const words4 = Array(5).fill().map(() => faker.lorem.word(4)).join(' ');
        const words5 = Array(7).fill().map(() => faker.lorem.word(5)).join(' ');
        const numbers = Array(10).fill('111111111111  22222222 333333333333333').join(' ');
        const text = [words3, words4, words5, numbers].join(' ');

        expect(getModalWordLength(text)).toBe(5);
    });

    test('ignores special characters when calculating modal word length', () => {
        const words3 = Array(5).fill().map(() => faker.lorem.word(3)).join(' ');
        const words4 = Array(5).fill().map(() => faker.lorem.word(4)).join(' ');
        const words5 = Array(7).fill().map(() => faker.lorem.word(5)).join(' ');
        const specialChars = Array(10).fill('@@@@@@@@@@  !!!!!!!!!!!! &&&&&&&&&&&&').join(' ');
        const text = [words3, words4, words5, specialChars].join(' ');

        expect(getModalWordLength(text)).toBe(5);
    });
});

describe('getMedianWordLength', () => {
    test('returns 0 for invalid input', () => {
        expect(getMedianWordLength(undefined)).toBe(0)
        expect(getMedianWordLength(null)).toBe(0)
        expect(getMedianWordLength([])).toBe(0)
        expect(getMedianWordLength(123)).toBe(0)
    });

    test('returns 0 median word length for empty string', () => {
        expect(getMedianWordLength('')).toBe(0)
    });

    test('gets correct median word length for text containing words of uniform length', () => {
        const text = Array(10).fill().map(() => faker.lorem.word(10)).join(' ');
        expect(getMedianWordLength(text)).toBe(10)
    });

    test('gets correct median word length for text containing words of varying length', () => {
        const words3 = Array(2).fill().map(() => faker.lorem.word(3)).join(' ');
        const words4 = Array(5).fill().map(() => faker.lorem.word(4)).join(' ');
        const words5 = Array(7).fill().map(() => faker.lorem.word(5)).join(' ');
        const text = [words3, words4, words5].join(' ');

        expect(getMedianWordLength(text)).toBe(4)
    });

    test('gets correct median word length for even number of word lengths', () => {
        const words3 = Array(2).fill().map(() => faker.lorem.word(3)).join(' ');
        const words4 = Array(5).fill().map(() => faker.lorem.word(4)).join(' ');
        const words5 = Array(3).fill().map(() => faker.lorem.word(5)).join(' ');
        const words6 = Array(4).fill().map(() => faker.lorem.word(6)).join(' ');
        const text = [words3, words4, words5, words6].join(' ');

        expect(getMedianWordLength(text)).toBe(5)
    });

    test('ignores numbers when calculating median word length', () => {
        const words3 = Array(2).fill().map(() => faker.lorem.word(3)).join(' ');
        const words4 = Array(5).fill().map(() => faker.lorem.word(4)).join(' ');
        const words5 = Array(3).fill().map(() => faker.lorem.word(5)).join(' ');
        const numbers = Array(10).fill('111111111111  22222222 333333333333333').join(' ');
        const text = [words3, words4, words5, numbers].join(' ');

        expect(getMedianWordLength(text)).toBe(4);
    });

    test('ignores special characters when calculating median word length', () => {
        const words3 = Array(2).fill().map(() => faker.lorem.word(3)).join(' ');
        const words4 = Array(5).fill().map(() => faker.lorem.word(4)).join(' ');
        const words5 = Array(3).fill().map(() => faker.lorem.word(5)).join(' ');
        const specialChars = Array(10).fill('@@@@@@@@@@  !!!!!!!!!!!! &&&&&&&&&&&&').join(' ');
        const text = [words3, words4, words5, specialChars].join(' ');

        expect(getMedianWordLength(text)).toBe(4);
    });
});

describe('getMostCommonLetter', () => {
    test('returns undefined for invalid input', () => {
        expect(getMostCommonLetter(undefined)).toBe(undefined)
        expect(getMostCommonLetter(null)).toBe(undefined)
        expect(getMostCommonLetter([])).toBe(undefined)
        expect(getMostCommonLetter(123)).toBe(undefined)
    });

    test('returns the single most frequently occurring letter in a string', () => {
        expect(getMostCommonLetter('The quick brown fox jumps over the lazy dog.')).toBe('o')
    });

    // TODO: WHAT SHOULD HAPPEN WHEN THERE IS A TIE BREAK BETWEEN MOST FREQUENT LETTERS??
    test('a b c d e f g h i j k l m n o p q r s t u v w x y z', () => {
        expect(getMostCommonLetter('a b c d e f g h i j k l m n o p q r s t u v w x y z')).toBe('a')
    });

    test('ignores case when calculating most common letter', () => {
        expect(getMostCommonLetter('A a A a b b b c c d e')).toBe('a')
    });

    test('ignores special characters when calculating most common letter', () => {
        expect(getMostCommonLetter('A a A a b b b c c d e !!!!!!!! @@@@@@')).toBe('a')
    });

    test('ignores numbers characters when calculating most common letter', () => {
        expect(getMostCommonLetter('A a A a b b b c c d e 11111111 22222')).toBe('a')
    });
});