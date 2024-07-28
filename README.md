# React Currency Converter
A simple React app that downloads currency data from the Czech National Bank and allows to convert from/to Czech crowns (CZK).

### [Demo App on GitHub Pages](https://ikvasnica.github.io/react-currencies/)

## Development
### How to run locally
1. Install the dependencies with `npm install`
2. Start the development server by running `npm start`.
3. That's it!

### Tests
- React Components tests: `npm test`
- Browser tests in Playwright: `npx playwright test`

## Tech stack
- React.js + TypeScript
- React Hooks
- React Query with the `query-sync-storage-persister` plugin
- React Styled Components with Tailwind CSS

## Source API
- API endpoint: https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt
- Documentation: https://www.cnb.cz/en/faq/Format-of-the-foreign-exchange-market-rates/

## Issues
### CORS
Due to the fact that CNB API does not follow [best practices for CORS settings on the server](https://opendata.gov.cz/%C5%A1patn%C3%A1-praxe:chyb%C4%9Bj%C3%ADc%C3%AD-cors), I use a custom CORS proxy run as a Cloudflare Worker. Free online proxies work only from localhost or are highly unstable.

All API calls are proxied through this server.

### Caching
App is designed in a way so it's doesn't call the API unnecessarily often. It uses caching into browser's `localStorage` as well as doesn't call the API after today's data are already fetched. If it's a weekend, it waits until Monday for a refetch. However, the solution is not 100% reliable as the React Query sometimes make a refetch anyway.
