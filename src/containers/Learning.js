import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  container: {
    marginLeft: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 3,
  },
})

const Learning = ({ classes, data }) => (
  <div className={classes.container}>{JSON.stringify(data)}</div>
)

const mapStateToProps = state => ({
  data: state.learning,
})

export default connect(mapStateToProps)(withStyles(styles)(Learning))
