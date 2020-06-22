import request from '@/utils/request'

export function getGoodsList() {
  return request({
    url: '/goods',
    method: 'get'
  })
}

