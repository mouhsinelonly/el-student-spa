import request from 'superagent'
import {networkError} from 'modules/network'
import laroute from 'utils/laroute.js'

// ------------------------------------
// Constants
// ------------------------------------
export const SEND_CONTACT_MESSAGE = 'SEND_CONTACT_MESSAGE'
export const SEND_CONTACT_MESSAGE_LOADING = 'SEND_CONTACT_MESSAGE_LOADING'
export const SHOW_CONTACT_MESSAGE_LOADING = 'SHOW_CONTACT_MESSAGE_LOADING'
export const SEND_CONTACT_MESSAGE_SUCCESS = 'SEND_CONTACT_MESSAGE_SUCCESS'

// ------------------------------------
// Actions
// ------------------------------------
//
export function postContactMessageSuccess (response) {
  return {
    type: SEND_CONTACT_MESSAGE_SUCCESS,
    payload: {
      error: response.error
    }
  }
}

export function showContactMessage () {
  return {
    type: SHOW_CONTACT_MESSAGE_LOADING
  }
}

export function postContactMessageLoading () {
  return {
    type: SEND_CONTACT_MESSAGE_LOADING
  }
}

export function postContactMessage (values = {}) {
  return function (dispatch, getState) {
    dispatch(postContactMessageLoading())
    return request.post(laroute.route('api.v1.contact.store'))
          .set('Accept', 'application/json')
          .send(JSON.stringify(values))
          .set('Content-Type', 'application/json')
          .then(response => {
            dispatch(postContactMessageSuccess(response))
          })
          .catch(error => {
            if (error) {
              dispatch(networkError('لم يتم ارسال الرسالة ، المرجو التأكد من وجود اتصال بالانترنت'))
            }
          })
  }
}

export const actions = {
  postContactMessage,
  showContactMessage
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SEND_CONTACT_MESSAGE]: (state, action) => Object.assign({}, state, {
    error: false,
    sent: false,
    loading: true
  }),
  [SEND_CONTACT_MESSAGE_SUCCESS]: (state, action) => {
    return Object.assign({}, state, {
      sent: true,
      error: action.payload.error,
      loading: false
    })
  },
  [SEND_CONTACT_MESSAGE_LOADING]: (state, action) => {
    return Object.assign({}, state, {
      loading: true
    })
  },
  [SHOW_CONTACT_MESSAGE_LOADING]: (state, action) => {
    return Object.assign({}, state, {
      sent: false,
      error: false,
      loading: false
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  sent: false,
  error: false,
  loading: false
}

export default function blogPostReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
