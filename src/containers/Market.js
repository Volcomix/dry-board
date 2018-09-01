import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'

import { Status as EToroStatus } from '../reducers/eToro'
import { Status as MarketStatus } from '../reducers/market'
import { discoverMarket, cancelMarketDiscovery } from '../actions/market'

const iconSize = 32

const styles = theme => ({
  container: {
    display: 'flex',
  },
  card: {
    [theme.breakpoints.down('xs')]: {
      flexGrow: 1,
    },
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: iconSize,
    marginRight: theme.spacing.unit,
  },
  label: {
    flexGrow: 1,
  },
  disabled: {
    color: theme.palette.text.disabled,
  },
})

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

const Market = ({
  classes,
  isConnected,
  eToroStatus,
  marketStatus,
  onDiscover,
  onCancel,
}) => (
  <div className={classes.container}>
    <Card className={classes.card}>
      <CardContent>{marketStatus}</CardContent>
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
  </div>
)

const mapStateToProps = ({ dryMoose, eToro, market }) => ({
  isConnected: dryMoose.isConnected,
  eToroStatus: eToro.status,
  marketStatus: market.status,
})

const mapDispatchToProps = dispatch => ({
  onDiscover: () => dispatch(discoverMarket()),
  onCancel: () => dispatch(cancelMarketDiscovery()),
})

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Market)
