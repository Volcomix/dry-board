import { combineReducers } from 'redux'
import layout from './layout'
import dryMoose from './dryMoose'
import browser from './browser'

export default combineReducers({ layout, dryMoose, browser })
