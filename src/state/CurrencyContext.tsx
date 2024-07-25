import React, {createContext, PropsWithChildren, useCallback, useState} from "react";
import CurrencyType from "../types/CurrencyType";

interface ContextValue {
    currencies: Array<CurrencyType>
    fetchCurrencies: () => Promise<void>,
}

const defaultValue: ContextValue = {
    currencies: [],
    fetchCurrencies: async (): Promise<void> => {},
}
const CurrencyContext: React.Context<ContextValue> = createContext(defaultValue);

const CurrencyContextProvider = ({ children }: PropsWithChildren) => {
    const [currencies, setCurrencies] = useState<Array<CurrencyType>>([]);

    const fetchCurrencies = useCallback(async (): Promise<void> => {
        const exampleCurrencies: Array<CurrencyType> = [
            {
                currencyCode: 'EUR',
                currencyName: 'euro',
                country: 'EMU',
                amount: 1,
                rate: 25.5,
            },
            {
                currencyCode: 'USD',
                currencyName: 'dolar',
                country: 'Spojené státy',
                amount: 1,
                rate: 20,
            },
        ];

        setCurrencies(exampleCurrencies);
    }, []);

    const valueToShare: ContextValue = {
        currencies,
        fetchCurrencies,
    };

    return (
        <CurrencyContext.Provider value={valueToShare}>
            {children}
        </CurrencyContext.Provider>
    )
}

export { CurrencyContextProvider };
export default CurrencyContext;
