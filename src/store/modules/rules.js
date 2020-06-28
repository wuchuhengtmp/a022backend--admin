import { getRuleList, updateAction } from '@/api/rules'

const getDefaultState = () => {
  return {
    ruleList: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_RULE_LIST: (state, ruleList) => {
    state.ruleList = ruleList
  }
}

const actions = {
  getRuleList({ commit, state }, queryList) {
    return new Promise((resolve, reject) => {
      getRuleList(queryList).then(res => {
        const { data } = res
        commit('SET_RULE_LIST', data)
        resolve()
      })
    })
  },
  updateAction({ commit, state }, queryList) {
    return new Promise(resolve => {
      updateAction(queryList).then(res => {
        const index = state.ruleList.findIndex(v => v.id === queryList.id)
        state.ruleList[index] = queryList
        commit('SET_RULE_LIST', state.ruleList)
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
