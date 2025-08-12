"use client";
import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri:"/api/graphql", // URL of your Apollo GraphQL server
  cache: new InMemoryCache(),
});

export default client;
