// @flow
import request from 'superagent'
import { showModal } from 'modules/modals'

export const GET_PAYMENT_SUCCESS = 'marketUsers.GET_PAYMENT_SUCCESS'
export const GET_PAYMENT_REQUEST = 'marketUsers.GET_PAYMENT_REQUEST'

// get invoice

function getPaymentSuccess (payload: Object): Function {
  return {
    type: GET_PAYMENT_SUCCESS,
    payload: payload
  }
}
function getPaymentLoading (): Function {
  return {
    type: GET_PAYMENT_REQUEST
  }
}

export function getPayment (): Function {
  return function (dispatch: Function, getState: Function): Function {
    dispatch(getPaymentLoading())
    const { auth: { token } } = getState()
    return request.get('https://admin.el-css.edu.om/api/v1/marketuser/payment')
.set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end((err: Object, res: Object) => {
        if (!err && res.ok && res.body && typeof res.body.fields !== 'undefined') {
          const data = { ...res.body, subjects: [{ name: 'test', id: 1, fee: 100 }], credit: 100, isBooks: true, isMarketUser: true }
          dispatch(showModal('paymentmodal', data, true))
          dispatch(getPaymentSuccess(data))
        }
      })
  }
}

const ACTION_HANDLERS = {
  [GET_PAYMENT_SUCCESS]: (state: Object, action: Object): Object => ({
    ...state,
    activepayment: action.payload,
    waiting: false,
    activepaymentloading: false
  }),
  [GET_PAYMENT_REQUEST]: (state: Object, action: Object): Object => ({
    ...state,
    activepaymentloading: true,
    waiting: true
  })
}

const initialState = {
  activepaymentloading: false,
  activepayment: {},
  waiting: false,
}

export default function marketReducer (state: Object = initialState, action: Object): Object {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
