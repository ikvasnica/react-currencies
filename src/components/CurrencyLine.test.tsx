import CurrencyLine from "./CurrencyLine";
import Currency from "../types/Currency";
import {render, screen} from "@testing-library/react";

test('renders two currency lines with data', () => {
    const currency: Currency = {
        country: 'United States',
        currencyCode: 'USD',
        currencyName: 'dollar',
        rate: 20.2,
        amount: 1,
    };

   render(<CurrencyLine currency={currency} isSelected={false} />);
   render(<CurrencyLine currency={currency} isSelected={true} />);

   const renderedCurrencies = screen.getAllByText(/United States/);
   expect(renderedCurrencies).toHaveLength(2);
   expect(renderedCurrencies[0].parentElement?.className).not.toContain('bg-blue-300');
   expect(renderedCurrencies[1].parentElement?.className).toContain('bg-blue-300');
});
