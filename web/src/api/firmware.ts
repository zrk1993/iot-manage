import request from './request'

export async function firmwareInfo(data: object) {
  return request('/firmware/info', {
    method: 'GET',
    params: data
  })
}

export async function firmwareList(data: object) {
  return request('/firmware/list', {
    method: 'GET',
    params: data
  })
}

export async function firmwareAdd(data: object) {
  return request('/firmware/add', {
    method: 'POST',
    data: data
  })
}

export async function firmwareDel(data: object) {
  return request('/firmware/del', {
    method: 'POST',
    data: data
  })
}
