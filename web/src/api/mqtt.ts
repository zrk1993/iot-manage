import request from './request'

export async function topicList() {
  return request('/mqtt/topics', {
    method: 'GET'
  })
}

export async function deviceSubscriptions(data: object) {
  return request('/mqtt/device/subscriptions', {
    method: 'GET',
    params: data
  })
}
