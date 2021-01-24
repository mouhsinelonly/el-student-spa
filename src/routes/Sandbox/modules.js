import moment from 'moment'
const swSupported = !!('serviceWorker' in navigator)
const isSwRegistred = swSupported && !!navigator.serviceWorker.controller
let incrementInterval = null
export const RECEIVE_SERVER_TIME = 'sandbox.SANDBOX_RECEIVE_SERVER_TIME'
const SERVICE_WORKER_INCREMENT_SERVER_TIME = 'serviceworker.INCREMENT_SERVER_TIME'

export function incrementServerTime (time = 0) {
  return dispatch => {
    if (swSupported && isSwRegistred) {
      const messageChannel = new MessageChannel()
      navigator.serviceWorker.onmessage = function ({ data: tag }) {
        dispatch(receiveServerTimeIncrementFromServer('worker'))
      }
      navigator.serviceWorker.controller.postMessage(
        {
          tag: SERVICE_WORKER_INCREMENT_SERVER_TIME
        },
        [messageChannel.port2]
      )
    } else {
      if (!incrementInterval) {
        incrementInterval = setInterval(() => {
          dispatch(receiveServerTimeIncrementFromServer('main'))
        }, 1000)
      }
    }
  }
}

function receiveServerTimeIncrementFromServer (thread = 'main') {
  return dispatch => {
    dispatch({
      type: RECEIVE_SERVER_TIME
    })
  }
}

export const actions = {
  incrementServerTime
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [RECEIVE_SERVER_TIME]: (state, action) => {
    return Object.assign({}, state, { servertime: moment(state.servertime).add(1, 'second') })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  servertime: moment().format('Y-m-d H:i:s')
}

export default function sandboxReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
