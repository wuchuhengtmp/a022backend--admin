import { rechargeCardUpdate, getRechargeCardList } from '@/api/rechargeCards'

const getDefaultState = () => {
  return {
    rechargeCardList: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_RECHARGE_CARD_LIST: (state, rechargeCardList) => {
    state.rechargeCardList = rechargeCardList
  }
}

const actions = {
  getRechargeCardList({ commit, state }) {
    return new Promise((resolve, reject) => {
      getRechargeCardList().then(res => {
        const { data } = res
        commit('SET_RECHARGE_CARD_LIST', data)
        resolve()
      })
    })
  },
  rechargeCardUpdate({ commit, state }, queryList) {
    return new Promise((resolve, reject) => {
      rechargeCardUpdate(queryList).then(res => {
        if (state.rechargeCardList.phone.findIndex(v => v.id === queryList.id)) {
          const index = state.rechargeCardList.phone.findIndex(v => v.id === queryList.id)
          state.rechargeCardList.phone[index].price = queryList.price
        } else {
          const index = state.rechargeCardList.flux.findIndex(v => v.id === queryList.id)
          state.rechargeCardList.flux[index].price = queryList.price
        }
        commit('SET_RECHARGE_CARD_LIST', state.rechargeCardList)
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
