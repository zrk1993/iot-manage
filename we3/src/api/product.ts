import request from './request'

export async function productList() {
  return request('/product/list', {
    method: 'GET'
  })
}
