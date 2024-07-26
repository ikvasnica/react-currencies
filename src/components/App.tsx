import CurrencyList from './CurrencyList';
import useCurrencies from "../hooks/useCurrencies";
import {UseQueryResult} from "@tanstack/react-query";
import CurrencyType from "../types/CurrencyType";

const App = () => {
    const currencyData: UseQueryResult<CurrencyType[]> = useCurrencies();

    return (
        <div className='app'>
            <h1>Currency Converter</h1>
            {currencyData.isLoading && (
                <div>Loading...</div>
            )}
            {currencyData.isError && (
                <div>Error: {currencyData.error.message}</div>
            )}
            {currencyData.data && (
                <CurrencyList currencies={currencyData.data} />
            )}
        </div>
    );
}

export default App;
