import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import TextFileStats from '../../components/TextFileStats';

jest.mock('../statistics.js', () => {
    return {
        getWordCount: () => 'MOCK_WORD_COUNT',
        getLineCount: () => 'MOCK_LINE_COUNT',
        getMeanWordLength: () => 'MOCK_MEAN_WORD_LENGTH',
        getModalWordLength: () => 'MOCK_MODAL_WORD_LENGTH',
        getMedianWordLength: () => 'MOCK_MEDIAN_WORD_LENGTH',
        getMostCommonLetter: () => 'MOCK_MOST_COMMON_LETTER',
    }
});

describe('word count stat', () => {
    test('word count stat element is rendered', () => {
        render(<TextFileStats />);
        const wordCount = screen.getByTestId('word-count');

        expect(wordCount).toBeInTheDocument();
        expect(wordCount).toHaveTextContent('Total Word Count');
    });

    test('word count stat is supplied with correct title and value', () => {
        render(<TextFileStats />);
        const wordCount = screen.getByTestId('word-count');

        expect(wordCount).toHaveTextContent('Total Word Count');
        expect(wordCount).toHaveTextContent('MOCK_WORD_COUNT');
    });
});

describe('line count stat', () => {
    test('line count stat element is rendered', () => {
        render(<TextFileStats />);
        const lineCount = screen.getByTestId('line-count');

        expect(lineCount).toBeInTheDocument();
    });

    test('line count stat is supplied with correct title and value', () => {
        render(<TextFileStats />);
        const lineCount = screen.getByTestId('line-count');

        expect(lineCount).toHaveTextContent('Total Line Count');
        expect(lineCount).toHaveTextContent('MOCK_LINE_COUNT');
    });
});

describe('mean word length stat', () => {
    test('mean word length stat is rendered', () => {
        render(<TextFileStats />);
        const mean = screen.getByTestId('mean-word-length');

        expect(mean).toBeInTheDocument();
    });

    test('mean word length stat is supplied with correct title and value', () => {
        render(<TextFileStats />);
        const mean = screen.getByTestId('mean-word-length');

        expect(mean).toHaveTextContent('Mean Word Length');
        expect(mean).toHaveTextContent('MOCK_MEAN_WORD_LENGTH');
    });
});

describe('modal word length stat', () => {
    test('modal word length stat is rendered', () => {
        render(<TextFileStats />);
        const mode = screen.getByTestId('modal-word-length');

        expect(mode).toBeInTheDocument();
    });

    test('modal word length stat is supplied with correct title and value', () => {
        render(<TextFileStats />);
        const mode = screen.getByTestId('modal-word-length');

        expect(mode).toHaveTextContent('Modal Word Length');
        expect(mode).toHaveTextContent('MOCK_MODAL_WORD_LENGTH');
    });
});

describe('median word length stat', () => {
    test('median word length stat is rendered', () => {
        render(<TextFileStats />);
        const median = screen.getByTestId('median-word-length');

        expect(median).toBeInTheDocument();
    });

    test('median word length stat is supplied with correct title and value', () => {
        render(<TextFileStats />);
        const median = screen.getByTestId('median-word-length');

        expect(median).toHaveTextContent('Median Word Length');
        expect(median).toHaveTextContent('MOCK_MEDIAN_WORD_LENGTH');
    });
});

describe('most common letter stat', () => {
    test('most common letter stat is rendered', () => {
        render(<TextFileStats />);
        const mostCommonLetter = screen.getByTestId('most-common-letter');

        expect(mostCommonLetter).toBeInTheDocument();
    });

    test('contains most common letter stat', () => {
        render(<TextFileStats />);
        const mostCommonLetter = screen.getByTestId('most-common-letter');

        expect(mostCommonLetter).toHaveTextContent('Most Common Letter');
        expect(mostCommonLetter).toHaveTextContent('MOCK_MOST_COMMON_LETTER');
    });
});