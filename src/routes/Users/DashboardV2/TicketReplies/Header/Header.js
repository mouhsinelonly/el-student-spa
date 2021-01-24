// @flow
import * as React from 'react'
import './style.scss'
import DepartmentList from '../DepartmentList'
import ErrorBoundary from 'components/ErrorBoundries'

type PropsType = {
  studentsTickets: Array<Object>,
  tickets: Array<Object>,
  ticketId: number,
  studentId: number,
  isOpen: boolean,
  openTicket: Function,
  toggleTicketsListMenu: Function,
  toggleTicketsInfoMenu: Function,
  setActiveTicket: Function,
  closeTicket: Function
};
class Header extends React.Component<PropsType> {
  render (): React.Element<'div'> {
    const { studentsTickets, isOpen, studentId, ticketId, tickets, departmentId } = this.props
    const studentTicketsIds = studentsTickets[`tickets-${studentId}`]

    const studentTickets = typeof studentTicketsIds !== 'undefined'
      ? studentTicketsIds.reduce((total: Array<Object>, current: number): Array<Object> =>
        current !== ticketId && typeof tickets[`ticket-${current}`] !== 'undefined'
        ? total.concat(tickets[`ticket-${current}`])
        : total, [])
      : []

    return (
      <div className='v2-ticket-replies-header'>
        <div className='v2-ticket-replies-header__action is-right'>
          <button onClick={this._toggleMenu} className='hidden-md-up v2-ticket-replies-header__menu'>
            <span className='material-icons'>menu</span>
          </button>
          <button onClick={this._toggleInfo} className='hidden-md-up v2-ticket-replies-header__menu is-left'>
            <span className='material-icons'>contact_mail</span>
          </button>
          <select disabled={!studentTickets.length}
            className='m-l-1'
            onChange={this._changeTicket}>
            <option>الرسائل السابقة للطالب</option>
            {studentTickets.map((ticket: Object): React.Element<'option'> =>
              <option key={ticket.id}
                value={ticket.id}>{ticket.replies.length > 0 ? ticket.replies[0].body.substr(0, 40) : ''}...</option>)}
          </select>
          <i className='material-icons' style={{ right: -40, pointerEvents: 'none' }}>arrow_drop_down</i>
        </div>
        <button className='pull-xs-left v2-ticket-replies-header__action' onClick={this._closeTicket}>
          {isOpen ? 'غلق الرسالة' : 'فتح الرسالة'}
          <i className='material-icons m-r-2' >{isOpen ? 'lock' : 'lock_open'}</i>
        </button>
        <ErrorBoundary>
          <DepartmentList />
        </ErrorBoundary>
      </div>
    )
  }
  _toggleMenu = () => {
    const { toggleTicketsListMenu } = this.props
    toggleTicketsListMenu(true)
  }
  _toggleInfo = () => {
    const { toggleTicketsInfoMenu } = this.props
    toggleTicketsInfoMenu(true)
  }
  _changeTicket = (e: Object) => {
    const { value } = e.target
    const { setActiveTicket } = this.props
    setActiveTicket(value)
  }
  _closeTicket = () => {
    const { ticketId, isOpen, closeTicket, openTicket } = this.props
    if (isOpen) {
      closeTicket(ticketId)
      return
    }

    openTicket(ticketId)
  }
}

export default Header
