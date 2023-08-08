import { createSlice } from '@reduxjs/toolkit'

export const globalSlice = createSlice({
  name: 'global', // 命名空间，在调用action的时候会默认的设置为action的前缀
  initialState: {
    token: ''
  },
  reducers: {
    setToken(state, { payload }) {
      state.token = payload // 内置了immutable
    },
    clearToken(state) {
      state.token = ''
    }
  }
})

// 导出actions
export const { setToken, clearToken } = globalSlice.actions

export default globalSlice.reducer // 导出reducer，在创建store时使用到
