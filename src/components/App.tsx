import useCurrencies from "../hooks/useCurrencies";
import {UseQueryResult} from "@tanstack/react-query";
import CurrencyListType from "../types/CurrencyListType";
import Converter from "./Converter";
import useScheduleRefetch from "../hooks/useScheduleRefetch";
import tw from "tailwind-styled-components"
import {SyncLoader} from "react-spinners";

const AppContainer = tw.div`
    flex
    flex-col
    items-center
    justify-center
    min-h-screen
    bg-gray-50
    text-gray-700
    p-4
    box-border
    font-sans
`

const AppName = tw.h1`
    text-4xl
    font-bold
    mb-8
    text-gray-900
`

const LoadingOverlay = tw.div`
    z-10
    fixed
    inset-0
    flex
    items-center
    justify-center
    bg-blue-100
    bg-opacity-70
`

const Error = tw.div`
    m-4
    p-4
    rounded-md
    bg-red-100
    text-red-700
    text-xl
    text-center
    rounded-lg
`

const App = () => {
    const currencyData: UseQueryResult<CurrencyListType> = useCurrencies();
    useScheduleRefetch(currencyData);

    return (
        <AppContainer>
            <AppName>💸 Currency Converter</AppName>
            {(currencyData.isLoading || currencyData.isFetching) && (
                <LoadingOverlay><SyncLoader color={"#2563EB"} size={100}/></LoadingOverlay>
            )}
            {currencyData.isError && (
                <Error>Error: {currencyData.error.message}</Error>
            )}
            <Converter
                currencyData={currencyData.data ? currencyData.data : null}
                isLoading={currencyData.isLoading}
            />
        </AppContainer>
    );
}

export default App;
