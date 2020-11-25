import { render, screen } from '@testing-library/react';
import App from './App';

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

test('renders file text stats', () => {
    render(<App />);
    const textStats = screen.getByTestId('text-stats');

    expect(textStats).toBeInTheDocument();
});
