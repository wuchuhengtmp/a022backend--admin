import rechargeCardOrders from '@/store/modules/rechargeCardOrders'

const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  goodsList: state => state.goods.goodsList,
  userLevelList: state => state.userLevel.userLevelList,
  userLevelTotal: state => state.userLevel.userLevelTotal,
  userList: state => state.user.userList,
  userListTotal: state => state.user.userListTotal,
  uionLevelList: state => state.unionLevel.unionLevelList,
  orderList: state => state.order.orderList,
  orderTotal: state => state.order.orderTotal,
  revenueLogList: state => state.revenueLogs.revenueLogList,
  revenueLogTotal: state => state.revenueLogs.revenueLogTotal,
  transactionPayingOrderList: state => state.transaction.transactionPayingOrderList,
  transactionPayingOrderTotal: state => state.transaction.transactionPayingOrderTotal,
  certificationList: state => state.certification.certificationList,
  certificationTotal: state => state.certification.certificationTotal,
  noticeList: state => state.notices.noticeList,
  configurationList: state => state.transaction.configurationList,
  dashboard: state => state.dashboard.dashboard,
  ruleList: state => state.rules.ruleList,
  signConfig: state => state.sign.signConfig,
  rechargeCardList: state => state.rechargeCards.rechargeCardList,
  rechargeCardOrderList: state => state.rechargeCardOrders.rechargeCardOrderList
}
export default getters
