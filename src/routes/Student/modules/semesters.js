import request from 'superagent'
import { APIBASE } from 'utils'
// ------------------------------------
// Constants
// ------------------------------------
export const GET_SEMESTERS = 'GET_SEMESTERS'
export const GET_SEMESTERS_LOADING = 'GET_SEMESTERS_LOADING'
export const GET_SEMESTERS_SUCCESS = 'GET_SEMESTERS_SUCCESS'

// ------------------------------------
// Actions
// ------------------------------------
//
export function getSemestersSuccess (data) {
  return {
    type: GET_SEMESTERS_SUCCESS,
    payload: {
      data: data
    }
  }
}
function getSemestersLoading () {
  return {
    type: GET_SEMESTERS_LOADING
  }
}

export function getSemesters () {
  return function (dispatch, getState) {
    const state = getState()
    const token = state.auth.token
    dispatch(getSemestersLoading())
    let lastUpdated = state.semesters.lastUpdated
    if (lastUpdated !== null) {
      const now = new Date()
      const dif = lastUpdated - now.getTime()
      const secondsFrom = dif / 1000
      const secondsBetween = Math.abs(secondsFrom)
      if (secondsBetween <= (60 * 60)) {
        dispatch(getSemestersSuccess(state.semesters.data))
        return {}
      }
    }

    return request.get(APIBASE + '/api/semesters/all')
       .set('Authorization', 'Bearer ' + token)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        if (!err && res.ok) {
          dispatch(getSemestersSuccess(res.body))
        } else {

        }
      })
  }
}

export const actions = {
  getSemesters,
  getSemestersSuccess
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_SEMESTERS]: (state, action) => Object.assign({}, state, {
    data: [],
    loading: true
  }),
  [GET_SEMESTERS_SUCCESS]: (state, action) => {
    return Object.assign({}, state, {
      data: action.payload.data,
      loading: false,
      lastUpdated: new Date().getTime()
    })
  },
  [GET_SEMESTERS_LOADING]: (state, action) => {
    return Object.assign({}, state, {
            // 'data': action.payload.data,
      loading: true
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

export default function semestersReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
