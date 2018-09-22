import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Collapse from '@material-ui/core/Collapse'
import Fade from '@material-ui/core/Fade'
import FormControl from '@material-ui/core/FormControl'
import Grid from '@material-ui/core/Grid'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Paper from '@material-ui/core/Paper'
import Select from '@material-ui/core/Select'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import withWidth, { isWidthDown } from '@material-ui/core/withWidth'
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
import { Status as EToroStatus } from '../reducers/eToro'
import { Status as MarketStatus } from '../reducers/market'

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  instrumentsPaper: {
    overflow: 'hidden',
  },
  instruments: {
    overflow: 'auto',
  },
  cell: {
    paddingLeft: 12,
    paddingRight: 12,
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
  width,
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
    <Fade in={!!(instruments && instruments.length)} mountOnEnter unmountOnExit>
      {instruments &&
        instruments.length && (
          <Grid item xs={12}>
            <Paper className={classes.instrumentsPaper}>
              <div className={classes.instruments}>
                <Table padding="dense">
                  <TableHead>
                    <TableRow>
                      {Object.keys(instruments[0]).map(key => (
                        <TableCell
                          key={key}
                          classes={{ paddingDense: classes.cell }}
                        >
                          <TableSortLabel
                            active={orderBy === key}
                            direction={order}
                            onClick={() => onChangeOrder(key)}
                          >
                            {key}
                          </TableSortLabel>
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {instruments
                      .sort((a, b) => {
                        if (orderBy === undefined) {
                          return 0
                        }
                        if (a[orderBy] < b[orderBy]) {
                          return order === 'asc' ? -1 : 1
                        }
                        if (a[orderBy] > b[orderBy]) {
                          return order === 'asc' ? 1 : -1
                        }
                        return 0
                      })
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage,
                      )
                      .map((instrument, i) => (
                        <TableRow key={i} hover={true}>
                          {Object.entries(instrument).map(([key, value]) => {
                            let display
                            if (
                              typeof value === 'boolean' ||
                              value instanceof Array
                            ) {
                              display = value.toString()
                            } else if (typeof value === 'number') {
                              display = +value.toFixed(4)
                            } else {
                              display = value
                            }
                            return (
                              <TableCell
                                key={key}
                                classes={{ paddingDense: classes.cell }}
                              >
                                {display}
                              </TableCell>
                            )
                          })}
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
              <TablePagination
                component="div"
                count={instruments.length}
                rowsPerPageOptions={isWidthDown('xs', width) ? [5] : undefined}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangeRowsPerPage={event => {
                  onChangeRowsPerPage(event.target.value)
                }}
                onChangePage={(event, page) => {
                  onChangePage(page)
                }}
              />
            </Paper>
          </Grid>
        )}
    </Fade>
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
  withWidth(),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Market)
