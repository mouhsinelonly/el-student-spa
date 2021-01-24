// @flow
import request from 'superagent'
import { APIBASE } from 'utils'
import { loginUserSuccess } from 'routes/Auth/modules/auth'
import { browserHistory } from 'react-router'
import { showPaymentView, hidePaymentView } from 'modules/paymentview'
import { socket } from 'socket'
import laroute from 'utils/laroute.js'
import { logout } from 'routes/Auth/modules/auth'

// ------------------------------------
// Constants
// ------------------------------------
export const CHOOSE_PACKAGE = 'library_account/CHOOSE_PACKAGE'
export const NEXT_SIGNUP_STEP = 'library_account/NEXT_SIGNUP_STEP'
export const PREV_SIGNUP_STEP = 'library_account/PREV_SIGNUP_STEP'

export const STORE_SIGNUP_ACCOUNT_REQUEST = 'library_account/STORE_SIGNUP_ACCOUNT_REQUEST'
export const STORE_SIGNUP_ACCOUNT_SUCCESS = 'library_account/STORE_SIGNUP_ACCOUNT_SUCCESS'
export const STORE_SIGNUP_ACCOUNT_FAILURE = 'library_account/STORE_SIGNUP_ACCOUNT_FAILURE'

export const LIBRARY_GET_CATEGRIES_SUCCESS = 'library_account/LIBRARY_GET_CATEGRIES_SUCCESS'
export const LIBRARY_GET_CATEGRIES_REQUEST = 'library_account/LIBRARY_GET_CATEGRIES_REQUEST'

export const LIBRARY_GET_PROFILE_SUCCESS = 'library_account/LIBRARY_GET_PROFILE_SUCCESS'
export const LIBRARY_GET_PROFILE_REQUEST = 'library_account/LIBRARY_GET_PROFILE_REQUEST'

export const LIBRARY_GET_PACKAGES_SUCCESS = 'library_account/LIBRARY_GET_PACKAGES_SUCCESS'
export const LIBRARY_GET_PACKAGES_REQUEST = 'library_account/LIBRARY_GET_PACKAGES_REQUEST'

export const LIBRARY_GET_PAYMENT_REQUEST = 'library_account/LIBRARY_GET_PAYMENT_REQUEST'
export const LIBRARY_GET_PAYMENT_SUCCESS = 'library_account/LIBRARY_GET_PAYMENT_SUCCESS'
export const LIBRARY_GET_PAYMENT_FAIL = 'library_account/LIBRARY_GET_PAYMENT_FAIL'

export const USER_PAYED_SUBSCRIPTION = 'library_account/USER_PAYED_SUBSCRIPTION'

// ------------------------------------
// Actions
// ------------------------------------
export function choosePackage (id: number = 0): Object {
  return {
    type: CHOOSE_PACKAGE,
    payload: id
  }
}

function userPayedSubscription (): Object {
  return {
    type: USER_PAYED_SUBSCRIPTION
  }
}

export function listenForSockets (id: number): Object {
  const socketClient = socket()
  return (dispatch: Function) => {
    socketClient.on(`library-channel-${id}:subscribed`, (message: Object) => {
      dispatch(userPayedSubscription())
      dispatch(hidePaymentView())
      browserHistory.push('/library/home')
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
    return request.post(`${APIBASE}/api/public_library/signup`)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .send(values)
    .then((res: Object) => {
      const { success, errors, data } = res.body
      if (success) {
        dispatch(signupSuccess())
        dispatch(loginUserSuccess(data, 'libraryusers'))
        browserHistory.push('/library/plans')
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

export function getCategoriesSuccess (categories: Array<Object> = []): Object {
  return {
    type: LIBRARY_GET_CATEGRIES_SUCCESS,
    payload: categories
  }
}
export function getCategoriesRequest (): Object {
  return {
    type: LIBRARY_GET_CATEGRIES_REQUEST
  }
}

export function getCategories (): Object {
  return function (dispatch: Function, getState: Function): Object {
    const state = getState()
    const { auth: { librarytoken } } = state
    return request
      .get(`${APIBASE}/api/public_library/categories/all`)
      .set('x-access-token', librarytoken)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end((err: Object, res: Object) => {
        if (!err && res.ok) {
          dispatch(getCategoriesSuccess(res.body))
        } else {
        }
      })
  }
}

export function getProfileSuccess (profile: Object): Object {
  return {
    type: LIBRARY_GET_PROFILE_SUCCESS,
    payload: profile
  }
}
export function getProfileRequest (): Object {
  return {
    type: LIBRARY_GET_PROFILE_REQUEST
  }
}

export function getProfile (): Object {
  return function (dispatch: Function, getState: Function): Object {
    const state = getState()
    const { auth: { librarytoken } } = state

    return request
      .get(`${APIBASE}/api/public_library/profile`)
      .set('x-access-token', librarytoken)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end((err: Object, res: Object) => {
        if (!err && res.ok) {
          dispatch(listenForSockets(res.body.id))
          dispatch(getProfileSuccess(res.body))
        } else {
          dispatch(logout('libraryusers'))
        }
      })
  }
}

export function getPackagesSuccess (packages: Array<Object>): Object {
  return {
    type: LIBRARY_GET_PACKAGES_SUCCESS,
    payload: packages
  }
}
export function getPackagesRequest (): Object {
  return {
    type: LIBRARY_GET_PACKAGES_REQUEST
  }
}

export function getPackages (): Object {
  return function (dispatch: Function, getState: Function): Object {
    const state = getState()
    const { auth: { librarytoken } } = state

    return request
      .get(`${APIBASE}/api/public_library/packages`)
      .set('x-access-token', librarytoken)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end((err: Object, res: Object) => {
        if (!err && res.ok) {
          dispatch(getPackagesSuccess(res.body))
        } else {
        }
      })
  }
}

function subscribeRequest (): Object {
  return {
    type: LIBRARY_GET_PAYMENT_REQUEST
  }
}

function subscribeSuccess (): Object {
  return {
    type: LIBRARY_GET_PAYMENT_SUCCESS
  }
}

function subscribeFail (): Object {
  return {
    type: LIBRARY_GET_PAYMENT_FAIL
  }
}

export function subscribe (values: Object): Object {
  return function (dispatch: Function, getState: Function): Object {
    const { auth: { librarytoken } } = getState()
    // console.log(librarytoken)
    const { activePackage } = getState().library_account
    dispatch(subscribeRequest())
    return request
      .get(laroute.route('api.v1.library.get_payment'))
      .set('Authorization', `Bearer ${librarytoken}`)
      .query({ package_id: activePackage.id })
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end((err: Object, res: Object) => {
        if (!err && res.ok && res.body !== null) {
          const { omanneturl, fields } = res.body
          dispatch(subscribeSuccess())
          dispatch(showPaymentView(fields, omanneturl))
        } else {
          dispatch(subscribeFail())
          console.error('Error fetching PG data')
        }
      })
  }
}

export const actions = {}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [CHOOSE_PACKAGE]: (state: Object, action: Object): Object => ({ ...state,
    activePackage: state.packages.find((p: Object): boolean => +p.id === +action.payload)
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
  [LIBRARY_GET_CATEGRIES_SUCCESS]: (state: Object, action: Object): Object => ({ ...state,
    categories: action.payload,
    categoriesLoading: false
  }),
  [LIBRARY_GET_CATEGRIES_REQUEST]: (state: Object, action: Object): Object => ({ ...state,
    categories: [],
    categoriesLoading: true
  }),
  [LIBRARY_GET_PROFILE_SUCCESS]: (state: Object, action: Object): Object => ({ ...state,
    profile: action.payload,
    profileLoading: false
  }),
  [LIBRARY_GET_PROFILE_REQUEST]: (state: Object, action: Object): Object => ({ ...state,
    profile: [],
    profileLoading: true
  }),
  [LIBRARY_GET_PACKAGES_SUCCESS]: (state: Object, action: Object): Object => ({ ...state,
    packages: action.payload,
    packagesLoading: false
  }),
  [LIBRARY_GET_PACKAGES_REQUEST]: (state: Object, action: Object): Object => ({ ...state,
    packages: [],
    packagesLoading: true
  }),
  [LIBRARY_GET_PAYMENT_REQUEST]: (state: Object, action: Object): Object => ({ ...state,
    loadingPayment: true
  }),
  [LIBRARY_GET_PAYMENT_FAIL]: (state: Object, action: Object): Object => ({ ...state,
    loadingPayment: false
  }),
  [LIBRARY_GET_PAYMENT_SUCCESS]: (state: Object, action: Object): Object => ({ ...state,
    loadingPayment: false
  }),
  [USER_PAYED_SUBSCRIPTION]: (state: Object, action: Object): Object => ({ ...state,
    profile: { ...state.profile, activeSubscription: true }
  })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  profile: {},
  profileLoading: false,
  activePackage: 0,
  categoriesLoading:  false,
  packages: [],
  packagesLoading:  false,
  categories: [],
  loadingPayment: false,
  signupErrors: [],
  activeSignupStep: 1
}

export default function chatboxReducer (state: Object = initialState, action: Object): Object {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
