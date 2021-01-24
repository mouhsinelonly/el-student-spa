// @flow
import request from 'superagent'
import { APIBASE } from 'utils'
import { browserHistory } from 'react-router'
// ------------------------------------
// Constants
// ------------------------------------
export const GET_VLOGS_REQUEST = 'vlogs/GET_VLOGS_REQUEST'
export const GET_VLOGS_SUCCESS = 'vlogs/GET_VLOGS_SUCCESS'

export const STORE_VLOG_REQUEST = 'vlogs/STORE_VLOG_REQUEST'
export const STORE_VLOG_SUCCESS = 'vlogs/STORE_VLOG_SUCCESS'

export const SET_FIRST_TIME_VIDEO = 'vlogs/SET_FIRST_TIME_VIDEO'

// ------------------------------------
// Actions
// ------------------------------------
//
export function getVlogsSuccess (active: Object): Object {
  return {
    type: GET_VLOGS_SUCCESS,
    payload: active
  }
}
export function getVlogsRequest (): Object {
  return {
    type: GET_VLOGS_REQUEST
  }
}

export function getVlogs (): Object {
  return function (dispatch: Function, getState: Function): Object {
    const state = getState()
    const token = state.auth.token
    dispatch(getVlogsRequest())
    let lastUpdated = state.vlogs.lastUpdated
    if (lastUpdated !== null) {
      const now = new Date()
      const dif = lastUpdated - now.getTime()
      const secondsFrom = dif / 1000
      const secondsBetween = Math.abs(secondsFrom)
      if (secondsBetween <= (60 * 60)) {
        dispatch(getVlogsSuccess(state.vlogs.active))
        return {}
      }
    }

    return request.get(`${APIBASE}/api/vlogs/active`)
       .set('Authorization', 'Bearer ' + token)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end((err: Object, res: Object) => {
        if (!err && res.ok) {
          dispatch(getVlogsSuccess(res.body))
        } else {

        }
      })
  }
}

export function storeVlogSuccess (vlog: Object): Object {
  return {
    type: STORE_VLOG_SUCCESS,
    payload: vlog
  }
}
export function storeVlogRequest (): Object {
  return {
    type: STORE_VLOG_REQUEST
  }
}

export function storeVlog (values: Object): Object {
  return function (dispatch: Function, getState: Function): Object {
    const state = getState()
    const token = state.auth.token
    dispatch(storeVlogRequest())
    return request.post(`${APIBASE}/api/vlogs/store`)
      .set('x-access-token', token)
      .send(values)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end((err: Object, res: Object) => {
        if (!err && res.ok) {
          if (state.vlogs.active.vlog === null) {
            dispatch({ type: SET_FIRST_TIME_VIDEO })
          }
          dispatch(storeVlogSuccess(res.body))
          if (typeof values.link !== 'undefined') {
            browserHistory.push('/student/vlog/edit')
          }
        } else {

        }
      })
  }
}

export const actions = {
  getVlogs
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_VLOGS_REQUEST]: (state: Object, action: Object): Object => Object.assign({}, state, {
    loading: true
  }),
  [STORE_VLOG_REQUEST]: (state: Object, action: Object): Object => Object.assign({}, state, {
    inserting: true
  }),
  [STORE_VLOG_SUCCESS]: (state: Object, action: Object): Object => ({ ...state,
    inserting: false,
    active: { ...state.active,
      vlog: action.payload,
      total: (state.active.vlog === null) ? state.active.total + 1 : state.active.total
    }
  }),
  [SET_FIRST_TIME_VIDEO]: (state: Object, action: Object): Object => ({
    ...state,
    firstTime: true
  }),
  [GET_VLOGS_SUCCESS]: (state: Object, action: Object): Object => {
    return Object.assign({}, state, {
      active: action.payload,
      loading: false,
      lastUpdated: new Date().getTime()
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  active: {},
  loading: false,
  lastUpdated: null,
  inserting: false,
  firstTime: false
}

export default function vlogsReducer (state: Object = initialState, action: Object): Object {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
