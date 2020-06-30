import request from '@/utils/request'

export function getFeedbackList() {
  return request({
    url: 'feedback',
    method: 'get'
  })
}
