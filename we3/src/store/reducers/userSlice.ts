import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'counter', // 命名空间，在调用action的时候会默认的设置为action的前缀
  initialState: {
    username: '',
    avatar: ''
  },
  reducers: {
    setUserInfo(state, { payload }) {
      state.username = payload.username // 内置了immutable
      state.avatar = payload.avatar // 内置了immutable
    }
  }
})

// 导出actions
export const { setUserInfo } = counterSlice.actions

export default counterSlice.reducer // 导出reducer，在创建store时使用到
