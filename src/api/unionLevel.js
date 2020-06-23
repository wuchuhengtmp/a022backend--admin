import request from '@/utils/request'

export function getUionLevelList() {
  return request({
    url: '/unionLevels',
    method: 'get'
  })
}

