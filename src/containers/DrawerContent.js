import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'

const styles = theme => ({
  toolbar: theme.mixins.toolbar,
})

const DrawerContent = ({ classes }) => (
  <React.Fragment>
    <div className={classes.toolbar} />
    <Divider />
  </React.Fragment>
)

export default withStyles(styles)(DrawerContent)
