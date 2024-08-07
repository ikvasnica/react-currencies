import Currency from "../types/Currency";
import CurrencyRates from "../types/CurrencyRates";
import RatesUpdatedAtDate from "../types/RatesUpdatedAtDate";
import {useQuery, UseQueryResult} from "@tanstack/react-query";

const API_URL: string = 'https://cors-proxy.ivan-531.workers.dev/?https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt';
const API_QUERY_KEY: string = 'currencies';

const transformDataToCurrencies = (data: string): CurrencyRates => {
    const getRatesUpdatedAt = (lines: string[]): RatesUpdatedAtDate => {
        const isToday = (date: Date): boolean => {
            const today = new Date();

            return date.getDate() === today.getDate() &&
                date.getMonth() === today.getMonth() &&
                date.getFullYear() === today.getFullYear();
        }

        const firstLine: string = lines[0];
        const date: Date = new Date(firstLine.split(' #')[0]);

        return {
            date,
            today: isToday(date),
            beforeWeekend: date.getDay() === 5,
        };
    };
    const lines: string[] = data.split('\n');

    if (lines.length < 3) {
        console.error(`[Currency Query] Invalid response from API: `, data);

        return {
            ratesUpdatedAt: {date: null, today: false, beforeWeekend: false},
            currencies: [],
        }
    }

    const currencies = lines
        .slice(2)
        .filter(line => line) // remove the last empty line
        .map((line: string): Currency => {
            const [country, currencyName, amount, currencyCode, rate] = line.split('|');

            return {
                country,
                currencyName,
                amount: Number(amount),
                currencyCode,
                rate: Number(rate),
            };
        });

    const ratesUpdatedAt = getRatesUpdatedAt(lines);
    console.log(`[Currency Query] ${currencies.length} currencies fetched, updated at ${ratesUpdatedAt.date}.`);

    return {ratesUpdatedAt, currencies};
};

const useCurrencies = (): UseQueryResult<CurrencyRates> => {
    const fetchCurrencies = async (): Promise<string> => {
        console.log('[Currency Query] Fetching currencies from API..');
        const response: Response = await fetch(
            API_URL, {
                method: 'GET',
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'text/plain',
                }
            }
        );

        return response.text();
    };

    return useQuery({
        queryKey: [API_QUERY_KEY],
        queryFn: fetchCurrencies,
        select: transformDataToCurrencies,
    });
}

export default useCurrencies;
export {API_QUERY_KEY};
