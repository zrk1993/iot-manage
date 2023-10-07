import request from './request'

export async function productList(data: object) {
  return request('/product/list', {
    method: 'GET',
    params: data
  })
}

export async function productAdd(data: object) {
  return request('/product/add', {
    method: 'POST',
    data: data
  })
}

export async function productDel(data: object) {
  return request('/product/del', {
    method: 'POST',
    data: data
  })
}
