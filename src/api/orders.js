import request from '@/utils/request'
import qs from 'qs'

export function getOrderList(queryList) {
  return request({
    url: `orders?${qs.stringify(queryList)}`,
    method: 'get'
  })
}
