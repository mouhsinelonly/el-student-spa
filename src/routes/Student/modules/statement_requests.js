// @flow
import request from 'superagent'
import { API_BASE } from 'utils'
// ------------------------------------
// Constants
// ------------------------------------
export const GET_ALL_REQUEST = 'statement_requests.GET_ALL_REQUEST'
export const GET_ALL_SUCCESS = 'statement_requests.GET_ALL_SUCCESS'

export const STORE_REQUEST = 'statement_requests.STORE_REQUEST'
export const STORE_SUCCESS = 'statement_requests.STORE_SUCCESS'
//
// ------------------------------------
// Actions
// ------------------------------------
//
function getStatementsSuccess (data: Object): Object {
  return {
    type: GET_ALL_SUCCESS,
    payload: {
      data: data
    }
  }
}

function getStatementsRequest (): Object {
  return {
    type: GET_ALL_REQUEST
  }
}

function getStatements (): Object {
  return function (dispatch: Function, getState: Function): Object {
    const state = getState()
    const token = state.auth.token
    dispatch(getStatementsRequest())

    return request.get(`${API_BASE}`)
      .set('x-access-token', token)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end((err: Object, res: Object) => {
        if (!err && res.ok) {
          dispatch(getStatementsSuccess(res.body))
        } else {

        }
      })
  }
}

export const actions = {
  getStatements
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_ALL_REQUEST]: (state: Object, action: Object): Object =>
  Object.assign({}, state, {
    loading: true
  }),
  [GET_ALL_SUCCESS]: (state: Object, action: Object): Object => {
    return Object.assign({}, state, {
      requests: action.payload.data,
      loading: false
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  requests: [],
  loading: false
}

export default function documentsReducer (state: Object = initialState, action: Object): Object {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
