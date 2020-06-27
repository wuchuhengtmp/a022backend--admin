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
  orderTotal: state => state.order.orderTotal
}
export default getters
