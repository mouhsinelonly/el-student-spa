// @flow
import React, { useCallback } from 'react'
import moment from 'moment'
import './style.scss'

type PropsType = {
  replies: Array<Object>,
  active: boolean,
  online: boolean,
  open: boolean,
  student: Object,
  typings: Object,
  created_at: string,
  style: string,
  priority: string,
  onClick: Function,
  category: Object,
  id: number
};
const TicketsItem = React.memo((props: PropsType): React.Element<'div'> => {
  const {
     replies,
     student,
     typings,
     active,
     open,
     style,
     created_at: createdAt,
     priority,
     online,
     onClick,
     id,
     category } = props

  if (typeof replies === 'undefined') {
    return <div />
  }

  let createdAtMoment = moment(createdAt)

  if (typeof replies[ replies.length - 1 ] !== 'undefined') {
    createdAtMoment = moment(replies[ replies.length - 1 ].created_at)
  }
  const handleClick = useCallback(() => {
    onClick(id)
  }, [id])

  const typingName = typeof typings !== 'undefined' && typeof typings[`ticket-${id}`] !== 'undefined'
  ? `${typings[`ticket-${id}`].name} يرد على الرسالة...` : null

  const unseen = replies ? replies.reduce((total: number, current: Object): number =>
      current.owner_type === 'students' && current.seen === 0 ? total + 1 : total, 0) : 0

  const lastReply = replies ? replies[replies.length - 1] : []
  const needUserReply = (lastReply && typeof lastReply.id !== 'undefined' && lastReply &&
      lastReply.owner_type === 'students')
  const repliers = replies && replies.reduce((repliers: Array<Object>, reply: Object): Array<Object> =>
      (reply.owner_type === 'users' &&
      repliers.findIndex((r: Object): boolean => r.id === reply.owner_id) < 0 &&
      repliers.length < 5)
    ? repliers.concat(reply.owner)
    : repliers, [])
  let name = ''
  if (student) {
    const splittedName = student.name.split(' ')
    name = `${splittedName[0]} ${splittedName[splittedName.length - 1]}`
  }
  return (
    <div className={`${!open ? 'is-closed' : ''} ${needUserReply ? 'no-reply' : ''}
      v2-ticket-item ${active ? 'is-active' : ''} hvr-grow-shadow`}
      style={style}
      onClick={handleClick}
      id={`TicketMenuItem${id}`}>
      <div className='row m-a-0'>
        <div className='col-xs-3 v2-ticket-item__photo-holder'>
          <span className={`${online ? '' : 'hidden-xs-up'} v2-ticket-item__online`} />
          <img src={student.photo ? student.photo.thumb : null}
            alt={name} className='v2-ticket-item__photo' />
            {student.degree_type === 'maj' ? <span className='v2-studentinfo__label'>ماجستير</span> : ''}
        </div>
        <div className='col-xs-9'>
          <div className={`v2-ticket-item__priority is-${priority}`} />
          <div className='v2-ticket-item__date'>
            {createdAtMoment.fromNow()}
          </div>
          <h6 className='v2-ticket-item__name'>{name}</h6>
          <div className={`v2-ticket-item__body ${typingName !== null ? 'text-success' : ''}`}>
            { typingName || (lastReply ? `${lastReply.body.substr(0, 40)}...` : '') }
          </div>
          <span className='v2-ticket-item__category-name'>
            {category && typeof category.id !== 'undefined' ? category.name : 'غير محدد'}
          </span>
          <span className={`v2-ticket-item__badge ${!unseen ? 'hidden-xs-up' : ''}`}>{unseen}</span>
          {repliers.map((r: Object, i: number): React.Element<'img'> => <img
            src={r.avatar ? r.avatar.thumb : null}
            alt={r.name} className='v2-ticket-item__photo-mini'
            style={{ left: (i + 1) * 15 }}
            key={i} />)}
        </div>
      </div>
    </div>
  )
})

export default TicketsItem
