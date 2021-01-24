import { APIBASE } from 'utils'
import request from 'superagent'
import { startSyncedDate } from 'routes/Student/modules/serverdate'
// ------------------------------------
// Constants
// ------------------------------------
export const NETWORK_ERROR = 'NETWORK_ERROR'
export const HIDE_NETWORK_ERROR = 'HIDE_NETWORK_ERROR'

export const GET_SERVERDATE_REQUEST = 'network.GET_SERVERDATE_REQUEST'
export const GET_SERVERDATE_SUCCESS = 'network.GET_SERVERDATE_SUCCESS'
export const GET_SERVERDATE_FAILURE = 'network.GET_SERVERDATE_FAILURE'
// ------------------------------------
// Actions
// ------------------------------------

// add student joyride
export function getServerDate () {
  return function (dispatch, getState) {
    const state = getState().network
    if (state.serverDateLoading) {
      return
    }
    dispatch(getServerDateRequest())
    return request.get(APIBASE + '/api/extra/serverdate')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        if (!err && res.ok) {
          dispatch(startSyncedDate(res.body.serverdate))
          dispatch(getServerDateSuccess(res.body))
        } else {
          dispatch(getServerDateFailure())
        }
      })
  }
}

export function getServerDateRequest () {
  return {
    type: GET_SERVERDATE_REQUEST
  }
}
export function getServerDateFailure () {
  return {
    type: GET_SERVERDATE_FAILURE
  }
}
export function getServerDateSuccess (response) {
  return {
    type: GET_SERVERDATE_SUCCESS,
    payload: response.serverdate
  }
}

export function networkError (message = '') {
  return {
    type: NETWORK_ERROR,
    payload: {
      seen: false,
      message
    }
  }
}

export function hideNetWorkError () {
  return {
    type: HIDE_NETWORK_ERROR
  }
}

export const actions = {
  networkError
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [NETWORK_ERROR]: (state, action) => Object.assign({}, state, {
    seen: action.payload.seen,
    message: action.payload.message,
  }),
  [HIDE_NETWORK_ERROR]: (state, action) => Object.assign({}, state, {
    seen: true,
    message: ''
  }),
  [GET_SERVERDATE_REQUEST]: (state, action) => Object.assign({}, state, {
    serverDateLoading: true
  }),
  [GET_SERVERDATE_FAILURE]: (state, action) => Object.assign({}, state, {
    serverDateLoading: false
  }),
  [GET_SERVERDATE_SUCCESS]: (state, action) => Object.assign({}, state, {
    serverDateLoading: false
  })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  seen: true,
  message: '',
  serverDateLoading: false
}

export default function windowReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
