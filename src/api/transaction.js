import request from '@/utils/request'
import qs from 'qs'

export function getTranSactionPayingOrderList(queryList) {
  return request({
    url: `transations/orders?${qs.stringify(queryList)}`,
    method: 'get'
  })
}
export function deleteAction(id) {
  return request({
    url: `transations/orders/${id}`,
    method: 'delete'
  })
}
