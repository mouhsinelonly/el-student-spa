// @flow
import request from 'superagent'
import moment from 'moment'
import update from 'immutability-helper'
import { APIBASE } from 'utils'
import { showModal } from 'modules/modals'
import { SEND_SESSION_EXCUSES_ORDER_SUCCESS } from
'routes/Student/routes/Orders/routes/SessionExcuse/modules/session_excuse'
// ------------------------------------
// Constants
// ------------------------------------
export const GET_SESSIONS: string = 'sessions/GET_SESSIONS'
export const GET_SESSIONS_LOADING: string = 'sessions/GET_SESSIONS_LOADING'
export const GET_SESSIONS_SUCCESS: string = 'sessions/GET_SESSIONS_SUCCESS'

export const TOGGLE_VISIBLE_SESSION_OTHERS: string = 'sessions.TOGGLE_VISIBLE_SESSION_OTHERS'

export const GET_RELATED_SESSIONS_REQUEST: string = 'sessions.GET_RELATED_SESSIONS_REQUEST'
export const GET_RELATED_SESSIONS_SUCCESS: string = 'sessions.GET_RELATED_SESSIONS_SUCCESS'

export const STORE_SESSION_POLL_ANSWER_REQUEST: string = 'sessions.STORE_SESSION_POLL_ANSWER_REQUEST'
export const STORE_SESSION_POLL_ANSWER_SUCCESS: string = 'sessions.STORE_SESSION_POLL_ANSWER_SUCCESS'

const GET_EXCUSE_REASONS_REQUEST: string = 'sessions.GET_EXCUSE_REASONS_REQUEST'
const GET_EXCUSE_REASONS_SUCCESS: string = 'sessions.GET_EXCUSE_REASONS_SUCCESS'

export const GET_SESSION_POLL_REQUEST: string = 'sessions.GET_SESSION_POLL_REQUEST'
export const GET_SESSION_POLL_SUCCESS: string = 'sessions.GET_SESSION_POLL_SUCCESS'
export const RESET_SESSION_POLL: string = 'sessions.RESET_SESSION_POLL'

export const STORE_SESSION_CLICK_REQUEST: string = 'sessions.STORE_SESSION_CLICK_REQUEST'
export const STORE_SESSION_CLICK_SUCCESS: string = 'sessions.STORE_SESSION_CLICK_SUCCESS'
export const STORE_SESSION_CLICK_FAILURE: string = 'sessions.STORE_SESSION_CLICK_FAILURE'

export const SHOW_ALL_PAST_SESSIONS: string = 'SHOW_ALL_PAST_SESSIONS'

export const OPEN_SESSION_DROPDOWN: string = 'OPEN_SESSION_DROPDOWN'

export const SET_CURRENT_TEST_QUESTION_INDEX: string = 'sessions.SET_CURRENT_TEST_QUESTION_INDEX'

// ------------------------------------
// Actions
// ------------------------------------
//
export function showAllPastSessions (): Object {
  return {
    type: SHOW_ALL_PAST_SESSIONS
  }
}

export function setCurrentTestQuestionIndex (index: number): Object {
  return {
    type: SET_CURRENT_TEST_QUESTION_INDEX,
    payload: index
  }
}

export function openSessionDropDown (id: number = 0): Object {
  return {
    type: OPEN_SESSION_DROPDOWN,
    payload: id
  }
}

export function toggleVisibleOthers (id: number = 0): Object {
  // console.log(id)
  return {
    type: TOGGLE_VISIBLE_SESSION_OTHERS,
    payload: id
  }
}

export function showLiveSessionModal (sessions: Array<Object> = []): Function {
  return function (dispatch: Function, getState: Function) {
    const state = getState()
    const momentServerTime = moment(state.serverdate)
    const liveSession = sessions.find((s: Object, key: number): boolean => {
      if (!s.classroom_session) return false
      if (s.classroom_session.canceled === 1) return false
      let sessionStartAt = moment(s.classroom_session.start_at)
      return sessionStartAt.isBefore(momentServerTime) &&
      sessionStartAt.clone().add(s.classroom_session.duration, 'minutes').isAfter(momentServerTime)
    })
    if (liveSession && state.modals.name !== 'paymentmodal') {
      dispatch(showModal('livesession', liveSession, true, true))
    }
  }
}

export function getSessionsSuccess (data: Array<Object> = []): Object {
  return {
    type: GET_SESSIONS_SUCCESS,
    payload: {
      data: data
    }
  }
}
export function getSessionsLoading (): Object {
  return {
    type: GET_SESSIONS_LOADING
  }
}

export function getSessions (): Function {
  return (dispatch: Function, getState: Function): Object => {
    const state = getState()
    const token = state.auth.token
    dispatch(getSessionsLoading())
    let lastUpdated = state.sessions.lastUpdated
    if (lastUpdated !== null) {
      const now = new Date()
      const dif = lastUpdated - now.getTime()
      const secondsFrom = dif / 1000
      const secondsBetween = Math.abs(secondsFrom)
      if (secondsBetween <= (60 * 60)) {
        dispatch(getSessionsSuccess(state.sessions.data))
        dispatch(showLiveSessionModal(state.sessions.data))
        return {}
      }
    }

    return request.get(APIBASE + '/api/sessions')
       .set('Authorization', 'Bearer ' + token)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end((err: Object, res: Object) => {
        if (!err && res.ok) {
          dispatch(getSessionsSuccess(res.body))
          dispatch(getRelatedSessions())
          dispatch(showLiveSessionModal(res.body))
        } else {

        }
      })
  }
}
export function getRelatedSessionsSuccess (data: Array<Object> = []): Object {
  return {
    type: GET_RELATED_SESSIONS_SUCCESS,
    payload: data
  }
}
export function getRelatedSessionsLoading (): Object {
  return {
    type: GET_RELATED_SESSIONS_REQUEST
  }
}

export function getRelatedSessions (): Function {
  return (dispatch: Function, getState: Function): Object => {
    const state = getState()
    const token = state.auth.token
    dispatch(getRelatedSessionsLoading())
    const lastUpdated = state.sessions.relatedLastUpdated
    if (lastUpdated !== null) {
      const now = new Date()
      const dif = lastUpdated - now.getTime()
      const secondsFrom = dif / 1000
      const secondsBetween = Math.abs(secondsFrom)
      if (secondsBetween <= (60 * 60)) {
        dispatch(getRelatedSessionsSuccess(state.sessions.relatedSessions))
        return {}
      }
    }

    return request.get(APIBASE + '/api/sessions/othersessions')
       .set('Authorization', 'Bearer ' + token)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end((err: Object, res: Object) => {
        if (!err && res.ok) {
          dispatch(getRelatedSessionsSuccess(res.body))
        } else {

        }
      })
  }
}

export function getSessionPollSuccess (poll: Object): Object {
  return {
    type: GET_SESSION_POLL_SUCCESS,
    payload: poll
  }
}

export function resetSessionPoll (): Object {
  return {
    type: RESET_SESSION_POLL
  }
}

export function getSessionPollLoading (): Object {
  return {
    type: GET_SESSION_POLL_REQUEST
  }
}

export function getSessionPoll (): Function {
  return (dispatch: Function, getState: Function): Object => {
    const state = getState()
    const token = state.auth.token
    dispatch(getSessionPollLoading())

    return request.get(APIBASE + '/api/sessions/poll')
       .set('Authorization', 'Bearer ' + token)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end((err: Object, res: Object) => {
        if (!err && res.ok) {
          dispatch(getSessionPollSuccess(res.body))
        } else {

        }
      })
  }
}

export function sendSessionPollAnswerSuccess (): Object {
  return {
    type: STORE_SESSION_POLL_ANSWER_SUCCESS
  }
}

export function sendSessionPollAnswerLoading (): Object {
  return {
    type: STORE_SESSION_POLL_ANSWER_REQUEST
  }
}

function storeSessionPollAnswerInLocaleStorage (answers: Object) {
  localStorage.setItem(`session_poll_${answers.poll_id}`, JSON.stringify(answers))
}

function removeSessionPollAnswerFromLocaleStorage (pollId: number) {
  localStorage.removeItem(`session_poll_${pollId}`)
}

export function sendSessionPollAnswer (answers: Object): Function {
  return (dispatch: Function, getState: Function): Object => {
    const state = getState()
    const token = state.auth.token
    dispatch(sendSessionPollAnswerLoading())
    storeSessionPollAnswerInLocaleStorage(answers)
    return request.post(APIBASE + '/api/sessions/poll/store')
      .set('Authorization', 'Bearer ' + token)
      .send(answers)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end((err: Object, res: Object) => {
        if (!err && res.ok) {
          removeSessionPollAnswerFromLocaleStorage(answers.poll_id)
          dispatch(sendSessionPollAnswerSuccess())
          // dispatch(resetSessionPoll())
        } else {

        }
      })
  }
}

function getExcuseReasonsSuccess (reasons: Array<Object>): Object {
  return {
    type: GET_EXCUSE_REASONS_SUCCESS,
    payload: reasons
  }
}

function getExcuseReasonsLoading (): Object {
  return {
    type: GET_EXCUSE_REASONS_REQUEST
  }
}

export function getExcuseReasons (answers: Object): Function {
  return (dispatch: Function, getState: Function): Object => {
    const state = getState()
    const token = state.auth.token
    dispatch(getExcuseReasonsLoading())
    let reaosonsLastUpdated = state.sessions.reaosonsLastUpdated
    if (reaosonsLastUpdated !== null) {
      const now = new Date()
      const dif = reaosonsLastUpdated - now.getTime()
      const secondsFrom = dif / 1000
      const secondsBetween = Math.abs(secondsFrom)
      if (secondsBetween <= (60 * 60)) {
        dispatch(getExcuseReasonsSuccess(state.sessions.reasons))
        return {}
      }
    }
    return request.get(APIBASE + '/api/sessions/reasons')
      .set('x-access-token', token)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end((err: Object, res: Object) => {
        if (!err && res.ok) {
          dispatch(getExcuseReasonsSuccess(res.body))
        } else {

        }
      })
  }
}

export function storeSessionClickSuccess (): Object {
  return {
    type: STORE_SESSION_CLICK_SUCCESS
  }
}
export function storeSessionClickLoading (): Object {
  return {
    type: STORE_SESSION_CLICK_REQUEST
  }
}

export function storeSessionClick (sessionId: number = 0): Function {
  return (dispatch: Function, getState: Function): Object => {
    const state = getState()
    const token = state.auth.token

    return request.post(APIBASE + '/api/sessions/attend')
      .set('Authorization', 'Bearer ' + token)
      .set('Accept', 'application/json')
      .send({ session_id: sessionId })
      .set('Content-Type', 'application/json')
      .end((err: Object, res: Object) => {
        if (!err && res.ok) {
          dispatch(storeSessionClickSuccess())
        } else {

        }
      })
  }
}

export const actions = {
  getSessions,
  getSessionsSuccess,
  openSessionDropDown
}
// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [TOGGLE_VISIBLE_SESSION_OTHERS]: (state: Object, action: Object): Object => Object.assign({}, state, {
    visibleSessionOthers: action.payload === state.visibleSessionOthers ? 0 : action.payload
  }),
  [GET_SESSIONS]: (state: Object, action: Object): Object => Object.assign({}, state, {
    data: [],
    loading: true
  }),
  [GET_SESSIONS_SUCCESS]: (state: Object, action: Object): Object => {
    return Object.assign({}, state, {
      data: action.payload.data,
      loading: false,
      lastUpdated: new Date().getTime()
    })
  },
  [GET_EXCUSE_REASONS_SUCCESS]: (state: Object, action: Object): Object => {
    return Object.assign({}, state, {
      reasons: action.payload,
      reaosonsLastUpdated: new Date().getTime()
    })
  },
  [GET_RELATED_SESSIONS_REQUEST]: (state: Object, action: Object): Object => Object.assign({}, state, {
    relatedSessions: [],
    loadingRelated: true
  }),
  [SET_CURRENT_TEST_QUESTION_INDEX]: (state: Object, action: Object): Object => Object.assign({}, state, {
    currentTestQuestionIndex: action.payload
  }),
  [GET_RELATED_SESSIONS_SUCCESS]: (state: Object, action: Object): Object => {
    return Object.assign({}, state, {
      relatedSessions: action.payload,
      loadingRelated: false,
      relatedLastUpdated: new Date().getTime()
    })
  },
  [SEND_SESSION_EXCUSES_ORDER_SUCCESS]: (state: Object, action: Object): Object => {
    const sessionIndex = state.data.findIndex((s: Object, i: number): boolean =>
      s.classroom_session_id === action.payload.session_id)
    const _session = update(state.data.find((s: Object, i: number): boolean =>
      s.classroom_session_id === action.payload.session_id),
      { excuseStatus: { $set: action.payload.status } })

    return Object.assign({}, state, {
      data: update(state.data, { [sessionIndex]: { $set: _session } })
    })
  },
  [GET_SESSIONS_LOADING]: (state: Object, action: Object): Object => {
    return Object.assign({}, state, {
      loading: true
    })
  },
  [SHOW_ALL_PAST_SESSIONS]: (state: Object, action: Object): Object => {
    return Object.assign({}, state, {
      showallpastsessions: true
    })
  },
  [OPEN_SESSION_DROPDOWN]: (state: Object, action: Object): Object => {
    return Object.assign({}, state, {
      dropdownopen: state.dropdownopen === action.payload ? 0 : action.payload
    })
  },
  [GET_SESSION_POLL_REQUEST]: (state: Object, action: Object): Object => {
    return Object.assign({}, state, {
      poll: {}
    })
  },
  [GET_SESSION_POLL_SUCCESS]: (state: Object, action: Object): Object => {
    return Object.assign({}, state, {
      poll: action.payload
    })
  },
  [STORE_SESSION_POLL_ANSWER_SUCCESS]: (state: Object, action: Object): Object => {
    return Object.assign({}, state, {
      poll: Object.assign({}, state.poll, { uploaded: true }),
      uploadingPollAnswer: false
    })
  },
  [RESET_SESSION_POLL]: (state: Object, action: Object): Object => {
    return Object.assign({}, state, {
      poll: {}
    })
  },
  [STORE_SESSION_POLL_ANSWER_REQUEST]: (state: Object, action: Object): Object => {
    return Object.assign({}, state, {
      uploadingPollAnswer: true
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  data: [],
  showallpastsessions: false,
  loading: false,
  reasons: [],
  lastUpdated: null,
  reaosonsLastUpdated: null,
  dropdownopen: 0,
  relatedLastUpdated: null,
  uploadingPollAnswer: false,
  poll: {},
  relatedSessions: [],
  visibleSessionOthers: 0,
  currentTestQuestionIndex: 0,
  loadingRelated: false
}

export default function sessionsReducer (state: Object = initialState, action: Object): Object {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
