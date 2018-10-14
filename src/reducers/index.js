import { combineReducers } from 'redux'
import browser from './browser'
import chart from './chart'
import dryMoose from './dryMoose'
import eToro from './eToro'
import feature from './feature'
import filter from './filter'
import layout from './layout'
import market from './market'
import price from './price'
import proCharts from './proCharts'
import webgl from './webgl'

export default combineReducers({
  layout,
  dryMoose,
  browser,
  eToro,
  market,
  filter,
  proCharts,
  chart,
  price,
  feature,
  webgl,
})
