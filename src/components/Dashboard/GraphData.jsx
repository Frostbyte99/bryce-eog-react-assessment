/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import Graph from './Graph';

const query = gql`
  query getMultiple($inputs: [MeasurementQuery]!) {
    getMultipleMeasurements(
      input: $inputs
    ) {
      measurements {
        metric
        value
        at
        unit
      }
    }
  }
`;

export default ({ metricSelection }) => {
  const [metrics, setMetrics] = useState([]);
  const [queryArgs, setQueryArgs] = useState([]);

  const historical = new Date() - 30 * 60 * 1000;

  useEffect(() => {
    setQueryArgs([]);
    setMetrics([]);
    metricSelection.map((metric) => {
      setQueryArgs([
        ...queryArgs,
        { metricName: metric, after: historical },
      ]);
    });
  }, [metricSelection]);

  const { data } = useQuery(query, {
    variables: { inputs: queryArgs },
    pollInterval: 1300,
    onCompleted: () => {
      setMetrics(data.getMultipleMeasurements);
    },
  });

  return <Graph metricData={metrics} />;
};
