import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Collapse from '@material-ui/core/Collapse'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import { withStyles } from '@material-ui/core/styles'
import ReadIcon from '@material-ui/icons/Check'
import CancelledIcon from '@material-ui/icons/Close'
import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import {
  cancelPricesReading,
  readPrices,
  sendPriceConfig,
} from '../actions/price'
import Status from '../components/Status'
import StatusItem from '../components/StatusItem'
import { Status as ChartStatus } from '../reducers/chart'
import { Status as FilterStatus } from '../reducers/filter'
import { Status as PriceStatus } from '../reducers/price'
import { Status as ProChartsStatus } from '../reducers/proCharts'

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
}

const canRead = (
  instruments,
  priceStatus,
  chartStatus,
  filterStatus,
  proChartsStatus,
  isConnected,
) => {
  return (
    isConnected &&
    proChartsStatus === ProChartsStatus.Started &&
    filterStatus === FilterStatus.Filtered &&
    chartStatus === ChartStatus.Loaded &&
    instruments &&
    instruments.length &&
    (priceStatus === PriceStatus.Stopped ||
      priceStatus === PriceStatus.Read ||
      priceStatus === PriceStatus.Cancelled)
  )
}

const canCancel = (priceStatus, isConnected) => {
  return isConnected && priceStatus === PriceStatus.Reading
}

const isLoading = priceStatus => {
  return (
    priceStatus === PriceStatus.Reading ||
    priceStatus === PriceStatus.Cancelling
  )
}

const Price = ({
  classes,
  config,
  isConnected,
  proChartsStatus,
  filterStatus,
  chartStatus,
  priceStatus,
  instruments,
  onRead,
  onCancel,
  onChangeConfig,
}) => (
  <Card>
    <Status value={priceStatus} isLoading={isLoading(priceStatus)}>
      <StatusItem
        icon="!"
        title="Stopped"
        value={PriceStatus.Stopped}
        color="disabled"
      />
      <StatusItem
        icon={<CancelledIcon />}
        title="Cancelled"
        value={PriceStatus.Cancelled}
        color="error"
      />
      <StatusItem
        icon={<ReadIcon />}
        title="Read"
        value={PriceStatus.Read}
        color="primary"
      />
    </Status>
    <Collapse in={!!config}>
      {config && (
        <CardContent className={classes.form}>
          <FormControl disabled={!isConnected}>
            <InputLabel>Period</InputLabel>
            <Select
              value={config.period}
              onChange={event => onChangeConfig('period', event.target.value)}
            >
              {/* 1, 5, 10, 15, 30, 60, 240, 'day', 'week' */}
              <MenuItem value={1}>1 minute</MenuItem>
              <MenuItem value={5}>5 minutes</MenuItem>
              <MenuItem value={10}>10 minutes</MenuItem>
              <MenuItem value={15}>15 minutes</MenuItem>
              <MenuItem value={30}>30 minutes</MenuItem>
              <MenuItem value={60}>1 hour</MenuItem>
              <MenuItem value={240}>4 hours</MenuItem>
              <MenuItem value="day">1 day</MenuItem>
              <MenuItem value="week">1 week</MenuItem>
            </Select>
          </FormControl>
        </CardContent>
      )}
    </Collapse>
    <CardActions>
      <Button
        variant="contained"
        size="small"
        color="primary"
        disabled={
          !canRead(
            instruments,
            priceStatus,
            chartStatus,
            filterStatus,
            proChartsStatus,
            isConnected,
          )
        }
        onClick={onRead}
      >
        Read
      </Button>
      <Button
        size="small"
        color="primary"
        disabled={!canCancel(priceStatus, isConnected)}
        onClick={onCancel}
      >
        Cancel
      </Button>
    </CardActions>
  </Card>
)

const mapStateToProps = ({ dryMoose, proCharts, filter, chart, price }) => ({
  config: price.config,
  isConnected: dryMoose.isConnected,
  proChartsStatus: proCharts.status,
  filterStatus: filter.status,
  chartStatus: chart.status,
  priceStatus: price.status,
  instruments: filter.instruments,
})

const mapDispatchToProps = dispatch => ({
  onRead: () => dispatch(readPrices()),
  onCancel: () => dispatch(cancelPricesReading()),
  onChangeConfig: (key, value) => dispatch(sendPriceConfig(key, value)),
})

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Price)
