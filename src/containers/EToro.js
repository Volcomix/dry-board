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
import Button from '@material-ui/core/Button'

import { startEToro } from '../actions/eToro'

const steps = {
  stopped: -1,
  login: 0,
  backdrop: 1,
  demoMode: 2,
  started: 3,
}

const EToro = ({
  width,
  isConnected,
  isBrowserStarted,
  status,
  onStartEToro,
}) => (
  <Card>
    <CardContent>
      <Stepper
        activeStep={steps[status]}
        orientation={isWidthDown('xs', width) ? 'vertical' : 'horizontal'}
      >
        <Step>
          <StepLabel>Login</StepLabel>
        </Step>
        <Step>
          <StepLabel>Backdrop</StepLabel>
        </Step>
        <Step>
          <StepLabel>Demo mode</StepLabel>
        </Step>
      </Stepper>
    </CardContent>
    <CardActions>
      <Button
        variant="contained"
        size="small"
        color="primary"
        disabled={!isConnected || !isBrowserStarted}
        onClick={onStartEToro}
      >
        {status === 'stopped' ? 'Start' : 'Restart'}
      </Button>
      <Button
        size="small"
        color="primary"
        disabled={!isConnected || !isBrowserStarted || status === 'stopped'}
      >
        Stop
      </Button>
    </CardActions>
  </Card>
)

const mapStateToProps = ({ dryMoose, browser, eToro }) => ({
  isConnected: dryMoose.isConnected,
  isBrowserStarted: browser.isStarted,
  status: eToro.status,
})

const mapDispatchToProps = dispatch => ({
  onStartEToro: () => dispatch(startEToro()),
})

export default compose(
  withWidth(),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(EToro)
