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

/**
 * 交易配置
 */
export function getConfigurationList() {
  return request({
    url: 'transations/configurations',
    method: 'get'
  })
}

// 更新
export function configurationUpdate(queryList) {
  const data = JSON.stringify(queryList)
  return request({
    url: `transations/configurations?${qs.stringify(queryList)}`,
    method: 'put'
  })
}
