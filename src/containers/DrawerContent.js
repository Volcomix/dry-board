import React from 'react'
import Toolbar from '@material-ui/core/Toolbar'
import Divider from '@material-ui/core/Divider'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepButton from '@material-ui/core/StepButton'
import StepLabel from '@material-ui/core/StepLabel'
import StepContent from '@material-ui/core/StepContent'
import Typography from '@material-ui/core/Typography'

const DrawerContent = () => (
  <React.Fragment>
    <Toolbar>
      <Typography variant="title" color="textSecondary">
        Dry Board
      </Typography>
    </Toolbar>
    <Divider />
    <Stepper activeStep={2} orientation="vertical">
      <Step>
        <StepButton>Market Source</StepButton>
        <StepContent>
          <Typography>Choose market source.</Typography>
        </StepContent>
      </Step>
      <Step>
        <StepButton>Instruments</StepButton>
        <StepContent>
          <Typography>Choose instruments to trade.</Typography>
        </StepContent>
      </Step>
      <Step>
        <StepLabel>Quotes source</StepLabel>
        <StepContent>
          <Typography>Choose quotes source.</Typography>
        </StepContent>
      </Step>
      <Step>
        <StepLabel>Prepare data</StepLabel>
        <StepContent>
          <Typography>Prepare data for training.</Typography>
        </StepContent>
      </Step>
      <Step>
        <StepLabel>Train</StepLabel>
        <StepContent>
          <Typography>Configure machine learning for training.</Typography>
        </StepContent>
      </Step>
    </Stepper>
  </React.Fragment>
)

export default DrawerContent
