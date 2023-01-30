export type LoginParams = {
  email: string
  password: string
}

export type RegisterParams = {
  fullName: string
  email: string
  password: string
}

export interface LoginData {
  meta: {
    arg: LoginParams | RegisterParams
    requestId: string
    requestStatus: string
  }
  payload: {
    email: string
    fullName: string
    token: string
    createdAt: Date
    updatedAt: Date
    __v: number
    _id: string
  }
  type: string
}

export type User = {
  _id?: string
  fullName: string
  email?: string
  avatarUrl?: string
  passwordHash?: string
  createdAt?: Date
  updatedAt?: Date
  __v?: number
}

export interface AuthSliceState {
  data: AuthData | null
  status: 'loading' | 'loaded' | 'error'
}

export type AuthData = {
  _id: string
  fullName: string
  email: string
  createdAt: string
  updatedAt: string
  __v: number
}

export type PostType = {
  _id: string | number
  title: string
  text: string
  imageUrl: string
  tags: Array<string>
  viewsCount: number
  user: User
  createdAt: Date
  updatedAt: Date
  __v: number
}

export interface PostsSliceState {
  posts: {
    items: PostType[]
    status: 'loading' | 'loaded' | 'error'
  }
  tags: {
    items: Array<string>
    status: 'loading' | 'loaded' | 'error'
  }
}

export type Comment = {
  user: {
    fullName: string
    avatarUrl: string
  }
  text: string
}
