// ------------------------------------
// Constants
// ------------------------------------
export const SERVER_TIME_INCREMENT_TIMESTAMP = 'SERVER_TIME_INCREMENT_TIMESTAMP'
export const SERVER_TIME_SET_CLOCK = 'SERVER_TIME_SET_CLOCK'
export const SERVER_TIME_START_CLOCK = 'SERVER_TIME_START_CLOCK'

let _interval = null
// ------------------------------------
// Actions
// ------------------------------------
//
export function startSyncedClock (timestamp = 0) {
  return function (dispatch) {
    dispatch(setServerTime(timestamp))
    return new Promise((resolve) => {
      if (!_interval) {
        _interval = setInterval(() => {
          dispatch(increment())
          resolve()
        }, 1000)
      }
    })
  }
}

export function setServerTime (timestamp = 0) {
  return {
    type: SERVER_TIME_SET_CLOCK,
    payload: timestamp
  }
}

export function increment () {
  return {
    type: SERVER_TIME_INCREMENT_TIMESTAMP
  }
}

export const actions = {
  startSyncedClock
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SERVER_TIME_SET_CLOCK]: (state, action) => action.payload,
  [SERVER_TIME_INCREMENT_TIMESTAMP]: (state, action) => state + 1
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = 0

export default function serverTimeReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
