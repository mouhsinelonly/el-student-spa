import request from 'superagent'
import { APIBASE } from 'utils'

// ------------------------------------
// Constants
// ------------------------------------
export const SETTINGS_REQUEST = 'studentsettings.SETTINGS_REQUEST'
export const SETTINGS_SUCCESS = 'studentsettings.SETTINGS_SUCCESS'

// ------------------------------------
// Actions
// ------------------------------------
//
//
export function getSettingsSuccess (settings) {
  return {
    type: SETTINGS_SUCCESS,
    payload: settings
  }
}

export function getSettingsRequest () {
  return {
    type: SETTINGS_REQUEST
  }
}

export function getSettings () {
  return (dispatch, getState) => {
    dispatch(getSettingsRequest())

    const state = getState()
    const token = state.auth.token

    request.get(`${APIBASE}/api/students/settings`)
    .set('x-access-token', token)
    .end((err, res) => {
      dispatch(getSettingsSuccess(res.body))
      if (err) {
        console.error(err)
      }
    })
  }
}
export const actions = {
  getSettings
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SETTINGS_SUCCESS]: (state, action) => Object.assign({}, state, { data: action.payload }),
  [SETTINGS_REQUEST]: (state, action) => Object.assign({}, state, { loading: true, data: [] })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  loading: false,
  data: []
}

export default function studentSettingsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
