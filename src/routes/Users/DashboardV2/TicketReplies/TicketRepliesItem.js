// @flow
import React, { useCallback, useState } from 'react'
import Icon from 'components/Icon'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import Youtube from 'components/Players/Youtube'
import Copy from 'components/Svg/Copy'
import Star from 'components/Svg/Star'
import { copyStringToClipboard } from 'utils'
import { deleteReply } from 'routes/Users/modules/tickets'
import { postFavoriteReply } from 'routes/Users/modules/users'
type PropsType = {
  owner: Object,
  seen: boolean,
  deleted: boolean,
  closed: boolean,
  id: number,
  ticket_id: number,
  userId: number,
  owner_type: string,
  owner_id: number,
  created_at: string,
  departmentId: number,
  body: string
};

const TicketRepliesItem = (props: PropsType): React.Element<'li'> => {
  const [dropdownVisible, setDropdownVisibility] = useState(false)
  const { owner: { name }, owner_type: ownerType, owner_id: ownerId, body, seen,
    created_at: createdAt, deleted, userId, ticket_id: ticketId, id, departmentId, closed } = props

  const dispatch = useDispatch()
  const isOther = ownerType === 'students'
  const createdAtMoment = moment(createdAt)
  const youtubeString = body.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/)
  const youtubeId = (!youtubeString) ? '' : youtubeString[1]

  const _deleteClicked = useCallback(() => {
    dispatch(deleteReply(id, ticketId))
  })

  const _showDropDown = useCallback(() => {
    setDropdownVisibility(!dropdownVisible)
  })

  const _copyToClipboard = useCallback(() => {
    copyStringToClipboard(body)
  })

  const _addToFavorite = useCallback(() => {
    dispatch(postFavoriteReply({ content: body, departmentId:departmentId }))
  })

  return (
    <li className={`v2-ticket-replies__item m-b-2 ${closed && 'is-closed'}`} >
      <div className={`v2-ticket-replies__item-chat p-a-1 p-l-2
        ${deleted ? 'is-deleted' : ''} ${isOther ? 'is-other' : ''}`}>
        {!deleted ? body : <i>هذه الرسالة تم حذفها</i>}
        <Youtube id={youtubeId} width={360} height={240} />
        {!isOther && !deleted && (ownerId === userId || [1, 47].includes(userId))
          ? <span onClick={_showDropDown} className='v2-ticket-replies__item-dropdown-toggle'>
            <div className='material-icons'>keyboard_arrow_down</div>
          </span> : null }
        {!isOther ? <div onClick={_showDropDown}
          className={`v2-ticket-replies__item-dropdown ${dropdownVisible ? '' : 'hidden-xs-up'}`}>
          <div onClick={_deleteClicked} >حذف</div>
        </div> : null}
      </div>
      { isOther ? <button onClick={_copyToClipboard} className='v2-ticket-replies__item-action pull-xs-left'>
        <Copy width={14} height={14} />
      </button> : null }
      { !isOther && !deleted ? <button onClick={_addToFavorite} className='v2-ticket-replies__item-action m-r-1'>
        <Star width={14} height={14} fill='#777d84' />
      </button> : null }
      <div className='clearfix' />
      <span className={`${isOther ? 'pull-xs-left' : 'pull-xs-right'} ${seen ? 'is-seen' : ''}
      m-t-1 text-nowrap v2-ticket-replies__item-date m-l-1`}>
        <Icon name={seen ? 'message-seen-check' : 'message-sent-check'}
          className={`m-l-1 ${isOther ? 'hidden-xs-up' : ''}`} />
        {createdAtMoment.fromNow()} <span className={`${ownerType === 'students' ? 'hidden-xs-up' : ''}`}>
           . { name }
        </span>
      </span>
      <div className='clearfix' />
    </li>
  )
}

export default TicketRepliesItem
