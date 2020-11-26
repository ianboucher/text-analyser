import {
    getLetters,
    getLineCount,
    getWords
} from '../../modules/textProcessing';

const faker = require('faker');

describe('getLetters', () => {
    test('returns empty array for invalid input', () => {
        expect(getLetters(undefined)).toEqual([])
        expect(getLetters(null)).toEqual([])
        expect(getLetters('')).toEqual([])
        expect(getLetters(123)).toEqual([])
    });

    test('ignores numbers when calculating modal word length', () => {
        const letters = 'First second, 11111, 22222, 3333333\n\r'
        expect(getLetters(letters)).toEqual(['F', 'i', 'r', 's', 't', 's', 'e', 'c', 'o', 'n', 'd']);
    });

    test('ignores special characters when calculating modal word length', () => {
        const letters = 'First second, @@@@@  !!!!!! &&&&&&&\n\r'
        expect(getLetters(letters)).toEqual(['F', 'i', 'r', 's', 't', 's', 'e', 'c', 'o', 'n', 'd']);
    });
});

describe('getWords', () => {
    test('returns empty array for invalid input', () => {
        expect(getWords(undefined)).toEqual([])
        expect(getWords(null)).toEqual([])
        expect(getWords('')).toEqual([])
        expect(getWords(123)).toEqual([])
    });

    test('ignores numbers when calculating modal word length', () => {
        const words = 'First second 3rd 11111 22222 3333333\n\r';
        expect(getWords(words)).toEqual(['First', 'second', 'rd']);
    });

    test('ignores special characters when calculating modal word length', () => {
        const words = 'First second 3rd @@@@@  !!!!!! &&&&&&&\n\r';
        expect(getWords(words)).toEqual(['First', 'second', 'rd']);
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
