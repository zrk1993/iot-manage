import { store } from '@/store'
import axios, { AxiosError } from 'axios'

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

export default instance
