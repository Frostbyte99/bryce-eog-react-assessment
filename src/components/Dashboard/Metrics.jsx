import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Typography, Chip } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  cardContent: {
    width: '20%',
    marginRight: '0.25rem',
    marginBottom: '0.25rem',
  },
});

export default ({ metricProp }) => {
  const classes = useStyles();

  const query = gql`
      query lastKnown ($metric: String!) {
        getLastKnownMeasurement(metricName: $metric) {
          value
          unit
        }
      }
    `;

  const { data, error, loading } = useQuery(query, {
    variables: { metric: metricProp },
    fetchPolicy: 'network-only',
    pollInterval: 1300,
  });
  if (loading) return <Typography> loading... </Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!data) return <Chip label="Metrics not found" />;

  return (
    <Card className={classes.cardContent}>
      <CardContent>
        <Typography variant="h6">{metricProp}</Typography>
        <Typography variant="h5">
          {data.getLastKnownMeasurement.value}
        </Typography>
      </CardContent>
    </Card>
  );
};
