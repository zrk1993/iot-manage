import { configureStore } from '@reduxjs/toolkit'
import {
  TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector
} from 'react-redux'

import globalSlice from './reducers/globalSlice'
import userSlice from './reducers/userSlice'

export const store = configureStore({
  reducer: {
    globalSlice,
    userSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector
export const useDispatch = () => useReduxDispatch<AppDispatch>()

export default store
