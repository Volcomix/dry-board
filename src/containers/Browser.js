import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import CancelIcon from '@material-ui/icons/Cancel'
import HelpIcon from '@material-ui/icons/Help'
import green from '@material-ui/core/colors/green'
import classNames from 'classnames'

import { startBrowser } from '../actions/browser'

const styles = theme => ({
  container: {
    display: 'flex',
  },
  card: {
    [theme.breakpoints.down('xs')]: {
      flexGrow: 1,
    },
  },
  content: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    fontSize: 32,
    marginRight: theme.spacing.unit,
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
    <Card className={classes.card}>
      <CardHeader subheader="Backend browser status" />
      <CardContent className={classes.content}>
        {isStarted === true && (
          <React.Fragment>
            <CheckCircleIcon
              className={classNames(classes.icon, classes.started)}
            />
            <Typography variant="headline">Started</Typography>
          </React.Fragment>
        )}
        {isStarted === false && (
          <React.Fragment>
            <CancelIcon className={classNames(classes.icon, classes.stopped)} />
            <Typography variant="headline">Stopped</Typography>
          </React.Fragment>
        )}
        {isStarted === undefined && (
          <React.Fragment>
            <HelpIcon className={classNames(classes.icon, classes.unknown)} />
            <Typography variant="headline">Unknown</Typography>
          </React.Fragment>
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
