import request from 'superagent'
import {APIBASE} from 'utils'
// ------------------------------------
// Constants
// ------------------------------------
export const GET_EXAM_CENTERS_REQUEST = 'GET_EXAM_CENTERS_REQUEST'
export const GET_EXAM_CENTERS_SUCCESS = 'GET_EXAM_CENTERS_SUCCESS'

export const CHOOSE_EXAM_CENTER_REQUEST = 'CHOOSE_EXAM_CENTER_REQUEST'
export const CHOOSE_EXAM_CENTER_SUCCESS = 'CHOOSE_EXAM_CENTER_SUCCESS'

export const TOGGLE_EXAM_CENTER_VISIBILITY = 'TOGGLE_EXAM_CENTER_VISIBILITY'

export const RECHOOSE_EXAM_CENTER_REQUEST = 'RECHOOSE_EXAM_CENTER_REQUEST'

// ------------------------------------
// Actions
// ------------------------------------
//
export function toggleExamCenters () {
  return {
    type: TOGGLE_EXAM_CENTER_VISIBILITY
  }
}

export function rechooseCenter () {
  return {
    type: RECHOOSE_EXAM_CENTER_REQUEST
  }
}

export function getExamCentersSuccess (data) {
  return {
    type: GET_EXAM_CENTERS_SUCCESS,
    payload: {
      data: data
    }
  }
}
export function getExamCentersRequest () {
  return {
    type: GET_EXAM_CENTERS_REQUEST
  }
}

export function getExamCenters () {
  return function (dispatch, getState) {
    const state = getState()
    const token = state.auth.token
    dispatch(getExamCentersRequest())

    return request.get(APIBASE + '/api/examcenters/all')
       .set('Authorization', 'Bearer ' + token)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        if (!err && res.ok) {
          dispatch(getExamCentersSuccess(res.body))
        } else {

        }
      })
  }
}

// choose exam center
function chooseExamRequest () {
  return {
    type: CHOOSE_EXAM_CENTER_REQUEST
  }
}

function chooseExamSuccess () {
  return {
    type: CHOOSE_EXAM_CENTER_SUCCESS
  }
}

export function chooseExamCenter (centerId = 0) {
  return function (dispatch, getState) {
    const state = getState()
    const token = state.auth.token
    dispatch(chooseExamRequest())
    dispatch(getExamCentersRequest())

    return request.post(APIBASE + '/api/examcenters/choose/' + centerId)
      .set('x-access-token', token)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        if (!err && res.ok) {
          dispatch(getExamCentersSuccess(res.body))
          dispatch(chooseExamSuccess())
        } else {

        }
      })
  }
}

export const actions = {
  getExamCenters,
  chooseExamCenter
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_EXAM_CENTERS_REQUEST]: (state, action) => Object.assign({}, state, {
    loading: true
  }),
  [CHOOSE_EXAM_CENTER_SUCCESS]: (state, action) => Object.assign({}, state, {
    choosing: false,
    rechoosecenter: false
  }),
  [CHOOSE_EXAM_CENTER_REQUEST]: (state, action) => Object.assign({}, state, {
    choosing: true
  }),
  [RECHOOSE_EXAM_CENTER_REQUEST]: (state, action) => Object.assign({}, state, {
    rechoosecenter: true,
    centersvisible: true
  }),
  [TOGGLE_EXAM_CENTER_VISIBILITY]: (state, action) => Object.assign({}, state, {
    centersvisible: !state.centersvisible
  }),
  [GET_EXAM_CENTERS_SUCCESS]: (state, action) => {
    return Object.assign({}, state, {
      data: action.payload.data,
      loading: false
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  data: [],
  loading: false,
  choosing: false,
  centersvisible: false,
  rechoosecenter: false
}

export default function examCenterReducers (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
