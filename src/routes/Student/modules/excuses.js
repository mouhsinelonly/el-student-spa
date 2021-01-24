// @flow
import request from 'superagent'
import { APIBASE } from 'utils'
// ------------------------------------
// Constants
// ------------------------------------
export const GET_EXCUSE_REASONS_REQUEST = 'GET_EXCUSE_REASONS_REQUEST'
export const GET_EXCUSE_REASONS_SUCCESS = 'GET_EXCUSE_REASONS_SUCCESS'

// ------------------------------------
// Actions
// ------------------------------------
//
export function getReasonsSuccess (reasons: Array<Object>): Object {
  return {
    type: GET_EXCUSE_REASONS_SUCCESS,
    payload: {
      reasons: reasons
    }
  }
}
export function getReasonsRequest (): Object {
  return {
    type: GET_EXCUSE_REASONS_REQUEST
  }
}

export function getReasons (): Object {
  return function (dispatch: Function, getState: Function): Object {
    const state = getState()
    const token = state.auth.token
    dispatch(getReasonsRequest())
    let lastUpdated = state.excuses.lastUpdated
    if (lastUpdated !== null) {
      const now = new Date()
      const dif = lastUpdated - now.getTime()
      const secondsFrom = dif / 1000
      const secondsBetween = Math.abs(secondsFrom)
      if (secondsBetween <= (60 * 60)) {
        dispatch(getReasonsSuccess(state.excuses.reasons))
        return {}
      }
    }

    return request.get(APIBASE + '/api/excuses/reasons')
       .set('x-access-token', token)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end((err: Object, res: Object) => {
        if (!err && res.ok) {
          dispatch(getReasonsSuccess(res.body))
        }
      })
  }
}

export const actions = {
  getReasons
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_EXCUSE_REASONS_REQUEST]: (state: Object, action: Object): Object => Object.assign({}, state, {
    loading: true
  }),
  [GET_EXCUSE_REASONS_SUCCESS]: (state: Object, action: Object): Object => {
    return Object.assign({}, state, {
      reasons: action.payload.reasons,
      loading: false,
      lastUpdated: new Date().getTime()
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  reasons: [],
  loading: false,
  lastUpdated: null
}

export default function reasonsReducer (state: Object = initialState, action: Object): Object {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
