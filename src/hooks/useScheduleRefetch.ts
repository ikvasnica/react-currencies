import {QueryClient, QueryObserverResult, useQueryClient} from "@tanstack/react-query";
import {useEffect} from "react";
import {API_QUERY_KEY} from "./useCurrencies";
import CurrencyRates from "../types/CurrencyRates";

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
    console.log('[Refetch Scheduler] Next working day resolved to ', nextWorkingDayAt1430);

    return nextWorkingDayAt1430.getTime() - now.getTime();
}

const scheduleRefetchForNextWorkingDayAfternoon = (
    queryClient: QueryClient,
    currencyDataQueryResult: QueryObserverResult<CurrencyRates>
): number => {
    queryClient.setQueryDefaults([API_QUERY_KEY], {enabled: false});

    return window.setTimeout(() => {
        console.log('[Refetch Scheduler] Scheduled refetching based on a timer running...');
        queryClient.setQueryDefaults([API_QUERY_KEY], {enabled: true});
        currencyDataQueryResult.refetch();
    }, getMillisecondsUntilNextWorkingDayAfternoon());
}

const useScheduleRefetch = (currencyDataQueryResult: QueryObserverResult<CurrencyRates>): void => {
    const queryClient = useQueryClient();

    useEffect(() => {
        let timerId: number|null = null;
        console.log('[Refetch Scheduler] Refetch schedule check...');

        if (
            currencyDataQueryResult.data
            && (currencyDataQueryResult.data.ratesUpdatedAt.today || currencyDataQueryResult.data.ratesUpdatedAt.beforeWeekend)
        ) {
            timerId = scheduleRefetchForNextWorkingDayAfternoon(queryClient, currencyDataQueryResult);
            console.log('[Refetch Scheduler] Refetch scheduled for the next working day.');
        }

        return (): void => {
            console.log('[Refetch Scheduler] Checking for stale timers...');
            if (timerId !== null) {
                clearTimeout(timerId);
                console.log('[Refetch Scheduler] Refetch timer cleared.');
            }
        }
    }, [currencyDataQueryResult, queryClient]);
}

export default useScheduleRefetch;
