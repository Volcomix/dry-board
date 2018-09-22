import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import InputLabel from '@material-ui/core/InputLabel'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Switch from '@material-ui/core/Switch'
import Collapse from '@material-ui/core/Collapse'
import FilteredIcon from '@material-ui/icons/Check'

import { Status as FilterStatus } from '../reducers/filter'
import { sendFilterConfig } from '../actions/filter'
import Status from '../components/Status'
import StatusItem from '../components/StatusItem'

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
}

const isLoading = filterStatus => {
  return filterStatus === FilterStatus.Filtering
}

const Filter = ({
  classes,
  config,
  isConnected,
  filterStatus,
  onChangeConfig,
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
      </Card>
    </Grid>
  </Grid>
)

const mapStateToProps = ({ dryMoose, filter }) => ({
  config: filter.config,
  isConnected: dryMoose.isConnected,
  filterStatus: filter.status,
})

const mapDispatchToProps = dispatch => ({
  onChangeConfig: (key, value) => {
    dispatch(sendFilterConfig(key, value))
  },
})

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Filter)
