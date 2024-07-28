import CurrencyType from "../types/CurrencyType";
import React, {useEffect, useState} from "react";
import CurrencySelectOptionType from "../types/CurrencySelectOptionType";
import ConvertableCurrencyItem from "./ConvertableCurrencyItem";
import {SingleValue} from "react-select";
import CurrencyList from "./CurrencyList";
import CurrencyListType from "../types/CurrencyListType";
import tw from "tailwind-styled-components";

const ConverterWrapper = tw.div`
    flex
    flex-col
    items-start
    justify-center
    w-full
    md:flex-row
    mt-6
`

const ConversionControlWrapper = tw.div`
    flex
    flex-col
    items-center
    h-auto
    w-full
    md:w-1/3
    md:ml-8
    md:mr-8
`

const Separator = tw.div`
    border-t
    my-4
    mx-auto
    w-4/5
`;

interface ConverterProps {
    currencyData: CurrencyListType|null,
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

const Converter = ({ currencyData, isLoading }: ConverterProps) => {
    const [currencyAmountBeingEdited, setCurrencyAmountBeingEdited] = useState<string|null>(null);
    const [selectedCurrency, setSelectedCurrency] = useState<CurrencyType|null>(null);
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

        const selectedCurrency = currencyData?.currencies.find((currency: CurrencyType ): boolean => {
            return currency.currencyCode === selectedOption.value;
        }) as CurrencyType;

        setSelectedCurrency(selectedCurrency);
    }

    const handleFocus = (event: React.FormEvent<HTMLInputElement>): void => {
        setCurrencyAmountBeingEdited(event.currentTarget.id);
    }

    const czkCurrency: CurrencyType = getCZKCurrency();

    return (
        <ConverterWrapper>
            <ConversionControlWrapper>
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
                <Separator />
                <ConvertableCurrencyItem
                    key="other"
                    amount={convertedAmount}
                    selectedCurrency={selectedCurrency}
                    currencies={currencyData ? currencyData.currencies : []}
                    handleAmountChange={handleConvertedAmountChange}
                    handleCurrencyChange={handleCurrencyChange}
                    handleInputFocus={handleFocus}
                    isLoading={isLoading}
                />
            </ConversionControlWrapper>
            {currencyData && (
                <CurrencyList currencyList={currencyData} selectedCurrency={selectedCurrency} />
            )}
        </ConverterWrapper>
    );
}

export default Converter;
