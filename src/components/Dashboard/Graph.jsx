/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { gql, useQuery } from '@apollo/client';
import { Typography, Chip } from '@material-ui/core';

export default () => {
  const [metrics, setMetrics] = useState([]);

  const query = gql`
    query lastKnown($metric: String!) {
      getLastKnownMeasurement(metricName: $metric) {
        value
        unit
      }
    }
  `;

  const { data, error, loading } = useQuery(query, {
    variables: { metric: 'tubingPressure' },
    fetchPolicy: 'network-only',
    pollInterval: 1300,
    onCompleted: () => setMetrics([...metrics, data.getLastKnownMeasurement]),
  });

  if (loading) return <Typography> loading... </Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!data) return <Chip label="Metrics not found" />;

  console.log(metrics);

  return (
    // <></>
    <ResponsiveContainer width="70%" height="50%">
      <LineChart
        width={500}
        height={300}
        data={metrics}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="unit" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        {/* <Line type="monotone" dataKey="value" stroke="#82ca9d" /> */}
      </LineChart>
    </ResponsiveContainer>
  );
};

// export default () => (
//   <ResponsiveContainer width="70%" height="50%">
//     <LineChart
//       width={500}
//       height={300}
//       data={data}
//       margin={{
//         top: 5,
//         right: 30,
//         left: 20,
//         bottom: 5,
//       }}
//     >
//       <CartesianGrid strokeDasharray="3 3" />
//       <XAxis dataKey="value" />
//       <YAxis />
//       <Tooltip />
//       <Legend />
//       <Line
//         type="monotone"
//         dataKey="value"
//         stroke="#8884d8"
//         activeDot={{ r: 8 }}
//       />
//       {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
//     </LineChart>
//   </ResponsiveContainer>
// );
