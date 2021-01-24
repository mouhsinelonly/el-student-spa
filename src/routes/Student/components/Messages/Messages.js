// @flow
import * as React from 'react'
import MessageItem from '../MessageItem'
import moment from 'moment'

type PropsType = {
  messages: Object,
  serverdate: string
};

class Messages extends React.Component<PropsType> {
  render (): Array<React.Element<typeof MessageItem>> {
    const { messages, serverdate } = this.props
    const momentServerTime = moment(serverdate)
    const momentTowWeeksBefore = momentServerTime.clone().subtract(7, 'days')
    return Object.keys(messages)
                .filter((i: number): boolean => messages[i].seen === 0 &&
                  moment(messages[i].created_at).isAfter(momentTowWeeksBefore))
                .reverse()
                .map((i: number): React.Element<typeof MessageItem> =>
                  <MessageItem content={messages[i].email}
                    id={messages[i].id}
                    createdAt={messages[i].created_at}
                    seen={messages[i].seen}
                    key={i} />)
  }
}

export default Messages
