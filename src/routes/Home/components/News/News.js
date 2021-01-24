// @flow
import React, { useEffect, useMemo } from 'react'
import { Link } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { Translate } from 'react-localize-redux'
import { getNews } from '../../modules/news_reducer'

// import css
import './News.scss'
// import components
import PostBlock from 'components/Blog/PostBlock'

const News = (): React.Element<'div'> => {
  const { data, loading } = useSelector((state: Object): Object => state.blog)
  const renderPosts = useMemo((): Array<Object> => {
    if (loading) return [<h1 key='header'><Translate id='global.loading' /></h1>]
    return data.filter((p: Object, i: number): boolean => i < 3)
    .map((post: Object, index: number): React.Element<'div'> => <div key={index} className='col-xs-12 col-md-4'>
      <PostBlock createdAt={post.created_at} key={index}
        id={post.id} cover={post.cover_medium} title={post.title} />
    </div>)
  })
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getNews())
  }, [])

  return (
    <div className='home-news'>
      <div className='container'>
        <div className='text-xs-center row'>
          <h1 className='home-news__title'>
            <Translate id='home.latest_news' />
          </h1>
          {renderPosts}
        </div>
        <div className='text-xs-center'>
          <Link className='btn btn-lg btn-secondary home-news__more' to='/blog'>
            <Translate id='home.more_news' />
          </Link>
        </div>
      </div>
    </div>)
}

export default News
