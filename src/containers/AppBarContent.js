import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  title: {
    flexGrow: 1,
  },
})

const AppBarContent = ({ classes }) => (
  <Toolbar>
    <Typography variant="title" color="inherit" className={classes.title}>
      Quotes source
    </Typography>
  </Toolbar>
)

export default withStyles(styles)(AppBarContent)
