import { getTranSactionPayingOrderList, deleteAction } from '@/api/transaction'

const getDefaultState = () => {
  return {
    transactionPayingOrderList: [],
    transactionPayingOrderTotal: 0
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TRAN_SACTION_PAYING_ORDER_LIST: (state, transactionPayingOrderList) => {
    state.transactionPayingOrderList = transactionPayingOrderList
  },
  SET_TRAN_SACTION_PAYING_ORDER_TOTAL: (state, transactionPayingOrderTotal) => {
    state.transactionPayingOrderTotal = transactionPayingOrderTotal
  }
}

const actions = {
  getTranSactionPayingOrderList({ commit, satte }, queryList) {
    return new Promise((resolve, reject) => {
      getTranSactionPayingOrderList(queryList).then(res => {
        const { data } = res
        commit('SET_TRAN_SACTION_PAYING_ORDER_LIST', data.items)
        commit('SET_TRAN_SACTION_PAYING_ORDER_TOTAL', data.total)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  deleteAction({ commit, state }, id) {
    return new Promise((resolve, reject) => {
      deleteAction(id).then((res) => {
        const index = state.transactionPayingOrderList.findIndex(v => v.id === id)
        state.transactionPayingOrderList.splice(index, 1)
        commit('SET_TRAN_SACTION_PAYING_ORDER_LIST', state.transactionPayingOrderList)
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
