import { getUionLevelList, uionLevelUpdate}from "@/api/unionLevel";

const getDefaultState = () => {
  return {
    unionLevelList: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_UION_LEVEL_LIST: (state, unionLevelList) => {
    state.unionLevelList = unionLevelList
  }
}

const actions = {
  // 获取公会等级列表
  getUionLevelList({ commit, satte }) {
    return new Promise((resolve, reject) => {
      getUionLevelList().then(res => {
        const { data } = res
        commit('SET_UION_LEVEL_LIST', data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 更新
  uionLevelUpdate({ commit, state }, uionLevelInfo) {
    return new Promise((resolve, reject) => {
      uionLevelUpdate(uionLevelInfo).then((res) => {
          const index = state.unionLevelList.findIndex(v => v.id === uionLevelInfo.id )
          state.unionLevelList[index] = uionLevelInfo
          commit('SET_UION_LEVEL_LIST', state.unionLevelList)
          resolve()
      }).catch(error => { reject(error) })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

