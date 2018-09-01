import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import StoppedIcon from '@material-ui/icons/Warning'
import DiscoveredIcon from '@material-ui/icons/CheckCircle'
import CancelledIcon from '@material-ui/icons/Cancel'
import classNames from 'classnames'

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
    marginTop: theme.spacing.unit,
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

const isLoading = marketStatus => {
  return (
    marketStatus === MarketStatus.Discovering ||
    marketStatus === MarketStatus.Cancelling
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
      <CardContent className={classes.content}>
        {marketStatus === MarketStatus.Stopped && (
          <React.Fragment>
            <StoppedIcon color="disabled" className={classes.icon} />
            <Typography
              variant="headline"
              className={classNames(classes.label, classes.disabled)}
            >
              Stopped
            </Typography>
          </React.Fragment>
        )}
        {marketStatus === MarketStatus.Cancelled && (
          <React.Fragment>
            <CancelledIcon color="error" className={classes.icon} />
            <Typography
              variant="headline"
              color="error"
              className={classes.label}
            >
              Cancelled
            </Typography>
          </React.Fragment>
        )}
        {marketStatus === MarketStatus.Discovered && (
          <React.Fragment>
            <DiscoveredIcon color="primary" className={classes.icon} />
            <Typography variant="headline" className={classes.label}>
              Discovered
            </Typography>
          </React.Fragment>
        )}
        {isLoading(marketStatus) && <CircularProgress size={iconSize} />}
      </CardContent>
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
