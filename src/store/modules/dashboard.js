import { getDashboard } from '@/api/dashboard'

const getDefaultState = () => {
  return {
    dashboard: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_DASHBOARD: (state, dashboard) => {
    state.dashboard = dashboard
  }
}

const actions = {
  getDahboard({ commit }) {
    return new Promise((resolve, reject) => {
      getDashboard().then(response => {
        commit('SET_DASHBOARD', response.data)
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

