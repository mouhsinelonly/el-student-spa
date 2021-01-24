import { networkError } from 'modules/network'
import request from 'superagent'
import laroute from 'utils/laroute.js'
import { showPaymentView, HIDE_PAYMENT_VIEW } from 'modules/paymentview'
// ------------------------------------
// Constants
// ------------------------------------
export const GET_REGISTRAR_PAYMENT_DAT = 'GET_REGISTRAR_PAYMENT_DAT'

export const START_REGISTRAR_PAYMENT = 'START_REGISTRAR_PAYMENT'
export const STOP_REGISTRAR_PAYMENT = 'STOP_REGISTRAR_PAYMENT'

export const GET_REGISTRAR_PAYMENT_DATA_LOADING = 'GET_REGISTRAR_PAYMENT_DATA_LOADING'
export const GET_REGISTRAR_PAYMENT_DATA_SUCCESS = 'GET_REGISTRAR_PAYMENT_DATA_SUCCESS'
export const GET_REGISTRAR_PAYMENT_DATA_FAILURE = 'GET_REGISTRAR_PAYMENT_DATA_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------
//
//

// get data //

export function startRegistrarPayment () {
  return {
    type: START_REGISTRAR_PAYMENT
  }
}
export function stopRegistrarPayment () {
  return {
    type: STOP_REGISTRAR_PAYMENT
  }
}

export function getRegistrarPaymentSuccess (data, url) {
  return {
    type: GET_REGISTRAR_PAYMENT_DATA_SUCCESS,
    payload: {
      data,
      url
    }
  }
}
export function getRegistrarPaymentFailure () {
  return {
    type: GET_REGISTRAR_PAYMENT_DATA_FAILURE
  }
}
export function getRegistrarPaymentLoading () {
  return {
    type: GET_REGISTRAR_PAYMENT_DATA_LOADING
  }
}

export function getRegistrarPayment () {
  return function (dispatch, getState) {
    let state = getState()
    let { registrartoken } = state.auth
    dispatch(getRegistrarPaymentLoading())
    return request
      .get(laroute.route('api.v1.registrar.payment_data'))
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + registrartoken)
      .end((err, res) => {
        if (!err && res.ok) {
          dispatch(getRegistrarPaymentSuccess(res.body, res.body.omanneturl))
          // dispatch(showPaymentView(res.body.fields, res.body.omanneturl))
        } else {
          dispatch(getRegistrarPaymentFailure())
          dispatch(networkError('المرجو تسجيل الدخول لحسابك'))
        }
      })
  }
}

export const actions = {
  getRegistrarPayment,
  startRegistrarPayment
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_REGISTRAR_PAYMENT_DAT]: (state, action) =>
    Object.assign({}, state, {
      data: {},
      loading: true,
      url: ''
    }),
  [GET_REGISTRAR_PAYMENT_DATA_SUCCESS]: (state, action) => {
    return Object.assign({}, state, {
      data: action.payload.data,
      url: action.payload.url,
      loading: false
    })
  },
  [GET_REGISTRAR_PAYMENT_DATA_LOADING]: (state, action) => {
    return Object.assign({}, state, {
      data: {},
      url: '',
      loading: true
    })
  },
  [GET_REGISTRAR_PAYMENT_DATA_FAILURE]: (state, action) =>
    Object.assign({}, state, {
      data: {},
      url: '',
      loading: false
    }),
  [START_REGISTRAR_PAYMENT]: (state, action) =>
    Object.assign({}, state, {
      waiting: false
    }),
  [STOP_REGISTRAR_PAYMENT]: (state, action) => Object.assign({}, state, { waiting: false }),
  [HIDE_PAYMENT_VIEW]: (state, action) => Object.assign({}, state, { waiting: false })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  data: {},
  url: '',
  loading: false,
  payed: false,
  waiting: false
}

export default function paymentReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
