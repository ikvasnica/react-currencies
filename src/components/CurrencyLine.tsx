import Currency from '../types/Currency';
import tw from "tailwind-styled-components";

const Line = tw.tr`
    hover:bg-blue-200
`

const Cell = tw.td`
    border
    px-4
    py-2
    text-left
`

interface CurrentyLineProps {
    currency: Currency,
    isSelected: boolean,
}

const CurrencyLine = ({ currency, isSelected }: CurrentyLineProps) => {
    return (
        <Line className={isSelected ? 'bg-blue-200' : ''}>
            <Cell>{currency.currencyCode} ({currency.currencyName})</Cell>
            <Cell>{currency.country}</Cell>
            <Cell>{currency.amount} {currency.currencyCode}<br /><strong>{currency.rate} CZK</strong></Cell>
        </Line>
    )
};

export default CurrencyLine;
