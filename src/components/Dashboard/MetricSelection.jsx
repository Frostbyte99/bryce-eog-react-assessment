/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { LinearProgress, Typography } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import Metrics from './Metrics';
import Graph from './Graph';

const animatedComponent = makeAnimated();

const metricQuery = gql`
  query metrics {
    getMetrics
  }
`;

export default () => {
  const [metrics, setMetrics] = useState([]);

  const onChange = (option) => {
    setMetrics((option || []).map(({ value }) => value));
  };

  const { loading, error, data } = useQuery(metricQuery);

  if (loading) return <LinearProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!data) return <Chip label="Metrics not found" />;

  const options = data.getMetrics.map((metric) => ({
    value: metric,
    label: metric,
  }));

  return (
    <>
      <Select
        options={options}
        onChange={onChange}
        isMulti
        components={animatedComponent}
        closeMenuOnSelect={false}
      />
      <div>
        {metrics.map((metric, index) => (
          <Metrics metricProp={metric} key={index} />
        ))}
      </div>
      <div>
        <Graph />
      </div>
    </>
  );
};
