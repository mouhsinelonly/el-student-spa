import { LOCATION_CHANGE } from 'store/location'
// ------------------------------------
// Constants
// ------------------------------------
export const SHOW_PAYMENT_VIEW = 'SHOW_PAYMENT_VIEW'
export const HIDE_PAYMENT_VIEW = 'HIDE_PAYMENT_VIEW'
export const PAYMENT_VIEW_PAYMENT_SUBMITTED = 'PAYMENT_VIEW_PAYMENT_SUBMITTED'

// ------------------------------------
// Actions
// ------------------------------------
export function hidePaymentView () {
  return {
    type: HIDE_PAYMENT_VIEW
  }
}

// export function generatePaymentClicked () {
//   return {
//     type: PAYMENT_VIEW_PAYMENT_SUBMITTED
//   }
// }
export function onSubmit () {
  return {
    type: PAYMENT_VIEW_PAYMENT_SUBMITTED
  }
}

export function showPaymentView (fields = {}, link = '') {
  return {
    type: SHOW_PAYMENT_VIEW,
    payload: {
      fields,
      link
    }
  }
}

export const actions = {
  hidePaymentView,
  showPaymentView,
  onSubmit
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SHOW_PAYMENT_VIEW]: (state, action) => Object.assign({}, state, {
    fields: action.payload.fields,
    link: action.payload.link
  }),
  [HIDE_PAYMENT_VIEW]: (state, action) => Object.assign({}, state, {
    fields: {},
    link: ''
  }),
  [LOCATION_CHANGE]: (state, action) => Object.assign({}, state, {
    fields: {},
    link: ''
  })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  fields: {},
  link: '',
  paymentClicked: false
}

export default function paymentViewReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
