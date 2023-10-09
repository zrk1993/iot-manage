import request from './request'

export async function tslList(data: object) {
  return request('/tsl/list', {
    method: 'GET',
    params: data
  })
}

export async function tslAdd(data: object) {
  return request('/tsl/add', {
    method: 'POST',
    data: data
  })
}

export async function tslDel(data: object) {
  return request('/tsl/del', {
    method: 'POST',
    data: data
  })
}
