import { GLOBAL } from '../../constants/global'
import { combineReducers } from 'redux'

const INITIAL_STATE = {
    pageIndex: 0
}

export function global (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GLOBAL.PAGEINDEX:
      return {
        ...state,
        pageIndex:action.index
      }
    default:
      return state
  }
}

export default combineReducers({
    global
})