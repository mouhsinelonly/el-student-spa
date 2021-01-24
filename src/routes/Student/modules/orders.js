// @flow
import request from 'superagent'
import update from 'immutability-helper'
import { APIBASE } from 'utils'
import { showPaymentView } from 'modules/paymentview'
// import constant
import { SEND_DELAY_ORDER_SUCCESS } from '../routes/Orders/routes/Delay/modules/delay'
import { SEND_WITHDRAW_ORDER_SUCCESS } from '../routes/Orders/routes/Withdraw/modules/withdraw'
import { SEND_QURAN_RECORDING_ORDER_SUCCESS } from '../routes/Orders/routes/QuranRecording/modules/quran_recordings'
import laroute from 'utils/laroute.js'

// ------------------------------------
// Constants
// ------------------------------------
export const GET_DELAY_ORDERS_SUCCESS: string = 'GET_DELAY_ORDERS_SUCCESS'
export const GET_DELAY_ORDERS_REQUEST: string = 'GET_DELAY_ORDERS_REQUEST'
export const GET_DELAY_ORDERS_FAILURE: string = 'GET_DELAY_ORDERS_FAILURE'

export const GET_STATEMENT_ORDERS_SUCCESS: string = 'orders.GET_STATEMENT_ORDERS_SUCCESS'
export const GET_STATEMENT_ORDERS_REQUEST: string = 'orders.GET_STATEMENT_ORDERS_REQUEST'

export const GET_STATEMENT_PAYMENT_SUCCESS: string = 'orders.GET_STATEMENT_PAYMENT_SUCCESS'
export const GET_STATEMENT_PAYMENT_REQUEST: string = 'orders.GET_STATEMENT_PAYMENT_REQUEST'

export const GET_WITHDRAW_ORDERS_SUCCESS: string = 'GET_WITHDRAW_ORDERS_SUCCESS'
export const GET_WITHDRAW_ORDERS_REQUEST: string = 'GET_WITHDRAW_ORDERS_REQUEST'
export const GET_WITHDRAW_ORDERS_FAILURE: string = 'GET_WITHDRAW_ORDERS_FAILURE'

export const GET_QURAN_EXCUSE_ORDERS_SUCCESS: string = 'GET_QURAN_EXCUSE_ORDERS_SUCCESS'
export const GET_QURAN_EXCUSE_ORDERS_REQUEST: string = 'GET_QURAN_EXCUSE_ORDERS_REQUEST'
export const GET_QURAN_EXCUSE_ORDERS_FAILURE: string = 'GET_QURAN_EXCUSE_ORDERS_FAILURE'

export const STORE_STATEMENT_ORDER_REQUEST: string = 'orders.STORE_STATEMENT_ORDER_REQUEST'
export const STORE_STATEMENT_ORDER_SUCCESS: string = 'orders.STORE_STATEMENT_ORDER_SUCCESS'

export const GET_SESSION_EXCUSES_ORDERS_SUCCESS: string = 'GET_SESSION_EXCUSES_ORDERS_SUCCESS'
export const GET_SESSION_EXCUSES_ORDERS_REQUEST: string = 'GET_SESSION_EXCUSES_ORDERS_REQUEST'
export const GET_SESSION_EXCUSES_ORDERS_FAILURE: string = 'GET_SESSION_EXCUSES_ORDERS_FAILURE'

export const TOGGLE_STATEMENT_NOTIFICATION: string = 'orders.TOGGLE_STATEMENT_NOTIFICATION'
// ------------------------------------
// Actions
// ------------------------------------
//

// get withdraw orders
export function getWithdrawOrders (values: Object = {}): Function {
  return function (dispatch: Function, getState: Function): Function {
    const state = getState()
    const token = state.auth.token
    dispatch(getWithdrawOrdersRequest())
    return request.get(`${APIBASE}/api/orders/withdraws/all`)
    .set('x-access-token', token)
    .send(values)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .then((res: Object) => {
      dispatch(getWithdrawOrdersSuccess(res.body))
    }).catch((err: Object) => {
      dispatch(getWithdrawOrdersFailure())
    })
  }
}

function getWithdrawOrdersRequest (): Object {
  return {
    type: GET_WITHDRAW_ORDERS_REQUEST
  }
}

export function toggleStatementNotification (visible: boolean = null): Object {
  return {
    type: TOGGLE_STATEMENT_NOTIFICATION,
    payload: visible
  }
}

function getWithdrawOrdersFailure (): Object {
  return {
    type: GET_WITHDRAW_ORDERS_FAILURE
  }
}

function getWithdrawOrdersSuccess (orders: Array<Object> = []): Object {
  return {
    type: GET_WITHDRAW_ORDERS_SUCCESS,
    payload: orders
  }
}
// get withdraw orders
export function getStatementOrders (values: Object = {}): Function {
  return function (dispatch: Function, getState: Function): Function {
    const state = getState()
    const token = state.auth.token
    dispatch(getStatementOrdersRequest())
    return request.get(`${APIBASE}/api/orders/statements/all`)
    .set('x-access-token', token)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .then((res: Object) => {
      dispatch(getStatementOrdersSuccess(res.body))
    })
  }
}

function getStatementOrdersRequest (): Object {
  return {
    type: GET_STATEMENT_ORDERS_REQUEST
  }
}

function getStatementOrdersSuccess (orders: Array<Object> = []): Object {
  return {
    type: GET_STATEMENT_ORDERS_SUCCESS,
    payload: orders
  }
}
// get withdraw orders
export function getStatementPayment (type: string = 'grades'): Function {
  return function (dispatch: Function, getState: Function): Function {
    const state = getState()
    const token = state.auth.token
    dispatch(getStatementPaymentRequest())
    return request.get(laroute.route('api.v1.student.payments.statement'))
    .query({ type })
    .set('Authorization', `Bearer ${token}`)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .then((res: Object) => {
      dispatch(getStatementPaymentSuccess(res.body))
      dispatch(showPaymentView(res.body.fields, res.body.omanneturl))
    })
  }
}

function getStatementPaymentRequest (): Object {
  return {
    type: GET_STATEMENT_PAYMENT_REQUEST
  }
}

function getStatementPaymentSuccess (data: Object = {}): Object {
  return {
    type: GET_STATEMENT_PAYMENT_SUCCESS,
    payload: data
  }
}
// get delay orders
export function getDelayOrders (values: Object = {}): Function {
  return function (dispatch: Function, getState: Function): Function {
    const state = getState()
    const token = state.auth.token
    dispatch(getDelayOrdersRequest())
    return request.get(`${APIBASE}/api/orders/delays/all`)
    .set('Authorization', 'Bearer ' + token)
    .send(values)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .then((res: Object) => {
      dispatch(getDelayOrdersSuccess(res.body))
    }).catch((err: Object) => {
      if (err) {

      } else {
        dispatch(getDelayOrdersFailure())
      }
    })
  }
}

function getDelayOrdersRequest (): Object {
  return {
    type: GET_DELAY_ORDERS_REQUEST
  }
}
function getDelayOrdersFailure (): Object {
  return {
    type: GET_DELAY_ORDERS_FAILURE
  }
}
function getDelayOrdersSuccess (orders: Array<Object> = []): Object {
  return {
    type: GET_DELAY_ORDERS_SUCCESS,
    payload: orders
  }
}
// get quran excuses orders
export function getQuranExcuseOrders (values: Array<Object> = []): Function {
  return function (dispatch: Function, getState: Function): Function {
    const state = getState()
    const token = state.auth.token
    dispatch(getQuranExcuseOrdersRequest())
    return request.get(laroute.route('api.v1.students.orders.quran_recording_excuses.index'))
    .set('Authorization', 'Bearer ' + token)
    .send(values)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .then((res: Object) => {
      dispatch(getQuranExcuseOrdersSuccess(res.body))
    }).catch((err: Object) => {
      dispatch(getQuranExcuseOrdersFailure())
    })
  }
}

function getQuranExcuseOrdersRequest (): Object {
  return {
    type: GET_QURAN_EXCUSE_ORDERS_REQUEST
  }
}

function getQuranExcuseOrdersFailure (): Object {
  return {
    type: GET_QURAN_EXCUSE_ORDERS_FAILURE
  }
}

function getQuranExcuseOrdersSuccess (orders: Array<Object> = []): Object {
  return {
    type: GET_QURAN_EXCUSE_ORDERS_SUCCESS,
    payload: orders
  }
}
// store statement
export function storeStatement (values: Array<Object> = [], files: Array<Object> = []): Function {
  return function (dispatch: Function, getState: Function): Function {
    const state = getState()
    const { token } = state.auth
    dispatch(storeStatementRequest())
    return request.post(`${APIBASE}/api/orders/statement/store`)
    .set('x-access-token', token)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .send(values)
    .then((res: Object) => {
      dispatch(getStatementOrders())
      dispatch(storeStatementSuccess(res.body))
    }).catch((err: Object) => {
      console.error('An Error happend while sending a new statement into the api ', err)
    })
  }
}

function storeStatementRequest (): Object {
  return {
    type: STORE_STATEMENT_ORDER_REQUEST
  }
}

function storeStatementSuccess (statement: Object): Object {
  return {
    type: STORE_STATEMENT_ORDER_SUCCESS,
    payload: statement
  }
}
// get session excuses orders
export function getSessionExcusesOrders (values: Object = {}): Function {
  return function (dispatch: Function, getState: Function): Function {
    const state = getState()
    const token = state.auth.token
    dispatch(getSessionExcusesOrdersRequest())
    return request.get(laroute.route('api.v1.students.orders.quran_recording_excuses.index'))
    .set('Authorization', 'Bearer ' + token)
    .send(values)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .then((res: Object) => {
      dispatch(getSessionExcusesOrdersSuccess(res.body))
    }).catch((err: Object) => {
      dispatch(getSessionExcusesOrdersFailure())
    })
  }
}
function getSessionExcusesOrdersRequest (): Object {
  return {
    type: GET_SESSION_EXCUSES_ORDERS_REQUEST
  }
}
function getSessionExcusesOrdersFailure (): Object {
  return {
    type: GET_SESSION_EXCUSES_ORDERS_FAILURE
  }
}
function getSessionExcusesOrdersSuccess (orders: Array<Object> = []): Object {
  return {
    type: GET_SESSION_EXCUSES_ORDERS_SUCCESS,
    payload: orders
  }
}

export const actions = {
  getDelayOrders,
  getSessionExcusesOrders,
  getWithdrawOrders
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_DELAY_ORDERS_REQUEST]: (state: Object, action: Object): Object => Object.assign({}, state, {
    isFetching: true
  }),
  [GET_DELAY_ORDERS_SUCCESS]: (state: Object, action: Object): Object => Object.assign({}, state, {
    isFetching: false,
    delays: action.payload
  }),
  [GET_DELAY_ORDERS_FAILURE]: (state: Object, action: Object): Object => Object.assign({}, state, {
    isFetching: false
  }),
  [TOGGLE_STATEMENT_NOTIFICATION]: (state: Object, action: Object): Object => Object.assign({}, state, {
    statemNotifEnabled: action.payload !== null ? action.payload : !state.statemNotifEnabled
  }),
  [SEND_DELAY_ORDER_SUCCESS]: (state: Object, action: Object): Object => Object.assign({}, state, {
    isFetching: false,
    delays: update(state.delays, {
      $unshift: [action.payload]
    })
  }),
  [GET_WITHDRAW_ORDERS_REQUEST]: (state: Object, action: Object): Object => Object.assign({}, state, {
    isFetching: true
  }),
  [GET_WITHDRAW_ORDERS_SUCCESS]: (state: Object, action: Object): Object => Object.assign({}, state, {
    isFetching: false,
    withdraws: action.payload
  }),
  [GET_WITHDRAW_ORDERS_FAILURE]: (state: Object, action: Object): Object => Object.assign({}, state, {
    isFetching: false
  }),
  [SEND_WITHDRAW_ORDER_SUCCESS]: (state: Object, action: Object): Object => Object.assign({}, state, {
    isFetching: false,
    withdraws: update(state.withdraws, {
      $unshift: [action.payload]
    })
  }),
  [GET_QURAN_EXCUSE_ORDERS_REQUEST]: (state: Object, action: Object): Object => Object.assign({}, state, {
    quranexcusesloading: true
  }),
  [GET_QURAN_EXCUSE_ORDERS_SUCCESS]: (state: Object, action: Object): Object => Object.assign({}, state, {
    quranexcusesloading: false,
    quranexcuses: action.payload
  }),
  [GET_QURAN_EXCUSE_ORDERS_FAILURE]: (state: Object, action: Object): Object => Object.assign({}, state, {
    quranexcusesloading: false
  }),
  [SEND_QURAN_RECORDING_ORDER_SUCCESS]: (state: Object, action: Object): Object => Object.assign({}, state, {
    quranexcusesloading: false,
    quranexcuses: update(state.orders, {
      $unshift: [action.payload]
    })
  }),
  [STORE_STATEMENT_ORDER_REQUEST]: (state: Object, action: Object): Object => Object.assign({}, state, {
    storingStatement: true
  }),
  [STORE_STATEMENT_ORDER_SUCCESS]: (state: Object, action: Object): Object => Object.assign({}, state, {
    storingStatement: false
    // ,
    // statements: update(state.statements, {
    //   $push: [action.payload]
    // })
  }),
  [GET_STATEMENT_ORDERS_REQUEST]: (state: Object, action: Object): Object => Object.assign({}, state, {
    isFetching: true,
    statements: []
  }),
  [GET_STATEMENT_ORDERS_SUCCESS]: (state: Object, action: Object): Object => Object.assign({}, state, {
    isFetching: false,
    statements: update(state.statements, {
      $set: action.payload
    })
  }),
  [GET_STATEMENT_PAYMENT_REQUEST]: (state: Object, action: Object): Object => Object.assign({}, state, {
    loadingpayment: true
  }),
  [GET_STATEMENT_PAYMENT_SUCCESS]: (state: Object, action: Object): Object => Object.assign({}, state, {
    loadingpayment: false
  })
}
// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isFetching: true,
  quranexcusesloading: false,
  delays: [],
  orders: [],
  statemNotifEnabled: false,
  loadingpayment: false,
  storingStatement: false,
  statements: [],
  quranexcuses: [],
  withdraws: []
}

export default function delaysReducer (state: Object = initialState, action: Object): Object {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
