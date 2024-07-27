import CurrencyList from './CurrencyList';
import useCurrencies from "../hooks/useCurrencies";
import {UseQueryResult} from "@tanstack/react-query";
import CurrencyListType from "../types/CurrencyListType";
import Converter from "./Converter";
import useScheduleRefetch from "../hooks/useScheduleRefetch";
import {useState} from "react";
import CurrencyType from "../types/CurrencyType";

const App = () => {
    const [selectedCurrency, setSelectedCurrency] = useState<CurrencyType|null>(null);
    const currencyData: UseQueryResult<CurrencyListType> = useCurrencies();
    useScheduleRefetch(currencyData);

    return (
        <div className='app'>
            <h1>Currency Converter</h1>
            {(currencyData.isLoading || currencyData.isFetching) && (
                <div className='loading'>Checking the newest currency rates...</div>
            )}
            {currencyData.isError && (
                <div className='error'>Error: {currencyData.error.message}</div>
            )}
            {currencyData.data && (
                <CurrencyList currencyList={currencyData.data} selectedCurrency={selectedCurrency} />
            )}
            <Converter
                currencies={currencyData.data ? currencyData.data.currencies : []}
                selectedCurrency={selectedCurrency}
                handleSelectedCurrencyChange={(newCurrency: CurrencyType) => setSelectedCurrency(newCurrency)}
                isLoading={currencyData.isLoading}
            />
        </div>
    );
}

export default App;
