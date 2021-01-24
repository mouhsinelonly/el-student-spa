// @flow
import { APIBASE } from 'utils'
import request from 'superagent'
import update from 'immutability-helper'

// ------------------------------------
// Constants
// ------------------------------------
export const POST_EXTEND_RECORDING_REQUEST = 'userstudents.POST_EXTEND_RECORDING_REQUEST'
export const POST_EXTEND_RECORDING_SUCCESS = 'userstudents.POST_EXTEND_RECORDING_SUCCESS'

export const GET_TILAWA_RECORDINGS_REQUEST = 'userstudents.GET_TILAWA_RECORDINGS_REQUEST'
export const GET_TILAWA_RECORDINGS_SUCCESS = 'userstudents.GET_TILAWA_RECORDINGS_SUCCESS'
export const GET_TILAWA_RECORDINGS_FAILURE = 'userstudents.GET_TILAWA_RECORDINGS_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------
//

export function getTilawaRecordings (id: number): Function {
  return (dispatch: Function, getState: Function): Function => {
    const state = getState()
    const { recordings } = state.user_tilawa
    if (recordings[`student-${id}`]) {
      dispatch(getTilawaRecordingsSuccess(recordings[`student-${id}`], id))
      return () => {}
    }
    const { usertoken: token } = state.auth

    dispatch(getTilawaRecordingsRequest())
    return request.get(APIBASE + '/api/admin/students/quranrecordings/' + id)
         .set('Accept', 'application/json')
         .set({ 'x-access-token': token })
         .set('Content-Type', 'application/json')
          .then((response: Object) => {
            try {
              dispatch(getTilawaRecordingsSuccess(response.body, id))
            } catch (e) {
            }
          })
  }
}

function getTilawaRecordingsRequest (): Object {
  return {
    type: GET_TILAWA_RECORDINGS_REQUEST
  }
}

function getTilawaRecordingsSuccess (data: Object = {}, id: number): Object {
  return {
    type: GET_TILAWA_RECORDINGS_SUCCESS,
    payload: {
      data,
      id
    }
  }
}
// extend
export function postExtendRecording (recordingId: number, studentId: number): Function {
  return (dispatch: Function, getState: Function): Function => {
    const state = getState()
    const { usertoken: token } = state.auth

    dispatch(postExtendRecordingRequest())
    return request.post(`${APIBASE}/api/admin/students/recordings/extend/${studentId}`)
         .set('Accept', 'application/json')
         .send({ id: recordingId })
         .set({ 'x-access-token': token })
         .set('Content-Type', 'application/json')
          .then((response: Object) => {
            try {
              dispatch(postExtendRecordingSuccess({ recordingId, studentId, success: response.body.success }))
            } catch (e) {
            }
          })
  }
}

function postExtendRecordingRequest (): Object {
  return {
    type: POST_EXTEND_RECORDING_REQUEST
  }
}

function postExtendRecordingSuccess ({ recordingId, studentId, success }: Object): Object {
  return {
    type: POST_EXTEND_RECORDING_SUCCESS,
    payload: {
      recordingId,
      studentId,
      success
    }
  }
}

export const actions = {
  getTilawaRecordings
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_TILAWA_RECORDINGS_REQUEST]: (state: Object, action: Object): Object => {
    return Object.assign({}, state, {
      loadingStudentRecordings: true,
      activeStudentRecordings: []
    })
  },
  [GET_TILAWA_RECORDINGS_SUCCESS]: (state: Object, action: Object): Object => {
    return Object.assign({}, state, {
      recordings: update(state.recordings, {
        [`student-${action.payload.id}`]: { $set: action.payload.data }
      }),
      activeStudentRecordings: action.payload.data,
      loadingStudentRecordings: false
    })
  },
  [POST_EXTEND_RECORDING_REQUEST]: (state: Object, action: Object): Object => ({
    ...state,
    updatingRecording: true,
  }),
  [POST_EXTEND_RECORDING_SUCCESS]: (state: Object, action: Object): Object => {
    const index = state.recordings[`student-${action.payload.studentId}`]
    .findIndex((r: Object): Object => +r.id === +action.payload.recordingId)

    const recordings = update(state.recordings[`student-${action.payload.studentId}`], { [index]: {
      $set: { ...state.recordings[`student-${action.payload.studentId}`][index],
        ...(action.payload.success && {
          remaining: state.recordings[`student-${action.payload.studentId}`][index].remaining + 1,
          extra_tries: state.recordings[`student-${action.payload.studentId}`][index].extra_tries + 1
        }) }
    } })

    const activeRecordings = update(state.recordings, { [`student-${action.payload.studentId}`]: { $set: recordings } })

    return ({
      ...state,
      updatingRecording: false,
      recordings: activeRecordings,
      activeStudentRecordings: recordings
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  recordings: {},
  updatingRecording: false,
  activeStudentRecordings: [],
  loadingStudentRecordings: false,
}

export default function userReducer (state: Object = initialState, action: Object): Object {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
