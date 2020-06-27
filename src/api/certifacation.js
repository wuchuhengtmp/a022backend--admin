import request from '@/utils/request'
import qs from 'qs'

export function getCertificationList() {
  return request({
    url: '/users/certifications',
    method: 'get'
  })
}

// 修改审核状态
export function updateCertification(queryList) {
  return request({
    url: `users/${queryList.id}/certification?${qs.stringify(queryList)}`,
    method: 'put'
  })
}
