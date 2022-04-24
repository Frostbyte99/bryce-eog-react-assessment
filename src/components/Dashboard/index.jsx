import React from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import MetricSelection from './MetricSelection';

const useStyles = makeStyles({
  selection: {
    float: 'middle',
    width: '50%',
  },
});

const Dashboard = () => {
  const styles = useStyles();

  const client = new ApolloClient({
    uri: 'https://react-assessment.herokuapp.com/graphql',
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <div className={styles.wrapper}>
        <div className={styles.selection}>
          <MetricSelection />
        </div>
      </div>
    </ApolloProvider>
  );
};

export default Dashboard;
