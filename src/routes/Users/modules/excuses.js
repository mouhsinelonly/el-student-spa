// @flow
import { APIBASE } from 'utils'
import request from 'superagent'
import update from 'immutability-helper'

// ------------------------------------
// Constants
// ------------------------------------
export const GET_SESSION_EXCUSES_REQUEST = 'userstudents.GET_SESSION_EXCUSES_REQUEST'
export const GET_SESSION_EXCUSES_SUCCESS = 'userstudents.GET_SESSION_EXCUSES_SUCCESS'
export const GET_SESSION_EXCUSES_FAILURE = 'userstudents.GET_SESSION_EXCUSES_FAILURE'

export const GET_EXAMS_EXCUSES_REQUEST = 'userstudents.GET_EXAMS_EXCUSES_REQUEST'
export const GET_EXAMS_EXCUSES_SUCCESS = 'userstudents.GET_EXAMS_EXCUSES_SUCCESS'
export const GET_EXAMS_EXCUSES_FAILURE = 'userstudents.GET_EXAMS_EXCUSES_FAILURE'

export const TOGGLE_VISIBLE_EXCUSE_TYPE = 'userstudents.TOGGLE_VISIBLE_EXCUSE_TYPE'

// ------------------------------------
// Actions
// ------------------------------------
//

export function toggleType (type: string): Object {
  return {
    type: TOGGLE_VISIBLE_EXCUSE_TYPE,
    payload: type
  }
}
export function getSessionsExcuses (id: number): Function {
  return (dispatch: Function, getState: Function): Function => {
    const state = getState()
    const { activeStudentSessionsExcuses } = state.user_excuses
    if (activeStudentSessionsExcuses[`student-${id}`]) {
      dispatch(getSessionsExcusesSuccess(activeStudentSessionsExcuses[`student-${id}`], id))
      return () => {}
    }
    const { usertoken: token } = state.auth

    dispatch(getSessionsExcusesRequest())
    return request.get(APIBASE + '/api/admin/students/sessionsexcuses/' + id)
         .set('Accept', 'application/json')
         .set({ 'x-access-token': token })
         .set('Content-Type', 'application/json')
          .then((response: Object) => {
            try {
              dispatch(getSessionsExcusesSuccess(response.body, id))
            } catch (e) {
            }
          })
  }
}

export function getSessionsExcusesRequest (): Object {
  return {
    type: GET_SESSION_EXCUSES_REQUEST
  }
}

export function getSessionsExcusesSuccess (data: Object = {}, id: number): Object {
  return {
    type: GET_SESSION_EXCUSES_SUCCESS,
    payload: {
      data,
      id
    }
  }
}
export function getExamsExcuses (id: number): Function {
  return (dispatch: Function, getState: Function): Function => {
    const state = getState()
    const { activeStudentExamsExcuses } = state.user_excuses
    if (activeStudentExamsExcuses[`student-${id}`]) {
      dispatch(getExamsExcusesSuccess(activeStudentExamsExcuses[`student-${id}`], id))
      return () => {}
    }
    const { usertoken: token } = state.auth

    dispatch(getExamsExcusesRequest())
    return request.get(APIBASE + '/api/admin/students/examsexcuses/' + id)
         .set('Accept', 'application/json')
         .set({ 'x-access-token': token })
         .set('Content-Type', 'application/json')
          .then((response: Object) => {
            try {
              dispatch(getExamsExcusesSuccess(response.body, id))
            } catch (e) {
            }
          })
  }
}

export function getExamsExcusesRequest (): Object {
  return {
    type: GET_EXAMS_EXCUSES_REQUEST
  }
}

export function getExamsExcusesSuccess (data: Object = {}, id: number): Object {
  return {
    type: GET_EXAMS_EXCUSES_SUCCESS,
    payload: {
      data,
      id
    }
  }
}

export const actions = {}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_SESSION_EXCUSES_REQUEST]: (state: Object, action: Object): Object => {
    return Object.assign({}, state, {
      loadingsessions: true,
      activeStudentSessionsExcuses: []
    })
  },
  [GET_SESSION_EXCUSES_SUCCESS]: (state: Object, action: Object): Object => {
    return Object.assign({}, state, {
      sessionExcuses: update(state.sessionExcuses, {
        [`student-${action.payload.id}`]: { $set: action.payload.data }
      }),
      activeStudentSessionsExcuses: action.payload.data,
      loadingsessions: false
    })
  },
  [GET_EXAMS_EXCUSES_REQUEST]: (state: Object, action: Object): Object => {
    return Object.assign({}, state, {
      loadingexams: true,
      activeStudentExamsExcuses: []
    })
  },
  [GET_EXAMS_EXCUSES_SUCCESS]: (state: Object, action: Object): Object => {
    return Object.assign({}, state, {
      examsExcuses: update(state.examsExcuses, {
        [`student-${action.payload.id}`]: { $set: action.payload.data }
      }),
      activeStudentExamsExcuses: action.payload.data,
      loadingexams: false
    })
  },
  [TOGGLE_VISIBLE_EXCUSE_TYPE]: (state: Object, action: Object): Object => {
    return Object.assign({}, state, { visibleType: action.payload })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  sessionExcuses: {},
  examsExcuses: {},
  activeStudentSessionsExcuses: [],
  activeStudentExamsExcuses: [],
  visibleType: 'sessions',
  loadingsessions: false,
}

export default function userReducer (state: Object = initialState, action: Object): Object {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
