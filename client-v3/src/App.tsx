import React from 'react';
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react/context";
import Products from "./components/products";
import { createCache } from "./cache";

function App() {
  return (
    <ApolloProvider client={createClient()}>
      <Products />
    </ApolloProvider>
  );
}

function createClient() {
  const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: createCache(),
  });
  return client;
}

export default App;
