import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Stat from '../../components/Stat';

test('stat has title', () => {
    render(<Stat id="testType" />);
    expect(screen.getByTestId("testType-title")).toBeInTheDocument();
});

test('stat has value', () => {
    render(<Stat id="testType" />);
    expect(screen.getByTestId("testType-value")).toBeInTheDocument();
});

test('stat renders supplied title', () => {
    render(<Stat id="testType" statName="Stat Name" />);
    const title = screen.getByTestId("testType-title");

    expect(title).toHaveTextContent('Stat Name')
});

test('stat renders supplied value', () => {
    render(<Stat id="testType" statValue="Stat Value" />);
    const title = screen.getByTestId("testType-value");

    expect(title).toHaveTextContent('Stat Value')
});