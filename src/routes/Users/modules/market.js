// @flow
import { APIBASE } from 'utils'
import request from 'superagent'
import update from 'immutability-helper'

// ------------------------------------
// Constants
// ------------------------------------
export const GET_STUDENT_MARKET_REQUEST = 'userstudents.GET_STUDENT_MARKET_REQUEST'
export const GET_STUDENT_MARKET_SUCCESS = 'userstudents.GET_STUDENT_MARKET_SUCCESS'
export const GET_STUDENT_MARKET_FAILURE = 'userstudents.GET_STUDENT_MARKET_FAILURE'

export const GET_STUDENT_MARKET_ORDERS_REQUEST = 'userstudents.GET_STUDENT_MARKET_ORDERS_REQUEST'
export const GET_STUDENT_MARKET_ORDERS_SUCCESS = 'userstudents.GET_STUDENT_MARKET_ORDERS_SUCCESS'
export const GET_STUDENT_MARKET_ORDERS_FAILURE = 'userstudents.GET_STUDENT_MARKET_ORDERS_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------
//

export function getOrders (id: number): Function {
  return (dispatch: Function, getState: Function): Function => {
    const state = getState()
    const { orders } = state.user_market
    if (orders[`student-${id}`]) {
      dispatch(getOrdersSuccess(orders[`student-${id}`], id))
      return () => {}
    }
    const { usertoken: token } = state.auth

    dispatch(getOrdersRequest())
    return request.get(`${APIBASE}/api/admin/market/orders/${id}`)
         .set('Accept', 'application/json')
         .set({ 'x-access-token': token })
         .set('Content-Type', 'application/json')
         .then((response: Object) => {
           try {
             dispatch(getOrdersSuccess(response.body, id))
           } catch (e) {
           }
         })
  }
}

export function getOrdersRequest (): Object {
  return {
    type: GET_STUDENT_MARKET_ORDERS_REQUEST
  }
}

export function getOrdersSuccess (data: Object = {}, id: number): Object {
  return {
    type: GET_STUDENT_MARKET_ORDERS_SUCCESS,
    payload: {
      data,
      id
    }
  }
}
export function getCart (id: number): Function {
  return (dispatch: Function, getState: Function): Function => {
    const state = getState()
    const { cart } = state.user_market
    if (cart[`student-${id}`]) {
      dispatch(getCartSuccess(cart[`student-${id}`], id))
      return () => {}
    }
    const { usertoken: token } = state.auth

    dispatch(getCartRequest())
    return request.get(`${APIBASE}/api/admin/market/cart/${id}`)
         .set('Accept', 'application/json')
         .set({ 'x-access-token': token })
         .set('Content-Type', 'application/json')
         .then((response: Object) => {
           try {
             dispatch(getCartSuccess(response.body, id))
           } catch (e) {
           }
         })
  }
}

export function getCartRequest (): Object {
  return {
    type: GET_STUDENT_MARKET_REQUEST
  }
}

export function getCartSuccess (data: Object = {}, id: number): Object {
  return {
    type: GET_STUDENT_MARKET_SUCCESS,
    payload: {
      data,
      id
    }
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_STUDENT_MARKET_REQUEST]: (state: Object, action: Object): Object => {
    return Object.assign({}, state, {
      loading: true,
      activeStudentCart: []
    })
  },
  [GET_STUDENT_MARKET_SUCCESS]: (state: Object, action: Object): Object => {
    return Object.assign({}, state, {
      cart: update(state.cart, {
        [`student-${action.payload.id}`]: { $set: action.payload.data }
      }),
      activeStudentCart: action.payload.data,
      loading: false
    })
  },
  [GET_STUDENT_MARKET_ORDERS_REQUEST]: (state: Object, action: Object): Object => {
    return Object.assign({}, state, {
      loading: true,
      activeStudentOrders: []
    })
  },
  [GET_STUDENT_MARKET_ORDERS_SUCCESS]: (state: Object, action: Object): Object => {
    return Object.assign({}, state, {
      orders: update(state.orders, {
        [`student-${action.payload.id}`]: { $set: action.payload.data }
      }),
      activeStudentOrders: action.payload.data,
      loading: false
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  cart: {},
  orders: {},
  activeStudentCart: [],
  activeStudentOrders: [],
  loading: false,
}

export default function marketReducer (state: Object = initialState, action: Object): Object {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
