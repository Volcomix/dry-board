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
import StartedIcon from '@material-ui/icons/CheckCircle'
import StoppedIcon from '@material-ui/icons/Warning'
import UnknownIcon from '@material-ui/icons/Help'

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
  disabled: {
    color: theme.palette.text.disabled,
  },
})

const Browser = ({ classes, isConnected, isStarted, onStartBrowser }) => (
  <div className={classes.container}>
    <Card className={classes.card}>
      <CardHeader subheader="Backend browser status" />
      <CardContent className={classes.content}>
        {isStarted === true && (
          <React.Fragment>
            <StartedIcon color="primary" className={classes.icon} />
            <Typography variant="headline">Started</Typography>
          </React.Fragment>
        )}
        {isStarted === false && (
          <React.Fragment>
            <StoppedIcon color="error" className={classes.icon} />
            <Typography variant="headline" color="error">
              Stopped
            </Typography>
          </React.Fragment>
        )}
        {isStarted === undefined && (
          <React.Fragment>
            <UnknownIcon color="disabled" className={classes.icon} />
            <Typography variant="headline" className={classes.disabled}>
              Unknown
            </Typography>
          </React.Fragment>
        )}
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          size="small"
          color="primary"
          disabled={!isConnected}
          onClick={onStartBrowser}
        >
          {isStarted ? 'Restart' : 'Start'}
        </Button>
        <Button
          size="small"
          color="primary"
          disabled={!isConnected || !isStarted}
        >
          Stop
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
