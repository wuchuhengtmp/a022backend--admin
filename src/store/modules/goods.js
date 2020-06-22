import { getGoodsList } from '@/api/goods'

const getDefaultState = () => {
  return {
    goodsList: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_GOODSLIST: (state, goodsList) => {
    state.goodsList = goodsList
  }
}

const actions = {
  // get goods list
  getGoodsList({ commit }) {
    return new Promise((resolve, reject) => {
      getGoodsList().then(response => {
        commit('SET_GOODSLIST', response.data)
        response.data
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

