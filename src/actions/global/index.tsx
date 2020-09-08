import {GLOBAL} from '../../constants/global'


export const setIndex = (index:number) => {
    return {
      type: GLOBAL.PAGEINDEX,
      index
    }
  }

  export const getIndex = (index:number) => {
    return {
      type: GLOBAL.GETPAGEINDEX,
      index
    }
  }