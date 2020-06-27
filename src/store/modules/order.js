import { getOrderList } from '@/api/orders'

const getDefaultState = () => {
  return {
    orderList: [],
    orderTotal: 0
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_ORDER_LIST: (state, orderList) => {
    state.orderList = orderList
  },
  SET_ORDER_TOTAL: (state, orderTotal) => {
    state.orderTotal = orderTotal
  }
}

const actions = {
  getOrderList({ commit, satte }, queryList) {
    return new Promise((resolve, reject) => {
      getOrderList(queryList).then(res => {
        const { data } = res
        commit('SET_ORDER_LIST', data.items)
        commit('SET_ORDER_TOTAL', data.total)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

