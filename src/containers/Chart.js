import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import LoadedIcon from '@material-ui/icons/Check'
import CancelledIcon from '@material-ui/icons/Close'
import React from 'react'
import { connect } from 'react-redux'
import {
  cancelInstrumentsCharts,
  loadInstrumentsCharts,
} from '../actions/chart'
import Status from '../components/Status'
import StatusItem from '../components/StatusItem'
import { Status as ChartStatus } from '../reducers/chart'
import { Status as FilterStatus } from '../reducers/filter'
import { Status as ProChartsStatus } from '../reducers/proCharts'

const canLoad = (
  instruments,
  chartStatus,
  filterStatus,
  proChartsStatus,
  isConnected,
) => {
  return (
    isConnected &&
    proChartsStatus === ProChartsStatus.Started &&
    filterStatus === FilterStatus.Filtered &&
    instruments &&
    instruments.length &&
    (chartStatus === ChartStatus.Stopped ||
      chartStatus === ChartStatus.Loaded ||
      chartStatus === ChartStatus.Cancelled)
  )
}

const canCancel = (chartStatus, isConnected) => {
  return isConnected && chartStatus === ChartStatus.Loading
}

const isLoading = chartStatus => {
  return (
    chartStatus === ChartStatus.Loading ||
    chartStatus === ChartStatus.Cancelling
  )
}

const Chart = ({
  isConnected,
  proChartsStatus,
  filterStatus,
  chartStatus,
  instruments,
  onLoad,
  onCancel,
}) => (
  <Card>
    <Status value={chartStatus} isLoading={isLoading(chartStatus)}>
      <StatusItem
        icon="!"
        title="Stopped"
        value={ChartStatus.Stopped}
        color="disabled"
      />
      <StatusItem
        icon={<CancelledIcon />}
        title="Cancelled"
        value={ChartStatus.Cancelled}
        color="error"
      />
      <StatusItem
        icon={<LoadedIcon />}
        title="Loaded"
        value={ChartStatus.Loaded}
        color="primary"
      />
    </Status>
    <CardActions>
      <Button
        variant="contained"
        size="small"
        color="primary"
        disabled={
          !canLoad(
            instruments,
            chartStatus,
            filterStatus,
            proChartsStatus,
            isConnected,
          )
        }
        onClick={onLoad}
      >
        Load
      </Button>
      <Button
        size="small"
        color="primary"
        disabled={!canCancel(chartStatus, isConnected)}
        onClick={onCancel}
      >
        Cancel
      </Button>
    </CardActions>
  </Card>
)

const mapStateToProps = ({ dryMoose, proCharts, filter, chart }) => ({
  isConnected: dryMoose.isConnected,
  proChartsStatus: proCharts.status,
  filterStatus: filter.status,
  chartStatus: chart.status,
  instruments: filter.instruments,
})

const mapDispatchToProps = dispatch => ({
  onLoad: () => dispatch(loadInstrumentsCharts()),
  onCancel: () => dispatch(cancelInstrumentsCharts()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Chart)
