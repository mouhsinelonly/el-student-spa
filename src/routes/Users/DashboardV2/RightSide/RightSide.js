// @flow
import React, { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTickets, getAnsweredTickets, setActiveTab } from 'routes/Users/modules/tickets'
import SearchStudent from './SearchStudent'
import TicketsTabs from './TicketsTabs'
import TicketsList from './TicketsList'
import './style.scss'

const RightSide = (): React.Element<'div'> => {
  const dispatch = useDispatch()
  const visible = useSelector((state: Object): boolean => state.user_ui.ticketsListMenuVisible)
  const { total, answeredTotal, activeTab } = useSelector((state: Object): Object => state.user_tickets)

  const _handleSearch = useCallback((e: Object) => {
    if (e.type === 'click' || e.keyCode === 13) {
      dispatch(getTickets(1, { username: e.target.value, answered: 0, open: 1 }))
      dispatch(getAnsweredTickets(1, { username: e.target.value, answered: 1, open: 1 }))
    }
  }, [])

  const _setActiveTab = useCallback((index: number) => {
    dispatch(setActiveTab(index))
  }, [])

  return (
    <div className={`col-xs-12
      ${visible ? 'is-visible' : ''}
      col-md-3 p-a-0 user2-dashboard__side is-border-left right-side__container is-menu`}>
      <SearchStudent handleSearch={_handleSearch} />
      <TicketsTabs total={total} setActiveTab={_setActiveTab} answeredTotal={answeredTotal} activeTab={activeTab} />
      <TicketsList />
    </div>
  )
}
export default RightSide
