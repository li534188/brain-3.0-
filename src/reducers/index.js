import { combineReducers } from 'redux'
import parents from './counter'
import global from './global'
export default combineReducers({
    parents,
    global
})