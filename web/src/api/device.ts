import request from './request'

export async function deviceList(data: object) {
  return request('/device/list', {
    method: 'GET',
    params: data
  })
}

export async function devicePage(data: object) {
  return request('/device/page', {
    method: 'GET',
    params: data
  })
}

export async function suggestDeviceKey(data: object) {
  return request('/device/suggestDeviceKey', {
    method: 'GET',
    params: data
  })
}

export async function deviceAdd(data: object) {
  return request('/device/add', {
    method: 'POST',
    data: data
  })
}

export async function deviceDel(data: object) {
  return request('/device/del', {
    method: 'POST',
    data: data
  })
}

export async function deviceInfo(data: object) {
  return request('/device/info', {
    method: 'GET',
    params: data
  })
}

export async function deviceTslProperty(data: object) {
  return request('/device/tsl/property', {
    method: 'GET',
    params: data
  })
}

export async function deviceTslData(data: object) {
  return request('/device/tsl/data', {
    method: 'GET',
    params: data
  })
}

export async function deviceTslDataSet(data: object) {
  return request('/device/tsl/data/set', {
    method: 'POST',
    data: data
  })
}
