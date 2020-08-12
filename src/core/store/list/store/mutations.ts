import * as types from './mutation-types'

export default {
  [types.GET_DATA_API] (state: any, payload: any) {
    state.menuOpen = !state.menuOpen
  }
}
