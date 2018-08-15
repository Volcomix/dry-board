import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import { startBrowser } from '../actions/browser'

const styles = theme => ({
  container: {
    display: 'flex',
  },
  status: {
    [theme.breakpoints.down('xs')]: {
      flexGrow: 1,
    },
  },
})

const Browser = ({ classes, isConnected, isStarted, onStartBrowser }) => {
  let status
  if (isStarted === true) {
    status = 'Started'
  } else if (isStarted === false) {
    status = 'Stopped'
  } else {
    status = 'Unknown'
  }
  return (
    <div className={classes.container}>
      <Card className={classes.status}>
        <CardContent>
          <Typography variant="caption">Backend browser status</Typography>
          <Typography variant="title">{status}</Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            color="primary"
            disabled={!isConnected || isStarted}
            onClick={onStartBrowser}
          >
            Start
          </Button>
        </CardActions>
      </Card>
    </div>
  )
}

const mapStateToProps = ({ dryMoose, browser }) => ({
  isConnected: dryMoose.isConnected,
  isStarted: browser.isStarted,
})

const mapDispatchToProps = dispatch => ({
  onStartBrowser: () => dispatch(startBrowser()),
})

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Browser)
