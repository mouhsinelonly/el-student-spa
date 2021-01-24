import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import Loading from 'components/Loading'
import MessageItem from 'routes/Student/components/MessageItem'

class Messages extends Component {
  static propTypes = {
    messages: PropTypes.object,
    loading: PropTypes.bool
  }
  static defaultProps = {
    messages: {},
    loading: false
  }

  render () {
    const { loading, messages } = this.props
    if (loading) {
      return (<div className='p-y-3'><Loading /></div>)
    }
    return (<div className='p-student-messages__container'>
      <h1 className='p-student-messages__heading text-xs-center'>الإشعارات</h1>
      <div className='container'>
        <div className='row'>
          <div className='col-xs-12.col-md-10 col-md-pull-1 col-lg-8 col-lg-pull-2 p-student-messages__list'>
            {Object.keys(messages).reverse().map(i =>
              <MessageItem content={messages[i].email} seen={messages[i].seen} createdAt={messages[i].created_at}
                id={messages[i].id} key={i} />)}
          </div>
        </div>
      </div>
    </div>)
  }
}

export default Messages
