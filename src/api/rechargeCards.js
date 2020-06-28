import request from '@/utils/request'
import qs from 'qs'

export function  getRechargeCardList() {
  return request({
    url: 'rechargeCards',
    method: 'get'
  })
}

export function  rechargeCardUpdate(queryList) {
  return request({
    url: `rechargeCards/${queryList.id}?${qs.stringify(queryList)}`,
    method: 'put'
  })
}
