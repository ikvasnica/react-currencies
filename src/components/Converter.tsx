import CurrencyType from "../types/CurrencyType";
import React, {useEffect, useState} from "react";
import CurrencySelectOptionType from "../types/CurrencySelectOptionType";
import ConvertableCurrencyItem from "./ConvertableCurrencyItem";
import {SingleValue} from "react-select";

interface ConverterProps {
    currencies: CurrencyType[],
    selectedCurrency: CurrencyType|null,
    handleSelectedCurrencyChange: (newSelectedCurrency: CurrencyType) => void,
    isLoading: boolean,
}

const getCZKCurrency = (): CurrencyType => {
    return {
        currencyCode: 'CZK',
        currencyName: 'koruna',
        country: 'Czech Republic',
        rate: 1,
        amount: 1,
    }
}

const Converter = ({ currencies, selectedCurrency, handleSelectedCurrencyChange, isLoading }: ConverterProps) => {
    const [currencyAmountBeingEdited, setCurrencyAmountBeingEdited] = useState<string|null>(null);

    const [amountInCZK, setAmountInCZK] = useState<number>(0);
    const [convertedAmount, setConvertedAmount] = useState<number>(0);

    useEffect((): void => {
        if (selectedCurrency === null || currencyAmountBeingEdited !== getCZKCurrency().currencyCode) {
            return;
        }

        const convertedAmount: number = amountInCZK / selectedCurrency.rate * selectedCurrency.amount;
        setConvertedAmount(convertedAmount);
    }, [amountInCZK, selectedCurrency, currencyAmountBeingEdited]);

    useEffect((): void => {
        if (selectedCurrency === null || currencyAmountBeingEdited === getCZKCurrency().currencyCode) {
            return;
        }

        const amountInCZK: number = convertedAmount * selectedCurrency.rate / selectedCurrency.amount;
        setAmountInCZK(amountInCZK);
    }, [convertedAmount, selectedCurrency, currencyAmountBeingEdited]);

    const handleCZKAmountChange = (event: React.FormEvent<HTMLInputElement>): void => {
        const newAmount: number = Number(event.currentTarget.value);
        setAmountInCZK(newAmount < 0 ? 0 : newAmount);
    }

    const handleConvertedAmountChange = (event: React.FormEvent<HTMLInputElement>): void => {
        const newAmount: number = Number(event.currentTarget.value);
        setConvertedAmount(newAmount < 0 ? 0 : newAmount);
    }

    const handleCurrencyChange = (selectedOption: SingleValue<CurrencySelectOptionType>): void => {
        if (!selectedOption) {
            return;
        }

        const selectedCurrency = currencies.find((currency: CurrencyType ): boolean => {
            return currency.currencyCode === selectedOption.value;
        }) as CurrencyType;

        handleSelectedCurrencyChange(selectedCurrency);
    }

    const handleFocus = (event: React.FormEvent<HTMLInputElement>): void => {
        setCurrencyAmountBeingEdited(event.currentTarget.id);
    }

    const czkCurrency = getCZKCurrency();

    return (
        <div className='currency-converter'>
            <ConvertableCurrencyItem
                key="czk"
                amount={amountInCZK}
                selectedCurrency={czkCurrency}
                currencies={[czkCurrency]}
                handleAmountChange={handleCZKAmountChange}
                handleCurrencyChange={handleCurrencyChange}
                handleInputFocus={handleFocus}
                isLoading={isLoading}
            />
            <ConvertableCurrencyItem
                key="other"
                amount={convertedAmount}
                selectedCurrency={selectedCurrency}
                currencies={currencies}
                handleAmountChange={handleConvertedAmountChange}
                handleCurrencyChange={handleCurrencyChange}
                handleInputFocus={handleFocus}
                isLoading={isLoading}
            />
        </div>
    );
}

export default Converter;
