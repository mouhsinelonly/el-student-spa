import React from 'react'
import PropTypes from 'prop-types'
import './FloatActionButton.scss'
import Icon from 'components/Icon'

class FloatActionButton extends React.Component<Props> {
  static defaultProps = {
    openChatbox: PropTypes.func,
    open: PropTypes.bool,
    tickets: PropTypes.object,
    messages: PropTypes.object
  }
  render () {
    const { open, tickets, messages } = this.props
    let unseenCount = Object.keys(tickets).reduce(
      (total, next) => total + tickets[next].replies.filter(r => r.owner_type === 'users' && r.seen === 0).length,
      0
    )
    unseenCount += Object.keys(messages).filter(k => messages[k].seen === 0).length

    return (
      <button
        onClick={this._openChatbox}
        className={`c-chatbox-button ${open ? 'is-chatbox-open' : ''} btn btn-info btn-curved`}
      >
        <span className={`c-chatbox-button__badge shadow-1 ${unseenCount === 0 ? 'hidden-xs-up' : ''}`}>
          {unseenCount}
        </span>
        <Icon name='comment-white' /> <span className='c-chatbox-button__text m-r-1'>الدعم الفني</span>
      </button>
    )
  }

  _openChatbox = () => {
    const { openChatbox } = this.props
    openChatbox()
  }
}

export default FloatActionButton
