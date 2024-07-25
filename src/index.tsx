import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import {CurrencyContextProvider} from "./state/CurrencyContext";

const root = ReactDOM.createRoot(
  document.getElementById('currency-converter-app') as HTMLElement
);
root.render(
  <React.StrictMode>
      <CurrencyContextProvider>
        <App />
      </CurrencyContextProvider>
  </React.StrictMode>
);
