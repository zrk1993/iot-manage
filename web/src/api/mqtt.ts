import request from './request'

export async function topicList() {
  return request('/mqtt/topics', {
    method: 'GET'
  })
}
