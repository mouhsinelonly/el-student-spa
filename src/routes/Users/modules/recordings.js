// @flow
import request from 'superagent'
import update from 'immutability-helper'

// ------------------------------------
// Constants
// ------------------------------------
export const GET_EXAMS_RECORDINGS_REQUEST = 'userstudents.GET_EXAMS_RECORDINGS_REQUEST'
export const GET_EXAMS_RECORDINGS_SUCCESS = 'userstudents.GET_EXAMS_RECORDINGS_SUCCESS'

export const ADD_EXAM_RECORDING_TOP_LAYLIST_REQUEST = 'userstudents.ADD_EXAM_RECORDING_TOP_LAYLIST_REQUEST'

export const UPDATE_EXAM_RECORDING_REQUEST = 'userstudents.UPDATE_EXAM_RECORDING_REQUEST'
export const UPDATE_EXAM_RECORDING_SUCCESS = 'userstudents.UPDATE_EXAM_RECORDING_SUCCESS'

// ------------------------------------
// Actions
// ------------------------------------
//
// const LOCAL_SERVER = 'http://localhost:3003/streams'
const REMOTE_SERVER = 'https://el-css2.com/mongo/streams'

export function getRecordings (page: number = 1): Function {
  return (dispatch: Function, getState: Function): Function => {
    const state = getState()
    const { usertoken: token } = state.auth
    dispatch(getRecordingsRequest())
    return request.get(REMOTE_SERVER)
         .set('Accept', 'application/json')
         .query({ page: page, status: 'WAITING' })
         .set({ 'x-access-token': token })
         .set('Content-Type', 'application/json')
         .then((response: Object) => {
           try {
             dispatch(getRecordingsSuccess(response.body))
           } catch (e) {
           }
         })
  }
}

export function getRecordingsRequest (): Object {
  return {
    type: GET_EXAMS_RECORDINGS_REQUEST
  }
}

export function addToPlaylist (_id: string): Object {
  return {
    type: ADD_EXAM_RECORDING_TOP_LAYLIST_REQUEST,
    payload: _id
  }
}

export function getRecordingsSuccess (data: Array<Object> = []): Object {
  return {
    type: GET_EXAMS_RECORDINGS_SUCCESS,
    payload: data
  }
}

export function updateRecording (_id: string, status: string): Function {
  return (dispatch: Function, getState: Function): Function => {
    const state = getState()
    const { usertoken: token } = state.auth
    dispatch(updateRecordingRequest(_id))
    return request.post(REMOTE_SERVER)
         .set('Accept', 'application/json')
         .send({ status, _id })
         .set({ 'x-access-token': token })
         .set('Content-Type', 'application/json')
         .then((response: Object) => {
           try {
             dispatch(updateRecordingSuccess(_id))
           } catch (e) {
           }
         })
  }
}

export function updateRecordingRequest (_id: string): Object {
  return {
    type: UPDATE_EXAM_RECORDING_REQUEST,
    payload: _id
  }
}

export function updateRecordingSuccess (_id: string): Object {
  return {
    type: UPDATE_EXAM_RECORDING_SUCCESS,
    payload: _id
  }
}

export const actions = {}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_EXAMS_RECORDINGS_REQUEST]: (state: Object, action: Object): Object => {
    return Object.assign({}, state, {
      loading: true
    })
  },
  [GET_EXAMS_RECORDINGS_SUCCESS]: (state: Object, action: Object): Object => {
    return Object.assign({}, state, {
      data: update(state.data, { $push: action.payload }),
      loading: false
    })
  },
  [ADD_EXAM_RECORDING_TOP_LAYLIST_REQUEST]: (state: Object, action: Object): Object => {
    return Object.assign({}, state, {
      playlist: update(state.playlist, { $push: [action.payload] }),
      loading: false
    })
  },
  [UPDATE_EXAM_RECORDING_REQUEST]: (state: Object, action: Object): Object => {
    return Object.assign({}, state, {
      updating: update(state.updating, { $push: [action.payload] })
    })
  },
  [UPDATE_EXAM_RECORDING_SUCCESS]: (state: Object, action: Object): Object => {
    let updating = state.updating
    let data = state.data

    const updatingCurrIndex = updating.findIndex((i: string): boolean => i === action.payload)
    const dataCurrIndex = data.findIndex((i: Object): boolean => i._id === action.payload)

    if (updatingCurrIndex > -1) {
      updating = update(state.updating, { $splice: [[updatingCurrIndex, 1]] })
    }
    if (dataCurrIndex > -1) {
      data = update(state.data, { $splice: [[dataCurrIndex, 1]] })
    }
    return Object.assign({}, state, {
      updating,
      data
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  data: [],
  playlist: [],
  updating: [],
  loading: false,
}

export default function userRecordingsReducer (state: Object = initialState, action: Object): Object {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
