import { useContext } from 'react';
import CurrencyType from '../types/CurrencyType';
import CurrencyLine from './CurrencyLine';
import CurrencyContext from "../state/CurrencyContext";

const CurrencyList = () => {
    const {currencies} = useContext(CurrencyContext);
    if (currencies.length === 0) {
        return <h2>No currency rates available...</h2>
    }

    const renderedCurrencyLines = currencies.map((currency: CurrencyType) => {
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
