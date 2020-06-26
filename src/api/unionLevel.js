import request from '@/utils/request'
import qs from 'qs'

export function getUionLevelList() {
  return request({
    url: '/unionLevels',
    method: 'get'
  })
}
export function uionLevelUpdate(uionLevelInfo) {
  return request({
    url: `/unionLevels/${uionLevelInfo.id}?${qs.stringify(uionLevelInfo)}`,
    method: 'put'
  })
}

