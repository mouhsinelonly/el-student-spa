import request from 'superagent'
import { dataURItoBlob } from 'utils'
import { getSettings } from './settings'
// ------------------------------------
// Constants
// ------------------------------------
export const FACE_MATCHING_REQUEST = 'FACE_MATCHING_REQUEST'
export const FACE_MATCHING_SUCCESS = 'FACE_MATCHING_SUCCESS'

// ------------------------------------
// Actions
// ------------------------------------
//
//
export function matchFaceSuccess (match = false, ratio = 0, exception = '') {
  return {
    type: FACE_MATCHING_SUCCESS,
    payload: {
      match,
      exception,
      ratio
    }
  }
}

export function matchFaceRequest () {
  return {
    type: FACE_MATCHING_REQUEST
  }
}

export function matchFace (screenshot) {
  return (dispatch, getState) => {
    dispatch(matchFaceRequest())

    const state = getState()
    const token = state.auth.token
    const studentId = state.student.profile.id

    request.post('https://el-css.com/facedetection/upload')
    .attach('img', dataURItoBlob(screenshot), 'img')
    .field('token', token)
    .field('user_id', studentId)
    .end((err, res) => {
      const response = JSON.parse(res.text)[0]
      dispatch(getSettings())
      dispatch(matchFaceSuccess(response.match === 'True', parseFloat(response.ratio), response.exception))
      if (err) {
        console.error(err)
      }
    })
  }
}
export const actions = {
  matchFace
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FACE_MATCHING_SUCCESS]: (state, action) =>
  Object.assign({}, state, {
    match: action.payload.match, exception: action.payload.exception, ratio: action.payload.ratio, done: true, processing: false }),
  [FACE_MATCHING_REQUEST]: (state, action) => Object.assign({}, state, {
    processing: true, match: false, ratio: 0, done: false })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  processing: false,
  match: false,
  exception: '',
  ratio: 0,
  done: false
}

export default function faceMatchReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
