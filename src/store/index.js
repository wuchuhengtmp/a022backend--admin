import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import goods from './modules/goods'
import userLevel from './modules/userLevel'
import unionLevel from '@/store/modules/unionLevel'
import order from '@/store/modules/order'
import revenueLogs from '@/store/modules/revenueLogs'
import transaction from '@/store/modules/transaction'
import certification from '@/store/modules/certification'
import notices from '@/store/modules/notices'
import dashboard from '@/store/modules/dashboard'
import rules from '@/store/modules/rules'
import sign from '@/store/modules/sign'
import rechargeCards from '@/store/modules/rechargeCards'
import rechargeCardOrders from '@/store/modules/rechargeCardOrders'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    goods,
    userLevel,
    unionLevel,
    order,
    revenueLogs,
    transaction,
    certification,
    notices,
    dashboard,
    rules,
    sign,
    rechargeCards,
    rechargeCardOrders
  },
  getters
})

export default store
