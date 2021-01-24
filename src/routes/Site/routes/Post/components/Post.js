// @flow
import * as React from 'react'
import moment from 'moment'
import { Helmet } from 'react-helmet'
// import css
import './Post.scss'
// import components
import Loading from 'components/Loading'
import MoreInfoBlock from 'components/MoreInfoBlock'
import NextPreviousPosts from './NextPreviousPosts'

type PropsType = {
  params: Object,
  getBlogPost: Function,
  post: Object,
  loading: boolean,
  next: Object,
  previous: Object
};

class Post extends React.Component<PropsType> {
  componentDidMount () {
    const { params, getBlogPost } = this.props
    getBlogPost(params.postID)
  }

  componentDidUpdate (prevProps: Object) {
    let { getBlogPost, params } = this.props

    if (prevProps.params.postID !== params.postID) {
      getBlogPost(params.postID)
    }
  }

  render (): React.Element<'div'> {
    const { post, loading, next, previous } = this.props

    if (loading) {
      return (
        <div className='blog-post__loading-container'>
          <Loading />
        </div>
      )
    }
    return (
      <div className={'container blog-post__container'}>
        <Helmet>
          <title>{ post.title }</title>
          <link rel='canonical' href={document.location} />
          <meta name='description' content={post.content} />
        </Helmet>
        <div className='row'>
          <div className='col-xs-12 p-t-3'>
            <h1>
              <b>{post.title}</b>
            </h1>
            <div className={'blog-post__date'}>
              {`${moment(post.createdAt)
                .locale('en-us')
                .format('DD')} ${moment(post.createdAt)
                .locale('ar-SA')
                .format('MMMM')} ${moment(post.createdAt)
                .locale('en-us')
                .format('YYYY')}`}
              <span className='p-x-1'>|</span> الأخبار
            </div>
            <div>
              <img
                className={'blog-post__cover'}
                src={post.cover_wide}
                alt={post.title}
              />
            </div>
          </div>
        </div>
        <div className='row'>
          <div
            className={'col-xs-12 col-md-8 blog-post__content'}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <div className={'col-xs-12 col-md-4 blog-post__sidebar'}>
            <MoreInfoBlock />
          </div>
        </div>
        <NextPreviousPosts next={next} previous={previous} />
      </div>
    )
  }
}

export default Post
