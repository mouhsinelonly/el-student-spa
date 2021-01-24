import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Loading from 'components/Loading'
import './style.scss'
import CommentListItem from './CommentListItem'

class CommentList extends Component {
  static propTypes = {
    posts: PropTypes.object,
    handlePostLike: PropTypes.func,
    onSubmit: PropTypes.func,
    loadMore: PropTypes.func,
    ownerType: PropTypes.string,
    ownerId: PropTypes.number,
    title: PropTypes.string,
    serverdate: PropTypes.string,
    insertingIds: PropTypes.array,
    likingIds: PropTypes.array,
    pagination: PropTypes.object
  }
  static defaultProps = {
    posts: {}
  }
  render () {
    const {
      posts,
      pagination,
      loadMore,
      title,
      serverdate,
      onSubmit,
      insertingIds,
      handlePostLike,
      ownerType,
      ownerId,
      likingIds
    } = this.props

    if (!pagination || !serverdate) return <Loading />

    return (
      <div>
        <h1 className='c-comment-list__title m-b-2 m-t-2'>
          <span>
            {title} ({pagination.total})
          </span>
        </h1>
        {pagination.pages &&
          Object.keys(pagination.pages).map(
            key =>
              pagination.pages[key].isFetching ? (
                <Loading key={key} />
              ) : (
                <ul className='c-comment-list__posts-page' key={key}>
                  {pagination.pages[key].ids.map(i => (
                    <CommentListItem
                      key={i}
                      onSubmit={onSubmit}
                      insertingIds={insertingIds}
                      likingIds={likingIds}
                      ownerType={ownerType}
                      ownerId={ownerId}
                      serverdate={serverdate}
                      handlePostLike={handlePostLike}
                      {...posts[i]}
                    />
                  ))}
                </ul>
              )
          )}
        {pagination.currentPage < pagination.totalPages ? (
          <button className='c-comment-list__load-more btn btn-block btn-success btn-lg m-a-auto' onClick={loadMore}>
            مشاهدة المزيد
          </button>
        ) : null}
      </div>
    )
  }
}

export default CommentList
