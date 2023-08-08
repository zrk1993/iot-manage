import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
  TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector
} from 'react-redux'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import globalSlice from './reducers/globalSlice'
import userSlice from './reducers/userSlice'

const reducer = combineReducers({
  globalSlice,
  userSlice
})

const persistConfig = {
  key: 'redux-state',
  storage: storage,
  whitelist: ['globalSlice']
}
const persistReducerConfig = persistReducer(persistConfig, reducer)

export const store = configureStore({
  reducer: persistReducerConfig
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector
export const useDispatch = () => useReduxDispatch<AppDispatch>()

export default store
