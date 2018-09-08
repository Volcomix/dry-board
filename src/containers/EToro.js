import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import withWidth, { isWidthDown } from '@material-ui/core/withWidth'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import Button from '@material-ui/core/Button'
import Collapse from '@material-ui/core/Collapse'

import { Status as BrowserStatus } from '../reducers/browser'
import { Status as EToroStatus } from '../reducers/eToro'
import { startEToro, stopEToro, sendEToroConfig } from '../actions/eToro'

const steps = {
  [EToroStatus.Stopped]: -1,
  [EToroStatus.Open]: 0,
  [EToroStatus.Login]: 1,
  [EToroStatus.Backdrop]: 2,
  [EToroStatus.DemoMode]: 3,
  [EToroStatus.Started]: 4,
}

const shouldStart = eToroStatus => {
  return eToroStatus === EToroStatus.Stopped
}

const canStart = (eToroStatus, browserStatus, isConnected) => {
  return (
    isConnected &&
    browserStatus === BrowserStatus.Started &&
    (eToroStatus === EToroStatus.Stopped || eToroStatus === EToroStatus.Started)
  )
}

const canStop = (eToroStatus, browserStatus, isConnected) => {
  return (
    isConnected &&
    browserStatus === BrowserStatus.Started &&
    eToroStatus === EToroStatus.Started
  )
}

const EToro = ({
  width,
  config,
  isConnected,
  browserStatus,
  eToroStatus,
  onStart,
  onStop,
  onChangeConfig,
}) => (
  <Card>
    <CardContent>
      <Stepper
        activeStep={steps[eToroStatus]}
        orientation={isWidthDown('xs', width) ? 'vertical' : 'horizontal'}
      >
        <Step>
          <StepLabel>Open</StepLabel>
        </Step>
        <Step>
          <StepLabel>Login</StepLabel>
        </Step>
        <Step>
          <StepLabel>Backdrop</StepLabel>
        </Step>
        <Step>
          <StepLabel>Demo</StepLabel>
        </Step>
      </Stepper>
      <Collapse in={!!config}>
        {config && (
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={!config.demoMode}
                  disabled={!isConnected}
                  onChange={event =>
                    onChangeConfig('demoMode', !event.target.checked)
                  }
                />
              }
              label="Real trades"
            />
          </FormGroup>
        )}
      </Collapse>
    </CardContent>
    <CardActions>
      <Button
        variant={shouldStart(eToroStatus) ? 'contained' : 'text'}
        size="small"
        color="primary"
        disabled={!canStart(eToroStatus, browserStatus, isConnected)}
        onClick={onStart}
      >
        {shouldStart(eToroStatus) ? 'Start' : 'Restart'}
      </Button>
      <Button
        size="small"
        color="primary"
        disabled={!canStop(eToroStatus, browserStatus, isConnected)}
        onClick={onStop}
      >
        Stop
      </Button>
    </CardActions>
  </Card>
)

const mapStateToProps = ({ dryMoose, browser, eToro }) => ({
  config: eToro.config,
  isConnected: dryMoose.isConnected,
  browserStatus: browser.status,
  eToroStatus: eToro.status,
})

const mapDispatchToProps = dispatch => ({
  onStart: () => dispatch(startEToro()),
  onStop: () => dispatch(stopEToro()),
  onChangeConfig: (key, value) => dispatch(sendEToroConfig(key, value)),
})

export default compose(
  withWidth(),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(EToro)
