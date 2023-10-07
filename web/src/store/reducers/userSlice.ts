import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'counter', // 命名空间，在调用action的时候会默认的设置为action的前缀
  initialState: {
    nickname: '管理员',
    username: '',
    avatar:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg'
  },
  reducers: {
    setUserInfo(state, { payload }) {
      state.username = payload.username // 内置了immutable
      if (payload.avatar) state.avatar = payload.avatar // 内置了immutable
    }
  }
})

// 导出actions
export const { setUserInfo } = counterSlice.actions

export default counterSlice.reducer // 导出reducer，在创建store时使用到
