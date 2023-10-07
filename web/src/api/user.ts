import request from './request'

export async function login(data: object) {
  return request('/user/login', {
    method: 'POST',
    data: data
  })
}

export async function getUserInfo() {
  return request('/user/info', {
    method: 'GET'
  })
}
