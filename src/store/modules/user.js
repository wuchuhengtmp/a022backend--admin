import { login, logout, getInfo, getUserList, topUp, deleteRequest, update, userLevelUpgrade, uionLevelUpgrade } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    userList: [],
    userListTotal: 0
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_USER_LIST: (state, userList) => {
    state.userList = userList
  },
  SET_USER_LIST_TOTAL: (state, userListTotal) => {
    state.userListTotal = userListTotal
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.access_token)
        setToken(data.access_token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { username, avator } = data
        commit('SET_NAME', username)
        commit('SET_AVATAR', avator)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      removeToken() // must remove  token  first
      resetRouter()
      commit('RESET_STATE')
      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  },

  //  用户列表
  getUserList({ commit, state }, query) {
    return new Promise((resolve, reject) => {
      getUserList(query).then((res) => {
        const { data, msg, code } = res
        commit('SET_USER_LIST', data.items)
        commit('SET_USER_LIST_TOTAL', data.total)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 用户充值
  topUp({ commit, state }, topUpInfo) {
    return new Promise((resolve, reject) => {
      topUp(topUpInfo).then(res => {
        const index = state.userList.findIndex(v => v.id === topUpInfo.id)
        const userList = state.userList
        userList[index].coint += topUpInfo.topUp
        commit('SET_USER_LIST', userList)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 删除
  delete({ commit, state }, id) {
    return new Promise((resolve, reject) => {
      deleteRequest(id).then(res => {
        const index = state.userList.findIndex(v => v.id === id)
        delete state.userList[index]
        commit('SET_USER_LIST_TOTAL', state.userList)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 编辑
  update({ commit, state }, userInfo) {
    return new Promise((resolve, reject) => {
      update(userInfo).then(res => {
        const { data } = res
        const index = state.userList.findIndex(value => value.id === userInfo.id)
        state.userList[index].phone = userInfo.phone
        state.userList[index].alipay = userInfo.alipay
        state.userList[index].credi = userInfo.credit
        state.userList[index].address = userInfo.address
        state.userList[index].is_intercept = userInfo.is_intercept
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 会员升级
  userLevelUpgrade({ commit, state }, userInfo) {
    return new Promise((resolve, reject) => {
      userLevelUpgrade(userInfo).then(res => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 更新用户等级
  updateUserLevel({ commit, state }, userInfo) {
    const index = state.userList.findIndex(v => v.id === userInfo.id)
    state.userList[index]['userlevel'] = userInfo.levelName
    state.userList[index]['user_level_id'] = userInfo.userLevelId
    commit('SET_USER_LIST', state.userList)
  },
  // 用户工会等级长级
  uionLevelUpgrade({ commit, state }, unionLevelInfo) {
    return new Promise((resolve, reject) => {
      uionLevelUpgrade(unionLevelInfo).then((res) => {
        const index = state.userList.findIndex(v => v.id === unionLevelInfo.id)
        state.userList[index].uion_level_id = unionLevelInfo.unionLevelId
        state.userList[index].union_level = unionLevelInfo.unionLevelname
        commit('SET_USER_LIST', state.userList)
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

