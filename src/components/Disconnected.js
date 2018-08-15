import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import Avatar from '@material-ui/core/Avatar'
import Icon from '@material-ui/core/Icon'

const styles = theme => ({
  card: {
    flexShrink: 0,
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      justifyContent: 'center',
    },
  },
  header: {
    alignItems: 'start',
  },
  avatar: {
    backgroundColor: 'unset',
    height: 'unset',
    fontSize: 32,
  },
})

const Disconnected = ({ classes }) => (
  <Card elevation={3} className={classes.card}>
    <CardHeader
      className={classes.header}
      avatar={
        <Avatar className={classes.avatar}>
          <Icon color="primary" fontSize="inherit">
            cloud_off
          </Icon>
        </Avatar>
      }
      title="Disconnected"
      subheader="You have been disconnected from the Dry Moose server."
    />
  </Card>
)

export default withStyles(styles)(Disconnected)
