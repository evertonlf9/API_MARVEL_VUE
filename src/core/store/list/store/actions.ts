import * as types from './mutation-types'

export const ActionGetData = ({ commit }: any, payload: any) => {
  commit(types.GET_DATA_API, payload)
}
