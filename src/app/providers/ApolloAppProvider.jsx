import { ApolloProvider } from "@apollo/client/react";
import { apolloClient } from "../../graphql/client";

const ApolloAppProvider = ({ children }) => {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};

export default ApolloAppProvider;
