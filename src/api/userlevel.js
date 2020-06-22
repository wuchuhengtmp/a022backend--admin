import request from '@/utils/request'

export function getUserLevelList() {
  return request({
    url: '/users/groups',
    method: 'get'
  })
}
