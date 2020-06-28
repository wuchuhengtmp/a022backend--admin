import { getSignConfig, updateAction } from '@/api/signConfig'

const getDefaultState = () => {
  return {
    signConfig: undefined
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_SIGN_CONIG: (state, signConfig) => {
    state.signConfig = signConfig
  }
}

const actions = {
  getSignConfig({ commit }) {
    return new Promise((resolve, reject) => {
      getSignConfig().then(res => {
        commit('SET_SIGN_CONIG', res.data)
        resolve()
      })
    })
  },
  updateAction({ commit, sate }, params) {
    return new Promise((resolve, reject) => {
      updateAction(params).then(res => {
        commit('SET_SIGN_CONIG', params.val)
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

