import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import CircularProgress from '@material-ui/core/CircularProgress'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Collapse from '@material-ui/core/Collapse'
import StartedIcon from '@material-ui/icons/Check'

import { Status } from '../reducers/browser'
import {
  startBrowser,
  stopBrowser,
  sendBrowserConfig,
} from '../actions/browser'

const styles = theme => ({
  stopped: {
    backgroundColor: theme.palette.error.main,
  },
  started: {
    backgroundColor: theme.palette.primary.main,
  },
  loading: {
    backgroundColor: 'inherit',
  },
  startButton: {
    width: 72,
  },
})

const shouldStart = status => {
  return status === undefined || status === Status.Stopped
}

const canStart = (status, isConnected) => {
  return isConnected && (status === Status.Stopped || status === Status.Started)
}

const canStop = (status, isConnected) => {
  return isConnected && status === Status.Started
}

const isLoading = status => {
  return status === Status.Stopping || status === Status.Starting
}

const Browser = ({
  classes,
  config,
  isConnected,
  status,
  onStart,
  onStop,
  onChangeConfig,
}) => (
  <Grid container>
    <Grid item xs={12} sm={4} lg={3}>
      <Card>
        {status === undefined && (
          <CardHeader avatar={<Avatar>?</Avatar>} title="Unknown" />
        )}
        {status === Status.Stopped && (
          <CardHeader
            avatar={<Avatar className={classes.stopped}>!</Avatar>}
            title="Stopped"
          />
        )}
        {status === Status.Started && (
          <CardHeader
            avatar={
              <Avatar className={classes.started}>
                <StartedIcon />
              </Avatar>
            }
            title="Started"
          />
        )}
        {isLoading(status) && (
          <CardHeader
            avatar={
              <Avatar className={classes.loading}>
                <CircularProgress />
              </Avatar>
            }
          />
        )}
        <Collapse in={!!config}>
          {config && (
            <CardContent>
              <FormControlLabel
                control={
                  <Switch
                    color="primary"
                    checked={config.headless}
                    disabled={!isConnected}
                    onChange={event =>
                      onChangeConfig('headless', event.target.checked)
                    }
                  />
                }
                label="Headless"
              />
            </CardContent>
          )}
        </Collapse>
        <CardActions>
          <Button
            variant={shouldStart(status) ? 'contained' : 'text'}
            size="small"
            color="primary"
            className={classes.startButton}
            disabled={!canStart(status, isConnected)}
            onClick={onStart}
          >
            {shouldStart(status) ? 'Start' : 'Restart'}
          </Button>
          <Button
            size="small"
            color="primary"
            disabled={!canStop(status, isConnected)}
            onClick={onStop}
          >
            Stop
          </Button>
        </CardActions>
      </Card>
    </Grid>
  </Grid>
)

const mapStateToProps = ({ dryMoose, browser }) => ({
  config: browser.config,
  isConnected: dryMoose.isConnected,
  status: browser.status,
})

const mapDispatchToProps = dispatch => ({
  onStart: () => dispatch(startBrowser()),
  onStop: () => dispatch(stopBrowser()),
  onChangeConfig: (key, value) => dispatch(sendBrowserConfig(key, value)),
})

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Browser)
