import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Collapse from '@material-ui/core/Collapse'
import FormControl from '@material-ui/core/FormControl'
import Grid from '@material-ui/core/Grid'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import { withStyles } from '@material-ui/core/styles'
import DiscoveredIcon from '@material-ui/icons/Check'
import CancelledIcon from '@material-ui/icons/Close'
import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import {
  cancelMarketDiscovery,
  changeMarketOrder,
  changeMarketPage,
  changeMarketRowsPerPage,
  discoverMarket,
  sendMarketConfig,
} from '../actions/market'
import Status from '../components/Status'
import StatusItem from '../components/StatusItem'
import Table from '../components/Table'
import { Status as EToroStatus } from '../reducers/eToro'
import { Status as MarketStatus } from '../reducers/market'

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
}

const canDiscover = (marketStatus, eToroStatus, isConnected) => {
  return (
    isConnected &&
    eToroStatus === EToroStatus.Started &&
    (marketStatus === MarketStatus.Stopped ||
      marketStatus === MarketStatus.Discovered ||
      marketStatus === MarketStatus.Cancelled)
  )
}

const canCancel = (marketStatus, eToroStatus, isConnected) => {
  return (
    isConnected &&
    eToroStatus === EToroStatus.Started &&
    marketStatus === MarketStatus.Discovering
  )
}

const isLoading = marketStatus => {
  return (
    marketStatus === MarketStatus.Discovering ||
    marketStatus === MarketStatus.Cancelling
  )
}

const Market = ({
  classes,
  config,
  isConnected,
  eToroStatus,
  marketStatus,
  instruments,
  rowsPerPage,
  page,
  order,
  orderBy,
  onDiscover,
  onCancel,
  onChangeConfig,
  onChangeRowsPerPage,
  onChangePage,
  onChangeOrder,
}) => (
  <Grid container spacing={16}>
    <Grid item xs={12} sm={5} lg={3}>
      <Card>
        <Status value={marketStatus} isLoading={isLoading(marketStatus)}>
          <StatusItem
            icon="!"
            title="Stopped"
            value={MarketStatus.Stopped}
            color="disabled"
          />
          <StatusItem
            icon={<CancelledIcon />}
            title="Cancelled"
            value={MarketStatus.Cancelled}
            color="error"
          />
          <StatusItem
            icon={<DiscoveredIcon />}
            title="Discovered"
            value={MarketStatus.Discovered}
            color="primary"
          />
        </Status>
        <Collapse in={!!config}>
          {config && (
            <CardContent className={classes.form}>
              <FormControl disabled={!isConnected}>
                <InputLabel>Discovery mode</InputLabel>
                <Select
                  value={config.discoveryMode}
                  onChange={event =>
                    onChangeConfig('discoveryMode', event.target.value)
                  }
                >
                  <MenuItem value="js">Javascript</MenuItem>
                  <MenuItem value="ui">User Interface</MenuItem>
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
            disabled={!canDiscover(marketStatus, eToroStatus, isConnected)}
            onClick={onDiscover}
          >
            Discover
          </Button>
          <Button
            size="small"
            color="primary"
            disabled={!canCancel(marketStatus, eToroStatus, isConnected)}
            onClick={onCancel}
          >
            Cancel
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

const mapStateToProps = ({ dryMoose, eToro, market }) => ({
  config: market.config,
  isConnected: dryMoose.isConnected,
  eToroStatus: eToro.status,
  marketStatus: market.status,
  instruments: market.instruments,
  rowsPerPage: market.rowsPerPage,
  page: market.page,
  order: market.order,
  orderBy: market.orderBy,
})

const mapDispatchToProps = dispatch => ({
  onDiscover: () => {
    dispatch(discoverMarket())
  },
  onCancel: () => {
    dispatch(cancelMarketDiscovery())
  },
  onChangeConfig: (key, value) => {
    dispatch(sendMarketConfig(key, value))
  },
  onChangeRowsPerPage: rowsPerPage => {
    dispatch(changeMarketRowsPerPage(rowsPerPage))
  },
  onChangePage: page => {
    dispatch(changeMarketPage(page))
  },
  onChangeOrder: orderBy => {
    dispatch(changeMarketOrder(orderBy))
  },
})

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Market)
