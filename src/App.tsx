import { FC } from 'react';
import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './queries/apollo';
import { CharList } from './components/CharList';

export const App: FC = () => (
  <ApolloProvider client={client}>
    <h1>Rick and Morty chars</h1>
    <CharList />
  </ApolloProvider>
)
