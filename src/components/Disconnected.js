import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import { withStyles } from '@material-ui/core/styles'
import DisconnectedIcon from '@material-ui/icons/CloudOff'
import React from 'react'

const styles = {
  card: {
    display: 'flex',
    justifyContent: 'center',
  },
  header: {
    alignItems: 'start',
  },
  avatar: {
    backgroundColor: 'unset',
    height: 'unset',
    fontSize: 32,
  },
}

const Disconnected = ({ classes }) => (
  <Card elevation={0} className={classes.card}>
    <CardHeader
      className={classes.header}
      avatar={
        <Avatar className={classes.avatar}>
          <DisconnectedIcon color="primary" fontSize="inherit" />
        </Avatar>
      }
      title="Disconnected"
      subheader="You have been disconnected from the Dry Moose server."
    />
  </Card>
)

export default withStyles(styles)(Disconnected)
