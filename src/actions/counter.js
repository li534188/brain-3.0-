import {
    ADD,
    MINUS
  } from '../constants/counter'
import{show} from './tree/tree'
  
  export const add = () => {
    return {
      type: ADD
    }
  }
  export const minus = () => {
    return {
      type: MINUS
    }
  }

  export const parentShow = () =>{
      console.log('这里被调用了')
      return dispatch=>{
        dispatch(show())
      }
  }
  
  // 异步的 action
  export function asyncAdd () {
    return dispatch => {
      setTimeout(() => {
        dispatch(add())
      }, 2000)
    }
  }