# 🛍️ Curiate Shopify Product Page

This is a custom Shopify Storefront built with React and Apollo Client, showcasing live product data using the Storefront API.

Folder contains shopify-product-page that includes multiple files int it. These are as follow--

src/
├── components/
│   ├── ProductList.js
│   ├── Cart.js
│   ├── Checkout.js
│   └── ThankYou.js
├── context/
│   └── CartContext.js
├── App.js
├── index.js


## 🔧 Tech Stack

- React.js
- Apollo Client (GraphQL)
- Shopify Storefront API
- Context API for Cart Management

## 🚀 Features

- Fetch live product data from Shopify
- Dynamic category filtering
- Product search by name
- Sort by name or price
- Simulated cart and checkout flow
- Multi-variant product support (e.g., sizes)
- CSV-imported products and placeholder images

## 🌐 Storefront API Setup

1. Create a development store in Shopify
2. Enable custom app development
3. Create a custom app and configure Storefront API permissions
4. Get the Storefront Access Token
5. Set up Apollo Client:

```js
const client = new ApolloClient({
  uri: 'https://your-store-name.myshopify.com/api/2023-01/graphql.json',
  headers: {
    'X-Shopify-Storefront-Access-Token': 'your-token-here',
  },
  cache: new InMemoryCache(),
});
