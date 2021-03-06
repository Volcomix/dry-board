import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Collapse from '@material-ui/core/Collapse'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Grid from '@material-ui/core/Grid'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import { withStyles } from '@material-ui/core/styles'
import Switch from '@material-ui/core/Switch'
import TextField from '@material-ui/core/TextField'
import FilteredIcon from '@material-ui/icons/Check'
import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import {
  changeFilterOrder,
  changeFilterPage,
  changeFilterRowsPerPage,
  filterInstruments,
  sendFilterConfig,
} from '../actions/filter'
import Status from '../components/Status'
import StatusItem from '../components/StatusItem'
import Table from '../components/Table'
import { Status as FilterStatus } from '../reducers/filter'
import { Status as MarketStatus } from '../reducers/market'

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
}

const canFilter = (filterStatus, marketStatus, isConnected) => {
  return (
    isConnected &&
    marketStatus === MarketStatus.Discovered &&
    (filterStatus === FilterStatus.Stopped ||
      filterStatus === FilterStatus.Filtered)
  )
}

const isLoading = filterStatus => {
  return filterStatus === FilterStatus.Filtering
}

const Filter = ({
  classes,
  config,
  isConnected,
  marketStatus,
  filterStatus,
  instruments,
  rowsPerPage,
  page,
  order,
  orderBy,
  onFilter,
  onChangeConfig,
  onChangeRowsPerPage,
  onChangePage,
  onChangeOrder,
}) => (
  <Grid container spacing={16}>
    <Grid item xs={12} sm={6} lg={4}>
      <Card>
        <Status value={filterStatus} isLoading={isLoading(filterStatus)}>
          <StatusItem
            icon="!"
            title="Stopped"
            value={FilterStatus.Stopped}
            color="disabled"
          />
          <StatusItem
            icon={<FilteredIcon />}
            title="Filtered"
            value={FilterStatus.Filtered}
            color="primary"
          />
        </Status>
        <Collapse in={!!config}>
          {config && (
            <CardContent className={classes.form}>
              <FormControlLabel
                label="Active instruments only"
                control={
                  <Switch
                    color="primary"
                    checked={config.filterActiveInstruments}
                    disabled={!isConnected}
                    onChange={event =>
                      onChangeConfig(
                        'filterActiveInstruments',
                        event.target.checked,
                      )
                    }
                  />
                }
              />
              <TextField
                label="Max amount (-1 to disable)"
                value={config.maxAmountFilter}
                type="number"
                margin="normal"
                disabled={!isConnected}
                onChange={event =>
                  onChangeConfig('maxAmountFilter', +event.target.value)
                }
              />
              <FormControl disabled={!isConnected} margin="normal">
                <InputLabel>Sort spread by</InputLabel>
                <Select
                  value={config.spreadSortingMode}
                  onChange={event =>
                    onChangeConfig('spreadSortingMode', event.target.value)
                  }
                >
                  <MenuItem value="percent">Percent</MenuItem>
                  <MenuItem value="amount">Amount</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Instruments count"
                value={config.instrumentsCount}
                type="number"
                margin="normal"
                disabled={!isConnected}
                onChange={event =>
                  onChangeConfig('instrumentsCount', +event.target.value)
                }
              />
            </CardContent>
          )}
        </Collapse>
        <CardActions>
          <Button
            variant="contained"
            size="small"
            color="primary"
            disabled={!canFilter(filterStatus, marketStatus, isConnected)}
            onClick={onFilter}
          >
            Filter
          </Button>
        </CardActions>
      </Card>
    </Grid>
    <Table
      data={instruments}
      rowsPerPage={rowsPerPage}
      page={page}
      order={order}
      orderBy={orderBy}
      onChangeRowsPerPage={onChangeRowsPerPage}
      onChangePage={onChangePage}
      onChangeOrder={onChangeOrder}
    />
  </Grid>
)

const mapStateToProps = ({ dryMoose, market, filter }) => ({
  config: filter.config,
  isConnected: dryMoose.isConnected,
  marketStatus: market.status,
  filterStatus: filter.status,
  instruments: filter.instruments,
  rowsPerPage: filter.rowsPerPage,
  page: filter.page,
  order: filter.order,
  orderBy: filter.orderBy,
})

const mapDispatchToProps = dispatch => ({
  onFilter: () => {
    dispatch(filterInstruments())
  },
  onChangeConfig: (key, value) => {
    dispatch(sendFilterConfig(key, value))
  },
  onChangeRowsPerPage: rowsPerPage => {
    dispatch(changeFilterRowsPerPage(rowsPerPage))
  },
  onChangePage: page => {
    dispatch(changeFilterPage(page))
  },
  onChangeOrder: orderBy => {
    dispatch(changeFilterOrder(orderBy))
  },
})

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Filter)
