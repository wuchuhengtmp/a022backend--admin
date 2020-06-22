const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  goodsList: state => state.goods.goodsList,
  userLevelList: state => state.userLevel.userLevelList
}
export default getters
