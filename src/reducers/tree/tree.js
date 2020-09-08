import { SHOW } from '../../constants/tree/tree'

const INITIAL_STATE = {
  show: false
}

export default function tree (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SHOW:
      return {
        ...state,
        show:true
      }
    default:
      return state
  }
}