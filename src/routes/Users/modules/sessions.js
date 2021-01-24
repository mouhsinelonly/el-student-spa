// @flow
import { APIBASE } from 'utils'
import request from 'superagent'
import update from 'immutability-helper'

// ------------------------------------
// Constants
// ------------------------------------
export const GET_SESSIONS_REQUEST = 'userstudents.GET_SESSIONS_REQUEST'
export const GET_SESSIONS_SUCCESS = 'userstudents.GET_SESSIONS_SUCCESS'
export const GET_SESSIONS_FAILURE = 'userstudents.GET_SESSIONS_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------
//

export function getSessions (id: number): Function {
  return (dispatch: Function, getState: Function): Function => {
    const state = getState()
    const { sessions } = state.user_sessions
    if (sessions[`student-${id}`]) {
      dispatch(getSessionsSuccess(sessions[`student-${id}`], id))
      return () => {}
    }
    const { usertoken: token } = state.auth

    dispatch(getSessionsRequest())
    return request.get(APIBASE + '/api/admin/students/subjectssessions/' + id)
         .set('Accept', 'application/json')
         .set({ 'x-access-token': token })
         .set('Content-Type', 'application/json')
          .then((response: Object) => {
            try {
              dispatch(getSessionsSuccess(response.body, id))
            } catch (e) {
            }
          })
  }
}

export function getSessionsRequest (): Object {
  return {
    type: GET_SESSIONS_REQUEST
  }
}

export function getSessionsSuccess (data: Object = {}, id: number): Object {
  return {
    type: GET_SESSIONS_SUCCESS,
    payload: {
      data,
      id
    }
  }
}

export const actions = {
  getSessions
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_SESSIONS_REQUEST]: (state: Object, action: Object): Object => {
    return Object.assign({}, state, {
      loadingStudentSessions: true,
      activeStudentSessions: []
    })
  },
  [GET_SESSIONS_SUCCESS]: (state: Object, action: Object): Object => {
    return Object.assign({}, state, {
      sessions: update(state.sessions, {
        [`student-${action.payload.id}`]: { $set: action.payload.data }
      }),
      activeStudentSessions: action.payload.data,
      loadingStudentSessions: false
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  sessions: {},
  activeStudentSessions: [],
  loadingStudentSessions: false,
}

export default function userReducer (state: Object = initialState, action: Object): Object {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
