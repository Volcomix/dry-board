import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import { withStyles } from '@material-ui/core/styles'
import StartedIcon from '@material-ui/icons/Check'
import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { startWebGL, stopWebGL } from '../actions/webgl'
import Status from '../components/Status'
import StatusItem from '../components/StatusItem'
import { Status as BrowserStatus } from '../reducers/browser'
import { Status as WebGLStatus } from '../reducers/webgl'

const styles = {
  startButton: {
    width: 72,
  },
}

const shouldStart = webglStatus => {
  return webglStatus === WebGLStatus.Stopped
}

const canStart = (webglStatus, browserStatus, isConnected) => {
  return (
    isConnected &&
    browserStatus === BrowserStatus.Started &&
    (webglStatus === WebGLStatus.Stopped || webglStatus === WebGLStatus.Started)
  )
}

const canStop = (webglStatus, browserStatus, isConnected) => {
  return (
    isConnected &&
    browserStatus === BrowserStatus.Started &&
    webglStatus === WebGLStatus.Started
  )
}

const isLoading = webglStatus => {
  return webglStatus === WebGLStatus.Starting
}

const WebGL = ({
  classes,
  isConnected,
  browserStatus,
  webglStatus,
  onStart,
  onStop,
}) => (
  <Card>
    <Status value={webglStatus} isLoading={isLoading(webglStatus)}>
      <StatusItem
        icon="!"
        title="Stopped"
        value={WebGLStatus.Stopped}
        color="error"
      />
      <StatusItem
        icon={<StartedIcon />}
        title="Started"
        value={WebGLStatus.Started}
        color="primary"
      />
    </Status>
    <CardActions>
      <Button
        variant={shouldStart(webglStatus) ? 'contained' : 'text'}
        size="small"
        color="primary"
        className={classes.startButton}
        disabled={!canStart(webglStatus, browserStatus, isConnected)}
        onClick={onStart}
      >
        {shouldStart(webglStatus) ? 'Start' : 'Restart'}
      </Button>
      <Button
        size="small"
        color="primary"
        disabled={!canStop(webglStatus, browserStatus, isConnected)}
        onClick={onStop}
      >
        Stop
      </Button>
    </CardActions>
  </Card>
)

const mapStateToProps = ({ dryMoose, browser, webgl }) => ({
  isConnected: dryMoose.isConnected,
  browserStatus: browser.status,
  webglStatus: webgl.status,
})

const mapDispatchToProps = dispatch => ({
  onStart: () => dispatch(startWebGL()),
  onStop: () => dispatch(stopWebGL()),
})

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(WebGL)
