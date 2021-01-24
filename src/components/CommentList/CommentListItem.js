// @flow
import * as React from 'react'
import './style.scss'
import SingleCommentForm from './SingleCommentForm/'
import moment from 'moment'
import YellowDone from 'components/Svg/YellowDone'
import Icon from 'components/Icon'
import Loading from 'components/Loading'
import { likeNumberToString } from 'utils'

type PropType = {
  subject: string,
  owner: Object,
  owner_type: string,
  created_at: string,
  content: string,
  insertingIds: Array<number>,
  likingIds: Array<number>,
  likes: Array<Object>,
  replies: Array<Object>,
  postable_id: number,
  serverdate: string,
  id: number,
  ownerType: string,
  ownerId: number,
  handlePostLike: Function,
  onSubmit: Function
};

class CommentListItem extends React.Component<PropType> {
  render (): React.Element<'li'> {
    const {
      subject,
      owner,
      owner_type,
      created_at,
      content,
      ownerType,
      ownerId,
      replies,
      likes,
      insertingIds,
      likingIds,
      postable_id,
      id,
      serverdate,
      onSubmit
    } = this.props
    const serverTime = moment(serverdate)
    const liked = likes.filter((l: Object): boolean => l.owner_type === ownerType && l.owner_id === ownerId).length > 0
    const liking = likingIds.findIndex((l: number): boolean => l === id) > -1
    return (
      <li className='c-comment-list__post'>
        <h2 className='c-comment-list__post__title p-y-1'>{subject}</h2>
        <div>
          <span className='m-l-1 c-comment-list__post__author'>
            {owner.name}
            {owner.badge ? <YellowDone width={12} height={12} /> : null }
          </span>
          <span className={owner_type === 'students' ? 'label label-success' : 'label label-warning'}>
            {owner_type === 'students' ? 'طالب' : 'محاضر'}
          </span>
          <span className='m-r-1 c-comment-list__post__ago'>{moment(created_at).from(serverTime)}</span>
        </div>
        <p className='c-comment-list__post__content p-t-2' dangerouslySetInnerHTML={{ __html: content }} />
        <div className='c-comment-list__post__meta m-t-3'>
          {liking ? (
            <Loading className='c-comment-list__post__is-liking' />
          ) : (
            <span className='p-l-2' onClick={!liked ? this._onLikeClick : null}>
              <Icon name='hand-up-black' className={`c-comment-list__post__hand ${liked ? 'is-active' : ''}`} />
              {likes.length ? (
                <span className='p-r-2'>
                  {likes.length} {likeNumberToString(likes.length)}
                </span>
              ) : null}
            </span>
          )}
          <span>
            <Icon name='comment-small-dark' className='c-comment-list__post__comment m-l-1' />
            {replies.length ? `${replies.length} تعليق` : 'أضف رد'}
          </span>
        </div>
        <div className='c-comment-list__post__reply'>
          <ul className='c-comment-list__post__replies-list m-a-0 p-a-0'>
            {replies.filter((r: Object): boolean => r.owner !== null).map((r: Object, j: number): React.Element<'li'> =>
              <li key={j} className='c-comment-list__post__replies-list__item p-a-2'>
                <div>
                  <span className='c-comment-list__post__replies-list__name p-l-2'>
                    {r.owner.name} <span className={r.owner_type === 'students'
                    ? 'label label-success' : 'label label-warning'}>
                      {r.owner_type === 'students' ? 'طالب' : 'محاضر'}
                    </span>
                  </span>
                  <span className='c-comment-list__post__replies-list__ago'>
                    {moment(r.created_at).from(serverTime)}
                  </span>
                </div>
                <p
                  dangerouslySetInnerHTML={{ __html: r.content }}
                  className='c-comment-list__post__replies-list__content p-t-1'
                 />
              </li>
              )}
          </ul>
          <div className='c-comment-list__post__reply__form p-a-1'>
            <SingleCommentForm
              id={postable_id}
              insertingIds={insertingIds}
              onSubmit={onSubmit}
              form={'commentLessonPost' + id}
              parentId={id}
              placeHolder='أضف رد...'
            />
          </div>
        </div>
      </li>
    )
  }

  _onLikeClick = () => {
    const { id, handlePostLike } = this.props
    handlePostLike(id)
  }
}

export default CommentListItem
