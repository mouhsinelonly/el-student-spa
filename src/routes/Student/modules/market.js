// @flow
import request from 'superagent'
import { APIBASE } from 'utils'
import { getProfileExtra } from 'routes/Student/modules/student'
import { showModal } from 'modules/modals'
// ------------------------------------
// Constants
// ------------------------------------
export const GET_BOOKS_REQUEST = 'market.GET_BOOKS_REQUEST'
export const GET_BOOKS_SUCCESS = 'market.GET_BOOKS_SUCCESS'

export const POST_ORDER_SUCCESS = 'market.POST_ORDER_SUCCESS'
export const POST_ORDER_REQUEST = 'market.POST_ORDER_REQUEST'

export const ADD_TO_CART_SUCCESS = 'market.ADD_TO_CART_SUCCESS'
export const ADD_TO_CART_REQUEST = 'market.ADD_TO_CART_REQUEST'

export const REMOVE_FROM_CART_SUCCESS = 'market.REMOVE_FROM_CART_SUCCESS'
export const REMOVE_FROM_CART_REQUEST = 'market.REMOVE_FROM_CART_REQUEST'

export const GET_CITIES_SUCCESS = 'market.GET_CITIES_SUCCESS'
export const GET_CITIES_REQUEST = 'market.GET_CITIES_REQUEST'

export const GET_STATES_SUCCESS = 'market.GET_STATES_SUCCESS'
export const GET_STATES_REQUEST = 'market.GET_STATES_REQUEST'

export const GET_CART_ITEMS_SUCCESS = 'market.GET_CART_ITEMS_SUCCESS'
export const GET_CART_ITEMS_REQUEST = 'market.GET_CART_ITEMS_REQUEST'

export const GET_ORDERS_SUCCESS = 'market.GET_ORDERS_SUCCESS'
export const GET_ORDERS_REQUEST = 'market.GET_ORDERS_REQUEST'

export const GET_DAYS_SUCCESS = 'market.GET_DAYS_SUCCESS'
export const GET_DAYS_REQUEST = 'market.GET_DAYS_REQUEST'

export const CHOOSE_DAYS_SUCCESS = 'market.CHOOSE_DAYS_SUCCESS'
export const CHOOSE_DAYS_REQUEST = 'market.CHOOSE_DAYS_REQUEST'

export const DELETE_ORDER_SUCCESS = 'market.DELETE_ORDER_SUCCESS'
export const DELETE_ORDER_REQUEST = 'market.DELETE_ORDER_REQUEST'

export const SET_ACTIVE_DEPARTMENT = 'market.SET_ACTIVE_DEPARTMENT'

export const TOGGLE_CART_VISIBLITY = 'market.TOGGLE_CART_VISIBLITY'

export const SET_SHIP_METHOD = 'market.SET_SHIP_METHOD'

export const SET_STATE_ID = 'market.SET_STATE_ID'

export const SET_MOBILE = 'market.SET_MOBILE'

export const UPDATE_ORDER_SUCCESS = 'market.UPDATE_ORDER_SUCCESS'

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

    return request.get(`${APIBASE}/api/market/all`)
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
    return request.post(APIBASE + '/api/market/cancel')
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

    return request.get(`${APIBASE}/api/market/cart`)
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

    return request.post(`${APIBASE}/api/market/cart`)
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

    return request.post(`${APIBASE}/api/market/emptycart`)
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

    return request.post(`${APIBASE}/api/market/order`)
      .set('x-access-token', token)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({ stateId, cityId, ship: shipMethod === 2, mobile })
      .end((err: Object, res: Object) => {
        if (!err && res.ok) {
          dispatch(getProfileExtra())
          dispatch(postOrderSuccess(res.body))
        }
      })
  }
}
// post update order

function updateOrderSuccess (payload: Object): Function {
  return {
    type: UPDATE_ORDER_SUCCESS,
    payload: payload
  }
}

export function updateOrder ({ id }): Function {
  return function (dispatch: Function, getState: Function): Function {
    const { auth: { token }, market: { stateId, cityId, shipMethod, mobile } } = getState()
    dispatch(postOrderLoading())

    return request.post(`${APIBASE}/api/market/order/${id}`)
      .set('x-access-token', token)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({ stateId, cityId, ship: shipMethod === 2, mobile })
      .end((err: Object, res: Object) => {
        if (!err && res.ok) {
          dispatch(updateOrderSuccess(res.body))
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
    return request.get(`${APIBASE}/api/market/orders`)
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
    return request.get(`${APIBASE}/api/market/days`)
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
    return request.post(`${APIBASE}/api/market/days`)
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
  [UPDATE_ORDER_SUCCESS]: (state: Object, action: Object): Object => ({
    ...state,
    orders: [...action.payload],
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
