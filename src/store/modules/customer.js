import { getCustomerList, updateCustomer } from '@/api/customer'

const getDefaultState = () => {
  return {
    customerList: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_CUSTOMER_LIST: (state, customerList) => {
    state.customerList = customerList
  }
}

const actions = {
  getCustomerList({ commit }) {
    return new Promise((resolve, reject) => {
      getCustomerList().then(response => {
        commit('SET_CUSTOMER_LIST', response.data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  updateCustomer({ commit, status }, queryList) {
    return new Promise((resolve, reject) => {
      updateCustomer(queryList).then(res => {
        const index = state.customerList.findIndex(v => v.id === queryList.id)
        state.customerList[index].url = queryList.url
        commit('SET_CUSTOMER_LIST', state.customerList)
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

