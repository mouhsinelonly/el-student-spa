// @flow
import { APIBASE } from 'utils'
import request from 'superagent'
import update from 'immutability-helper'

// ------------------------------------
// Constants
// ------------------------------------
export const GET_EXAMS_REQUEST = 'userstudents.GET_EXAMS_REQUEST'
export const GET_EXAMS_SUCCESS = 'userstudents.GET_EXAMS_SUCCESS'
export const GET_EXAMS_FAILURE = 'userstudents.GET_EXAMS_FAILURE'

export const TOGGLE_VISIBLE_EXAM_TYPE = 'userstudents.TOGGLE_VISIBLE_EXAM_TYPE'

// ------------------------------------
// Actions
// ------------------------------------
//

export function toggleType (type: string): Object {
  return {
    type: TOGGLE_VISIBLE_EXAM_TYPE,
    payload: type
  }
}

export function getExams (id: number): Function {
  return (dispatch: Function, getState: Function): Function => {
    const state = getState()
    const { exams } = state.user_exams
    if (exams[`student-${id}`]) {
      dispatch(getExamsSuccess(exams[`student-${id}`], id))
      return () => {}
    }
    const { usertoken: token } = state.auth

    dispatch(getExamsRequest())
    return request.get(APIBASE + '/api/admin/students/exams/' + id)
         .set('Accept', 'application/json')
         .set({ 'x-access-token': token })
         .set('Content-Type', 'application/json')
          .then((response: Object) => {
            try {
              dispatch(getExamsSuccess(response.body, id))
            } catch (e) {
            }
          })
  }
}

export function getExamsRequest (): Object {
  return {
    type: GET_EXAMS_REQUEST
  }
}

export function getExamsSuccess (data: Object = {}, id: number): Object {
  return {
    type: GET_EXAMS_SUCCESS,
    payload: {
      data,
      id
    }
  }
}

export const actions = {
  getExams
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_EXAMS_REQUEST]: (state: Object, action: Object): Object => {
    return Object.assign({}, state, {
      loadingStudentExams: true,
      activeStudentExams: []
    })
  },
  [GET_EXAMS_SUCCESS]: (state: Object, action: Object): Object => {
    return Object.assign({}, state, {
      exams: update(state.exams, {
        [`student-${action.payload.id}`]: { $set: action.payload.data }
      }),
      activeStudentExams: action.payload.data,
      loadingStudentExams: false
    })
  },
  [TOGGLE_VISIBLE_EXAM_TYPE]: (state: Object, action: Object): Object => {
    return Object.assign({}, state, { visibleType: action.payload })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  exams: {},
  activeStudentExams: [],
  visibleType: 'activity',
  loadingStudentExams: false,
}

export default function userReducer (state: Object = initialState, action: Object): Object {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
