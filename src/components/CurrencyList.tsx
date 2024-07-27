import CurrencyType from '../types/CurrencyType';
import CurrencyLine from './CurrencyLine';
import {ReactElement} from "react";
import CurrencyListType from "../types/CurrencyListType";

interface CurrencyListProps {
    currencyList: CurrencyListType,
    selectedCurrency: CurrencyType|null,
}

const CurrencyList = ({ currencyList, selectedCurrency }: CurrencyListProps) => {
    const renderedCurrencyLines: ReactElement[] = currencyList.currencies.map((currency: CurrencyType) => {
        return (
            <CurrencyLine
                key={currency.currencyCode}
                currency={currency}
                isSelected={selectedCurrency !== null && selectedCurrency.currencyCode === currency.currencyCode}
            />
        );
    });

    return (
        <div className='currency-list'>
            {currencyList.ratesUpdatedAt.date && (
                <h2>Daily rates for {currencyList.ratesUpdatedAt.today
                    ? 'today'
                    : currencyList.ratesUpdatedAt.date.toLocaleDateString()
                }</h2>
            )}
            <table className='currency-list-table'>
                <thead>
                    <tr>
                        <th>Currency</th>
                        <th>Country</th>
                        <th>Rate</th>
                    </tr>
                </thead>
                <tbody>
                    {renderedCurrencyLines}
                </tbody>
            </table>
        </div>
    )
};

export default CurrencyList;
