import CurrencyType from '../types/CurrencyType';
import CurrencyLine from './CurrencyLine';
import {ReactElement} from "react";
import CurrencyListType from "../types/CurrencyListType";
import tw from "tailwind-styled-components";

const CurrencyListWrapper = tw.div`
    flex
    flex-col
    items-center
    justify-center
    p-6
    bg-blue-100
    rounded-lg
    text-center
    shadow-lg
    w-full
    md:w-2/3
    md:mr-8
    mb-6 md:mb-0
`

const SubTitle = tw.h2`
    text-2xl 
    font-bold 
    mb-4
`

const ConverterTable = tw.table`
    w-full
    mb-4
`

const TableHeading = tw.th`
    px-4
    py-2
    text-left
`

interface CurrencyListProps {
    currencyList: CurrencyListType,
    selectedCurrency: CurrencyType|null,
}

const CurrencyList = ({ currencyList, selectedCurrency }: CurrencyListProps) => {
    const renderedCurrencyLines: ReactElement[] = [...currencyList.currencies]
        .sort((a: CurrencyType, b: CurrencyType) => {
            if (selectedCurrency !== null && a.currencyCode === selectedCurrency.currencyCode) {
                return -1; // selectedCurrency comes first
            }

            if (selectedCurrency !== null && b.currencyCode === selectedCurrency.currencyCode) {
                return 1; // selectedCurrency comes first
            }

            // Alphabetical order for the rest
            if (a.currencyCode < b.currencyCode) {
                return -1;
            }
            if (a.currencyCode > b.currencyCode) {
                return 1;
            }

            return 0; // equals
        })
        .map((currency: CurrencyType) => {
            return (
                <CurrencyLine
                    key={currency.currencyCode}
                    currency={currency}
                    isSelected={selectedCurrency !== null && selectedCurrency.currencyCode === currency.currencyCode}
                />
            );
        });

    return (
        <CurrencyListWrapper>
            {currencyList.ratesUpdatedAt.date && (
                <SubTitle>Daily rates for {currencyList.ratesUpdatedAt.today
                    ? 'TODAY'
                    : `${currencyList.ratesUpdatedAt.date.toLocaleDateString('en-US', {weekday: 'long'})} (${currencyList.ratesUpdatedAt.date.toLocaleDateString()})`
                }</SubTitle>
            )}
            <ConverterTable>
                <thead>
                    <tr>
                        <TableHeading>Currency</TableHeading>
                        <TableHeading>Country</TableHeading>
                        <TableHeading>Rate</TableHeading>
                    </tr>
                </thead>
                <tbody>
                    {renderedCurrencyLines}
                </tbody>
            </ConverterTable>
        </CurrencyListWrapper>
    )
};

export default CurrencyList;
