import Select, {SingleValue} from "react-select";
import React from "react";
import Currency from "../types/Currency";
import CurrencySelectOptionType from "../types/CurrencySelectOptionType";
import tw from "tailwind-styled-components";
import {NumericFormat as OriginalNumericFormat, OnValueChange} from "react-number-format";

const ItemWrapper = tw.div`
    flex
    flex-col
    items-center
    justify-center
    w-full
    my-6
    rounded-lg
`

const NumericFormat = tw(OriginalNumericFormat)`
    mb-4
    text-center
    text-xl
    py-2
    w-full
    rounded
    border
    focus:border-blue-500
    focus:outline-none
`

const SelectWrapper = tw.div`
    text-gray-400 
    w-80
`;

interface ConvertableCurrencyItemProps {
    amount: number,
    selectedCurrency: Currency|null,
    currencies: Currency[],
    handleAmountChange: OnValueChange,
    handleInputFocus: (event: React.FormEvent<HTMLInputElement>) => void,
    isLoading: boolean,
    handleCurrencyChange: (selectedOption: SingleValue<CurrencySelectOptionType>) => void,
}

const mapToOption = (currency: Currency): CurrencySelectOptionType => ({
    value: currency.currencyCode,
    label: `${currency.country} ${currency.currencyName}`,
});

const getOptions = (currencies: Currency[]): CurrencySelectOptionType[] => {
    const preferredCurrencyCodes: string[] = ['EUR', 'USD', 'GBP'];

    const preferredOptions: CurrencySelectOptionType[] = currencies
        .filter((currency: Currency) => preferredCurrencyCodes.includes(currency.currencyCode))
        .map(mapToOption);

    const otherOptions: CurrencySelectOptionType[] = currencies
        .filter((currency: Currency) => !preferredCurrencyCodes.includes(currency.currencyCode))
        .map(mapToOption);

    return [...preferredOptions, ...otherOptions];
}

const getSelectPlaceholder = (isLoading: boolean, currencies: Currency[]): string => {
    if (isLoading) {
        return 'Loading...';
    }

    if (currencies.length === 1) {
        const currencyOption: CurrencySelectOptionType = mapToOption(currencies[0]);

        return currencyOption.label;
    }

    return 'Pick currency';
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
        <ItemWrapper>
            <NumericFormat
                id={selectedCurrency ? selectedCurrency.currencyCode : 'other'}
                value={amount === 0 ? '' : amount}
                decimalScale={2}
                decimalSeparator=","
                thousandSeparator=" "
                suffix={` ${selectedCurrency?.currencyCode}`}
                allowNegative={false}
                placeholder={selectedCurrency
                    ? `Amount in ${selectedCurrency.currencyCode}`
                    : 'Converted amount'
                }
                onValueChange={handleAmountChange}
                onFocus={handleInputFocus}
                disabled={selectedCurrency === null && currencies.length > 1 && amount === 0}
            />
            <SelectWrapper>
                <Select
                    options={getOptions(currencies)}
                    placeholder={getSelectPlaceholder(isLoading, currencies)}
                    isDisabled={currencies.length <= 1}
                    isSearchable={true}
                    onChange={handleCurrencyChange}
                    noOptionsMessage={({inputValue}) => `No currency found with the name or code "${inputValue}"`}
                    isLoading={isLoading}
                    styles={{
                        menu: (provided) => ({...provided, color: 'black'}),
                        control: (provided) => ({...provided, color: 'black'}),
                    }}
                />
            </SelectWrapper>
        </ItemWrapper>
    );
}

export default ConvertableCurrencyItem;
