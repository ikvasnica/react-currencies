import {QueryClient, QueryObserverResult, useQueryClient} from "@tanstack/react-query";
import {useEffect} from "react";
import {API_QUERY_KEY} from "./useCurrencies";
import CurrencyListType from "../types/CurrencyListType";

const getMillisecondsUntilNextWorkingDayAfternoon = (): number => {
    const now = new Date();
    const nextWorkingDayAt1430 = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 14, 30);

    // Adjust for weekends
    const dayOfWeek = nextWorkingDayAt1430.getDay();
    if (dayOfWeek === 0) {  // Sunday
        nextWorkingDayAt1430.setDate(nextWorkingDayAt1430.getDate() + 1);  // Add one day to get to Monday
    } else if (dayOfWeek === 6) {  // Saturday
        nextWorkingDayAt1430.setDate(nextWorkingDayAt1430.getDate() + 2);  // Add two days to get to Monday
    }

    return nextWorkingDayAt1430.getTime() - now.getTime();
}

const scheduleRefetchForNextWorkingDayAfternoon = (
    queryClient: QueryClient,
    currencyDataQueryResult: QueryObserverResult<CurrencyListType>
): number => {
    queryClient.setQueryDefaults([API_QUERY_KEY], {enabled: false});
    console.log('Scheduling for next refetch the next day...');

    return window.setTimeout(() => {
        queryClient.setQueryDefaults([API_QUERY_KEY], {enabled: true});
        currencyDataQueryResult.refetch();
    }, getMillisecondsUntilNextWorkingDayAfternoon());
}

const useScheduleRefetch = (currencyDataQueryResult: QueryObserverResult<CurrencyListType>): void => {
    const queryClient = useQueryClient();

    useEffect(() => {
        let timerId: number|null = null;

        if (
            currencyDataQueryResult.data
            && (currencyDataQueryResult.data.ratesUpdatedAt.today || currencyDataQueryResult.data.ratesUpdatedAt.beforeWeekend)
        ) {
            timerId = scheduleRefetchForNextWorkingDayAfternoon(queryClient, currencyDataQueryResult);
        }

        return (): void => {
            if (timerId !== null) {
                clearTimeout(timerId);
            }
        }
    }, [currencyDataQueryResult, queryClient]);
}

export default useScheduleRefetch;
