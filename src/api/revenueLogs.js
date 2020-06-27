import request from '@/utils/request'
import qs from 'qs'

export function getRevenueLogs(queryList) {
  return request({
    url: `/revenueLogs?${qs.stringify(queryList)}`,
    method: 'get'
  })
}
