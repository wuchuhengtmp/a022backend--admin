import { getGoodsList, update } from '@/api/goods'

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
  // 编辑商品
  update({ commit, state }, goodsInfo) {
    return new Promise((resolve, reject) => {
      update(goodsInfo).then((res) => {
        const index = state.goodsList.findIndex(v => v.id === goodsInfo.id)
        state.goodsList[index] = goodsInfo
        commit('SET_GOODSLIST', state.goodsList)
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

