import moment from 'moment'
// ------------------------------------
// Constants
// ------------------------------------
export const SERVER_DATE_INCREMENT_TIMESTAMP = 'SERVER_DATE_INCREMENT_TIMESTAMP'
export const SERVER_DATE_SET_CLOCK = 'SERVER_DATE_SET_CLOCK'
export const SERVER_DATE_START_CLOCK = 'SERVER_DATE_START_CLOCK'

let _interval = setInterval(() => {}, 1000)
// ------------------------------------
// Actions
// ------------------------------------
//
export function startSyncedDate (date = '') {
  return function (dispatch) {
    dispatch(setServerDate(date))
    return new Promise((resolve) => {
      clearInterval(_interval)
      _interval = setInterval(() => {
        dispatch(increment())
        resolve()
      }, 1000)
    })
  }
}

export function setServerDate (date = '') {
  return {
    type: SERVER_DATE_SET_CLOCK,
    payload: date
  }
}

export function increment () {
  return {
    type: SERVER_DATE_INCREMENT_TIMESTAMP
  }
}

export const actions = {
  startSyncedDate
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SERVER_DATE_SET_CLOCK]: (state, action) => action.payload,
  [SERVER_DATE_INCREMENT_TIMESTAMP]: (state, action) =>
  moment(state).add(1, 'seconds').locale('en').format('YYYY-MM-DD HH:mm:ss')
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = moment().locale('en').format('YYYY-MM-DD HH:mm:ss')

export default function serverDateReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
