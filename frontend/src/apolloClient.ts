import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client/core";

const link = new HttpLink({
  uri: "http://127.0.0.1:8000/graphql/",
});

export const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
