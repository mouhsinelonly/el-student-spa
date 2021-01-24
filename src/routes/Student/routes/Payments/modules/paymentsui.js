import update from 'immutability-helper'
// ------------------------------------
// Constants
// ------------------------------------
export const HIDE_PAYMENTS_DETAILS = 'HIDE_PAYMENTS_DETAILS'
export const SHOW_PAYMENTS_DETAILS = 'SHOW_PAYMENTS_DETAILS'

// ------------------------------------
// Actions
// ------------------------------------
//

// SHOW HIDE STUDENT NAVBAR
export function showPaymentDetails (id) {
  return {
    type: SHOW_PAYMENTS_DETAILS,
    payload: id
  }
}

export function hidePaymentsDetails (id) {
  return {
    type: HIDE_PAYMENTS_DETAILS,
    payload: id
  }
}

export const actions = {
  showPaymentDetails,
  hidePaymentsDetails
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SHOW_PAYMENTS_DETAILS]: (state, action) =>
    Object.assign({}, state, {
      visibleinvoices: update(state.visibleinvoices, { $push: [action.payload] })
    }),
  [HIDE_PAYMENTS_DETAILS]: (state, action) =>
    Object.assign({}, state, {
      visibleinvoices: update(state.visibleinvoices, {
        $splice: [[state.visibleinvoices.findIndex(id => id === action.payload), 1]]
      })
    })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  visibleinvoices: []
}

export default function paymentsUiReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
