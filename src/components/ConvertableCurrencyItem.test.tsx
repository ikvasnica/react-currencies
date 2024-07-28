import {render, screen} from "@testing-library/react";
import ConvertableCurrencyItem from "./ConvertableCurrencyItem";
import Currency from "../types/Currency";

const currencies: Currency[] = [
    {
        country: 'United States',
        currencyCode: 'USD',
        currencyName: 'dollar',
        rate: 20.2,
        amount: 1,
    },
    {
        country: 'EMU',
        currencyCode: 'EUR',
        currencyName: 'euro',
        rate: 25,
        amount: 1,
    },
];

test('renders input and select when currency is selected', () => {
    render(
    <ConvertableCurrencyItem
        amount={1500.25}
        selectedCurrency={currencies[0]}
        currencies={currencies}
        handleAmountChange={() => {}}
        handleInputFocus={() => {}}
        isLoading={false}
        handleCurrencyChange={() => {}}
    />
    );

    expect(screen.queryByPlaceholderText('Amount in USD')).toBeInTheDocument();
    expect(screen.queryByDisplayValue('1 500,25 USD')).toBeInTheDocument();
    expect(screen.queryByText('Pick currency')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).not.toHaveAttribute('disabled');
});

test('renders input and select with no selected currency', () => {
    render(
        <ConvertableCurrencyItem
            amount={0}
            selectedCurrency={null}
            currencies={[currencies[0]]}
            handleAmountChange={() => {}}
            handleInputFocus={() => {}}
            isLoading={false}
            handleCurrencyChange={() => {}}
        />
    );

    expect(screen.queryByPlaceholderText('Converted amount')).toBeInTheDocument();
    expect(screen.queryByDisplayValue(/USD/)).not.toBeInTheDocument();
    expect(screen.queryByText('United States dollar')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).not.toHaveAttribute('disabled');
});

test('renders disabled amount input', () => {
    render(
        <ConvertableCurrencyItem
            amount={0}
            selectedCurrency={null}
            currencies={currencies}
            handleAmountChange={() => {}}
            handleInputFocus={() => {}}
            isLoading={false}
            handleCurrencyChange={() => {}}
        />
    );

    expect(screen.getByRole('textbox')).toHaveAttribute('disabled');
});
