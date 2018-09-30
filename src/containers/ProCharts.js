import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import { withStyles } from '@material-ui/core/styles'
import StartedIcon from '@material-ui/icons/Check'
import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { startProCharts, stopProCharts } from '../actions/proCharts'
import Status from '../components/Status'
import StatusItem from '../components/StatusItem'
import { Status as BrowserStatus } from '../reducers/browser'
import { Status as EToroStatus } from '../reducers/eToro'
import { Status as ProChartsStatus } from '../reducers/proCharts'

const styles = {
  startButton: {
    width: 72,
  },
}

const shouldStart = proChartsStatus => {
  return proChartsStatus === ProChartsStatus.Stopped
}

const canStart = (proChartsStatus, eToroStatus, isConnected) => {
  return (
    isConnected &&
    eToroStatus === EToroStatus.Started &&
    (proChartsStatus === ProChartsStatus.Stopped ||
      proChartsStatus === ProChartsStatus.Started)
  )
}

const canStop = (proChartsStatus, browserStatus, isConnected) => {
  return (
    isConnected &&
    browserStatus === BrowserStatus.Started &&
    proChartsStatus === ProChartsStatus.Started
  )
}

const isLoading = proChartsStatus => {
  return proChartsStatus === ProChartsStatus.Starting
}

const ProCharts = ({
  classes,
  isConnected,
  browserStatus,
  eToroStatus,
  proChartsStatus,
  onStart,
  onStop,
}) => (
  <Card>
    <Status value={proChartsStatus} isLoading={isLoading(proChartsStatus)}>
      <StatusItem
        icon="!"
        title="Stopped"
        value={ProChartsStatus.Stopped}
        color="error"
      />
      <StatusItem
        icon={<StartedIcon />}
        title="Started"
        value={ProChartsStatus.Started}
        color="primary"
      />
    </Status>
    <CardActions>
      <Button
        variant={shouldStart(proChartsStatus) ? 'contained' : 'text'}
        size="small"
        color="primary"
        className={classes.startButton}
        disabled={!canStart(proChartsStatus, eToroStatus, isConnected)}
        onClick={onStart}
      >
        {shouldStart(proChartsStatus) ? 'Start' : 'Restart'}
      </Button>
      <Button
        size="small"
        color="primary"
        disabled={!canStop(proChartsStatus, browserStatus, isConnected)}
        onClick={onStop}
      >
        Stop
      </Button>
    </CardActions>
  </Card>
)

const mapStateToProps = ({ dryMoose, browser, eToro, proCharts }) => ({
  isConnected: dryMoose.isConnected,
  browserStatus: browser.status,
  eToroStatus: eToro.status,
  proChartsStatus: proCharts.status,
})

const mapDispatchToProps = dispatch => ({
  onStart: () => dispatch(startProCharts()),
  onStop: () => dispatch(stopProCharts()),
})

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(ProCharts)
