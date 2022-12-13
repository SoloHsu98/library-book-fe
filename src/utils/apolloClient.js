import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: "http://0.0.0.0:7131/admin",
});
const client = new ApolloClient({
  cache,
  link,
});

export default client;
