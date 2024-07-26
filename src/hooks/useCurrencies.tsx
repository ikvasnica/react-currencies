import {useQuery, UseQueryResult} from "@tanstack/react-query";
import CurrencyType from "../types/CurrencyType";

const API_URL: string = 'https://thingproxy.freeboard.io/fetch/https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt';
const API_QUERY_KEY: string = 'currencies';

const transformDataToCurrencies = (data: string): CurrencyType[] => {
    const lines: string[] = data.split('\n');

    return lines
        .slice(2)
        .filter(line => line)
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
};

const useCurrencies = (): UseQueryResult<CurrencyType[]> => {
    const fetchCurrencies = async (): Promise<string> => {
        const response: Response = await fetch(API_URL);

        return response.text();
    };

    return useQuery({queryKey: [API_QUERY_KEY], queryFn: fetchCurrencies, select: transformDataToCurrencies});
}

export default useCurrencies;
