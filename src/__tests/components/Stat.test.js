import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Stat from '../../components/Stat';

test('stat has title', () => {
    render(<Stat id='statType' />);
    expect(screen.getByTestId('statType-title')).toBeInTheDocument();
});

test('stat has value', () => {
    render(<Stat id='statType' />);
    expect(screen.getByTestId('statType-value')).toBeInTheDocument();
});

test('stat renders supplied title', () => {
    render(<Stat id='statType' statName="Stat Name" />);
    const title = screen.getByTestId('statType-title');

    expect(title).toHaveTextContent('Stat Name');
});

test('stat renders supplied value', () => {
    render(<Stat id='statType' statValue="Stat Value" />);
    const title = screen.getByTestId('statType-value');

    expect(title).toHaveTextContent('Stat Value');
});

test('stat renders placeholder if value is undefined', () => {
    render(<Stat id='statType' statValue={undefined} />);
    const title = screen.getByTestId('statType-value');

    expect(title).toHaveTextContent('--');
});

test('stat renders placeholder if value is empty array', () => {
    render(<Stat id='statType' statValue={[]} />);
    const title = screen.getByTestId('statType-value');

    expect(title).toHaveTextContent('--');
});

test('stat renders comma seperated list of values if value is an array', () => {
    render(<Stat id='statType' statValue={['a, b, c']} />);
    const title = screen.getByTestId('statType-value');

    expect(title).toHaveTextContent('a, b, c');
});

test('stat single value if value is an array of one', () => {
    render(<Stat id='statType' statValue={[0]} />);
    const title = screen.getByTestId('statType-value');

    expect(title).toHaveTextContent('0');
});