// @flow
import * as React from 'react'
import DotNotification from 'components/Notifications/Dot'
import './style.scss'
import moment from 'moment'
import { Link } from 'react-router'

const buttonsClass = `btn btn-white shadow-1 btn-block m-b-2 c-chatbox-home__button`

type PropsType = {
  setChatboxTab: Function,
  setActiveTicket: Function,
  tickets: Object,
  messages: Object,
  ownerType: string,
  serverdate: string,
  ownerId: number,
  gcmsubscribing: boolean,
  gcmenabled: boolean,
  profile: Object,
  gcmsupported: boolean,
  subscribePush: Function,
  unsubscribePush: Function
};

const Home = (properties: PropsType): React.Element<'div'> => {
  const { remainingTickets, messages, gcmenabled, gcmsubscribing, subscribePush, unsubscribePush, tickets, ownerType, ownerId, setActiveTicket, setChatboxTab, serverdate } = properties
  const _renderTickets = (): Array<*> => {
    if (typeof tickets === 'undefined') return []

    return Object.keys(tickets).map((i: string) => <TicketRow key={i} {...tickets[i]}
      setActiveTicket={setActiveTicket}
      setChatboxTab={setChatboxTab}
      serverdate={serverdate}
      ownerType={ownerType}
      ownerId={ownerId} />)
  }

  const _showNewMessageTab = () => {
    setChatboxTab('new')
  }

  const _togglePushSubscription = () => {
    gcmenabled ? unsubscribePush() : subscribePush()
  }
  const unseenMessagesCount = Object.keys(messages).filter((k: string): boolean => messages[k].seen === 0).length
  return <div>
    <div className='col-xs-6'>
      {<Link to='/student/support/messages' className={buttonsClass}>
        الإعلانات
        <span className={`shadow-1 c-chatbox-home__tag ${unseenMessagesCount === 0 ? 'hidden-xs-up' : ''}`}>
          {unseenMessagesCount}
        </span>
      </Link> }
    </div>
    <div className='col-xs-6'>
      <Link to='/student/support/softwares' className={buttonsClass}>
        البرامج المساعدة
      </Link>
    </div>
    <div className='col-xs-6'>
      <Link to='/student/support/guides' className={buttonsClass}>
        إستخدام النظام
      </Link>
    </div>
    <div className='col-xs-6'>
      <Link
        className={buttonsClass}
        to='/student/support/faq'>
        الأسئلة الشائعة
      </Link>
    </div>
    <div className='rcol-xs-6 hidden-xs-up'>
      <button className={buttonsClass}
        disabled={gcmsubscribing}
        onClick={_togglePushSubscription}>
        {gcmenabled ? 'تعطيل الاشعارات' : 'تفعيل الاشعارات'}
      </button>
    </div>
    <div className='col-xs-6'>
      {/* <button className={buttonsClass}>
          شرح الإستخدام
        </button> */}
    </div>
    <div className='clearfix' />
    <h2 className={`${!remainingTickets ? 'hidden-xs-up' : null} c-chatbox-home__tickets__header text-xs-center shadow-1 p-y-2 m-a-0`}> المتبقي من الرسائل اليومية <div className='bg-success' style={{ display:'inline-block', verticalAlign: 'middle', borderRadius: '50%', width: 25, height: 25, padding: '5px 0 0', marginRight: 5 }}>{remainingTickets}</div> </h2>
    <h2 className={`${remainingTickets > 0 ? 'hidden-xs-up' : null} c-chatbox-home__tickets__header text-xs-center p-y-1 m-x-3 bg-danger`} style={{ borderWidth: 0, borderRadius:30 }}>إنتهى رصيدك من الرسائل اليومية</h2>
    <div className='c-chatbox-home__tickets-scroll'>
      <ul className='c-chatbox-home__tickets-container'>
        {
            _renderTickets()
          }
      </ul>
    </div>
    <div className='c-chatbox-home__new-container shadow-1 p-a-2'>
      <button disabled={remainingTickets <= 0} className='c-chatbox-home__new-button btn btn-info' onClick={_showNewMessageTab}>
        رسالة جديدة
      </button>
    </div>
  </div>
}

type RowType = {
   subject: string,
   replies: Array<Object>,
   id: number,
   serverdate: string,
   created_at: string,
   setChatboxTab: Function,
   setActiveTicket: Function
};

class TicketRow extends React.PureComponent<RowType> {
  render (): React.Element<'li'> {
    const { subject, replies, created_at, serverdate } = this.props

    let lastReply = null
    let createdAtMoment = moment(created_at)
    replies.find((r: Object, i: number) => {
      if ((r.deleted === 0 || typeof r.deleted === 'undefined') && i === replies.length - 1) {
        lastReply = r
        createdAtMoment = moment(r.created_at)
      }
    })

    const serverTime = moment(serverdate)
    const unseen = replies.filter((r: Object): boolean => r.seen === 0 && r.owner_type === 'users').length

    return (<li
      onClick={this._handleTicketClick}
      className={`c-chatbox-home__tickets-container__item
      ${unseen && 'is-unseen'}
      ${unseen && 'shadow-1'}
      p-a-2`}
      style={{ zIndex: moment(created_at).unix() }}>
      <span className='c-chatbox-home__tickets-container__item-time'>{createdAtMoment.from(serverTime)}</span>
      <h5 className={`c-chatbox-home__tickets-container__item-title ${unseen && 'is-unseen'}`}>
        {subject} {unseen
          ? <DotNotification className='c-chatbox-home__tickets-container__item-notification m-r-1' />
          : null}
      </h5>
      <p className='m-a-0 c-chatbox-home__tickets-container__item-content text-nowrap'>
        {lastReply ? lastReply.body : ''}
      </p>
      <span className={`c-chatbox-home__tickets-container__item-badge ${!unseen ? 'hidden-xs-up' : ''}`}>{unseen}</span>
    </li>)
  }
  _handleTicketClick = () => {
    const { id, setChatboxTab, setActiveTicket } = this.props
    setChatboxTab('ticket')
    setActiveTicket(id)
  }
}

export default Home
