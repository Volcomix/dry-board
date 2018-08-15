import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import green from '@material-ui/core/colors/green'

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
  started: {
    color: green['A700'],
  },
  stopped: {
    color: theme.palette.error.main,
  },
  unknown: {
    color: theme.palette.text.secondary,
  },
})

const Browser = ({ classes, isConnected, isStarted, onStartBrowser }) => (
  <div className={classes.container}>
    <Card className={classes.status}>
      <CardContent>
        <Typography variant="caption">Backend browser status</Typography>
        {isStarted === true && (
          <Typography variant="title" className={classes.started}>
            Started
          </Typography>
        )}
        {isStarted === false && (
          <Typography variant="title" className={classes.stopped}>
            Stopped
          </Typography>
        )}
        {isStarted === undefined && (
          <Typography variant="title" className={classes.unknown}>
            Unknown
          </Typography>
        )}
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
