// @flow
import request from 'superagent'
import { APIBASE } from 'utils'
import { getPayment } from 'routes/Market/modules/payments'
import { showModal } from 'modules/modals'
import { loginUserSuccess } from 'routes/Auth/modules/auth'
import { browserHistory } from 'react-router'
// ------------------------------------
// Constants
// ------------------------------------
export const GET_BOOKS_REQUEST = 'marketUsers.GET_BOOKS_REQUEST'
export const GET_BOOKS_SUCCESS = 'marketUsers.GET_BOOKS_SUCCESS'

export const POST_ORDER_SUCCESS = 'marketUsers.POST_ORDER_SUCCESS'
export const POST_ORDER_REQUEST = 'marketUsers.POST_ORDER_REQUEST'

export const ADD_TO_CART_SUCCESS = 'marketUsers.ADD_TO_CART_SUCCESS'
export const ADD_TO_CART_REQUEST = 'marketUsers.ADD_TO_CART_REQUEST'

export const REMOVE_FROM_CART_SUCCESS = 'marketUsers.REMOVE_FROM_CART_SUCCESS'
export const REMOVE_FROM_CART_REQUEST = 'marketUsers.REMOVE_FROM_CART_REQUEST'

export const GET_CITIES_SUCCESS = 'marketUsers.GET_CITIES_SUCCESS'
export const GET_CITIES_REQUEST = 'marketUsers.GET_CITIES_REQUEST'

export const GET_STATES_SUCCESS = 'marketUsers.GET_STATES_SUCCESS'
export const GET_STATES_REQUEST = 'marketUsers.GET_STATES_REQUEST'

export const GET_CART_ITEMS_SUCCESS = 'marketUsers.GET_CART_ITEMS_SUCCESS'
export const GET_CART_ITEMS_REQUEST = 'marketUsers.GET_CART_ITEMS_REQUEST'

export const GET_ORDERS_SUCCESS = 'marketUsers.GET_ORDERS_SUCCESS'
export const GET_ORDERS_REQUEST = 'marketUsers.GET_ORDERS_REQUEST'

export const GET_DAYS_SUCCESS = 'marketUsers.GET_DAYS_SUCCESS'
export const GET_DAYS_REQUEST = 'marketUsers.GET_DAYS_REQUEST'

export const GET_PAYMENT_SUCCESS = 'marketUsers.GET_PAYMENT_SUCCESS'
export const GET_PAYMENT_REQUEST = 'marketUsers.GET_PAYMENT_REQUEST'

export const CHOOSE_DAYS_SUCCESS = 'marketUsers.CHOOSE_DAYS_SUCCESS'
export const CHOOSE_DAYS_REQUEST = 'marketUsers.CHOOSE_DAYS_REQUEST'

export const DELETE_ORDER_SUCCESS = 'marketUsers.DELETE_ORDER_SUCCESS'
export const DELETE_ORDER_REQUEST = 'marketUsers.DELETE_ORDER_REQUEST'

export const SET_ACTIVE_DEPARTMENT = 'marketUsers.SET_ACTIVE_DEPARTMENT'

export const TOGGLE_CART_VISIBLITY = 'marketUsers.TOGGLE_CART_VISIBLITY'

export const SET_SHIP_METHOD = 'marketUsers.SET_SHIP_METHOD'

export const SET_STATE_ID = 'marketUsers.SET_STATE_ID'

export const SET_MOBILE = 'marketUsers.SET_MOBILE'

export const NEXT_SIGNUP_STEP = 'market_account/NEXT_SIGNUP_STEP'
export const PREV_SIGNUP_STEP = 'market_account/PREV_SIGNUP_STEP'

export const STORE_SIGNUP_ACCOUNT_REQUEST = 'market_account/STORE_SIGNUP_ACCOUNT_REQUEST'
export const STORE_SIGNUP_ACCOUNT_SUCCESS = 'market_account/STORE_SIGNUP_ACCOUNT_SUCCESS'
export const STORE_SIGNUP_ACCOUNT_FAILURE = 'market_account/STORE_SIGNUP_ACCOUNT_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------
//
export function setState ({ stateId }: Object): Function {
  return {
    type: SET_STATE_ID,
    payload: stateId
  }
}
export function setMobile (mobile: string): Function {
  return {
    type: SET_MOBILE,
    payload: mobile
  }
}
export function toggleCartVisibility (visibility = null): Function {
  return {
    type: TOGGLE_CART_VISIBLITY,
    payload: visibility
  }
}
export function setShipMethod ({ id }: Object): Function {
  return {
    type: SET_SHIP_METHOD,
    payload: {
      id
    }
  }
}
export function setActiveDepartment (payload: Object): Function {
  return {
    type: SET_ACTIVE_DEPARTMENT,
    payload: payload
  }
}
function getBooksSuccess (payload: Object): Function {
  return {
    type: GET_BOOKS_SUCCESS,
    payload: payload
  }
}
function getBooksLoading (): Function {
  return {
    type: GET_BOOKS_REQUEST
  }
}

export function getBooks (): Function {
  return function (dispatch: Function, getState: Function): Function {
    const { auth: { token } } = getState()
    dispatch(getBooksLoading())

    return request.get(`${APIBASE}/api/market_user/all`)
      .set('x-access-token', token)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end((err: Object, res: Object) => {
        if (!err && res.ok) {
          dispatch(getBooksSuccess(res.body))
        }
      })
  }
}
// delete order

function deleteOrderSuccess (payload: Array<Object>): Object {
  return {
    type: DELETE_ORDER_SUCCESS,
    payload
  }
}
function deleteOrderLoading (): Object {
  return {
    type: DELETE_ORDER_REQUEST
  }
}

export function deleteOrder ({ id }: Object): Function {
  return (dispatch: Object, getState: Object): Function => {
    dispatch(deleteOrderLoading())
    const { auth: { token } } = getState()
    return request.post(APIBASE + '/api/market_user/cancel')
    .send({ id })
    .set('x-access-token', token)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .end((err: Object, res: Object) => {
      if (!err && res.ok) {
        dispatch(deleteOrderSuccess(res.body))
      } else {

      }
    })
  }
}
// get cities

function getCitiesSuccess (payload: Array<Object>): Object {
  return {
    type: GET_CITIES_SUCCESS,
    payload
  }
}
function getCitiesLoading (): Object {
  return {
    type: GET_CITIES_REQUEST
  }
}

export function getCities (): Function {
  return (dispatch: Object, getState: Object): Function => {
    const { market: { cities } } = getState()
    if (cities.length) {
      return () => {}
    }
    dispatch(getCitiesLoading())
    return request.get(APIBASE + '/api/lists/cities')
    .query({ country_id: 613 })
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .end((err: Object, res: Object) => {
      if (!err && res.ok) {
        dispatch(getCitiesSuccess(res.body))
      } else {

      }
    })
  }
}
// get states

function getStatesSuccess (payload: Array<Object>, cityId: number): Object {
  return {
    type: GET_STATES_SUCCESS,
    payload: {
      states: payload,
      cityId
    }
  }
}
function getStatesLoading (): Object {
  return {
    type: GET_STATES_REQUEST
  }
}

export function getStates ({ cityId }: Object): Function {
  return (dispatch: Object, getState: Object): Function => {
    dispatch(getStatesLoading())
    return request.get(APIBASE + '/api/lists/states')
    .query({ city_id: cityId, s: 1 })
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .end((err: Object, res: Object) => {
      if (!err && res.ok) {
        dispatch(getStatesSuccess(res.body, cityId))
      } else {

      }
    })
  }
}
// get cart

function getCartItemsSuccess (payload: Object): Function {
  return {
    type: GET_CART_ITEMS_SUCCESS,
    payload: payload
  }
}
function getCartItemsLoading (): Function {
  return {
    type: GET_CART_ITEMS_REQUEST
  }
}

export function getCartItems (): Function {
  return function (dispatch: Function, getState: Function): Function {
    const { auth: { token } } = getState()
    dispatch(getCartItemsLoading())

    return request.get(`${APIBASE}/api/market_user/cart`)
      .set('x-access-token', token)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end((err: Object, res: Object) => {
        if (!err && res.ok) {
          dispatch(getCartItemsSuccess(res.body))
        }
      })
  }
}
// post order

function addToCartSuccess (payload: Object): Function {
  return {
    type: ADD_TO_CART_SUCCESS,
    payload: payload
  }
}
function addToCartLoading (): Function {
  return {
    type: ADD_TO_CART_REQUEST
  }
}

export function addToCart ({ ids = [] }: Object): Function {
  return function (dispatch: Function, getState: Function): Function {
    const { auth: { token } } = getState()
    dispatch(addToCartLoading())

    return request.post(`${APIBASE}/api/market_user/cart`)
      .set('x-access-token', token)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({ ids })
      .end((err: Object, res: Object) => {
        if (!err && res.ok) {
          dispatch(addToCartSuccess(res.body))
        }
      })
  }
}
// post order

function removeFromCartSuccess (payload: Object): Function {
  return {
    type: REMOVE_FROM_CART_SUCCESS,
    payload: payload
  }
}
function removeFromCartLoading (): Function {
  return {
    type: REMOVE_FROM_CART_REQUEST
  }
}

export function removeFromCart ({ id = 0, all = false }: Object): Function {
  return function (dispatch: Function, getState: Function): Function {
    const { auth: { token } } = getState()
    dispatch(removeFromCartLoading())

    return request.post(`${APIBASE}/api/market_user/emptycart`)
      .set('x-access-token', token)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({ id, all })
      .end((err: Object, res: Object) => {
        if (!err && res.ok) {
          dispatch(removeFromCartSuccess(res.body))
        }
      })
  }
}
// post order

function postOrderSuccess (payload: Object): Function {
  return {
    type: POST_ORDER_SUCCESS,
    payload: payload
  }
}
function postOrderLoading (): Function {
  return {
    type: POST_ORDER_REQUEST
  }
}

export function postOrder (): Function {
  return function (dispatch: Function, getState: Function): Function {
    const { auth: { token }, market: { stateId, cityId, shipMethod, mobile } } = getState()
    dispatch(postOrderLoading())

    return request.post(`${APIBASE}/api/market_user/order`)
      .set('x-access-token', token)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({ stateId, cityId, ship: shipMethod === 2, mobile })
      .end((err: Object, res: Object) => {
        if (!err && res.ok) {
          dispatch(getPayment())
          dispatch(postOrderSuccess(res.body))
        }
      })
  }
}
// get orders

function getOrdersSuccess (payload: Object): Function {
  return {
    type: GET_ORDERS_SUCCESS,
    payload: payload
  }
}
function getOrdersLoading (): Function {
  return {
    type: GET_ORDERS_REQUEST
  }
}

export function getOrders ({ landing = false }: Object = { landing: false }): Function {
  return function (dispatch: Function, getState: Function): Function {
    dispatch(getOrdersLoading())
    const { auth: { token } } = getState()
    return request.get(`${APIBASE}/api/market_user/orders`)
      .set('x-access-token', token)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end((err: Object, res: Object) => {
        if (!err && res.ok) {
          const dayNotChosen = res.body.findIndex((order: Object): boolean => order.hasChosenDay === 0 && !['waiting', 'received'].includes(order.status)) >= 0
          if (dayNotChosen && landing && false) {
            dispatch(showModal('covid', {
              body: `تجاوبا مع الظروف التي تمر بها البلاد وتنظيما لحركة استلام 
              الكتب فقد تقرر تقسيم الطلاب لمجموعات وفق أيام 
              الأسبوع المتاحة لاستلام كتبهم بدءا من يوم الأثنين 30مارس . 
              لذا يرجى اختيار اليوم المناسب علما أن الأولوية ستكون وفق 
              المبادرة ثم الانتقال لليوم المتاح وهكذا .`,
              tag: 'NOTHING',
              accept: 'اختيار يوم الاستلام',
              title: 'تم تعيين المشرف'
            }, true, true, 'small'))
          }
          dispatch(getOrdersSuccess(res.body))
        }
      })
  }
}
// get days

function getDaysSuccess (payload: Object): Function {
  return {
    type: GET_DAYS_SUCCESS,
    payload: payload
  }
}
function getDaysLoading (): Function {
  return {
    type: GET_DAYS_REQUEST
  }
}

export function getDays (): Function {
  return function (dispatch: Function, getState: Function): Function {
    dispatch(getDaysLoading())
    const { auth: { token } } = getState()
    return request.get(`${APIBASE}/api/market_user/days`)
      .set('x-access-token', token)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end((err: Object, res: Object) => {
        if (!err && res.ok) {
          dispatch(getDaysSuccess(res.body))
        }
      })
  }
}
// get invoice

// function getPaymentSuccess(payload : Object) : Function {
//   return {
//     type: GET_PAYMENT_SUCCESS,
//     payload: payload
//   }
// }
// function getPaymentLoading() : Function {
//   return {
//     type: GET_PAYMENT_REQUEST
//   }
// }

// export function getPayment() : Function {
//   return function (dispatch: Function, getState: Function): Function {
// dispatch(getPaymentLoading())
//     const { auth: { token } } = getState()

// return request.get('https://admin.el-css.edu.om/api/v1/marketuser/payment')
// .set('Authorization', `Bearer ${token}`)
//       .set('Accept', 'application/json')
//       .set('Content-Type', 'application/json')
//       .end((err: Object, res: Object) => {
//         if (!err && res.ok) {
//         dispatch(showModal('paymentmodal', res.body, false))
//           // dispatch(getPaymentSuccess(res.body))
//         }
//       })
//   }
// }
// choose days

function chooseDaySuccess (payload: Object): Function {
  return {
    type: CHOOSE_DAYS_SUCCESS,
    payload: payload
  }
}
function chooseDayLoading (): Function {
  return {
    type: CHOOSE_DAYS_REQUEST
  }
}

export function chooseDay ({ dayId }: Object): Function {
  return function (dispatch: Function, getState: Function): Function {
    dispatch(chooseDayLoading())
    const { auth: { token } } = getState()
    return request.post(`${APIBASE}/api/market_user/days`)
      .set('x-access-token', token)
      .set('Accept', 'application/json')
      .send({ dayId })
      .set('Content-Type', 'application/json')
      .end((err: Object, res: Object) => {
        if (!err && res.ok) {
          dispatch(chooseDaySuccess(res.body))
        }
      })
  }
}

export function nextSignupStep (): Object {
  return {
    type: NEXT_SIGNUP_STEP
  }
}

export function signupSuccess (): Object {
  return {
    type: STORE_SIGNUP_ACCOUNT_SUCCESS
  }
}

export function signupFailure (errors: Array<Object>): Object {
  return {
    type: STORE_SIGNUP_ACCOUNT_FAILURE,
    payload: errors
  }
}

export function signupRequest (): Object {
  return {
    type: STORE_SIGNUP_ACCOUNT_REQUEST
  }
}

export function signup (values: Object): Function {
  return function (dispatch: Function, getState: Function): Object {
    dispatch(signupRequest())
    return request.post(`${APIBASE}/api/market_user/signup`)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .send(values)
    .then((res: Object) => {
      const { success, errors, data } = res.body
      if (success) {
        dispatch(signupSuccess())
        dispatch(loginUserSuccess(data, 'marketuser'))
        browserHistory.push('/eshop/dashboard')
      } else {
        dispatch(signupFailure(errors))
      }
    }).catch((err: Object) => {
      console.error('Catched an error', err)
    })
  }
}

export function prevSignupStep (): Object {
  return {
    type: PREV_SIGNUP_STEP
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_BOOKS_REQUEST]: (state: Object, action: Object): Object => ({
    ...state,
    booksLoading: true
  }),
  [GET_BOOKS_SUCCESS]: (state: Object, action: Object): Object => ({
    ...state,
    books: action.payload.books,
    specialties: action.payload.specialties,
    booksLoading: false
  }),
  [SET_ACTIVE_DEPARTMENT]: (state: Object, action: Object): Object => {
    const specialtyId = action.payload.specialtyId || state.specialtyId
    const departmentId = action.payload.departmentId || state.departmentId
    const specialty = state.specialties.find((spec: Object): boolean => +spec.id === +specialtyId) || { departments: [] }
    const department = specialty.departments.find((dep: Object): boolean => +dep.id === +departmentId) || {}

    return ({
      ...state,
      specialty,
      department,
      ...action.payload
    })
  },
  [GET_CART_ITEMS_SUCCESS]: (state: Object, action: Object): Object => ({
    ...state,
    cartItems: action.payload
  }),
  [GET_CART_ITEMS_REQUEST]: (state: Object, action: Object): Object => ({
    ...state,
    cartLoading: true
  }),
  [ADD_TO_CART_SUCCESS]: (state: Object, action: Object): Object => ({
    ...state,
    cartItems: action.payload
  }),
  [REMOVE_FROM_CART_SUCCESS]: (state: Object, action: Object): Object => ({
    ...state,
    cartItems: action.payload
  }),
  [ADD_TO_CART_REQUEST]: (state: Object, action: Object): Object => ({
    ...state,
    cartLoading: true
  }),
  [TOGGLE_CART_VISIBLITY]: (state: Object, action: Object): Object => ({
    ...state,
    cartVisible: action.payload !== null ? action.payload : !state.cartVisible
  }),
  [SET_SHIP_METHOD]: (state: Object, action: Object): Object => ({
    ...state,
    shipMethod: action.payload.id
  }),
  [GET_CITIES_SUCCESS]: (state: Object, action: Object): Object => ({
    ...state,
    cities: action.payload
  }),
  [GET_STATES_SUCCESS]: (state: Object, action: Object): Object => ({
    ...state,
    states: action.payload.states,
    cityId: action.payload.cityId,
    stateId: 0
  }),
  [SET_STATE_ID]: (state: Object, action: Object): Object => ({
    ...state,
    stateId: action.payload
  }),
  [SET_MOBILE]: (state: Object, action: Object): Object => ({
    ...state,
    mobile: action.payload
  }),
  [POST_ORDER_SUCCESS]: (state: Object, action: Object): Object => ({
    ...state,
    orders: [...state.orders, ...action.payload],
    cartItems: []
  }),
  [GET_ORDERS_SUCCESS]: (state: Object, action: Object): Object => ({
    ...state,
    orders: action.payload,
    ordersLoading: true
  }),
  [GET_ORDERS_REQUEST]: (state: Object, action: Object): Object => ({
    ...state,
    ordersLoading: true
  }),
  [DELETE_ORDER_SUCCESS]: (state: Object, action: Object): Object => ({
    ...state,
    orders: action.payload,
    deletingOrders: false
  }),
  [DELETE_ORDER_REQUEST]: (state: Object, action: Object): Object => ({
    ...state,
    deletingOrders: true
  }),
  [GET_DAYS_REQUEST]: (state: Object, action: Object): Object => ({
    ...state,
    daysLoading: true
  }),
  [GET_DAYS_SUCCESS]: (state: Object, action: Object): Object => ({
    ...state,
    daysLoading: false,
    days: action.payload
  }),
  [CHOOSE_DAYS_REQUEST]: (state: Object, action: Object): Object => ({
    ...state,
    daysLoading: true
  }),
  [CHOOSE_DAYS_SUCCESS]: (state: Object, action: Object): Object => ({
    ...state,
    daysLoading: false,
    days: action.payload
  }),
  [NEXT_SIGNUP_STEP]: (state: Object, action: Object): Object => ({ ...state,
    activeSignupStep: state.activeSignupStep < 2 ? state.activeSignupStep + 1 : 2
  }),
  [PREV_SIGNUP_STEP]: (state: Object, action: Object): Object => ({ ...state,
    activeSignupStep: state.activeSignupStep > 1 ? state.activeSignupStep - 1 : 1
  }),
  [STORE_SIGNUP_ACCOUNT_FAILURE]: (state: Object, action: Object): Object => ({ ...state,
    signupErrors: action.payload
  }),
  [STORE_SIGNUP_ACCOUNT_REQUEST]: (state: Object, action: Object): Object => ({ ...state,
    signupErrors: []
  }),
  [GET_PAYMENT_SUCCESS] : (state: Object, action: Object): Object => ({
    ...state,
  }),
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  books: [],
  cities: [],
  daysLoading: false,
  days: {},
  states: [],
  deletingOrders: false,
  cartItems: [],
  stateId: 0,
  cityId: 0,
  mobile: '',
  orders: [],
  activeSignupStep: 1,
  signupErrors: [],
  ordersLoading: false,
  cartLoading: false,
  specialties: [],
  departmentId: 0,
  department: {},
  specialty: {},
  shipMethod: 1,
  specialtyId: 0,
  booksLoading: false,
  cartVisible: false
}

export default function marketReducer (state: Object = initialState, action: Object): Object {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
