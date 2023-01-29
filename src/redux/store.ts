import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import { postsReducer } from './slices/posts'
import { authReducer } from './slices/auth'

const store = configureStore({
  reducer: {
    posts: postsReducer,
    auth: authReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store
