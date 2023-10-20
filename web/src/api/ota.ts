import request from './request'

export async function otaInfo(data: object) {
  return request('/ota/info', {
    method: 'GET',
    params: data
  })
}

export async function otaList(data: object) {
  return request('/ota/list', {
    method: 'GET',
    params: data
  })
}

export async function otaCreate(data: object) {
  return request('/ota/create', {
    method: 'POST',
    data: data
  })
}

export async function otaDel(data: object) {
  return request('/ota/del', {
    method: 'POST',
    data: data
  })
}
