import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import Collapse from '@material-ui/core/Collapse'
import CancelledIcon from '@material-ui/icons/Close'
import DiscoveredIcon from '@material-ui/icons/Check'

import { Status as EToroStatus } from '../reducers/eToro'
import { Status as MarketStatus } from '../reducers/market'
import {
  discoverMarket,
  cancelMarketDiscovery,
  sendMarketConfig,
} from '../actions/market'
import Status from '../components/Status'
import StatusItem from '../components/StatusItem'

const styles = {
  formControl: {
    minWidth: 140,
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
  onDiscover,
  onCancel,
  onChangeConfig,
}) => (
  <Grid container>
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
            <CardContent>
              <FormControl
                className={classes.formControl}
                disabled={!isConnected}
              >
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
  </Grid>
)

const mapStateToProps = ({ dryMoose, eToro, market }) => ({
  config: market.config,
  isConnected: dryMoose.isConnected,
  eToroStatus: eToro.status,
  marketStatus: market.status,
})

const mapDispatchToProps = dispatch => ({
  onDiscover: () => dispatch(discoverMarket()),
  onCancel: () => dispatch(cancelMarketDiscovery()),
  onChangeConfig: (key, value) => dispatch(sendMarketConfig(key, value)),
})

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Market)
