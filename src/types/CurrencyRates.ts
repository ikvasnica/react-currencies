import Currency from "./Currency";
import RatesUpdatedAtDate from "./RatesUpdatedAtDate";

export default interface CurrencyRates {
    ratesUpdatedAt: RatesUpdatedAtDate,
    currencies: Currency[],
}
