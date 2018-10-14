import Grid from '@material-ui/core/Grid'
import React from 'react'
import { connect } from 'react-redux'
import Chart from '../components/Chart'
import ChartLoader from './Chart'
import Price from './Price'
import ProCharts from './ProCharts'

const Input = ({ prices }) => (
  <Grid container spacing={16}>
    <Grid item xs={12} sm={4} lg={3}>
      <ProCharts />
    </Grid>
    <Grid item xs={12} sm={4} lg={3}>
      <ChartLoader />
    </Grid>
    <Grid item xs={12} sm={4} lg={3}>
      <Price />
    </Grid>
    {prices &&
      Object.entries(prices).map(([symbol, data]) => (
        <Chart
          key={symbol}
          title={symbol}
          keys={['close']}
          data={data.slice(-100)}
        />
      ))}
  </Grid>
)

const mapStateToProps = ({ price }) => ({
  prices: price.prices,
})

export default connect(mapStateToProps)(Input)
