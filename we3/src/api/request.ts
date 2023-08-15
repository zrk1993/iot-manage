import { store } from '@/store'
import axios, { AxiosError } from 'axios'
import type { AxiosRequestConfig } from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  timeout: 5000,
  headers: {}
})

instance.interceptors.request.use(
  config => {
    config.headers.authorization = store.getState().globalSlice.token || ''
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

type TResponse<T> = {
  code: number
  message: string
  data: T
}

const request = async (url: string, config?: AxiosRequestConfig): Promise<TResponse<any>> => {
  return new Promise((resolve, reject) => {
    instance(url, config)
      .then(res => resolve(res.data as TResponse<any>))
      .catch(reject)
  })
}

export default request
