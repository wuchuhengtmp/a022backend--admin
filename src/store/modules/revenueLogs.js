import { getRevenueLogs } from '@/api/revenueLogs'

const getDefaultState = () => {
  return {
    revenueLogList: [],
    revenueLogTotal: 0
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_REVENUE_LOG_LIST: (state, revenueLogList) => {
    state.revenueLogList = revenueLogList
  },
  SET_REVENUE_LOG_TOTAL: (state, revenueLogTotal) => {
    state.revenueLogTotal = revenueLogTotal
  }
}

const actions = {
  getRevenueLogList({ commit, state }, queryList) {
    return new Promise((resolve, reject) => {
      getRevenueLogs(queryList).then(res => {
        const { data } = res
        commit('SET_REVENUE_LOG_LIST', data.items)
        commit('SET_REVENUE_LOG_TOTAL', data.total)
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
