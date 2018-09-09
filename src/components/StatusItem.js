import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import CardHeader from '@material-ui/core/CardHeader'
import Avatar from '@material-ui/core/Avatar'

const styles = theme => ({
  primary: {
    backgroundColor: theme.palette.primary.main,
  },
  error: {
    backgroundColor: theme.palette.error.main,
  },
  loading: {
    backgroundColor: 'inherit',
  },
})

const StatusItem = ({ classes, icon, title, color }) => (
  <CardHeader
    avatar={<Avatar className={classes[color]}>{icon}</Avatar>}
    title={title}
  />
)

export default withStyles(styles)(StatusItem)
