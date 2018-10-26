import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import SelectedIcon from '@material-ui/icons/Check'
import React from 'react'
import { connect } from 'react-redux'
import { selectFeatures } from '../actions/feature'
import Status from '../components/Status'
import StatusItem from '../components/StatusItem'
import { Status as FeatureStatus } from '../reducers/feature'
import { Status as PriceStatus } from '../reducers/price'

const canSelect = (featureStatus, priceStatus, isConnected) => {
  return (
    isConnected &&
    priceStatus === PriceStatus.Read &&
    (featureStatus === FeatureStatus.Stopped ||
      featureStatus === FeatureStatus.Selected)
  )
}

const isLoading = featureStatus => {
  return featureStatus === FeatureStatus.Selecting
}

const Feature = ({ isConnected, priceStatus, featureStatus, onSelect }) => (
  <Card>
    <Status value={featureStatus} isLoading={isLoading(featureStatus)}>
      <StatusItem
        icon="!"
        title="Stopped"
        value={FeatureStatus.Stopped}
        color="disabled"
      />
      <StatusItem
        icon={<SelectedIcon />}
        title="Selected"
        value={FeatureStatus.Selected}
        color="primary"
      />
    </Status>
    <CardActions>
      <Button
        variant="contained"
        size="small"
        color="primary"
        disabled={!canSelect(featureStatus, priceStatus, isConnected)}
        onClick={onSelect}
      >
        Select
      </Button>
    </CardActions>
  </Card>
)

const mapStateToProps = ({ dryMoose, price, feature }) => ({
  isConnected: dryMoose.isConnected,
  priceStatus: price.status,
  featureStatus: feature.status,
})

const mapDispatchToProps = dispatch => ({
  onSelect: () => dispatch(selectFeatures()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Feature)
