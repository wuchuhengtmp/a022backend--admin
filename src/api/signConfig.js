import request from '@/utils/request'
import qs from 'qs'

export function getSignConfig() {
  return request({
    url: 'sign',
    method: 'get'
  })
}

export function updateAction(params) {
  return request({
    url: `sign?${qs.stringify(params)}`,
    method: 'put'
  })
}
