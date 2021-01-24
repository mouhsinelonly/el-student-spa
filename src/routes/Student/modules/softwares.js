import request from 'superagent'
import { APIBASE } from 'utils'
// ------------------------------------
// Constants
// ------------------------------------
export const GET_STUDENT_SOFTWARES_REQUEST = 'GET_STUDENT_SOFTWARES_REQUEST'
export const GET_STUDENT_SOFTWARES_SUCCESS = 'GET_STUDENT_SOFTWARES_SUCCESS'

// ------------------------------------
// Actions
// ------------------------------------
//
export function getSoftwaresSuccess (data) {
  return {
    type: GET_STUDENT_SOFTWARES_SUCCESS,
    payload: {
      data: data
    }
  }
}
export function getSoftwaresRequest () {
  return {
    type: GET_STUDENT_SOFTWARES_REQUEST
  }
}

export function getSoftwares () {
  return function (dispatch, getState) {
    const state = getState()
    const token = state.auth.token
    dispatch(getSoftwaresRequest())
    let lastUpdated = state.softwares.lastUpdated
    if (lastUpdated !== null) {
      const now = new Date()
      const dif = lastUpdated - now.getTime()
      const secondsFrom = dif / 1000
      const secondsBetween = Math.abs(secondsFrom)
      if (secondsBetween <= (60 * 60)) {
        dispatch(getSoftwaresSuccess(state.softwares.data))
        return {}
      }
    }

    return request.get(APIBASE + '/api/supportprograms/all')
       .set('x-access-token', token)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        if (!err && res.ok) {
          dispatch(getSoftwaresSuccess(res.body))
        } else {

        }
      })
  }
}

export const actions = {
  getSoftwares
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_STUDENT_SOFTWARES_REQUEST]: (state, action) => Object.assign({}, state, {
    loading: true
  }),
  [GET_STUDENT_SOFTWARES_SUCCESS]: (state, action) => {
    return Object.assign({}, state, {
      data: action.payload.data,
      loading: false,
      lastUpdated: new Date().getTime()
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  data: [],
  loading: false,
  lastUpdated: null
}

export default function softwaresReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
