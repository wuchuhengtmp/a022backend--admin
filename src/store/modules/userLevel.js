import { getUserLevelList } from "@/api/userlevel";
import {updateUserLevel} from "@/api/user";

const getDefaultState = () => {
  return {
    userLevelList: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_USER_LEVEL_LIST: (state, userLeveList) => {
    state.userLevelList = userLeveList
  }
}

const actions = {
  // 获取用户等级列表
  getUserLevelList({commit}) {
    return new Promise((resolve, reject) => {
      getUserLevelList().then(response => {
        const {data} = response
        commit('SET_USER_LEVEL_LIST', data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 更新用户等级
  updateUserLevel({ commit, state }, userLevelInfo)
  {
    return new Promise((resolve, reject) => {
      const goods_title = userLevelInfo.goods_title
      delete userLevelInfo.goods_title
      updateUserLevel(userLevelInfo).then(response => {
        const { data } = response
        if (!data) {
          reject('Verification failed, please Login again.')
        } else {
          const index = state.userLevelList.items.findIndex(v => v.id === userLevelInfo.id)
          userLevelInfo.goods_title = goods_title
          state.userLevelList.items[index] = userLevelInfo
          resolve(data)
        }
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
