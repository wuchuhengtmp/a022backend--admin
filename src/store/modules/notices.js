import { getNoticeList, updateAction } from '@/api/notices'

const getDefaultState = () => {
  return {
    noticeList: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_NOTICE_LIST: (state, data) => {
    state.noticeList = data
  }
}

const actions = {
  getNoticeList({ commit }) {
    return new Promise((resolve, reject) => {
      getNoticeList().then(response => {
        const { data } = response
        commit('SET_NOTICE_LIST', data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  updateAction({ commit, state }, queryList) {
    return new Promise((resolve, reject) => {
      updateAction(queryList).then(res => {
        const index = state.noticeList.findIndex(v => v.id === queryList.id)
        state.noticeList[index].val = queryList.val
        commit('SET_NOTICE_LIST', state.noticeList)
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

