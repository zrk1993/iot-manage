import request from './request'

export async function login(data: object) {
  return request('/user/login', {
    method: 'POST',
    data: data
  })
}

export async function info() {
  return request('/user/info', {
    method: 'GET'
  })
}
