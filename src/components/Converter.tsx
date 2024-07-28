import Currency from "../types/Currency";
import React, {useEffect, useState} from "react";
import CurrencySelectOptionType from "../types/CurrencySelectOptionType";
import ConvertableCurrencyItem from "./ConvertableCurrencyItem";
import {SingleValue} from "react-select";
import CurrencyList from "./CurrencyList";
import CurrencyRates from "../types/CurrencyRates";
import tw from "tailwind-styled-components";
import {NumberFormatValues, SourceInfo} from "react-number-format";

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
    currencyData: CurrencyRates|null,
    isLoading: boolean,
}

const getCZKCurrency = (): Currency => {
    return {
        currencyCode: 'CZK',
        currencyName: 'koruna',
        country: 'Czech',
        rate: 1,
        amount: 1,
    }
}

const Converter = ({ currencyData, isLoading }: ConverterProps) => {
    const [currencyAmountBeingEdited, setCurrencyAmountBeingEdited] = useState<string|null>(null);
    const [selectedCurrency, setSelectedCurrency] = useState<Currency|null>(null);
    const [amountInCZK, setAmountInCZK] = useState<number>(0);
    const [convertedAmount, setConvertedAmount] = useState<number>(0);

    useEffect((): void => {
        if (selectedCurrency === null || currencyAmountBeingEdited !== getCZKCurrency().currencyCode) {
            return;
        }

        const newConvertedAmount: number = amountInCZK / selectedCurrency.rate * selectedCurrency.amount;
        setConvertedAmount(newConvertedAmount);
    }, [amountInCZK, selectedCurrency, currencyAmountBeingEdited]);

    useEffect((): void => {
        if (selectedCurrency === null || currencyAmountBeingEdited === getCZKCurrency().currencyCode) {
            return;
        }

        const newAmountInCZK: number = convertedAmount * selectedCurrency.rate / selectedCurrency.amount;
        setAmountInCZK(newAmountInCZK);
    }, [convertedAmount, selectedCurrency, currencyAmountBeingEdited]);

    const handleAmountValueChange = (values: NumberFormatValues, sourceInfo: SourceInfo): void => {
        if (sourceInfo.source !== 'event') {
            return;
        }

        const newAmount: number = values.floatValue || 0;
        if (sourceInfo.event?.currentTarget.id === getCZKCurrency().currencyCode) {
            setAmountInCZK(newAmount)
        } else {
            setConvertedAmount(newAmount);
        }
    }

    const handleCurrencyChange = (selectedOption: SingleValue<CurrencySelectOptionType>): void => {
        if (!selectedOption) {
            return;
        }

        const selectedCurrency = currencyData?.currencies.find((currency: Currency ): boolean => {
            return currency.currencyCode === selectedOption.value;
        }) as Currency;

        setSelectedCurrency(selectedCurrency);
    }

    const handleFocus = (event: React.FormEvent<HTMLInputElement>): void => {
        setCurrencyAmountBeingEdited(event.currentTarget.id);
    }

    const czkCurrency: Currency = getCZKCurrency();

    return (
        <ConverterWrapper>
            <ConversionControlWrapper>
                <ConvertableCurrencyItem
                    key="czk"
                    amount={amountInCZK}
                    selectedCurrency={czkCurrency}
                    currencies={[czkCurrency]}
                    handleAmountChange={handleAmountValueChange}
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
                    handleAmountChange={handleAmountValueChange}
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
