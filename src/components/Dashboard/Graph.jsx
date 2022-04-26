/* eslint-disable no-plusplus */
/* eslint-disable no-bitwise */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  ResponsiveContainer,
} from 'recharts';
import moment from 'moment';
import stc from 'string-to-color';

export default ({ metricData }) => (
  <ResponsiveContainer width="80%" height="70%">
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
      <Tooltip labelFormatter={(value) => `Time: ${moment(value).format('hh:mm:ss A')}`} />
      <Legend />
      <XAxis
        dataKey="at"
        domain={['auto', 'auto']}
        name="Time"
        tickFormatter={(unixTime) => moment(unixTime).format('HH:mm')}
        type="number"
      />
      <YAxis
        yAxisId="PSI"
        dataKey="value"
        label={{ value: 'PSI', position: 'insideTopLeft', dy: -10 }}
      />
      <YAxis yAxisId="F" dataKey="value" label={{ value: 'F', position: 'insideTopLeft', dy: -10 }} />
      <YAxis yAxisId="%" dataKey="value" label={{ value: '%', position: 'insideTopLeft', dy: -10 }} min={0} max={100} />
      {metricData.map((metric, index) => (
        <>
          <Line
            key={index}
            data={metric.measurements}
            type="monotone"
            dataKey="value"
            name={metric.measurements[0].metric}
            stroke={stc(metric.measurements[0].metric)}
            yAxisId={metric.measurements[0].unit}
          />
        </>
      ))}
    </LineChart>
  </ResponsiveContainer>
);
