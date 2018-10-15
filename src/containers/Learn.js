import Grid from '@material-ui/core/Grid'
import React from 'react'
import { connect } from 'react-redux'
import Chart from '../components/Chart'
import Feature from './Feature'
import WebGL from './WebGL'

const Learn = ({ features }) => (
  <Grid container spacing={16}>
    <Grid item container spacing={16}>
      <Grid item xs={12} sm={4} lg={3}>
        <Feature />
      </Grid>
      <Grid item xs={12} sm={4} lg={3}>
        <WebGL />
      </Grid>
    </Grid>
    <Grid item container spacing={16}>
      {features &&
        Object.entries(features).map(([symbol, data]) => (
          <Chart
            key={symbol}
            title={symbol}
            keys={[
              ...Array.from({ length: 4 }, (_, i) => `change-${i + 1}`),
              ...Array.from({ length: 4 }, (_, i) => `range-${i + 1}`),
            ]}
            data={data.slice(-100)}
          />
        ))}
    </Grid>
  </Grid>
)

const mapStateToProps = ({ feature }) => ({
  features: feature.features,
})

export default connect(mapStateToProps)(Learn)
