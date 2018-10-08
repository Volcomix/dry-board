import Grid from '@material-ui/core/Grid'
import React from 'react'
import { connect } from 'react-redux'
import Chart from '../components/Chart'
import ChartLoader from './Chart'
import Price from './Price'
import ProCharts from './ProCharts'

const Input = ({ instruments, prices }) => (
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
    <Chart
      keys={instruments && instruments.map(instrument => instrument.name)}
      data={prices && prices.slice(-100)}
    />
  </Grid>
)

const mapStateToProps = ({ filter, price }) => ({
  instruments: filter.instruments,
  prices: price.prices,
})

export default connect(mapStateToProps)(Input)
