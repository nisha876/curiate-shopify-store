import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

console.log("SHOPIFY DOMAIN:", process.env.REACT_APP_SHOPIFY_DOMAIN);
console.log("SHOPIFY TOKEN:", process.env.REACT_APP_SHOPIFY_TOKEN);

const client = new ApolloClient({
  uri: `https://${process.env.REACT_APP_SHOPIFY_DOMAIN}/api/2023-01/graphql.json`,
  headers: {
    'X-Shopify-Storefront-Access-Token': process.env.REACT_APP_SHOPIFY_TOKEN,
  },
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
