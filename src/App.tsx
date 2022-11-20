import { FC } from "react";
import { ApolloProvider } from "@apollo/client";
import client from "./queries/apollo";
import { CharList } from "./components/CharList";

export const App: FC = () => {
  return (
    <ApolloProvider client={client}>
      <CharList />
    </ApolloProvider>
  );
};
