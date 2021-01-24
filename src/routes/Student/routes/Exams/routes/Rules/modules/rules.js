import request from 'superagent'
import {APIBASE} from 'utils'
// ------------------------------------
// Constants
// ------------------------------------
export const GET_EXAMS_RULES_REQUEST = 'GET_EXAMS_RULES_REQUEST'
export const GET_EXAMS_RULES_SUCCESS = 'GET_EXAMS_RULES_SUCCESS'

// ------------------------------------
// Actions
// ------------------------------------
//
export function getExamsRulesSuccess (data) {
  return {
    type: GET_EXAMS_RULES_SUCCESS,
    payload: {
      data: data
    }
  }
}
export function getExamsRulesRequest () {
  return {
    type: GET_EXAMS_RULES_REQUEST
  }
}

export function getExamsRules () {
  return function (dispatch, getState) {
    const state = getState()
    const token = state.auth.token
    dispatch(getExamsRulesRequest())
    let lastUpdated = state.exams_rules.lastUpdated
    if (lastUpdated !== null) {
      const now = new Date()
      const dif = lastUpdated - now.getTime()
      const secondsFrom = dif / 1000
      const secondsBetween = Math.abs(secondsFrom)
      if (secondsBetween <= (60 * 60)) {
        dispatch(getExamsRulesSuccess(state.exams_rules.data))
        return {}
      }
    }

    return request.get(APIBASE + '/api/exams/rules')
       .set('Authorization', 'Bearer ' + token)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        if (!err && res.ok) {
          dispatch(getExamsRulesSuccess(res.body))
        } else {

        }
      })
  }
}

export const actions = {
  getExamsRules
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_EXAMS_RULES_REQUEST]: (state, action) => Object.assign({}, state, {
    loading: true
  }),
  [GET_EXAMS_RULES_SUCCESS]: (state, action) => {
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
  data: {},
  loading: false,
  lastUpdated: null
}

export default function examsRulesReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
