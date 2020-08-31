import React from 'react';
import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import Products from "./components/products";

function createClient() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: createHttpLink({
      uri: "http://localhost:4000/graphql",
    }),
  });
  return client;
}

function App() {
  return (
    <ApolloProvider client={createClient()}>
      <Products />
    </ApolloProvider>
  );
}

export default App;
