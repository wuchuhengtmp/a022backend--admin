import request from '@/utils/request'
import qs from 'qs'

export function getCustomerList() {
  return request({
    url: 'system/customer',
    methods: 'get'
  })
}

export function updateCustomer(queryList) {
  return request({
    url: `system/customer/${queryList.id}?${qs.stringify(queryList)}`,
    method: 'put'
  })
}
