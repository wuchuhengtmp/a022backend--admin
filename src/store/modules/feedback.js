import { getFeedbackList } from '@/api/feedback'

const getDefaultState = () => {
  return {
    feedbackList: [],
    feedbackTotal: 0
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_FEEDBACK_LIST: (state, feedbackList) => {
    state.feedbackList = feedbackList
  },
  SET_FEEDBACK_TOTAL: (state, feedbackTotal) => {
    state.feedbackTotal = feedbackTotal
  }
}

const actions = {
  getFeedbackList({ commit }) {
    return new Promise((resolve, reject) => {
      getFeedbackList().then(response => {
        const { data } = response
        commit('SET_FEEDBACK_LIST', data.items)
        commit('SET_FEEDBACK_TOTAL', data.total)
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

