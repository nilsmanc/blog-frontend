import { AuthSliceState, RegisterParams, User } from './../../types'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import instance from '../../axios'
import { LoginData, LoginParams } from '../../types'
import { RootState } from '../store'

export const fetchAuth = createAsyncThunk<LoginData, LoginParams>(
  'auth/fetchAuth',
  async (params) => {
    const { data } = await instance.post('/auth/login', params)
    return data
  },
)

export const fetchRegister = createAsyncThunk<LoginData, RegisterParams>(
  'auth/fetchRegister',
  async (params) => {
    const { data } = await instance.post('/auth/register', params)
    return data
  },
)

export const fetchAuthMe = createAsyncThunk<User>('auth/fetchAuthMe', async () => {
  const { data } = await instance.get('/auth/me')
  return data
})

const initialState: AuthSliceState = {
  data: null,
  status: 'loading',
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAuth.pending, (state) => {
      state.status = 'loading'
      state.data = null
    }),
      builder.addCase(fetchAuth.fulfilled, (state, action) => {
        state.status = 'loaded'
        state.data = action.payload
      }),
      builder.addCase(fetchAuth.rejected, (state) => {
        state.status = 'error'
        state.data = null
      }),
      builder.addCase(fetchAuthMe.pending, (state) => {
        state.status = 'loading'
        state.data = null
      }),
      builder.addCase(fetchAuthMe.fulfilled, (state, action) => {
        state.status = 'loaded'
        state.data = action.payload
      }),
      builder.addCase(fetchAuthMe.rejected, (state) => {
        state.status = 'error'
        state.data = null
      }),
      builder.addCase(fetchRegister.pending, (state) => {
        state.status = 'loading'
        state.data = null
      }),
      builder.addCase(fetchRegister.fulfilled, (state, action) => {
        state.status = 'loaded'
        state.data = action.payload
      }),
      builder.addCase(fetchRegister.rejected, (state) => {
        state.status = 'error'
        state.data = null
      })
  },
})

export const selectIsAuth = (state: RootState) => Boolean(state.auth.data)

export const authReducer = authSlice.reducer

export const { logout } = authSlice.actions
