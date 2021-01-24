import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import { answerNumberToStringWithout } from 'utils'
import moment from 'moment'
import YellowDone from 'components/Svg/YellowDone'

class CommunityListItem extends React.Component {
  static propTypes = {
    id: PropTypes.number,
    old: PropTypes.number,
    subject: PropTypes.string,
    replies: PropTypes.array,
    created_at: PropTypes.string,
    owner: PropTypes.object,
    handleClick: PropTypes.func,
    serverdate: PropTypes.string
  }
  render () {
    const { subject, replies, owner, created_at: createdAt, serverdate, old, id } = this.props
    const momentServerTime = moment(serverdate)
    return (
      <li onClick={this._handleClick} className={`c-community-list__panel`} style={{ zIndex: id }}>
        <div className={`c-community-list__post p-t-2 ${old > 1 ? 'is-old' : ''}`}>
          <div className='col-xs-3 col-md-2'>
            <div className='text-xs-center m-x-auto c-community-list__post__replies'>
              <b>{replies.length}</b>
              {answerNumberToStringWithout(replies.length)}
            </div>
          </div>
          <div className='col-xs-9 col-md-10 c-community-list__post__left'>
            <h1 className='c-community-list__post__subject text-nowrap'>{subject}</h1>
            <span className='c-community-list__post__owner p-l-2'>
              {owner.name}
              {owner.badge ? <YellowDone
                tooltip
                width={20}
                height={20}
                className='c-community-list__post__badge' /> : null }
            </span>
            <span className='c-community-list__post__ago'>
              {moment(createdAt).from(momentServerTime)}
            </span>
          </div>
          <div className='clearfix' />
        </div>
      </li>
    )
  }
  _handleClick = () => {
    const { handleClick, id } = this.props
    handleClick(id)
  }
}

export default CommunityListItem
