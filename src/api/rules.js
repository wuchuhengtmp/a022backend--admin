import request from '@/utils/request'
import qs from 'qs'

export function getRuleList() {
  return request({
    url: 'rules',
    method: 'get'
  })
}

export function updateAction(queryList) {
  return request({
    url: `rules/${queryList.id}?${qs.stringify(queryList)}`,
    method: 'put'
  })
}
