import { getTranSactionPayingOrderList, deleteAction, getConfigurationList, configurationUpdate } from '@/api/transaction'

const getDefaultState = () => {
  return {
    transactionPayingOrderList: [],
    transactionPayingOrderTotal: 0,
    configurationList: []
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
  },
  SET_CONFIGURATION_LIST: (state, configurationList) => {
    state.configurationList = configurationList
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
  },
  getConfigurationList({ commit, state }) {
    return new Promise((resolve, reject) => {
      getConfigurationList().then(res => {
        const { data } = res
        commit('SET_CONFIGURATION_LIST', data)
        resolve()
      })
    })
  },
  configurationUpdate({ commit, sate }, queryList) {
    return new Promise((resolve, reject) => {
      configurationUpdate(queryList).then(res => {
        commit('SET_CONFIGURATION_LIST', queryList)
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
