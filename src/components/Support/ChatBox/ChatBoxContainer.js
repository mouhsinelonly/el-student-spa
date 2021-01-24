import { connect } from 'react-redux'
import { openChatbox, closeChatbox, setChatboxTab, setFirstLoad } from 'modules/chatbox'
import { getTickets, uploadFile, getTicketCategories } from 'routes/Student/modules/tickets'
import { isPushSupported, subscribePush, unsubscribePush } from 'routes/Student/modules/gcm'

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the profile:   */

import ChatBox from './ChatBox'

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around getProfile the component doesn't care   */

const mapActionCreators = {
  openChatbox,
  getTicketCategories,
  getTickets,
  closeChatbox,
  setChatboxTab,
  uploadFile,
  setFirstLoad,
  isPushSupported,
  subscribePush,
  unsubscribePush
}

const mapStateToProps = state => {
  return {
    serverdate: state.serverdate,
    profile: state.student.profile,
    open: state.chatbox.open,
    messages: state.messages.data,
    firstload: state.chatbox.firstload,
    gcmenabled: state.gcm.enabled,
    gcmsubscribing: state.gcm.subscribing,
    categories: state.tickets.categories,
    gcmsupported: state.gcm.supported,
    todayTicketsCount: state.tickets.todayTicketsCount,
    tab: state.chatbox.tab
  }
}

export default connect(mapStateToProps, mapActionCreators)(ChatBox)
