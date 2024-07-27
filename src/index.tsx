import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import {QueryClient} from "@tanstack/react-query";
import {createSyncStoragePersister} from "@tanstack/query-sync-storage-persister";
import {PersistQueryClientProvider} from "@tanstack/react-query-persist-client";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000, // 5 minutes
            gcTime: 24 * 60 * 60 * 1000, // 24 hours
        }
    }
});
const queryPersister = createSyncStoragePersister({
    storage: window.localStorage,
});

const root = ReactDOM.createRoot(
  document.getElementById('currency-converter-app') as HTMLElement
);

root.render(
  <React.StrictMode>
      <PersistQueryClientProvider client={queryClient} persistOptions={{persister: queryPersister}}>
          <App />
      </PersistQueryClientProvider>
  </React.StrictMode>
);
