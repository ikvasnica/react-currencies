import CurrencyType from '../types/CurrencyType';
import CurrencyLine from './CurrencyLine';
import {ReactElement} from "react";
import CurrencyListType from "../types/CurrencyListType";

interface CurrencyListProps {
    currencyList: CurrencyListType,
}

const CurrencyList = ({ currencyList }: CurrencyListProps) => {
    const renderedCurrencyLines: ReactElement[] = currencyList.currencies.map((currency: CurrencyType) => {
        return <CurrencyLine key={currency.currencyCode} currency={currency} />;
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
                        <th>Měna</th>
                        <th>Stát</th>
                        <th>Kurz</th>
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
