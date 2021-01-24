// @flow
import { APIBASE } from 'utils'
import { logout } from 'routes/Auth/modules/auth'
import update from 'immutability-helper'
import request from 'superagent'
import { socket } from 'socket'
import { setTicketRepliesSeen, storeNewReply, storeNewTicket,
  userStartedTypingTicket, userStoppedTypingTicket } from './tickets'
import { addOnlineStudent, removeOnlineStudent } from './students'
// ------------------------------------
// Constants
// ------------------------------------

export const GET_PROFILE_REQUEST = 'users.GET_PROFILE_REQUEST'
export const GET_PROFILE_SUCCESS = 'users.GET_PROFILE_SUCCESS'

export const GET_INSTALLMENTS_REQUEST = 'users.GET_INSTALLMENTS_REQUEST'
export const GET_INSTALLMENTS_SUCCESS = 'users.GET_INSTALLMENTS_SUCCESS'

export const GET_PROFILE_FAILURE = 'users.GET_PROFILE_FAILURE'

export const STORE_EXAM_APP_DEVICE = 'users.STORE_EXAM_APP_DEVICE'
export const EXAM_APP_DEVICE_VERIFIED = 'users.EXAM_APP_DEVICE_VERIFIED'
export const EXAM_APP_DEVICE_UNVERIFIED = 'users.EXAM_APP_DEVICE_UNVERIFIED'
export const GET_EVENTS_REQUEST = 'users.GET_EVENTS_REQUEST'
export const GET_EVENTS_SUCCESS = 'users.GET_EVENTS_SUCCESS'
export const GET_EVENTS_FAILURE = 'users.GET_EVENTS_FAILURE'

export const GET_FAVORITE_REPLIES_REQUEST = 'users.GET_FAVORITE_REPLIES_REQUEST'
export const GET_FAVORITE_REPLIES_SUCCESS = 'users.GET_FAVORITE_REPLIES_SUCCESS'

export const ADD_FAVORITE_REPLIES_REQUEST = 'users.ADD_FAVORITE_REPLIES_REQUEST'
export const ADD_FAVORITE_REPLIES_SUCCESS = 'users.ADD_FAVORITE_REPLIES_SUCCESS'

export const DELETE_FAVORITE_REPLIES_REQUEST = 'users.DELETE_FAVORITE_REPLIES_REQUEST'
export const DELETE_FAVORITE_REPLIES_SUCCESS = 'users.DELETE_FAVORITE_REPLIES_SUCCESS'

export const SET_REMOTE_CALL_ID = 'userstudents.SET_REMOTE_CALL_ID'
export const SET_REMOTE_CALL_ID_REQUEST = 'userstudents.SET_REMOTE_CALL_ID_REQUEST'

export const GET_WAITING_EXAM_APP_DEVICE_SUCCESS = 'userstudents.GET_WAITING_EXAM_APP_DEVICE_SUCCESS'

const myEvent = new CustomEvent('userStopedTyping', {})

// ------------------------------------
// Actions
// ------------------------------------
//
let socketClient = null

export function socketInActivateExamAppDevice ({ id, ips, domain, machinename, username, password }: Object): Object {
  return (dispatch: Function, getState: Function): Object => {
    const { usertoken: token } = getState().auth
    request.post(`${APIBASE}/api/extra/exampp_verify`)
    .set('Accept', 'application/json')
    .set({ 'x-access-token': token })
    .send({
      id: id,
      ipaddress: ips,
      domainname: domain,
      computername: machinename,
      deviceuser: username,
      password: password,
      admin: 0
    })
    .set('Content-Type', 'application/json')
    .then((res: Object, err: Object) => {
      if (!err) {
      }
      socketClient.emit(`app_is_verified`, { success: 0, id, note: 'تم رفض عملية التفعيل', center_id: 0 })
      dispatch({
        type: EXAM_APP_DEVICE_UNVERIFIED,
        payload: id
      })
    })
  }
}

export function socketActivateExamAppDevice ({ id, ips, domain, machinename, username, password }: Object): Object {
  return (dispatch: Function, getState: Function): Object => {
    const { usertoken: token } = getState().auth
    request.post(`${APIBASE}/api/extra/exampp_verify`)
    .set('Accept', 'application/json')
    .set({ 'x-access-token': token })
    .send({
      id: id,
      ipaddress: ips,
      domainname: domain,
      computername: machinename,
      deviceuser: username,
      password: password,
      admin: 1
    })
    .set('Content-Type', 'application/json')
    .then((res: Object, err: Object) => {
      if (!err) {
      }
      if (res.body.is_verified && !err) {
        socketClient.emit(`app_is_verified`, { success: 1, id, note: 'تم تفعيل الجهاز', center_id: res.body.center_id })
        dispatch({
          type: EXAM_APP_DEVICE_VERIFIED,
          payload: id
        })
      }
    })
  }
}

export function activateDomainDevices (domain: string = ''): Function {
  return (dispatch: Function, getState: Function): Function => {
    const { examAppDevices } = getState().user_profile
    examAppDevices.filter((d: Object): boolean => d.domain === domain).map((d: Object) => {
      dispatch(socketActivateExamAppDevice(d))
    })
  }
}

export function listenForSockets (id: number): Function {
  socketClient = socket({ userId: id, userType: 'user' })

  return (dispatch: Function) => {
    socketClient.on(`ticket-${id}:ticket_seen`, (message: Object) => {
      dispatch(setTicketRepliesSeen(message.ticket_id))
      document.dispatchEvent(myEvent)
    })

    socketClient.on(`admin-channel-1:reveived_verification`, (message: Object) => {
      try {
        dispatch(storeExamAppDevice(JSON.parse(message)))
      } catch (e) {
        console.error('received old verification id', message)
      }
    })

    socketClient.emit(`store_client_info`, { userId: id, type: 'user' })

    socketClient.on(`user-${id}:ticket_reply`, (message: Object) => {
      message.seen = 0
      dispatch(storeNewReply(message))
      document.dispatchEvent(myEvent)
    })

    socketClient.on(`user-${id}:new_ticket_received`, (message: Object) => {
      dispatch(storeNewTicket(message))
      document.dispatchEvent(myEvent)
    })

    socketClient.on(`users_status:online`, (message: Object) => {
      if (message.type === 'student') {
        document.dispatchEvent(myEvent)
        dispatch(addOnlineStudent(message.userId))
      }
    })

    socketClient.on(`users_status:offline`, (message: Object) => {
      if (message.type === 'student') {
        document.dispatchEvent(myEvent)
        dispatch(removeOnlineStudent(message.userId))
      }
    })

    socketClient.on(`users_tickets:typing`, (message: Object) => {
      document.dispatchEvent(myEvent)
      dispatch(userStartedTypingTicket(message))
    })

    socketClient.on(`users_tickets:stopped_typing`, (message: Object) => {
      document.dispatchEvent(myEvent)
      dispatch(userStoppedTypingTicket(message))
    })
  }
}
export function setStudentCallIdRequest (): Object {
  return { type: SET_REMOTE_CALL_ID_REQUEST }
}

export function startOVSession (studentId: number, userId: number): Function {
  return (dispatch: Function, getState: Function): Function => {
    socketClient.emit('start_call', { studentId, userId })
  }
}

export function stopOVSession (studentId: number, userId: number): Function {
  return (dispatch: Function, getState: Function): Function => {
    socketClient.emit('stop_call', { studentId, userId })
  }
}

export function setStudentCallId (studentId: number, url: string = ''): Function {
  return (dispatch: Function, getState: Function): Function => {
    const state = getState()
    dispatch(setStudentCallIdRequest())
    const { usertoken: token } = state.auth
    const { id } = getState().user_profile.profile
    if (studentId === 0) {
      dispatch({
        type: SET_REMOTE_CALL_ID,
        payload: {
          studentId,
          url
        }
      })
      return () => {}
    }
    return request.post(`${APIBASE}/api/admin/zoom/create`)
         .set('Authorization', 'application/json')
         .set({ 'x-access-token': token })
         .set('Content-Type', 'application/json')
          .then((response: Object) => {
            socketClient.emit('start_call', { studentId, userId: id, url: response.body.join_url })
            dispatch({
              type: SET_REMOTE_CALL_ID,
              payload: {
                studentId: studentId,
                url: response.body.start_url
              }
            })
          })
  }
}

export function getProfile (): Function {
  return (dispatch: Function, getState: Function): Function => {
    const state = getState()
    const { usertoken: token } = state.auth

    dispatch(getProfileRequest())
    return request.get(APIBASE + '/api/admin/profile')
         .set('Accept', 'application/json')
         .set({ 'x-access-token': token })
         .set('Content-Type', 'application/json')
          .then((response: Object) => {
            try {
              dispatch(getProfileSuccess(response.body))
              dispatch(listenForSockets(response.body.id))
            } catch (e) {
              dispatch(logout('users'))
            }
          }).catch((e: Object) => {
            dispatch(logout('users'))
          })
  }
}

export function getProfileRequest (): Object {
  return {
    type: GET_PROFILE_REQUEST
  }
}

export function getProfileSuccess (data: Object = {}): Object {
  return {
    type: GET_PROFILE_SUCCESS,
    payload: data
  }
}
// get installments
export function getInstallments (): Function {
  return (dispatch: Function, getState: Function): Function => {
    const state = getState()
    const { usertoken: token } = state.auth

    dispatch(getInstallmentsRequest())
    return request.get(APIBASE + '/api/admin/installments')
         .set('Accept', 'application/json')
         .set({ 'x-access-token': token })
         .set('Content-Type', 'application/json')
          .then((response: Object) => {
            try {
              dispatch(getInstallmentsSuccess(response.body))
            } catch (e) {
              dispatch(logout('users'))
            }
          }).catch((e: Object) => {
            dispatch(logout('users'))
          })
  }
}
// get user installments
export function getInstallmentsRequest (): Object {
  return {
    type: GET_INSTALLMENTS_REQUEST
  }
}

export function getInstallmentsSuccess (data: Array<Object> = []): Object {
  return {
    type: GET_INSTALLMENTS_SUCCESS,
    payload: data
  }
}
// get semester events
export function getSemesterEvents (): Function {
  return (dispatch: Function, getState: Function): Function => {
    const state = getState()
    const { usertoken: token } = state.auth

    dispatch(getSemesterEventsRequest())
    return request.get(APIBASE + '/api/admin/events')
         .set('Accept', 'application/json')
         .set({ 'x-access-token': token })
         .set('Content-Type', 'application/json')
          .then((response: Object) => {
            try {
              dispatch(getSemesterEventsSuccess(response.body))
            } catch (e) {
              dispatch(logout('users'))
            }
          }).catch((e: Object) => {
            dispatch(logout('users'))
          })
  }
}

export function getSemesterEventsRequest (): Object {
  return {
    type: GET_EVENTS_REQUEST
  }
}

export function getSemesterEventsSuccess (data: Object = {}): Object {
  return {
    type: GET_EVENTS_SUCCESS,
    payload: data
  }
}
// get favorite replies
export function getFavoriteReplies (): Function {
  return (dispatch: Function, getState: Function): Function => {
    const state = getState()
    const { usertoken: token } = state.auth

    dispatch(getFavoriteRepliesRequest())
    return request.get(APIBASE + '/api/admin/tickets/favorites')
         .set('Accept', 'application/json')
         .set({ 'x-access-token': token })
         .set('Content-Type', 'application/json')
          .then((response: Object) => {
            try {
              dispatch(getFavoriteRepliesSuccess(response.body))
            } catch (e) {
              dispatch(logout('users'))
            }
          }).catch((e: Object) => {
            dispatch(logout('users'))
          })
  }
}

export function getFavoriteRepliesRequest (): Object {
  return {
    type: GET_FAVORITE_REPLIES_REQUEST
  }
}

export function getFavoriteRepliesSuccess (data: Array<Object> = []): Object {
  return {
    type: GET_FAVORITE_REPLIES_SUCCESS,
    payload: data
  }
}
// store favorite reply
export function postFavoriteReply ({ content = '', departmentId = 0 }: Object): Function {
  return (dispatch: Function, getState: Function): Function => {
    const state = getState()
    const { usertoken: token } = state.auth

    dispatch(postFavoriteReplyRequest())
    return request.post(APIBASE + '/api/admin/tickets/add_favorite_reply')
         .set('Accept', 'application/json')
         .set({ 'x-access-token': token })
         .send({ content, departmentId })
         .set('Content-Type', 'application/json')
          .then((response: Object) => {
            try {
              dispatch(postFavoriteReplySuccess(response.body))
            } catch (e) {
              dispatch(logout('users'))
            }
          }).catch((e: Object) => {
            dispatch(logout('users'))
          })
  }
}

export function postFavoriteReplyRequest (): Object {
  return {
    type: ADD_FAVORITE_REPLIES_REQUEST
  }
}

export function postFavoriteReplySuccess (reply: Object = {}): Object {
  return {
    type: ADD_FAVORITE_REPLIES_SUCCESS,
    payload: reply
  }
}
// delete reply
export function postDeleteReply (id: number): Function {
  return (dispatch: Function, getState: Function): Function => {
    const state = getState()
    const { usertoken: token } = state.auth

    dispatch(postDeleteReplyRequest())
    return request.post(APIBASE + '/api/admin/tickets/delete_favorite_reply')
         .set('Accept', 'application/json')
         .set({ 'x-access-token': token })
         .send({ id })
         .set('Content-Type', 'application/json')
          .then((response: Object) => {
            try {
              dispatch(postDeleteReplySuccess(response.body))
            } catch (e) {
              dispatch(logout('users'))
            }
          }).catch((e: Object) => {
            dispatch(logout('users'))
          })
  }
}

export function postDeleteReplyRequest (): Object {
  return {
    type: DELETE_FAVORITE_REPLIES_REQUEST
  }
}

export function storeExamAppDevice (payload: Object): Object {
  return (dispatch: Function, getState: Function) => {
    const { id, ips, domain, machinename, username, password } = payload
    const { usertoken: token } = getState().auth

    request.post(`${APIBASE}/api/extra/exampp_verify`)
    .set('Accept', 'application/json')
    .set({ 'x-access-token': token })
    .send({
      id: id,
      ipaddress: ips,
      domainname: domain,
      computername: machinename,
      deviceuser: username,
      password: password,
      status: 'waiting',
      admin: 1
    })
    .set('Content-Type', 'application/json')
    .then((res: Object, err: Object) => {
      if (!err) {
        dispatch({
          type: STORE_EXAM_APP_DEVICE,
          payload
        })
      }
    })
  }
}

export function getWaitingExamAppDevices (payload: Object): Object {
  return (dispatch: Function, getState: Function) => {
    const { usertoken: token } = getState().auth
    request.post(`${APIBASE}/api/extra/waitingdevices`)
    .set('Accept', 'application/json')
    .set({ 'x-access-token': token })
    .set('Content-Type', 'application/json')
    .then((res: Object, err: Object) => {
      if (!err) {
        dispatch({
          type: GET_WAITING_EXAM_APP_DEVICE_SUCCESS,
          payload: res.body
        })
      }
    })
  }
}

export function postDeleteReplySuccess (id: number): Object {
  return {
    type: DELETE_FAVORITE_REPLIES_SUCCESS,
    payload: id
  }
}
// user is typing
export function userStartedTyping (ticketId: number): Object {
  return (dispatch: Function, getState: Function) => {
    const { id, name } = getState().user_profile.profile
    socketClient.emit(`user_is_typing`, { userId: id, ticketId, name })
    // console.log('sent to socket io')
  }
}

export function userStopedTyping (ticketId: number): Object {
  return (dispatch: Function, getState: Function) => {
    const { id, name } = getState().user_profile.profile
    socketClient.emit(`user_stopped_typing`, { userId: id, ticketId, name })
  }
}

export const actions = {
  getProfile
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_PROFILE_REQUEST]: (state: Object, action: Object): Object => Object.assign({}, state, {
    profile: {},
    profileLoading: true
  }),
  [GET_PROFILE_SUCCESS]: (state: Object, action: Object): Object => Object.assign({}, state, {
    profile: action.payload,
    profileLoading: false
  }),
  [SET_REMOTE_CALL_ID_REQUEST]: (state: Object, action: Object): Object => Object.assign({}, state, {
    calling: true,
  }),
  [GET_EVENTS_SUCCESS]: (state: Object, action: Object): Object => Object.assign({}, state, {
    events: action.payload,
  }),
  [STORE_EXAM_APP_DEVICE]: (state: Object, action: Object): Object => Object.assign({}, state, {
    examAppDevices: [action.payload, ...state.examAppDevices],
  }),
  [EXAM_APP_DEVICE_VERIFIED]: (state: Object, action: Object): Object => {
    const idIndex = state.examAppDevices.findIndex((d: Object): Object => d.id === action.payload)

    return ({
      ...state,
      examAppDevices: update(state.examAppDevices, { $splice: [[idIndex, 1]] })
    })
  },
  [EXAM_APP_DEVICE_UNVERIFIED]: (state: Object, action: Object): Object => {
    const idIndex = state.examAppDevices.findIndex((d: Object): Object => d.id === action.payload)

    return ({
      ...state,
      examAppDevices: update(state.examAppDevices, { $splice: [[idIndex, 1]]
      })
    })
  },
  [GET_FAVORITE_REPLIES_SUCCESS]: (state: Object, action: Object): Object => Object.assign({}, state, {
    favoriteReplies: action.payload,
  }),
  [ADD_FAVORITE_REPLIES_SUCCESS]: (state: Object, action: Object): Object => Object.assign({}, state, {
    favoriteReplies: update(state.favoriteReplies, { $push: [action.payload] }),
  }),
  [DELETE_FAVORITE_REPLIES_SUCCESS]: (state: Object, action: Object): Object => Object.assign({}, state, {
    favoriteReplies: update(state.favoriteReplies, { $splice: [[
      state.favoriteReplies.findIndex((r: Object): boolean => +r.id === +action.payload), 1]] }),
  }),
  [SET_REMOTE_CALL_ID]: (state: Object, action: Object): Object => Object.assign({}, state, {
    studentCallId: action.payload.studentId,
    studentCallUrl: action.payload.url,
    calling: false
  }),
  [GET_WAITING_EXAM_APP_DEVICE_SUCCESS]: (state: Object, action: Object): Object => Object.assign({}, state, {
    examAppDevices: action.payload
  }),
  [GET_INSTALLMENTS_SUCCESS]: (state: Object, action: Object): Object =>
    ({ ...state, installments: action.payload })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  installments: [],
  profile: {},
  favoriteReplies: [],
  events: [],
  studentCallId: 0,
  studentCallUrl: '',
  calling: false,
  profileLoading: false,
  examAppDevices: []
}

export default function userReducer (state: Object = initialState, action: Object): Object {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
