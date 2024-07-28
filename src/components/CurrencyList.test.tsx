import {render, screen} from "@testing-library/react";
import CurrencyList from "./CurrencyList";
import Currency from "../types/Currency";
import CurrencyRates from "../types/CurrencyRates";

const currencies: Currency[] = [
    {
        country: 'EMU',
        currencyCode: 'EUR',
        currencyName: 'euro',
        rate: 25,
        amount: 1,
    },
    {
        country: 'United States',
        currencyCode: 'USD',
        currencyName: 'dollar',
        rate: 20.2,
        amount: 1,
    },
    {
        country: 'Hungary',
        currencyCode: 'HUF',
        currencyName: 'forint',
        rate: 65,
        amount: 100,
    },
];



test('renders currency rates table with selected currency first, then alphabetical order', () => {
    const currencyRates: CurrencyRates = {
        currencies: currencies,
        ratesUpdatedAt: {
            date: new Date(),
            today: true,
            beforeWeekend: false,
        },
    };

    render(<CurrencyList currencyList={currencyRates} selectedCurrency={currencies[2]} />);

    const tableRows: HTMLElement[] = screen.queryAllByRole('row');

    expect(screen.getByRole('heading')).toHaveTextContent('Daily rates for TODAY');
    expect(tableRows).toHaveLength(currencies.length + 1);
    expect(tableRows[1].children[0].textContent).toContain('HUF (forint)');
    expect(tableRows[2].children[0].textContent).toContain('EUR (euro)');
    expect(tableRows[3].children[0].textContent).toContain('USD (dollar)');
});

test('renders currency rates table with other day than today', () => {
    const currencyRates: CurrencyRates = {
        currencies: currencies,
        ratesUpdatedAt: {
            date: new Date('2024-07-26'),
            today: false,
            beforeWeekend: true,
        },
    };

    render(<CurrencyList currencyList={currencyRates} selectedCurrency={currencies[2]} />);

    expect(screen.getByRole('heading')).toHaveTextContent('Daily rates for Friday (7/26/2024)');
});
