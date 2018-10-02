import Grid from '@material-ui/core/Grid'
import React from 'react'
import Chart from '../containers/Chart'
import ProCharts from '../containers/ProCharts'
import Price from '../containers/Price'

const Input = () => (
  <Grid container spacing={16}>
    <Grid item xs={12} sm={4} lg={3}>
      <ProCharts />
    </Grid>
    <Grid item xs={12} sm={4} lg={3}>
      <Chart />
    </Grid>
    <Grid item xs={12} sm={4} lg={3}>
      <Price />
    </Grid>
  </Grid>
)

export default Input
