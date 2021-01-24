// @flow
import { APIBASE } from 'utils'
import request from 'superagent'
import update from 'immutability-helper'
import { getStudent, setActiveStudentDetails } from 'routes/Users/modules/students'
// import { toggleTicketsListMenu } from './userui'

// ------------------------------------
// Constants
// ------------------------------------

export const USER_STARTED_TYPING_TICKET = 'usertickets.USER_STARTED_TYPING_TICKET'
export const USER_STOPED_TYPING_TICKET = 'usertickets.USER_STOPED_TYPING_TICKET'

export const SET_SEARCH_STRING = 'usertickets.SET_SEARCH_STRING'

export const CLOSE_TICKET_REQUEST = 'usertickets.CLOSE_TICKET_REQUEST'
export const CLOSE_TICKET_SUCCESS = 'usertickets.CLOSE_TICKET_SUCCESS'
export const CLOSE_TICKET_FAILURE = 'usertickets.CLOSE_TICKET_FAILURE'

export const GET_ANSWERED_TICKETS_REQUEST = 'usertickets.GET_ANSWERED_TICKETS_REQUEST'
export const GET_ANSWERED_TICKETS_SUCCESS = 'usertickets.GET_ANSWERED_TICKETS_SUCCESS'

export const GET_TICKET_DEPARTMENTS_REQUEST = 'usertickets.GET_TICKET_DEPARTMENTS_REQUEST'
export const GET_TICKET_DEPARTMENTS_SUCCESS = 'usertickets.GET_TICKET_DEPARTMENTS_SUCCESS'

export const GET_STATISTICS_REQUEST = 'usertickets.GET_STATISTICS_REQUEST'
export const GET_STATISTICS_SUCCESS = 'usertickets.GET_STATISTICS_SUCCESS'
export const GET_STATISTICS_FAILURE = 'usertickets.GET_STATISTICS_FAILURE'

export const OPEN_TICKET_REQUEST = 'usertickets.OPEN_TICKET_REQUEST'
export const OPEN_TICKET_SUCCESS = 'usertickets.OPEN_TICKET_SUCCESS'
export const OPEN_TICKET_FAILURE = 'usertickets.OPEN_TICKET_FAILURE'

export const GET_TICKETS_REQUEST = 'usertickets.GET_TICKETS_REQUEST'
export const GET_TICKETS_SUCCESS = 'usertickets.GET_TICKETS_SUCCESS'
export const GET_TICKETS_FAILURE = 'usertickets.GET_TICKETS_FAILURE'

export const SET_STUDENT_SEEN_TICKET_REQUEST = 'usertickets.SET_STUDENT_SEEN_TICKET_REQUEST'
export const SET_STUDENT_SEEN_TICKET_SUCCESS = 'usertickets.SET_STUDENT_SEEN_TICKET_SUCCESS'
export const SET_STUDENT_SEEN_TICKET_FAILURE = 'usertickets.SET_STUDENT_SEEN_TICKET_FAILURE'

export const SET_TICKET_ACTIVE_TAB = 'usertickets.SET_TICKET_ACTIVE_TAB'

export const SET_TICKET_REPLIES_SEEN = 'usertickets.SET_TICKET_REPLIES_SEEN'

export const STORE_RECEIVED_TICKET_REPLY = 'usertickets.STORE_RECEIVED_TICKET_REPLY'

export const RESET_SKIP_TICKETS_IDS = 'usertickets.RESET_SKIP_TICKETS_IDS'

export const TOGGLE_DEPARTMENT_CHANGER_VISIBILITY = 'usertickets.TOGGLE_DEPARTMENT_CHANGER_VISIBILITY'

export const STORE_NEW_TICKET = 'usertickets.STORE_NEW_TICKET'

export const GET_STUDENT_TICKETS_REQUEST = 'usertickets.GET_STUDENT_TICKETS_REQUEST'
export const GET_STUDENT_TICKETS_SUCCESS = 'usertickets.GET_STUDENT_TICKETS_SUCCESS'
export const GET_STUDENT_TICKETS_FAILURE = 'usertickets.GET_STUDENT_TICKETS_FAILURE'

export const GET_TICKET_TEMPLATES_REQUEST = 'usertickets.GET_TICKET_TEMPLATES_REQUEST'
export const GET_TICKET_TEMPLATES_SUCCESS = 'usertickets.GET_TICKET_TEMPLATES_SUCCESS'
export const GET_TICKET_TEMPLATES_FAILURE = 'usertickets.GET_TICKET_TEMPLATES_FAILURE'

export const GET_TICKET_VIDEOS_REQUEST = 'usertickets.GET_TICKET_VIDEOS_REQUEST'
export const GET_TICKET_VIDEOS_SUCCESS = 'usertickets.GET_TICKET_VIDEOS_SUCCESS'
export const GET_TICKET_VIDEOS_FAILURE = 'usertickets.GET_TICKET_VIDEOS_FAILURE'

export const STORE_ADMIN_REPLY_REQUEST = 'usertickets.STORE_ADMIN_REPLY_REQUEST'
export const STORE_ADMIN_REPLY_SUCCESS = 'usertickets.STORE_ADMIN_REPLY_SUCCESS'
export const STORE_ADMIN_REPLY_FAILURE = 'usertickets.STORE_ADMIN_REPLY_FAILURE'

export const DELETE_TICKET_REPLY_REQUEST = 'usertickets.DELETE_TICKET_REPLY_REQUEST'
export const DELETE_TICKET_REPLY_SUCCESS = 'usertickets.DELETE_TICKET_REPLY_SUCCESS'
export const DELETE_TICKET_REPLY_FAILURE = 'usertickets.DELETE_TICKET_REPLY_FAILURE'

export const SET_ACTIVE_TICKET = 'usertickets.SET_ACTIVE_TICKET'
export const TOGGLE_TEMPLATES_VISIBLE = 'usertickets.TOGGLE_TEMPLATES_VISIBLE'

export const TOGGLE_VIDEOS_VISIBLE = 'usertickets.TOGGLE_VIDEOS_VISIBLE'

export const TOGGLE_FAVORITES_VISIBLE = 'usertickets.TOGGLE_FAVORITES_VISIBLE'
// ------------------------------------
// Actions
// ------------------------------------
//

// function sortTickets (tickets: Object): Object {
//   const sortedTicketKeys = Object.keys(tickets).sort((b: string, a: string): number =>
//           (tickets[a].replies[tickets[a].replies.length - 1].owner_type === 'users' || !tickets[a].open
//             ? 0
//             : tickets[a].id) -
//           (tickets[b].replies[tickets[b].replies.length - 1].owner_type === 'users' || !tickets[a].open
//             ? 0
//             : tickets[b].id))

//   let sortedTickets = {}

//   sortedTicketKeys.map((k: string) => {
//     sortedTickets[k] = tickets[k]
//   })

//   return sortedTickets
// }

export function setTicketRepliesSeen (ticketId: number = 0): Object {
  return {
    type: SET_TICKET_REPLIES_SEEN,
    payload: ticketId
  }
}

export function toggleDepartment (visibility: boolean = false): Object {
  return {
    type: TOGGLE_DEPARTMENT_CHANGER_VISIBILITY,
    payload: visibility
  }
}

export function setActiveTab (activeTab: number = 0): Object {
  return {
    type: SET_TICKET_ACTIVE_TAB,
    payload: activeTab
  }
}

export function storeNewReply (reply: Object): Object {
  return {
    type: STORE_RECEIVED_TICKET_REPLY,
    payload: reply
  }
}

export function resetSkipTickets (): Object {
  return {
    type: RESET_SKIP_TICKETS_IDS
  }
}

export function storeNewTicket (ticket: Object): Object {
  return {
    type: STORE_NEW_TICKET,
    payload: ticket
  }
}

export function setActiveTicket (id: number = 0): Object {
  return (dispatch: Function) => {
    dispatch({
      type: SET_ACTIVE_TICKET,
      payload: id
    })
  }
}

export function toggleTemplatesVisiblity (visible: boolean): Object {
  return {
    type: TOGGLE_TEMPLATES_VISIBLE,
    payload: visible
  }
}

export function toggleVideosVisibility (visible: boolean): Object {
  return {
    type: TOGGLE_VIDEOS_VISIBLE,
    payload: visible
  }
}

export function toggleFavoritesVisibility (visible: boolean): Object {
  return {
    type: TOGGLE_FAVORITES_VISIBLE,
    payload: visible
  }
}

export function setSearchString (text: string): Object {
  return {
    type: SET_SEARCH_STRING,
    payload: text
  }
}

export function getTickets (page: number = 0, query: Object = {}): Function {
  return (dispatch: Function, getState: Function): Function => {
    const state = getState()
    const { usertoken: token } = state.auth

    let { currentPage, lastPage, skipTicketsIds, activeTicket } = state.user_tickets
    if (!currentPage) {
      currentPage = lastPage = 0
      skipTicketsIds = []
    }
    if (currentPage >= lastPage && currentPage > 0 && typeof query.username === 'undefined') return () => {}

    dispatch(setSearchString(query.username))
    dispatch(getTicketsRequest(page === 1))
    if ((page === 0 ? currentPage + 1 : page) === 1) {
      dispatch(resetSkipTickets())
    }
    return request.get(APIBASE + '/api/admin/tickets/all')
         .set('Accept', 'application/json')
         .query({ page: page === 0 ? currentPage + 1 : page, per_page: 20 })
         .query(query)
         .query({ skip_ids: ((page === 0 ? currentPage + 1 : page) === 1) ? skipTicketsIds : [] })
         .set({ 'x-access-token': token })
         .set('Content-Type', 'application/json')
          .then((response: Object) => {
            const { body: tickets } = response
            dispatch(getTicketsSuccess(tickets, page === 1))
            if (tickets.rows.length && typeof activeTicket.id === 'undefined') {
              const newItem = tickets.rows.find((t: Object): boolean => {
                return t.replies.length && t.replies[t.replies.length - 1].owner_type === 'students' && t.open === 1
              })

              const { activeStudentDetailsId } = getState().user_students

              if (typeof newItem !== 'undefined' && activeStudentDetailsId === 0) {
                dispatch(setActiveTicket(newItem.id))
                dispatch(getStudent(newItem.student_id, newItem.id))
                dispatch(setActiveStudentDetails(newItem.student_id))
              }
            }
          })
  }
}

export function getTicketsRequest (reload: boolean = false): Object {
  return {
    type: GET_TICKETS_REQUEST,
    payload: reload
  }
}

export function getTicketsSuccess (data: Object = {}, reload: boolean = false): Object {
  return {
    type: GET_TICKETS_SUCCESS,
    payload: {
      data: data,
      reload: reload
    }
  }
}

export function getAnsweredTickets (page: number = 0, query: Object = {}): Function {
  return (dispatch: Function, getState: Function): Function => {
    const state = getState()
    const { usertoken: token } = state.auth
    let { answeredCurrentPage, answeredLastPage, skipTicketsIds, searchString } = state.user_tickets
    if (!answeredCurrentPage) {
      answeredCurrentPage = answeredLastPage = 0
      skipTicketsIds = []
    }
    if (answeredCurrentPage >= answeredLastPage && answeredCurrentPage > 0 &&
      typeof query.username === 'undefined' && page > 1) return () => {}
    dispatch(setSearchString(query.username))
    dispatch(getAnsweredTicketsRequest(page === 1))
    if ((page === 0 ? answeredCurrentPage + 1 : page) === 1) {
      dispatch(resetSkipTickets())
    }

    return request.get(APIBASE + '/api/admin/tickets/all')
         .set('Accept', 'application/json')
         .query({ page: page === 0 ? answeredCurrentPage + 1 : page, per_page: 20 })
         .query(query)
         .query({ skip_ids: ((page === 0 ? answeredCurrentPage + 1 : page) === 1) ? skipTicketsIds : [] })
         .set({ 'x-access-token': token })
         .set('Content-Type', 'application/json')
          .then((response: Object) => {
            const { body: tickets } = response
            dispatch(getAnsweredTicketsSuccess(tickets, page === 1))
          })
  }
}

export function getAnsweredTicketsRequest (reload: boolean): Object {
  return {
    type: GET_ANSWERED_TICKETS_REQUEST,
    payload: reload
  }
}

export function getAnsweredTicketsSuccess (data: Object = {}, reload: boolean = false): Object {
  return {
    type: GET_ANSWERED_TICKETS_SUCCESS,
    payload: {
      data: data,
      reload: reload
    }
  }
}

export function getDepartments (page: number = 0, query: Object = {}): Function {
  return (dispatch: Function, getState: Function): Function => {
    const state = getState()
    const { usertoken: token } = state.auth

    return request.get(APIBASE + '/api/admin/tickets/departments/all')
         .set('Accept', 'application/json')
         .set({ 'x-access-token': token })
         .set('Content-Type', 'application/json')
          .then((response: Object) => {
            const { body: departments } = response
            dispatch(getDepartmentsSuccess(departments))
          })
  }
}

export function getDepartmentsRequest (): Object {
  return {
    type: GET_TICKET_DEPARTMENTS_REQUEST
  }
}

export function getDepartmentsSuccess (data: Array<Object> = []): Object {
  return {
    type: GET_TICKET_DEPARTMENTS_SUCCESS,
    payload: data
  }
}

export function getTicketTemplates (): Function {
  return (dispatch: Function, getState: Function): Function => {
    const state = getState()
    const { usertoken: token } = state.auth
    const { templates } = state.user_tickets

    if (templates && templates.length) return () => {}

    dispatch(getTicketTemplatesRequest())

    return request.get(APIBASE + '/api/admin/tickets/templates')
         .set('Accept', 'application/json')
         .set({ 'x-access-token': token })
         .set('Content-Type', 'application/json')
          .then((response: Object) => {
            dispatch(getTicketTemplatesSuccess(response.body))
          })
  }
}

export function getTicketTemplatesRequest (): Object {
  return {
    type: GET_TICKET_TEMPLATES_REQUEST
  }
}

export function getTicketTemplatesSuccess (templates: Array<Object>): Object {
  return {
    type: GET_TICKET_TEMPLATES_SUCCESS,
    payload: templates
  }
}

export function deleteReply (replyId: number, ticketId: number): Function {
  return (dispatch: Function, getState: Function): Function => {
    const state = getState()
    const { usertoken: token } = state.auth

    dispatch(deleteReplyRequest(replyId))

    return request.post(`${APIBASE}/api/admin/tickets/replies/softdelete/${replyId}`)
         .set('Accept', 'application/json')
         .set({ 'x-access-token': token })
         .set('Content-Type', 'application/json')
          .then((response: Object) => {
            dispatch(deleteReplySuccess(replyId, ticketId))
          })
  }
}

export function deleteReplyRequest (replyId: number): Object {
  return {
    type: DELETE_TICKET_REPLY_REQUEST,
    payload: {
      replyId
    }
  }
}

export function deleteReplySuccess (replyId: number, ticketId: number): Object {
  return {
    type: DELETE_TICKET_REPLY_SUCCESS,
    payload: {
      replyId,
      ticketId
    }
  }
}

export function getTicketVideos (): Function {
  return (dispatch: Function, getState: Function): Function => {
    const state = getState()
    const { usertoken: token } = state.auth
    const { videos } = state.user_tickets

    if (videos && videos.length) return () => {}

    dispatch(getTicketVideosRequest())

    return request.get(APIBASE + '/api/admin/tickets/videos')
         .set('Accept', 'application/json')
         .set({ 'x-access-token': token })
         .set('Content-Type', 'application/json')
          .then((response: Object) => {
            dispatch(getTicketVideosSuccess(response.body))
          })
  }
}

export function getTicketVideosRequest (): Object {
  return {
    type: GET_TICKET_VIDEOS_REQUEST
  }
}

export function getTicketVideosSuccess (videos: Array<Object>): Object {
  return {
    type: GET_TICKET_VIDEOS_SUCCESS,
    payload: videos
  }
}

export function setTicketSeen (ticketId: number): Function {
  return (dispatch: Function, getState: Function): Function => {
    const state = getState()
    const { usertoken: token } = state.auth

    dispatch(setTicketSeenRequest())

    return request.post(`${APIBASE}/api/admin/tickets/seen`)
         .set('Accept', 'application/json')
         .set({ 'x-access-token': token })
         .send({ ticket_id: ticketId })
         .set('Content-Type', 'application/json')
          .then((response: Object) => {
            dispatch(setTicketSeenSuccess(ticketId))
          })
  }
}

export function setTicketSeenRequest (): Object {
  return {
    type: SET_STUDENT_SEEN_TICKET_REQUEST
  }
}

export function setTicketSeenSuccess (ticketId: number): Object {
  return {
    type: SET_STUDENT_SEEN_TICKET_SUCCESS,
    payload: ticketId
  }
}

export function getStatistics (): Function {
  return (dispatch: Function, getState: Function): Function => {
    const state = getState()
    const { usertoken: token } = state.auth

    dispatch(getStatisticsRequest())

    return request.get(`${APIBASE}/api/admin/tickets/statistics`)
         .set('Accept', 'application/json')
         .set({ 'x-access-token': token })
         .set('Content-Type', 'application/json')
          .then((response: Object) => {
            dispatch(getStatisticsSuccess(response.body))
          })
  }
}

export function getStatisticsRequest (): Object {
  return {
    type: GET_STATISTICS_REQUEST
  }
}

export function getStatisticsSuccess (statistics: Object): Object {
  return {
    type: GET_STATISTICS_SUCCESS,
    payload: statistics
  }
}

export function closeTicket (ticketId: number): Function {
  return (dispatch: Function, getState: Function): Function => {
    const state = getState()
    const { usertoken: token } = state.auth

    dispatch(closeTicketRequest())

    return request.post(`${APIBASE}/api/admin/tickets/close`)
         .set('Accept', 'application/json')
         .set({ 'x-access-token': token })
         .send({ ticket_id: ticketId })
         .set('Content-Type', 'application/json')
          .then((response: Object) => {
            dispatch(closeTicketSuccess(ticketId))
          })
  }
}

export function closeTicketRequest (): Object {
  return {
    type: CLOSE_TICKET_REQUEST
  }
}

export function closeTicketSuccess (ticketId: number): Object {
  return {
    type: CLOSE_TICKET_SUCCESS,
    payload: ticketId
  }
}

export function openTicket (ticketId: number): Function {
  return (dispatch: Function, getState: Function): Function => {
    const state = getState()
    const { usertoken: token } = state.auth

    dispatch(openTicketRequest())

    return request.post(`${APIBASE}/api/admin/tickets/open`)
         .set('Accept', 'application/json')
         .set({ 'x-access-token': token })
         .send({ ticket_id: ticketId })
         .set('Content-Type', 'application/json')
          .then((response: Object) => {
            dispatch(openTicketSuccess(ticketId))
          })
  }
}

export function openTicketRequest (): Object {
  return {
    type: OPEN_TICKET_REQUEST
  }
}

export function openTicketSuccess (ticketId: number): Object {
  return {
    type: OPEN_TICKET_SUCCESS,
    payload: ticketId
  }
}

export function getStudentTickets (studentId: number = 0, excludeId: number = 0): Function {
  return (dispatch: Function, getState: Function): Function => {
    const state = getState()
    const { usertoken: token } = state.auth
    dispatch(getStudentTicketsRequest(studentId))

    return request.get(APIBASE + '/api/admin/tickets/all')
         .set('Accept', 'application/json')
         .set({ 'x-access-token': token })
         .query({ student_id: studentId, excludeId })
         .set('Content-Type', 'application/json')
          .then((response: Object) => {
            dispatch(getStudentTicketsSuccess(response.body, studentId))
          })
  }
}

export function getStudentTicketsRequest (studentId: number = 0): Object {
  return {
    type: GET_STUDENT_TICKETS_REQUEST,
    payload: studentId
  }
}

export function getStudentTicketsSuccess (data: Object, studentId: number = 0): Object {
  return {
    type: GET_STUDENT_TICKETS_SUCCESS,
    payload: {
      data,
      studentId
    }
  }
}

export function storeTicket (values: Object = {}): Function {
  return (dispatch: Function, getState: Function): Function => {
    const state = getState()
    const { usertoken: token } = state.auth
    dispatch(storeTicketRequest())

    return request.post(APIBASE + '/api/admin/tickets/reply')
      .set('Accept', 'application/json')
      .send(values)
      .set({ 'x-access-token': token })
      .set('Content-Type', 'application/json')
      .then((response: Object) => {
        dispatch(storeTicketSuccess(response.body))
        dispatch(getStatistics())
      })
  }
}

export function storeTicketRequest (): Object {
  return {
    type: STORE_ADMIN_REPLY_REQUEST
  }
}

export function storeTicketSuccess (reply: Object = {}): Object {
  return {
    type: STORE_ADMIN_REPLY_SUCCESS,
    payload: reply
  }
}
export function userStartedTypingTicket (message: Object = {}): Object {
  return {
    type: USER_STARTED_TYPING_TICKET,
    payload: message
  }
}
export function userStoppedTypingTicket (message: Object = {}): Object {
  return {
    type: USER_STOPED_TYPING_TICKET,
    payload: message
  }
}

export const actions = {
  getTickets,
  storeTicket
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_TICKETS_REQUEST]: (state: Object, action: Object): Object => {
    return Object.assign({}, state, {
      ticketsLoading: true,
      tickets: action.payload ? {} : state.tickets,
      total: action.payload ? 0 : state.total,
      perPage: action.payload ? 0 : state.perPage,
      currentPage: action.payload ? 0 : state.currentPage,
      lastPage: action.payload ? 0 : state.lastPage,
      unAnsweredTickets: action.payload ? [] : state.unAnsweredTickets,
    })
  },
  [GET_ANSWERED_TICKETS_REQUEST]: (state: Object, action: Object): Object => Object.assign({}, state, {
    answeredLoading: true,
    answeredTotal: action.payload ? 0 : state.answeredTotal,
    answeredPerPage: action.payload ? 0 : state.answeredPerPage,
    answeredCurrentPage: action.payload ? 0 : state.answeredCurrentPage,
    answeredLastPage: action.payload ? 0 : state.answeredLastPage,
    answeredTickets: action.payload ? [] : state.answeredTickets
  }),
  [SET_ACTIVE_TICKET]: (state: Object, action: Object): Object => {
    let activeTicket = state.tickets[`ticket-${action.payload}`]

    return Object.assign({}, state, {
      activeTicket
    })
  },
  [GET_STATISTICS_SUCCESS]: (state: Object, action: Object): Object => {
    return Object.assign({}, state, {
      statistics: action.payload
    })
  },
  [STORE_ADMIN_REPLY_SUCCESS]: (state: Object, action: Object): Object => {
    const ticket = update(state.tickets[`ticket-${action.payload.ticket_id}`], {
      replies: { $push: [action.payload] },
      priority: { $set: 'low' } })
    const tickets = update(state.tickets, { [`ticket-${action.payload.ticket_id}`]: {
      $set: ticket
    }
    })

    const index = state.unAnsweredTickets.findIndex((i: number): boolean => i === action.payload.ticket_id)

    const answeredTickets = state.answeredTickets
    .findIndex((id: number): boolean => +id === +action.payload.ticket_id) < 0
    ? update(state.answeredTickets, { $push: [action.payload.ticket_id] })
    : state.answeredTickets
    return Object.assign({}, state, {
      tickets: tickets,
      total: state.total - 1,
      answeredTotal: state.answeredTotal + 1,
      answeredTickets: answeredTickets,
      unAnsweredTickets: update(state.unAnsweredTickets, { $splice: [[index, 1]] }),
      loadingReply: false,
      activeTicket: ticket
    })
  },
  [GET_STUDENT_TICKETS_REQUEST]: (state: Object, action: Object): Object =>
  Object.assign({}, state, {
    loadingStudentsTickets: update(state.loadingStudentsTickets, { $push: [action.payload] })
  }),
  [GET_STUDENT_TICKETS_SUCCESS]: (state: Object, action: Object): Object => {
    let tickets = state.tickets

    const index = state.loadingStudentsTickets.findIndex((l: number): boolean => l === action.payload.studentId)

    const ticketsIds = action.payload.data.rows.reduce((total: Array<number>, current: Object): Array<number> =>
      total.concat(current.id), [])
    for (let ticket of action.payload.data.rows) {
      tickets = Object.assign({}, tickets, {
        [`ticket-${ticket.id}`]: ticket
      })
    }

    return Object.assign({}, state, {
      tickets: tickets,
      studentsTickets: update(state.studentsTickets, { [`tickets-${action.payload.studentId}`]: { $set: ticketsIds } }),
      loadingStudentsTickets: update(state.loadingStudentsTickets, { $splice: [[index, 1]] })
    })
  },
  [GET_TICKET_TEMPLATES_SUCCESS]: (state: Object, action: Object): Object => {
    return Object.assign({}, state, {
      templates: action.payload,
      templatesLoading: false
    })
  },
  [GET_TICKET_VIDEOS_REQUEST]: (state: Object, action: Object): Object =>
  Object.assign({}, state, { videosLoading: true }),
  [GET_TICKET_VIDEOS_SUCCESS]: (state: Object, action: Object): Object => {
    return Object.assign({}, state, {
      videos: action.payload,
      videosLoading: false
    })
  },
  [SET_TICKET_ACTIVE_TAB]: (state: Object, action: Object): Object => Object.assign({}, state, {
    activeTab: action.payload
  }),
  [TOGGLE_TEMPLATES_VISIBLE]: (state: Object, action: Object): Object => {
    return Object.assign({}, state, {
      templatesVisible: typeof action.payload === 'boolean' ? action.payload : !state.templatesVisible,
      videosVisible: false,
      favoritesVisible: false
    })
  },
  [TOGGLE_VIDEOS_VISIBLE]: (state: Object, action: Object): Object => {
    return Object.assign({}, state, {
      videosVisible: typeof action.payload === 'boolean' ? action.payload : !state.videosVisible,
      templatesVisible: false,
      favoritesVisible: false
    })
  },
  [TOGGLE_FAVORITES_VISIBLE]: (state: Object, action: Object): Object => {
    return Object.assign({}, state, {
      favoritesVisible: typeof action.payload === 'boolean' ? action.payload : !state.favoritesVisible,
      templatesVisible: false,
      videosVisible: false
    })
  },
  [RESET_SKIP_TICKETS_IDS]: (state: Object, action: Object): Object => {
    return Object.assign({}, state, {
      skipTicketsIds: []
    })
  },
  [CLOSE_TICKET_SUCCESS]: (state: Object, action: Object): Object => {
    if (typeof state.tickets[`ticket-${action.payload}`].replies === 'undefined') {
      return state
    }

    const ticket = update(state.tickets[`ticket-${action.payload}`], { open: { $set: 0 } })
    const tickets = update(state.tickets, { [`ticket-${action.payload}`]: {
      $set: ticket
    }
    })
    const closedTickets = update(state.closedTickets, { [`ticket-${action.payload}`]: {
      $set: ticket
    }
    })
    return Object.assign({}, state, {
      tickets,
      closedTickets,
      activeTicket: ticket
    })
  },
  [OPEN_TICKET_SUCCESS]: (state: Object, action: Object): Object => {
    if (typeof state.tickets[`ticket-${action.payload}`].replies === 'undefined') {
      return state
    }

    const ticket = update(state.tickets[`ticket-${action.payload}`], { open: { $set: 1 } })
    const tickets = update(state.tickets, { [`ticket-${action.payload}`]: {
      $set: ticket
    }
    })
    return Object.assign({}, state, {
      tickets,
      activeTicket: ticket
    })
  },
  [SET_TICKET_REPLIES_SEEN]: (state: Object, action: Object): Object => {
    if (typeof state.tickets[`ticket-${action.payload}`] === 'undefined') {
      return state
    }
    const replies = state.tickets[`ticket-${action.payload}`].replies.map((r: Object): Object => {
      if (r.owner_type === 'users') {
        r.seen = 1
      }
      return r
    })
    const ticket = update(state.tickets[`ticket-${action.payload}`], { replies: { $set: replies } })
    const tickets = update(state.tickets, { [`ticket-${action.payload}`]: {
      $set: ticket
    }
    })

    return Object.assign({}, state, {
      tickets,
      activeTicket: ticket.id === state.activeTicket.id ? ticket : state.activeTicket
    })
  },
  [STORE_RECEIVED_TICKET_REPLY]: (state: Object, action: Object): Object => {
    if (typeof state.tickets[`ticket-${action.payload.ticket_id}`] === 'undefined') {
      return state
    }
    const ticketIndex = state.unAnsweredTickets.findIndex((i: number): boolean => i === action.payload.ticket_id)

    const beforeTicket = state.tickets[`ticket-${action.payload.ticket_id}`]
    if (beforeTicket.replies.findIndex((r: Object): boolean => r.id === action.payload.id) >= 0) {
      return state
    }

    let ticket = update(beforeTicket, { replies: { $push: [action.payload] } })
    if (state.tickets[`ticket-${action.payload.ticket_id}`] &&
      (typeof state.activeTicket !== 'undefined' && state.activeTicket.id === action.payload.ticket_id)) {
      const replies = ticket.replies.map((r: Object): Object => {
        if (r.owner_type === 'students') {
          r.seen = 1
        }
        return r
      })
      ticket = update(ticket, { replies: { $set: replies } })
    }
    const tickets = update(state.tickets, { [`ticket-${action.payload.ticket_id}`]: {
      $set: ticket
    } })

    return Object.assign({}, state, {
      tickets: tickets,
      unAnsweredTickets: ticketIndex < 0
        ? state.unAnsweredTickets
        : update(state.unAnsweredTickets, { $splice: [[ticketIndex, 1]] }),
      total: ticketIndex < 0 ? state.total : state.total - 1,
      activeTicket: ticket.id === state.activeTicket.id ? ticket : state.activeTicket
    })
  },
  [STORE_NEW_TICKET]: (state: Object, action: Object): Object => {
    const { id } = action.payload
    const { tickets } = state

    return Object.assign({}, state, {
      tickets: Object.assign({ [`ticket-${id}`]: action.payload }, tickets),
      unAnsweredTickets: update(state.unAnsweredTickets, { $push: [id] }),
      total: state.total + 1,
      skipTicketsIds: update(state.skipTicketsIds, { $push: [id] })
    })
  },
  [SET_STUDENT_SEEN_TICKET_SUCCESS]: (state: Object, action: Object): Object => {
    if (typeof state.tickets[`ticket-${action.payload}`] === 'undefined') {
      return state
    }
    const replies = state.tickets[`ticket-${action.payload}`].replies.map((r: Object): Object => {
      if (r.owner_type === 'students') {
        r.seen = 1
      }
      return r
    })
    const ticket = update(state.tickets[`ticket-${action.payload}`],
      { replies: { $set: replies }, '1': { $set: Math.random() } })
    const tickets = update(state.tickets, { [`ticket-${action.payload}`]: {
      $set: ticket
    }
    })
    return Object.assign({}, state, {
      tickets,
      activeTicket: ticket.id === state.activeTicket.id ? ticket : state.activeTicket
    })
  },
  [GET_TICKET_TEMPLATES_REQUEST]: (state: Object, action: Object): Object =>
  Object.assign({}, state, { templatesLoading: true }),
  [STORE_ADMIN_REPLY_REQUEST]: (state: Object, action: Object): Object =>
    Object.assign({}, state, { loadingReply: true }),
  [GET_TICKETS_SUCCESS]: (state: Object, action: Object): Object => {
    const { reload, data } = action.payload
    let { tickets } = state
    let unAnsweredTickets = reload ? [] : state.unAnsweredTickets

    for (let ticket of data.rows) {
      tickets = Object.assign({}, tickets, {
        [`ticket-${ticket.id}`]: ticket
      })
      unAnsweredTickets.push(ticket.id)
    }
    return Object.assign({}, state, {
      tickets: update(state.tickets, { $merge: tickets }),
      unAnsweredTickets: unAnsweredTickets,
      total: data.total,
      perPage: data.per_page,
      currentPage: data.current_page,
      lastPage: data.last_page,
      ticketsLoading: false,
      loadingReply: false
    })
  },
  [GET_ANSWERED_TICKETS_SUCCESS]: (state: Object, action: Object): Object => {
    const { reload, data } = action.payload
    let { answeredTickets, tickets } = state
    for (let ticket of data.rows) {
      tickets = Object.assign({}, tickets, {
        [`ticket-${ticket.id}`]: ticket
      })
      answeredTickets.push(ticket.id)
    }
    return Object.assign({}, state, {
      tickets: update(state.tickets, { $merge: tickets }),
      answeredTickets: answeredTickets,
      answeredTotal: data.total,
      answeredPerPage: data.per_page,
      answeredCurrentPage: data.current_page,
      answeredLastPage: data.last_page,
      answeredLoading: false,
      loadingReply: false
    })
  },
  [USER_STARTED_TYPING_TICKET]: (state: Object, action: Object): Object => {
    return Object.assign({}, state, {
      typings: update(state.typings, { [`ticket-${action.payload.ticketId}`]: { $set: action.payload } })
    })
  },
  [TOGGLE_DEPARTMENT_CHANGER_VISIBILITY]: (state: Object, action: Object): Object => {
    return Object.assign({}, state, {
      changeDepartmentVisible: !state.changeDepartmentVisible
    })
  },
  [USER_STOPED_TYPING_TICKET]: (state: Object, action: Object): Object => {
    delete state.typings[`ticket-${action.payload.ticketId}`]
    return Object.assign({}, state, {
      typings: update(state.typings, { [`ticket-${action.payload.ticketId}`]: { $set: undefined } })
    })
  },
  [DELETE_TICKET_REPLY_REQUEST]: (state: Object, action: Object): Object => {
    return Object.assign({}, state, {
      deletingRepliesIds: update(state.deletingRepliesIds, { $push: [action.payload.replyId] })
    })
  },
  [GET_TICKET_DEPARTMENTS_REQUEST]: (state: Object, action: Object): Object => {
    return Object.assign({}, state, {
      departments: [],
      departmentsLoading: true
    })
  },
  [GET_TICKET_DEPARTMENTS_SUCCESS]: (state: Object, action: Object): Object => {
    return Object.assign({}, state, {
      departments: action.payload,
      departmentsLoading: false
    })
  },
  [SET_SEARCH_STRING]: (state: Object, action: Object): Object => {
    return Object.assign({}, state, {
      searchString: action.payload
    })
  },
  [DELETE_TICKET_REPLY_SUCCESS]: (state: Object, action: Object): Object => {
    if (typeof state.tickets[`ticket-${action.payload.ticketId}`] === 'undefined') {
      return state
    }
    const replies = state.tickets[`ticket-${action.payload.ticketId}`].replies.map((r: Object): Object => {
      if (r.id === action.payload.replyId) {
        r.deleted = 1
      }
      return r
    })
    const ticket = update(state.tickets[`ticket-${action.payload.ticketId}`],
      { replies: { $set: replies }, '1': { $set: Math.random() } })
    const tickets = update(state.tickets, { [`ticket-${action.payload.ticketId}`]: {
      $set: ticket
    }
    })

    const index = state.deletingRepliesIds.findIndex((i: number): boolean => i === action.payload.replyId)
    return Object.assign({}, state, {
      tickets,
      activeTicket: ticket.id === state.activeTicket.id ? ticket : state.activeTicket,
      deletingRepliesIds: update(state.deletingRepliesIds, { $splice: [[index, 1]] })
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  searchString: '',
  tickets: {},
  unAnsweredTickets: [],
  closedTickets: {},
  ticketsLoading: false,
  total: 0,
  perPage: 20,
  currentPage: 0,
  lastPage: 0,
  answeredTickets: [],
  answeredLoading: false,
  answeredTotal: 0,
  answeredPerPage: 20,
  answeredCurrentPage: 0,
  answeredLastPage: 0,
  templatesVisible: false,
  videosVisible: false,
  favoritesVisible: false,
  activeTab: 0,
  templatesLoading: false,
  templates: [],
  departments: [],
  departmentsLoading: true,
  videosLoading: false,
  videos: [],
  studentsTickets: {},
  statistics: { unansweredcount: 0 },
  loadingStudentsTickets: [],
  activeTicket: {},
  typings: {},
  deletingRepliesIds: [],
  skipTicketsIds: [],
  changeDepartmentVisible: false
}

export default function userReducer (state: Object = initialState, action: Object): Object {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
