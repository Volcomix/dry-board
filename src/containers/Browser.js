import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import Button from '@material-ui/core/Button'
import Collapse from '@material-ui/core/Collapse'
import StartedIcon from '@material-ui/icons/Check'

import { Status as BrowserStatus } from '../reducers/browser'
import {
  startBrowser,
  stopBrowser,
  sendBrowserConfig,
} from '../actions/browser'
import Status from '../components/Status'
import StatusItem from '../components/StatusItem'

const styles = {
  startButton: {
    width: 72,
  },
}

const shouldStart = status => {
  return status === undefined || status === BrowserStatus.Stopped
}

const canStart = (status, isConnected) => {
  return (
    isConnected &&
    (status === BrowserStatus.Stopped || status === BrowserStatus.Started)
  )
}

const canStop = (status, isConnected) => {
  return isConnected && status === BrowserStatus.Started
}

const isLoading = status => {
  return status === BrowserStatus.Stopping || status === BrowserStatus.Starting
}

const Browser = ({
  classes,
  config,
  isConnected,
  browserStatus,
  onStart,
  onStop,
  onChangeConfig,
}) => (
  <Grid container>
    <Grid item xs={12} sm={4} lg={3}>
      <Card>
        <Status value={browserStatus} isLoading={isLoading(browserStatus)}>
          <StatusItem
            icon="?"
            title="Unknown"
            value={undefined}
            color="disabled"
          />
          <StatusItem
            icon="!"
            title="Stopped"
            value={BrowserStatus.Stopped}
            color="error"
          />
          <StatusItem
            icon={<StartedIcon />}
            title="Started"
            value={BrowserStatus.Started}
            color="primary"
          />
        </Status>
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
            variant={shouldStart(browserStatus) ? 'contained' : 'text'}
            size="small"
            color="primary"
            className={classes.startButton}
            disabled={!canStart(browserStatus, isConnected)}
            onClick={onStart}
          >
            {shouldStart(browserStatus) ? 'Start' : 'Restart'}
          </Button>
          <Button
            size="small"
            color="primary"
            disabled={!canStop(browserStatus, isConnected)}
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
  browserStatus: browser.status,
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
