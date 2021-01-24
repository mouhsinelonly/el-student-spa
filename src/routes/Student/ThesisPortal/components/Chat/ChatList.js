// @flow
import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import './ThesisChatList.scss'

const ChatList = (): React.Element<'div'> => {
  const listReference = useRef()
  const { messages } = useSelector((state: Object): Object => state.thesis)
  useEffect(() => {
    listReference.current.scrollTop = listReference.current.scrollHeight
  }, [messages])
  return <ul ref={listReference}
    className='ThesisChatList list-unstyled'
    style={{ display: 'flex', flexDirection: 'column', flex: 1, alignSelf: 'stretch' }}>
    {Object.keys(messages).map((key: string): React.Element<'li'> =>
      <li className={`ThesisChatList__item m-b-1 ${!messages[key].isOther ? 'is-other' : ''}`} key={key}>
        {messages[key].content}
      </li>)}
  </ul>
}

export default ChatList
