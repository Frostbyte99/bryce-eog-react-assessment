/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { LinearProgress, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import {
  ResponsiveContainer,
} from 'recharts';
import Metrics from './Metrics';
import Graph from './Graph';

const animatedComponent = makeAnimated();

const metricQuery = gql`
  query metrics {
    getMetrics
  }
`;

const useStyles = makeStyles({
  selection: {
    float: 'right',
    width: '50%',
  },
});

export default () => {
  const [metrics, setMetrics] = useState([]);

  const onChange = (option) => {
    setMetrics((option || []).map(({ value }) => value));
  };

  const styles = useStyles();

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
      <div className={styles.selection}>
        <Select
          options={options}
          onChange={onChange}
          isMulti
          components={animatedComponent}
          closeMenuOnSelect={false}
        />
      </div>
      <div>
        {metrics.map((metric, index) => (
          <>
            <Metrics metricProp={metric} key={index} />
            <ResponsiveContainer width="70%" height="50%">
              <Graph metricProp={metric} key={index} />
            </ResponsiveContainer>
          </>
        ))}
      </div>
    </>
  );
};
