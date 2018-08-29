import React from 'react'
import { connect } from 'react-redux'
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

const EToro = ({ isConnected, isBrowserStarted, status, onStartEToro }) => (
  <Card>
    <CardContent>
      <Stepper activeStep={steps[status]} orientation="vertical">
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
        disabled={!isConnected || !isBrowserStarted || status !== 'stopped'}
        onClick={onStartEToro}
      >
        Start
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EToro)
