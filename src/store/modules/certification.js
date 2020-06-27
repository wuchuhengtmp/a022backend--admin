import { getCertificationList, updateCertification } from '@/api/certifacation'

const getDefaultState = () => {
  return {
    certificationList: [],
    certificationTotal: 0
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_CERTIFICATION_LIST: (state, certificationList) => {
    state.certificationList = certificationList
  },
  SET_CERTIFICATION_TOTAL: (state, certificationTotal) => {
    state.certificationTotal = certificationTotal
  }
}

const actions = {
  // get goods list
  getCertificationList({ commit }) {
    return new Promise((resolve, reject) => {
      getCertificationList().then(response => {
        const { data } = response
        commit('SET_CERTIFICATION_LIST', data.items)
        commit('SET_CERTIFICATION_TOTAL', data.total)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 修改审核状态
  updateCertification({ commit }, queryList) {
    return new Promise((resolve, reject) => {
      updateCertification(queryList).then(response => {
        const index = state.certificationList.findIndex(v => v.id === queryList.id)
        state.certificationList.splice(index, 1)
        state.certification_total -= 1
        commit('SET_CERTIFICATION_LIST', state.certificationList)
        commit('SET_CERTIFICATION_TOTAL', state.certification_total)
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

