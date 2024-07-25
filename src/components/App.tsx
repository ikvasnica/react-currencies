import { FC } from 'react';
import CurrencyList from './CurrencyList';
import CurrencyType from '../types/CurrencyType';

const exampleCurrencies: Array<CurrencyType> = [
  {
    currencyCode: 'EUR',
    currencyName: 'euro',
    country: 'EMU',
    amount: 1,
    rate: 25.5,
  },
  {
    currencyCode: 'USD',
    currencyName: 'dolar',
    country: 'Spojené státy',
    amount: 1,
    rate: 20,
  },
  ];

const App: FC = () => {
  return (
    <div className='app'>
      <div className='title'>
        <h1>Currency Converter</h1>
      </div>
      <CurrencyList currencies={exampleCurrencies} />
    </div>
  );
}

export default App;
