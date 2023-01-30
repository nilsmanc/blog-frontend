import React from 'react'
import { useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'

import { Post } from '../components/Post'
import { Index } from '../components/AddComment'
import { CommentsBlock } from '../components/CommentsBlock'
import instance from '../axios'

type PostData = {
  _id: string
  title: string
  text: string
  imageUrl: string
  avatarUrl: string
  fullName: string
  createdAt: string
  viewsCount: number
  commentsCount: number
  tags: Array<string>
  isFullPost: boolean
}
export const FullPost: React.FC = () => {
  const [data, setData] = React.useState({} as PostData)
  const [isLoading, setLoading] = React.useState(true)
  const { id } = useParams()

  React.useEffect(() => {
    instance
      .get(`/posts/${id}`)
      .then((res) => {
        setData(res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.warn(err)
        alert('Ошибка при получении статьи')
      })
  }, [])

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />
  }

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl}
        user={{
          avatarUrl: data.avatarUrl,
          fullName: data.fullName,
        }}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={3}
        tags={data.tags}
        isFullPost>
        <ReactMarkdown children={data.text} />
      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: 'Петр Петров',
              avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
            },
            text: 'Тестовый комментарий',
          },
          {
            user: {
              fullName: 'Иван Иванов',
              avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
            },
            text: 'Тестовый комментарий',
          },
        ]}
        isLoading={false}>
        <Index />
      </CommentsBlock>
    </>
  )
}
