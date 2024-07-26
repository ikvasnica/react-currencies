import CurrencyType from "./CurrencyType";
import RatesUpdatedAtType from "./RatesUpdatedAtType";

export default interface CurrencyListType {
    ratesUpdatedAt: RatesUpdatedAtType,
    currencies: CurrencyType[],
}
