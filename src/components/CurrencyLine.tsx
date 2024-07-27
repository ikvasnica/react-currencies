import CurrencyType from '../types/CurrencyType';

interface CurrentyLineProps {
    currency: CurrencyType,
    isSelected: boolean,
}

const CurrencyLine = ({ currency, isSelected }: CurrentyLineProps) => {
    return (
        <tr style={isSelected ? {backgroundColor: "hsla(0, 100%, 50%, 0.1)"} : {}}>
            <td>{currency.currencyCode} ({currency.currencyName})</td>
            <td>{currency.country}</td>
            <td>{currency.amount} {currency.currencyCode}<br />{currency.rate} CZK</td>
        </tr>
    )
};

export default CurrencyLine;
