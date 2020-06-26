import request from '@/utils/request'
import qs from 'qs'

export function getGoodsList() {
  return request({
    url: '/goods',
    method: 'get'
  })
}

export function update(goodsInfo) {
  return request({
    url: `/goods/${goodsInfo.id}?${qs.stringify(goodsInfo)}`,
    method: 'put'
  })
}
