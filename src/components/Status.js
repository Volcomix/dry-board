import CircularProgress from '@material-ui/core/CircularProgress'
import React from 'react'
import StatusItem from '../components/StatusItem'

const Status = ({ children, value, isLoading }) =>
  isLoading ? (
    <StatusItem icon={<CircularProgress />} color="loading" />
  ) : (
    React.Children.map(children, child => child.props.value === value && child)
  )

export default Status
