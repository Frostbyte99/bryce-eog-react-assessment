import React from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import MetricSelection from './MetricSelection';

const Dashboard = () => {
  const client = new ApolloClient({
    uri: 'https://react-assessment.herokuapp.com/graphql',
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <MetricSelection />
    </ApolloProvider>
  );
};

export default Dashboard;
