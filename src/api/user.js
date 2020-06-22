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
