import CurrencyType from "../types/CurrencyType";
import CurrencyListType from "../types/CurrencyListType";
import RatesUpdatedAtType from "../types/RatesUpdatedAtType";
import {useQuery, UseQueryResult} from "@tanstack/react-query";

const API_URL: string = 'https://thingproxy.freeboard.io/fetch/https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt';
const API_QUERY_KEY: string = 'currencies';

const transformDataToCurrencies = (data: string): CurrencyListType => {
    const getRatesUpdatedAt = (lines: string[]): RatesUpdatedAtType => {
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
        };
    };
    const lines: string[] = data.split('\n');

    if (lines.length < 3) {
        return {
            ratesUpdatedAt: {date: null, today: false},
            currencies: [],
        }
    }

    const currencies = lines
        .slice(2)
        .filter(line => line) // remove the last empty line
        .map((line: string): CurrencyType => {
            const [country, currencyName, amount, currencyCode, rate] = line.split('|');

            return {
                country,
                currencyName,
                amount: Number(amount),
                currencyCode,
                rate: Number(rate),
            };
        });

    return {
        ratesUpdatedAt: getRatesUpdatedAt(lines),
        currencies,
    };
};

const useCurrencies = (): UseQueryResult<CurrencyListType> => {
    const fetchCurrencies = async (): Promise<string> => {
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
        staleTime: 5 * 60 * 1000,
    });
}

export default useCurrencies;
export {API_QUERY_KEY};