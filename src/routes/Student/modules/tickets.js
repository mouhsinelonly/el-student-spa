// @flow
import request from 'superagent'
import update from 'immutability-helper'
import { getRandomInt, APIBASE } from 'utils'
import moment from 'moment'
import { addFileProgress, removeFileProgress, incrementFileProgress } from 'modules/upload'

// ------------------------------------
// Constants
// ------------------------------------

export const CREATE_TICKET_REQUEST = 'tickets.CREATE_TICKET_REQUEST'
export const CREATE_TICKET_SUCCESS = 'tickets.CREATE_TICKET_SUCCESS'

export const GET_TICKETS_LOADING = 'tickets.GET_TICKETS_LOADING'
export const GET_TICKETS_SUCCESS = 'tickets.GET_TICKETS_SUCCESS'

export const GET_TICKET_DEPARTMENTS_REQUEST = 'tickets.GET_TICKET_DEPARTMENTS_REQUEST'
export const GET_TICKET_DEPARTMENTS_SUCCESS = 'tickets.GET_TICKET_DEPARTMENTS_SUCCESS'

export const GET_TICKET_CATEGORIES_REQUEST = 'tickets.GET_TICKET_CATEGORIES_REQUEST'
export const GET_TICKET_CATEGORIES_SUCCESS = 'tickets.GET_TICKET_CATEGORIES_SUCCESS'

export const SEND_TICKET_REPLY_REQUEST = 'SEND_TICKET_REPLY_REQUEST'
export const SEND_TICKET_REPLY_SUCCESS = 'SEND_TICKET_REPLY_SUCCESS'

export const GET_RULE_FILES_REQUEST = 'tickets.GET_RULE_FILES_REQUEST'
export const GET_RULE_FILES_SUCCESS = 'tickets.GET_RULE_FILES_SUCCESS'

export const TICKETS_NEW_REPLY_RECEIVED = 'TICKETS_NEW_REPLY_RECEIVED'
export const SET_STUDENT_ACTIVE_TICKET = 'SET_STUDENT_ACTIVE_TICKET'

export const TICKETS_USER_SEEN = 'TICKETS_USER_SEEN'

export const UPLOAD_TICKET_FILE_SUCCESS = 'UPLOAD_TICKET_FILE_SUCCESS'
export const UPLOAD_TICKET_FILE_REQUEST = 'UPLOAD_TICKET_FILE_REQUEST'

// ------------------------------------
// Actions
// ------------------------------------

// upload file
export function uploadFileSuccess (file, index = 0) {
  return {
    type: UPLOAD_TICKET_FILE_SUCCESS
  }
}

// export function uploadFileError () {
//   return {
//     type: UPLOAD_TICKET_FILE_REQUEST
//   }
// }

export function uploadFileRequest () {
  return {
    type: UPLOAD_TICKET_FILE_REQUEST
  }
}

export function uploadFile (files = [], ticketId = 0, type = '', index = 0) {
  // console.log(ticketId)
  return function (dispatch, getState) {
    const state = getState()
    const token = state.auth.token
      // let req = request.post('http://localhost/DARES/public/api/v1/student/tickets/replies/upload')
      // let req = request.post(laroute.route('api.v1.student.tickets.upload'))
      .set({ Authorization: 'Bearer ' + token })
    dispatch(uploadFileRequest())
    dispatch(addFileProgress(type))
    files.forEach(file => req.attach('file', file))
    req
      .field('ticket_id', ticketId)
      .on('progress', e => {
        dispatch(incrementFileProgress(type, e.percent))
      })
      .end((err, res) => {
        if (res && res.ok) {
          const file = res.body
          dispatch(removeFileProgress(type))
          dispatch(uploadFileSuccess(file, index))
        } else {
          // console.log('error')
          // dispatch(uploadFileError())
        }
      })

    return req
  }
}

// send ticket reply

export function sendTicketReply ({ ticketId = '', body = '', file = false }) {
  return function (dispatch, getState) {
    const optimisticId = getRandomInt(999999, 999999999999)
    dispatch(
      sendTicketReplyRequest({
        ticket_id: ticketId,
        body,
        seen: 0,
        owner_type: 'students',
        id: optimisticId,
        updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
      })
    )
    const token = getState().auth.token
    return request
      .post(`${APIBASE}/api/tickets/reply`)
      .set('Accept', 'application/json')
      .send({ ticket_id: ticketId, body })
      .set('x-access-token', token)
      .set('Content-Type', 'application/json')
      .then(response => {
        dispatch(sendTicketReplySuccess(response.body, optimisticId))
      })
  }
}

export function sendTicketReplyRequest (optimisticReply = {}) {
  return {
    type: SEND_TICKET_REPLY_REQUEST,
    payload: optimisticReply
  }
}

export function sendTicketReplySuccess (reply = {}, optimisticId = 0) {
  return {
    type: SEND_TICKET_REPLY_SUCCESS,
    payload: {
      reply,
      optimisticId
    }
  }
}
// get rule files

export function getRuleFiles (): function {
  return function (dispatch: function, getState: function): Object {
    dispatch(getRuleFilesRequest())
    const token = getState().auth.token
    return request
      .get(`${APIBASE}/api/tickets/rule_files`)
      .set('Accept', 'application/json')
      .set('x-access-token', token)
      .set('Content-Type', 'application/json')
      .then((response: Object) => {
        dispatch(getRuleFilesSuccess(response.body))
      })
  }
}

export function getRuleFilesRequest (): Object {
  return {
    type: GET_RULE_FILES_REQUEST
  }
}

export function getRuleFilesSuccess (rules: Array<Object>): Object {
  return {
    type: GET_RULE_FILES_SUCCESS,
    payload: rules
  }
}

// create new ticket

export function createTicket ({ subject = '', body = '', category_id: categoryId = 0 }) {
  return function (dispatch, getState) {
    dispatch(createTicketRequest())
    const token = getState().auth.token
    return request
      .post(`${APIBASE}/api/tickets/store`)
      .set('Accept', 'application/json')
      .send({ subject, body, category_id: categoryId })
      .set('Authorization', 'Bearer ' + token)
      .set('Content-Type', 'application/json')
      .then(response => {
        // console.log(response.body)
        dispatch(createTicketSuccess(response.body))
      })
  }
}

export function ticketNewReplyReceived (reply = {}) {
  return function (dispatch) {
    dispatch(ticketNewReplyReceivedAdd(reply))
    dispatch(ticketIsSeen(reply.ticket_id))
  }
}

export function ticketNewReplyReceivedAdd (reply = {}) {
  return {
    type: TICKETS_NEW_REPLY_RECEIVED,
    payload: reply
  }
}

export function ticketIsSeen (ticketId = 0) {
  return {
    type: TICKETS_USER_SEEN,
    payload: ticketId
  }
}

export function createTicketRequest (elementId = 0) {
  return {
    type: CREATE_TICKET_REQUEST
  }
}

export function createTicketSuccess (ticket = {}) {
  return {
    type: CREATE_TICKET_SUCCESS,
    payload: ticket
  }
}

// get tickets
export function getTicketsSuccess (page = 1, response = {}) {
  return {
    type: GET_TICKETS_SUCCESS,
    payload: {
      response,
      page
    }
  }
}

export function getTicketsLoading (page = 1) {
  return {
    type: GET_TICKETS_LOADING,
    payload: {
      page
    }
  }
}

export function setActiveTicket (id = 0) {
  return function (dispatch) {
    dispatch(setActiveTicketOptimistic(id))
    dispatch(setActiveTicketRequest(id))
  }
}

export function setActiveTicketRequest (id = 0) {
  return function (dispatch, getState) {
    const token = getState().auth.token
    return request
      .post(`${APIBASE}/api/tickets/seen`)
      .set('Accept', 'application/json')
      .send({ ticket_id: id })
      .set('x-access-token', token)
      .set('Content-Type', 'application/json')
      .then(response => {})
  }
}
export function setActiveTicketOptimistic (id = 0) {
  return {
    type: SET_STUDENT_ACTIVE_TICKET,
    payload: id
  }
}

export function getTickets (page = 1) {
  return function (dispatch, getState) {
    const state = getState()
    const { pagination } = state.tickets
    if (pagination && pagination.currentPage >= page) {
      // console.log(pagination)
      return
    }

    dispatch(getTicketsLoading(page))
    const token = getState().auth.token
    return request
      .get(`${APIBASE}/api/tickets/all`)
      .set('Authorization', 'Bearer ' + token)
      .query({ page })
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .then(response => {
        dispatch(getTicketsSuccess(page, response.body))
      })
      .catch(error => {
        if (error) {
        }
      })
  }
}

function getTicketDepartmentsSuccess (departments) {
  return {
    type: GET_TICKET_DEPARTMENTS_SUCCESS,
    payload: departments
  }
}

function getTicketDepartmentsRequest () {
  return {
    type: GET_TICKET_DEPARTMENTS_REQUEST
  }
}

export function getTicketDepartments () {
  return function (dispatch, getState) {
    dispatch(getTicketDepartmentsRequest())
    const token = getState().auth.token
    return request
      .get(`${APIBASE}/api/tickets/departments`)
      .set('x-access-token', token)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .then(res => {
        dispatch(getTicketDepartmentsSuccess(res.body))
      })
      .catch(error => {
        if (error) {
          console.error('An error happend fetching departments')
        }
      })
  }
}

function getTicketCategoriesSuccess (categories) {
  return {
    type: GET_TICKET_CATEGORIES_SUCCESS,
    payload: categories
  }
}

function getTicketCategoriesRequest () {
  return {
    type: GET_TICKET_CATEGORIES_REQUEST
  }
}

export function getTicketCategories () {
  return function (dispatch, getState) {
    dispatch(getTicketCategoriesRequest())
    const token = getState().auth.token
    return request
      .get(`${APIBASE}/api/tickets/categories`)
      .set('x-access-token', token)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .then(res => {
        dispatch(getTicketCategoriesSuccess(res.body))
      })
      .catch(error => {
        if (error) {
          console.error('An error happend fetching categories')
        }
      })
  }
}

export const actions = {
  getTickets,
  createTicket,
  sendTicketReply,
  ticketIsSeen,
  ticketNewReplyReceived,
  getTicketDepartments,
  setActiveTicket
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [TICKETS_USER_SEEN]: (state, action) => {
    let _ticket = state.tickets[`ticket-${action.payload}`]
    if (!_ticket) return state
    let _replies = []
    for (let reply of _ticket.replies) {
      if (reply.owner_type === 'students') {
        reply.seen = 1
      }
      _replies.push(reply)
    }
    _ticket = update(_ticket, {
      replies: { $set: _replies }
    })
    return Object.assign({}, state, {
      tickets: update(state.tickets, { $merge: { [`ticket-${action.payload}`]: _ticket } })
    })
  },
  [CREATE_TICKET_SUCCESS]: (state, action) => {
    const _ticket = action.payload
    const _index = action.payload.id
    // console.log(action.payload)
    return Object.assign({}, state, {
      inserting: false,
      todayTicketsCount: state.todayTicketsCount + 1,
      tickets: Object.assign({}, { ['ticket-' + _index]: _ticket }, state.tickets),
      pagination: update(state.pagination, {
        $merge: {
          total: state.pagination.total + 1,
          pages: {
            ...state.pagination.pages,
            1: {
              ids: [_index, ...(state.pagination.pages[1] ? state.pagination.pages[1].ids : [])],
              isFetching: false
            }
          }
        }
      })
    })
  },
  [TICKETS_NEW_REPLY_RECEIVED]: (state, action) => {
    if (!state.tickets['ticket-' + action.payload.ticket_id]) return state
    // console.log('ticket received ' + action.payload.ticket_id)
    return Object.assign({}, state, {
      tickets: update(state.tickets, {
        ['ticket-' + action.payload.ticket_id]: {
          updated_at: { $set: action.payload.updated_at },
          seen: { $set: 0 },
          replies: { $push: [action.payload] }
        }
      })
    })
  },
  [SEND_TICKET_REPLY_REQUEST]: (state, action) => {
    return Object.assign({}, state, {
      tickets: update(state.tickets, {
        ['ticket-' + action.payload.ticket_id]: {
          updated_at: { $set: action.payload.updated_at },
          replies: { $push: [action.payload] }
        }
      })
    })
  },
  [SEND_TICKET_REPLY_SUCCESS]: (state, action) => {
    const _optimisticIndex = state.tickets[`ticket-${action.payload.reply.ticket_id}`].replies.findIndex(
      r => r.id === action.payload.optimisticId
    )

    return Object.assign({}, state, {
      tickets: update(state.tickets, {
        ['ticket-' + action.payload.reply.ticket_id]: {
          updated_at: { $set: action.payload.reply.updated_at },
          replies: { [_optimisticIndex]: { $set: action.payload.reply } }
        }
      }),
      todayTicketsCount: state.todayTicketsCount + 1
    })
  },
  [SET_STUDENT_ACTIVE_TICKET]: (state, action) => {
    let _ticket = state.tickets[`ticket-${action.payload}`]
    if (!_ticket) return state
    let _replies = []
    for (let reply of _ticket.replies) {
      if (reply.owner_type === 'users') {
        reply.seen = 1
      }
      _replies.push(reply)
    }
    _ticket = update(_ticket, { replies: { $set: _replies } })

    return Object.assign({}, state, {
      activeticket: action.payload,
      tickets: update(state.tickets, { $merge: { [`ticket-${action.payload}`]: _ticket } })
    })
  },
  [GET_TICKET_DEPARTMENTS_REQUEST]: state => Object.assign({}, state, { loadingDepartments: true }),
  [GET_TICKET_DEPARTMENTS_SUCCESS]: (state, action) =>
    Object.assign({}, state, {
      loadingDepartments: false,
      departments: action.payload
    }),

  [GET_TICKET_CATEGORIES_REQUEST]: state => Object.assign({}, state, { loadingCategories: true }),
  [GET_TICKET_CATEGORIES_SUCCESS]: (state, action) =>
    Object.assign({}, state, {
      loadingCategories: false,
      categories: action.payload
    }),
  [GET_TICKETS_SUCCESS]: (state, action) => {
    let _tickets = {}

    for (let ticket of action.payload.response) {
      _tickets = {
        ..._tickets,
        ['ticket-' + ticket.id]: ticket
      }
    }

    const pagination = update(state.pagination, {
      $set: {
        totalPages: action.payload.response.last_page,
        total: action.payload.response.total,
        currentPage: action.payload.response.current_page,
        pages: {
          ...state.pagination.pages,
          [action.payload.page]: {
            ids: action.payload.response.map(ticket => ticket.id),
            isFetching: false
          }
        }
      }
    })
    const todayTicketsCount = action.payload.response.reduce((total: number, ticket: Object): boolean =>
    total + (ticket.replies.filter((reply: Object): boolean => reply.isToday && reply.owner_type === 'students').length), 0)
    return Object.assign({}, state, {
      tickets: update(state.tickets, { $merge: { ..._tickets } }),
      todayTicketsCount,
      pagination
    })
  },
  [GET_RULE_FILES_REQUEST]: (state: Object, action: Object): Object => ({
    ...state, guideRules: [], guideRulesLoading: true
  }),
  [GET_RULE_FILES_SUCCESS]: (state: Object, action: Object): Object => ({
    ...state, guideRules: action.payload, guideRulesLoading: false
  }),
  [CREATE_TICKET_REQUEST]: (state, action) => {
    return Object.assign(state, { inserting: true })
  },
  [GET_TICKETS_LOADING]: (state, action) => {
    return Object.assign({}, state, {
      pagination: update(state.pagination, {
        $merge: {
          currentPage: action.payload.page,
          pages: {
            ...state.pagination.pages,
            [action.payload.page]: {
              ids: [],
              isFetching: true
            }
          }
        }
      })
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  activeticket: 0,
  sending: false,
  tickets: {},
  todayTicketsCount: 0,
  departments: [],
  categories: [],
  guideRules: [],
  guideRulesLoading: false,
  loadingDepartments: false,
  pagination: {
    totalPages: 0,
    total: 0,
    currentPage: 0,
    pages: {}
  }
}

export default function ticketsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
