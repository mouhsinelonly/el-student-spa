// @flow
import * as React from 'react'
// import css
import './ChatBox.scss'
import Home from './components/Home'
import NewTicket from './components/New'
import SingleTicket from './components/SingleTicket'
import Icon from 'components/Icon'
import useClickOutside from 'hooks/clickoutside'
import { useSelector } from 'react-redux'

type PropsType = {
  categories: Array<Object>,
  closeChatbox: Function,
  createTicket: Function,
  getTickets: Function,
  isPushSupported: Function,
  sendReply: Function,
  setChatboxTab: Function,
  setFirstLoad: Function,
  uploadFile: Function,
  open: boolean,
  firstload: boolean,
  tab: string,
  activeticket: number,
  ownerId: number,
  todayTicketsCount: number,
  serverdate: string,
  ownerType: string,
  tickets: Object
};

const ChatBox = (props: PropsType): React.Element<'div'> => {
  const ref = React.createRef()
  const _handleTicketUpload = ({ files, ticketId = 0 }: Object) => {
    const { uploadFile } = props
    uploadFile(files, ticketId)
  }
  useClickOutside(ref, props.closeChatbox)
  const _handleTicketReply = (values: Object) => {
    const { sendReply } = props
    sendReply(values)
  }
  const _showHomeTab = () => {
    const { setChatboxTab } = props
    setChatboxTab('home')
  }

  const _handleTicketSend = (values: Object = {}) => {
    const { createTicket, setChatboxTab } = props
    createTicket(values)
    setChatboxTab('home')
  }
  React.useEffect(() => {
    if (props.open && props.firstload) {
      props.setFirstLoad()
      props.getTickets()
      props.isPushSupported()
    }
  })
  const { todayTicketsCount, open, tab, activeticket, tickets, serverdate, categories } = props
  const ticketIndex = Object.keys(tickets).find((k: Object): boolean => tickets[k].id === activeticket)
  const ticket = tickets[ticketIndex]
  const { settings } = useSelector((state: Object): Object => state.student)
  const ticketPerDay = settings.TICKETS_PER_DAY || 0
  const remainingTickets = ticketPerDay - todayTicketsCount
  return (
    <div ref={ref} className={`chatbox ${open ? 'is-open' : ''} shadow-5`}>
      <h2
        className={`chatbox__header ${tab === 'home' ? 'text-xs-center' : ''} ${(tab === 'new' || tab === 'ticket')
        ? 'chatbox__pointer' : ''} p-x-2`}
      >
        {((): Object => {
          switch (tab) {
            case 'home':
              return <div>الدعم الفني</div>
            case 'new':
              return (
                <div onClick={_showHomeTab}>
                  <Icon name='arrow-right-small-dark' /> رجوع
                </div>
              )
            case 'ticket':
              return (
                <div onClick={_showHomeTab}>
                  <Icon name='arrow-right-small-dark' /> رجوع
                </div>
              )
          }
          return <div />
        })()}
        <button onClick={props.closeChatbox} className='chatbox__close'>
          &times;
        </button>
      </h2>
      {((): Object => {
        switch (tab) {
          case 'home':
            return <Home {...props} remainingTickets={remainingTickets} />
          case 'new':
            return <NewTicket
              onSubmit={_handleTicketSend}
              categories={categories} />
          case 'ticket':
            return (
              <SingleTicket
                remainingTickets={remainingTickets}
                initialValues={{ ticketId: ticket.id }}
                serverdate={serverdate}
                onUpload={_handleTicketUpload}
                onSubmit={_handleTicketReply}
                {...ticket}
              />
            )
        }
        return <div />
      })()}
    </div>
  )
}

ChatBox.defaultProps = {
  closeChatbox: () => {}
}

export default ChatBox
