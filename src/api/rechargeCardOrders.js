import request from '@/utils/request'

export function getRechargeCardOrders() {
  return request({
    url: 'rechargeCardOrders',
    method: 'get'
  })
}

export function updasteRecargeCardOrder(queryList) {
  return request({
    url: `rechargeCardOrders/${queryList.id}?status=${queryList.status}`,
    method: 'put'
  })
}
