import CurrencyType from '../types/CurrencyType';
import CurrencyLine from './CurrencyLine';
import {ReactElement} from "react";

interface CurrencyListProps {
    currencies: CurrencyType[],
}

const CurrencyList = ({ currencies }: CurrencyListProps) => {
    const renderedCurrencyLines: ReactElement[] = currencies.map((currency: CurrencyType) => {
        return <CurrencyLine key={currency.currencyCode} currency={currency} />;
    });

    return (
        <div className='currency-list'>
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
