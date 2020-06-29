import { getRechargeCardOrders, updasteRecargeCardOrder } from '@/api/rechargeCardOrders'

const getDefaultState = () => {
  return {
    rechargeCardOrderList: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_RECHARGE_CARD_ORDER_LIST: (state, rechargeCardOrderList) => {
    state.rechargeCardOrderList = rechargeCardOrderList
  }
}

const actions = {
  getRechargeCardOrders({ commit, state }) {
    return new Promise((resolve, reject) => {
      getRechargeCardOrders().then(res => {
        const { data } = res
        commit('SET_RECHARGE_CARD_ORDER_LIST', data.items)
        resolve()
      })
    })
  },
  updasteRecargeCardOrder({ commit, state }, queryList) {
    return new Promise((resolve, reject) => {
      updasteRecargeCardOrder(queryList).then(res => {
        const index = state.rechargeCardOrderList.findIndex(v => v.id === queryList.id)
        state.rechargeCardOrderList[index].status = queryList.status
        commit('SET_RECHARGE_CARD_ORDER_LIST', state.rechargeCardOrderList)
        resolve()
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
