import CurrencyList from './CurrencyList';
import useCurrencies from "../hooks/useCurrencies";
import {UseQueryResult} from "@tanstack/react-query";
import CurrencyListType from "../types/CurrencyListType";
import useScheduleRefetch from "../hooks/useScheduleRefetch";

const App = () => {
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
                <CurrencyList currencyList={currencyData.data} />
            )}
        </div>
    );
}

export default App;
