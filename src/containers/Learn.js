import Grid from '@material-ui/core/Grid'
import React from 'react'
import WebGL from './WebGL'

const Learn = () => (
  <Grid container spacing={16}>
    <Grid item xs={12} sm={4} lg={3}>
      <WebGL />
    </Grid>
  </Grid>
)

export default Learn
