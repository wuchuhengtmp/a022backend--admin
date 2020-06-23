import request from '@/utils/request'
import qs from 'qs'

export function login(data) {
  return request({
    url: '/authorizations',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/me',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
//更新用户等级
export function updateUserLevel(userLevelInfo) {
  return request({
    url: `/users/groups/${userLevelInfo.id}?` + qs.stringify(userLevelInfo),
    method: 'put',
  })
}

// 用户等级列表
export function getUserList(query) {
  return request({
    url: `/users?${qs.stringify(query)}`,
    method: 'get'
  })
}
// 用户充值
export function topUp(topUpInfo) {
  return request({
    url: `/users/${topUpInfo.id}/coint?topUp=${topUpInfo.topUp}`,
    method: 'patch'
  })
}

export function deleteRequest(id) {
  return request({
    url: `users/${id}`,
    method: 'delete'
  })
}

// 更新基本信息
export function update(userInfo) {
  const query= Object.assign({}, userInfo)
  delete query.id
  return request({
    url: `users/${userInfo.id}?${qs.stringify(query)}`,
    method: 'put'
  })
}

// 更新用户等级
export  function userLevelUpgrade(userInfo) {
  return request({
    url: `users/${userInfo.id}/userLevel?user_level_id=${userInfo.user_level_id}`,
    method: 'patch'
  })
}

