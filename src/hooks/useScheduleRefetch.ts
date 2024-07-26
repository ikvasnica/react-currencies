import {QueryClient, QueryObserverResult, useQueryClient} from "@tanstack/react-query";
import {useEffect} from "react";
import {API_QUERY_KEY} from "./useCurrencies";
import CurrencyListType from "../types/CurrencyListType";

const getMillisecondsUntilTomorrowAfternoon = (): number => {
    const now = new Date();
    const tomorrowAt1430 = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 14, 30);

    return tomorrowAt1430.getTime() - now.getTime();
}

const scheduleRefetchForTomorrowAfternoon = (
    queryClient: QueryClient,
    currencyDataQueryResult: QueryObserverResult<CurrencyListType>
): number => {
    queryClient.setQueryDefaults([API_QUERY_KEY], {enabled: false});

    return window.setTimeout(() => {
        queryClient.setQueryDefaults([API_QUERY_KEY], {enabled: true});
        currencyDataQueryResult.refetch();
    }, getMillisecondsUntilTomorrowAfternoon());
}

const useScheduleRefetch = (currencyDataQueryResult: QueryObserverResult<CurrencyListType>): void => {
    const queryClient = useQueryClient();

    useEffect(() => {
        let timerId: number|null = null;

        if (currencyDataQueryResult.data && currencyDataQueryResult.data.ratesUpdatedAt.today) {
            timerId = scheduleRefetchForTomorrowAfternoon(queryClient, currencyDataQueryResult);
        }

        return (): void => {
            if (timerId !== null) {
                clearTimeout(timerId);
            }
        }
    }, [currencyDataQueryResult, queryClient]);
}

export default useScheduleRefetch;
