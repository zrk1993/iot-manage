import request from './request'

export async function deviceList(data: object) {
  return request('/device/list', {
    method: 'GET',
    params: data
  })
}
