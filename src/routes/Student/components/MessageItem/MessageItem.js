// @flow
import * as React from 'react'
import moment from 'moment'
import './style.scss'
import Icon from 'components/Icon'

type PropsType = {
  className: string,
  content: string,
  id: number,
  seen: boolean,
  makeMessageSeen: Function,
  createdAt: string
};

const MessageItem = (props: PropsType): React.Element<'div'> => {
  const closeMe = (): Function => {
    return props.makeMessageSeen(props.id)
  }
  // console.log(props)
  return (<div className={`study-countdown__panel p-b-1
  ${props.className} m-t-2 p-t-2 p-x-2`}>
    <small>تاريخ الارسال : { moment(props.createdAt).locale('en').format('YYYY-MM-DD') }</small>
    <div dangerouslySetInnerHTML={{ __html: props.content }} />
    <button onClick={(): Function => closeMe()} className={`btn btn-light
        study-countdown__close ${props.id === 0 || +props.seen === 1 ? 'hidden-xs-up' : ''}`}>
        قمت بقرائتها <Icon name='times-small' />
    </button>
  </div>)
}

MessageItem.defaultProps = {
  seen: 1,
  content: '',
  id: 0,
  makeMessageSeen: () => {},
  className: ''
}
export default MessageItem
