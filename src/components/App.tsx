import CurrencyList from './CurrencyList';
import {useContext, useEffect} from "react";
import CurrencyContext from "../state/CurrencyContext";

const App = () => {
  const { fetchCurrencies } = useContext(CurrencyContext);

  useEffect(() => {
      fetchCurrencies();
  }, [fetchCurrencies]);

  return (
    <div className='app'>
        <h1>Currency Converter</h1>
        <CurrencyList  />
    </div>
  );
}

export default App;
