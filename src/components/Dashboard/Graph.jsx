import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Typography, Chip } from '@material-ui/core';
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
} from 'recharts';

const query = gql`
  query lastKnown($metric: String!) {
    getLastKnownMeasurement(metricName: $metric) {
      value
      unit
      at
    }
  }
`;

export default ({ metricProp }) => {
  const [metrics, setMetrics] = useState([]);
  const { data, error, loading } = useQuery(query, {
    variables: { metric: metricProp },
    fetchPolicy: 'network-only',
    pollInterval: 1300,
    onCompleted: () => {
      const date = new Date(data.getLastKnownMeasurement.at);
      const hour = date.getHours();
      const minutes = date.getMinutes();
      data.getLastKnownMeasurement.at = `${hour}:${minutes}`;
      setMetrics([...metrics, data.getLastKnownMeasurement]);
    },
  });

  if (loading) return <Typography> loading... </Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!data) return <Chip label="Metrics not found" />;

  return (
    <>
      <LineChart
        width={700}
        height={300}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="at" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          data={metrics}
          label={metricProp}
          type="monotone"
          dataKey="value"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </>
  );
};
