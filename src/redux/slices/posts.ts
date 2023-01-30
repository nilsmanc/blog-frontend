import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import instance from '../../axios'
import { PostsSliceState, PostType } from '../../types'

export const fetchPosts = createAsyncThunk<Array<PostType>>('posts/fetchPosts', async () => {
  const { data } = await instance.get('/posts')
  return data
})

export const fetchTags = createAsyncThunk<Array<string>>('posts/fetchTags', async () => {
  const { data } = await instance.get('/tags')
  return data
})

export const fetchRemovePost = createAsyncThunk<void, string>('posts/fetchRemovePost', async (id) =>
  instance.delete(`/posts/${id}`),
)

const initialState: PostsSliceState = {
  posts: {
    items: [],
    status: 'loading',
  },
  tags: {
    items: [],
    status: 'loading',
  },
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.posts.items = []
      state.posts.status = 'loading'
    }),
      builder.addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts.items = action.payload
        state.posts.status = 'loaded'
      }),
      builder.addCase(fetchPosts.rejected, (state) => {
        state.posts.items = []
        state.posts.status = 'error'
      }),
      builder.addCase(fetchTags.pending, (state) => {
        state.tags.items = []
        state.tags.status = 'loading'
      }),
      builder.addCase(fetchTags.fulfilled, (state, action) => {
        state.tags.items = action.payload
        state.tags.status = 'loaded'
      }),
      builder.addCase(fetchTags.rejected, (state) => {
        state.tags.items = []
        state.tags.status = 'error'
      }),
      builder.addCase(fetchRemovePost.pending, (state, action) => {
        state.posts.items = state.posts.items.filter((obj: PostType) => obj._id !== action.meta.arg)
      })
  },
})

export const postsReducer = postsSlice.reducer
