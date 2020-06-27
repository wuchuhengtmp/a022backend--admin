import request from '@/utils/request'
import qs from 'qs'

export function getNoticeList() {
  return request({
    url: `system/notices`,
    method: 'get'
  })
}

export function updateAction(queryList) {
  return request({
    url: `system/notices/${queryList.id}?${qs.stringify(queryList)}`,
    method: 'put'
  })
}
