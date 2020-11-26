import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from '../App';

test('renders title container', () => {
    render(<App />);
    const title = screen.getByTestId('title-container');

    expect(title).toBeInTheDocument();
});

test('renders main title text', () => {
    render(<App />);
    const title = screen.getByTestId('title-container');

    expect(title).toHaveTextContent('Riverford Text Analyser');
});

test('renders subtitle text', () => {
    render(<App />);
    const title = screen.getByTestId('title-container');

    expect(title).toHaveTextContent('Add a .txt file to see some basic statistics!');
});

test('renders file input container', () => {
    render(<App />);
    const fileInput = screen.getByTestId('file-input-container');

    expect(fileInput).toBeInTheDocument();
});

test('renders file input', () => {
    render(<App />);
    const fileInput = screen.getByTestId('file-input');

    expect(fileInput).toBeInTheDocument();
    expect(fileInput).toHaveProperty('type', 'file');
});

test('file input accepts only plain text files', () => {
    render(<App />);
    const fileInput = screen.getByTestId('file-input');

    expect(fileInput).toHaveProperty('accept', 'text/plain');
});

test('file input accepts only a single file', () => {
    render(<App />);
    const fileInput = screen.getByTestId('file-input');

    expect(fileInput).toHaveProperty('multiple', false);
});


// TODO: Not able to correctly simulate file upload due to unfamiliar 
// test lib (react-testing-library). Don't want to pull in Enzyme if possible
test.skip('file set on upload', async () => {
    render(<App />);
    const file = new File(['some text'], 'some_text.txt', { type: 'text/plain' });
    const fileInput = screen.getByTestId('file-input');

    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() => {
        expect(screen.getByTestId('text-stats')).toHaveProperty('files', [file]);
    });
});

test('renders file text stats component', () => {
    render(<App />);
    const textStats = screen.getByTestId('text-stats');

    expect(textStats).toBeInTheDocument();
});
