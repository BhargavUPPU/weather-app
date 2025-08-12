"use client";
import React, { createContext, useContext } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const ApolloContext = createContext();

export const ApolloContextProvider = ({ children }) => {
  const client = new ApolloClient({
    uri: "/api/graphql",
    cache: new InMemoryCache(),
  });

  return (
    <ApolloContext.Provider value={{ client }}>
      <ApolloProvider client={client}>
        {children}
      </ApolloProvider>
    </ApolloContext.Provider>
  );
};

export const useApollo = () => useContext(ApolloContext);
