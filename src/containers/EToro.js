import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'

const EToro = () => (
  <Card>
    <CardContent>
      <Stepper activeStep={-1}>
        <Step>
          <StepLabel>Waiting for login</StepLabel>
        </Step>
        <Step>
          <StepLabel>Closing backdrop</StepLabel>
        </Step>
        <Step>
          <StepLabel>Setting demo mode</StepLabel>
        </Step>
      </Stepper>
    </CardContent>
    <CardActions>
      <Button variant="contained" size="small" color="primary">
        Start
      </Button>
    </CardActions>
  </Card>
)

export default EToro
