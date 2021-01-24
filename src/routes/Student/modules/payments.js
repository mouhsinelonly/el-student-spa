import request from 'superagent'
import { showModal } from 'modules/modals'
import { HIDE_PAYMENT_VIEW } from 'modules/paymentview'
import { APIBASE } from 'utils'
import laroute from 'utils/laroute.js'

// ------------------------------------
// Constants
// ------------------------------------
export const START_STUDENT_PAYMENT = 'START_STUDENT_PAYMENT'
export const GET_ACTIVE_PAYMENT = 'GET_ACTIVE_PAYMENT'
export const GET_ACTIVE_PAYMENT_LOADING = 'GET_ACTIVE_PAYMENT_LOADING'
export const GET_ACTIVE_PAYMENT_SUCCESS = 'GET_ACTIVE_PAYMENT_SUCCESS'

export const GET_INVOICES_REQUEST = 'GET_INVOICES_REQUEST'
export const GET_INVOICES_SUCCESS = 'GET_INVOICES_SUCCESS'

// ------------------------------------
// Actions
// ------------------------------------
//
export function startStudentPayment () {
  return {
    type: START_STUDENT_PAYMENT
  }
}

export function showPaymentModal (data = {}) {
  return function (dispatch, getState) {
    dispatch(showModal('paymentmodal', data, data.closable))
  }
}

// get active payment
export function getInvoices () {
  return function (dispatch, getState) {
    dispatch(getInvoicesRequest())
    const state = getState()
    const token = state.auth.token
    return request.get(APIBASE + '/api/financials/invoices/all')
      .set('x-access-token', token)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .then((res, err) => {
        if (!err && res.ok) {
          if (res.body !== false) {
            dispatch(getInvoicesSuccess(res.body))
          }
        }
      })
  }
}

export function getInvoicesSuccess (invoices = []) {
  return {
    type: GET_INVOICES_SUCCESS,
    payload: invoices
  }
}
export function getInvoicesRequest () {
  return {
    type: GET_INVOICES_REQUEST
  }
}
// get active payment
export function getActivePayment () {
  return function (dispatch, getState) {
    const state = getState()
    const token = state.auth.token
    dispatch(getActivePaymentLoading())
    return request.get(laroute.route('api.v1.student.payments.active'))
      .set('Authorization', 'Bearer ' + token)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .then((res, err) => {
        if (!err && res.ok) {
          if (res.body !== false) {
            dispatch(getActivePaymentSuccess(res.body))
            dispatch(showPaymentModal(res.body))
          }
        }
      })
  }
}

export function getActivePaymentSuccess (data) {
  return {
    type: GET_ACTIVE_PAYMENT_SUCCESS,
    payload: data
  }
}

export function getActivePaymentLoading () {
  return {
    type: GET_ACTIVE_PAYMENT_LOADING
  }
}

export const actions = {
  getActivePayment,
  startStudentPayment
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_ACTIVE_PAYMENT]: (state, action) => Object.assign({}, state, {
    activepayment: [],
    activepaymentloading: true
  }),
  [GET_ACTIVE_PAYMENT_SUCCESS]: (state, action) => {
    return Object.assign({}, state, {
      activepayment: action.payload,
      activepaymentloading: false
    })
  },
  [GET_ACTIVE_PAYMENT_LOADING]: (state, action) => {
    return Object.assign({}, state, {
            // 'data': action.payload.data,
      activepaymentloading: true
    })
  },
  [START_STUDENT_PAYMENT]: (state, action) => {
    return Object.assign({}, state, {
            // 'data': action.payload.data,
      waiting: true
    })
  },
  [GET_INVOICES_REQUEST]: (state, action) => {
    return Object.assign({}, state, {
      invoicesloading: true
    })
  },
  [GET_INVOICES_SUCCESS]: (state, action) => {
    return Object.assign({}, state, {
      invoicesloading: false,
      invoices: action.payload
    })
  },
  [HIDE_PAYMENT_VIEW]: (state, action) => {
    return Object.assign({}, state, {
      waiting: false
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  activepayment: {},
  waiting: false,
  activepaymentloading: false,
  invoices: [],
  invoicesloading: false
}

export default function paymentsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
