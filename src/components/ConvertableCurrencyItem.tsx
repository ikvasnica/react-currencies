import Select, {SingleValue} from "react-select";
import React from "react";
import CurrencyType from "../types/CurrencyType";
import CurrencySelectOptionType from "../types/CurrencySelectOptionType";

interface ConvertableCurrencyItemProps {
    amount: number,
    selectedCurrency: CurrencyType|null,
    currencies: CurrencyType[],
    handleAmountChange: (event: React.FormEvent<HTMLInputElement>) => void,
    handleInputFocus: (event: React.FormEvent<HTMLInputElement>) => void,
    isLoading: boolean,
    handleCurrencyChange: (selectedOption: SingleValue<CurrencySelectOptionType>) => void,
}

const mapToOption = (currency: CurrencyType): CurrencySelectOptionType => ({
    value: currency.currencyCode,
    label: `${currency.currencyCode} ${currency.currencyName}`,
});

const getOptions = (currencies: CurrencyType[]): CurrencySelectOptionType[] => {
    const preferredCurrencyCodes: string[] = ['EUR', 'USD', 'GBP'];

    const preferredOptions: CurrencySelectOptionType[] = currencies
        .filter((currency: CurrencyType) => preferredCurrencyCodes.includes(currency.currencyCode))
        .map(mapToOption);

    const otherOptions: CurrencySelectOptionType[] = currencies
        .filter((currency: CurrencyType) => !preferredCurrencyCodes.includes(currency.currencyCode))
        .map(mapToOption);

    return [...preferredOptions, ...otherOptions];
}

const getSelectPlaceholder = (isLoading: boolean, currencies: CurrencyType[]): string => {
    if (isLoading) {
        return 'Loading...';
    }

    if (currencies.length === 1) {
        const currencyOption = mapToOption(currencies[0]);

        return currencyOption.label;
    }

    return 'Pick currency for conversion';
}

const ConvertableCurrencyItem = (
    {
        amount,
        selectedCurrency,
        currencies,
        handleAmountChange,
        handleInputFocus,
        isLoading,
        handleCurrencyChange,
    }: ConvertableCurrencyItemProps) => {
    return (
        <div className="currency-converter-convertable-item">
            <input
                id={selectedCurrency ? selectedCurrency.currencyCode : 'other'}
                type="number"
                min="0"
                placeholder={selectedCurrency
                    ? `Amount in ${selectedCurrency.currencyCode}`
                    : 'Converted amount'
                }
                value={amount === 0 ? '' : parseFloat(amount.toFixed(3))}
                onChange={handleAmountChange}
                onFocus={handleInputFocus}
            />
            <Select
                options={getOptions(currencies)}
                placeholder={getSelectPlaceholder(isLoading, currencies)}
                isDisabled={currencies.length <= 1}
                isSearchable={true}
                onChange={handleCurrencyChange}
                noOptionsMessage={({inputValue}) => `No currency found with the name or code "${inputValue}"`}
                isLoading={isLoading}
            />
        </div>
    );
}

export default ConvertableCurrencyItem;
