import CurrencyType from '../types/CurrencyType';

interface CurrentyLineProps {
    currency: CurrencyType,
}

const CurrencyLine = ({ currency }: CurrentyLineProps) => {
    return (
        <tr>
            <td>{currency.currencyCode} ({currency.currencyName})</td>
            <td>{currency.country}</td>
            <td>{currency.rate} CZK / {currency.amount} {currency.currencyCode}</td>
        </tr>
    )
};

export default CurrencyLine;
