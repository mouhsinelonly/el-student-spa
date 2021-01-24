import request from 'superagent'
import update from 'immutability-helper'
import {APIBASE} from 'utils'
// ------------------------------------
// Constants
// ------------------------------------
export const STUDENT_MESSAGE_SEEN_REQUEST = 'STUDENT_MESSAGE_SEEN_REQUEST'
export const STUDENT_MESSAGE_SEEN_SUCCESS = 'STUDENT_MESSAGE_SEEN_SUCCESS'
export const GET_STUDENT_MESSAGES_REQUEST = 'GET_STUDENT_MESSAGES_REQUEST'
export const GET_STUDENT_MESSAGES_SUCCESS = 'GET_STUDENT_MESSAGES_SUCCESS'

// ------------------------------------
// Actions
// ------------------------------------
//
export function getMessagesSuccess (messages = []) {
  return {
    type: GET_STUDENT_MESSAGES_SUCCESS,
    payload: messages
  }
}
export function getMessagesRequest () {
  return {
    type: GET_STUDENT_MESSAGES_REQUEST
  }
}

export function getMessages () {
  return function (dispatch, getState) {
    const state = getState()
    const token = state.auth.token
    return request.get(APIBASE + '/api/messages/all')
       .set('Authorization', 'Bearer ' + token)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        if (!err && res.ok) {
          dispatch(getMessagesSuccess(res.body))
        } else {

        }
      })
  }
}

export function makeMessageSeenSuccess (id = 0) {
  return {
    type: STUDENT_MESSAGE_SEEN_SUCCESS
  }
}
export function makeMessageSeenRequest (id = 0) {
  return {
    type: STUDENT_MESSAGE_SEEN_REQUEST,
    payload: id
  }
}

export function makeMessageSeen (id = 0) {
  return function (dispatch, getState) {
    const state = getState()
    const token = state.auth.token
    dispatch(makeMessageSeenRequest(id))
    return request.post(`${APIBASE}/api/messages/seen`)
      .set('x-access-token', token)
      .set('Accept', 'application/json')
      .send({id})
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        if (!err && res.ok) {
          dispatch(makeMessageSeenSuccess(id))
        } else {

        }
      })
  }
}

export const actions = {
  getMessages,
  makeMessageSeen
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [STUDENT_MESSAGE_SEEN_REQUEST]: (state, action) => {
    return Object.assign({}, state, {
      data: update(state.data, {
        [`message-${action.payload}`]: {
          $merge: {
            seen: 1
          }
        }
      })
    })
  },
  [GET_STUDENT_MESSAGES_REQUEST]: (state, action) => Object.assign({}, state, {
    loading: true
  }),
  [GET_STUDENT_MESSAGES_SUCCESS]: (state, action) => {
    let _messages = {}

    for (let message of action.payload) {
      _messages = {
        ..._messages,
        ['message-' + message.id]: message
      }
    }
    return Object.assign({}, state, {
      data: _messages,
      loading: false,
      lastUpdated: new Date().getTime()
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  data: {},
  loading: false,
  lastUpdated: null
}

export default function messagesReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
