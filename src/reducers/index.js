import { combineReducers } from 'redux'
import browser from './browser'
import dryMoose from './dryMoose'
import eToro from './eToro'
import filter from './filter'
import layout from './layout'
import market from './market'

export default combineReducers({
  layout,
  dryMoose,
  browser,
  eToro,
  market,
  filter,
})
