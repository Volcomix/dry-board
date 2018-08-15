import React from 'react'
import { connect } from 'react-redux'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import { startBrowser } from '../actions/browser'

const Browser = ({ isConnected, isStarted, onStartBrowser }) => {
  let status
  if (isStarted === true) {
    status = 'Started'
  } else if (isStarted === false) {
    status = 'Stopped'
  } else {
    status = 'Unknown'
  }
  return (
    <Card>
      <CardContent>
        <Typography variant="caption">Backend browser status</Typography>
        <Typography variant="title">{status}</Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          color="primary"
          disabled={!isConnected || isStarted}
          onClick={onStartBrowser}
        >
          Start
        </Button>
      </CardActions>
    </Card>
  )
}

const mapStateToProps = ({ dryMoose, browser }) => ({
  isConnected: dryMoose.isConnected,
  isStarted: browser.isStarted,
})

const mapDispatchToProps = dispatch => ({
  onStartBrowser: () => dispatch(startBrowser()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Browser)
