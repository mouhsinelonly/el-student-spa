// @flow
import * as React from 'react'
import TicketsItem from '../TicketsItem'
import Loading from 'components/Loading'
import './style.scss'
import { List, InfiniteLoader, AutoSizer } from 'react-virtualized'

type PropsType = {
  onlineIDS: Array<number>,
  tickets: Object,
  typings: Object,
  answeredTickets: Object,
  unAnsweredTickets: Array<number>,
  closedTickets: Object,
  getAnsweredTickets: Function,
  answeredLoading: boolean,
  setActiveTicket: Function,
  setTicketSeen: Function,
  getTickets: Function,
  getStudent: Function,
  searchString: string,
  total: number,
  answeredTotal: number,
  activeTab: number,
  loading: boolean,
  setActiveStudentDetails: Function,
  activeTicket: Object,
  profile: Object
};

class TicketsList extends React.Component<PropsType> {
  componentDidMount () {
    document.addEventListener('userStartedTyping', this._refreshLists)
    document.addEventListener('userStopedTyping', this._refreshLists)
  }
  _refreshLists = () => {
    if (this.list.current) {
      this.list.current.forceUpdateGrid()
    }
    if (this.list.listAnswered) {
      this.listAnswered.current.forceUpdateGrid()
    }
  }
  componentWillUnmount () {
    document.removeEventListener('userStartedTyping', this._refreshLists)
    document.removeEventListener('userStopedTyping', this._refreshLists)
  }
  // $FlowFixMe
  list = React.createRef()
   // $FlowFixMe
  listAnswered = React.createRef()
  render (): React.Element<'div'> {
    const { activeTab, answeredTickets, unAnsweredTickets, total,
      answeredTotal, loading, answeredLoading, typings } = this.props
      
    return (
      <div className='v2-tickets-list'>
        <Loading className='v2-tickets-list__loading' hide={!loading && !answeredLoading} />
        { activeTab === 0 ? <AutoSizer hidden={activeTab !== 0}>
          {({ height, width }: Object): React.Element<typeof InfiniteLoader> => (
            <InfiniteLoader
              isRowLoaded={this.isRowLoaded}
              loadMoreRows={this._loadMore}
              rowCount={total}>
              {({ onRowsRendered, registerChild }: Object): React.Element<typeof List> => (<List
                className={activeTab === 0 ? '' : 'hidden-xs-up'}
                onRowsRendered={onRowsRendered}
                width={width}
                height={height}
                ref={this.list}
                data={typings}
                rowCount={unAnsweredTickets.length}
                rowHeight={120}
                rowRenderer={this._rowRenderer} />)}
            </InfiniteLoader>)}
        </AutoSizer> : null }
        {activeTab === 1 ? <AutoSizer hidden={activeTab !== 1}>
          {({ height, width }: Object): React.Element<typeof InfiniteLoader> => (
            <InfiniteLoader
              isRowLoaded={this.isRowLoadedAn}
              loadMoreRows={this._loadMoreAnanswered}
              rowCount={answeredTotal}
            >
              {({ onRowsRendered, registerChild }: Object): React.Element<typeof List> => (<List
                className={activeTab === 1 ? '' : 'hidden-xs-up'}
                onRowsRendered={onRowsRendered}
                width={width}
                height={height}
                ref={this.listAnswered}
                data={typings}
                rowCount={answeredTickets.length}
                rowHeight={120}
                rowRenderer={this._rowRendererAn} />)}
            </InfiniteLoader>)}
        </AutoSizer> : null }
      </div>
    )
  }
  _setActiveTicket = (id: number) => {
    const { setActiveTicket, getStudent, setActiveStudentDetails, tickets, setTicketSeen } = this.props
    let ticket = tickets[`ticket-${id}`]
    const { student_id: studentId } = ticket
    setActiveTicket(id)
    setTicketSeen(id)
    getStudent(studentId, id)
    setActiveStudentDetails(studentId)
    this._refreshLists()
  }
  _loadMore = () => {
    const { getTickets, loading, searchString } = this.props
    let query = { open: 1, username: searchString, answered: 0 }
    if (!loading) {
      getTickets(0, query)
    }
  }
  _loadMoreAnanswered = () => {
    const { getAnsweredTickets, answeredLoading, searchString } = this.props
    let query = { open: 1, username: searchString, answered: 1 }
    if (!answeredLoading) {
      getAnsweredTickets(0, query)
    }
  }
  _rowRenderer = ({ key,         // Unique key within array of rows
  index,       // Index of row within collection
  isScrolling, // The List is currently being scrolled
  isVisible,   // This row is visible within the List (eg it is not an overscanned row)
  style        // Style object to be applied to row (to position it)
  }: Object): React.Element<typeof TicketsItem> => {
    const { onlineIDS, tickets, activeTicket, unAnsweredTickets, typings } = this.props
    const ticketId = unAnsweredTickets[index]
    return (
      <TicketsItem
        typings={typings}
        key={key}
        hidden={!isVisible}
        style={style}
        online={onlineIDS.findIndex((studentId: number): boolean =>
                typeof tickets[`ticket-${ticketId}`] !== 'undefined' &&
                studentId === tickets[`ticket-${ticketId}`].student_id) >= 0}
        active={(typeof activeTicket.id !== 'undefined' &&
                typeof tickets[`ticket-${ticketId}`] !== 'undefined')
              ? activeTicket.id === tickets[`ticket-${ticketId}`].id
              : false}
        {...tickets[`ticket-${ticketId}`]}
        onClick={this._setActiveTicket} />
    )
  }
  _rowRendererAn = ({ key,         // Unique key within array of rows
  index,       // Index of row within collection
  isScrolling, // The List is currently being scrolled
  isVisible,   // This row is visible within the List (eg it is not an overscanned row)
  style        // Style object to be applied to row (to position it)
  }: Object): React.Element<typeof TicketsItem> => {
    const { onlineIDS, tickets, activeTicket, answeredTickets, typings } = this.props
    const ticketId = answeredTickets[index]
    return (
      <TicketsItem
        typings={typings}
        key={key}
        hidden={!isVisible}
        style={style}
        online={onlineIDS.findIndex((studentId: number): boolean =>
                typeof tickets[`ticket-${ticketId}`] !== 'undefined' &&
                studentId === tickets[`ticket-${ticketId}`].student_id) >= 0}
        active={(typeof activeTicket.id !== 'undefined' &&
                typeof tickets[`ticket-${ticketId}`] !== 'undefined')
              ? activeTicket.id === tickets[`ticket-${ticketId}`].id
              : false}
        {...tickets[`ticket-${ticketId}`]}
        onClick={this._setActiveTicket} />
    )
  }

  isRowLoaded = ({ index }: Object): boolean => {
    const { unAnsweredTickets } = this.props
    return !!unAnsweredTickets[index]
  }

  isRowLoadedAn = ({ index }: Object): boolean => {
    const { answeredTickets } = this.props
    return !!answeredTickets[index]
  }
}

export default TicketsList
