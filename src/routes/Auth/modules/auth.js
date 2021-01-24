// @flow
import jwtDecode from 'jwt-decode'
import { browserHistory } from 'react-router'
import request from 'superagent'
import { APIBASE, CONSTANTS } from 'utils'
import laroute from 'utils/laroute.js'

// ------------------------------------
// Constants
// ------------------------------------
export const TOGGLE_AUTH_FORM: string = 'TOGGLE_AUTH_FORM'

export const LOGIN_USER_SUCCESS: string = 'LOGIN_USER_SUCCESS'
export const LOGIN_USER_FAILURE: string = 'LOGIN_USER_FAILURE'
export const LOGIN_USER_REQUEST: string = 'LOGIN_USER_REQUEST'

export const RESET_PASSWORD_SUCCESS: string = 'RESET_PASSWORD_SUCCESS'
export const RESET_PASSWORD_REQUEST: string = 'RESET_PASSWORD_REQUEST'

export const GET_TOKEN_SUCCESS: string = 'GET_TOKEN_SUCCESS'
export const GET_TOKEN_REQUEST: string = 'GET_TOKEN_REQUEST'

export const LOGOUT_USER: string = 'LOGOUT_USER'

// ------------------------------------
// Actions
// ------------------------------------
export function toggleAuthForm (form: Object): Object {
  return {
    type: TOGGLE_AUTH_FORM,
    payload: form
  }
}

export function loginUserSuccess (token: string, guard: string = 'students'): Object {
  switch (guard) {
    case 'students':
      localStorage.setItem('token', token)
      break
    case 'teachers':
      localStorage.setItem('teacherstoken', token)
      break
    case 'users':
      localStorage.setItem('usertoken', token)
      break
    case 'registrars':
      localStorage.setItem('registrartoken', token)
      break
    case 'libraryusers':
      localStorage.setItem('librarytoken', token)
      break
    case 'affiliates':
      localStorage.setItem(CONSTANTS['AUTH_AFFILIATE_LOCAL_STORAGE_KEY'], token)
      break
    default:
      localStorage.setItem('token', token)
      break
  }
  if (guard === 'teachers') {
    document.location.href = 'https://teachers.el-css.edu.om'
  }
  return ({
    type: LOGIN_USER_SUCCESS,
    payload: {
      token: token,
      guard
    }
  })
}
export function resetPasswordSuccess (success: boolean): Object {
  return {
    type: RESET_PASSWORD_SUCCESS,
    payload: success
  }
}

export function resetPasswordRequest (): Object {
  return {
    type: RESET_PASSWORD_REQUEST
  }
}

export function loginUserFailure (status: number, message: string): Object {
  localStorage.removeItem('token')
  return {
    type: LOGIN_USER_FAILURE,
    payload: {
      status: status,
      statusText: message
    }
  }
}

export function loginUserRequest (): Object {
  return {
    type: LOGIN_USER_REQUEST
  }
}

export function logout (guard: string = 'students'): Object {
  switch (guard) {
    case 'users' :
      localStorage.removeItem('usertoken')
      break
    case 'registrars' :
      localStorage.removeItem('registrartoken')
      break
    case 'libraryusers' :
      localStorage.removeItem('librarytoken')
      break
    case 'affiliates' :
      localStorage.removeItem(CONSTANTS['AUTH_AFFILIATE_LOCAL_STORAGE_KEY'])
      break
    default:
      localStorage.removeItem('token')
      localStorage.removeItem('registrartoken')
      localStorage.removeItem('librarytoken')
      localStorage.removeItem(CONSTANTS['AUTH_AFFILIATE_LOCAL_STORAGE_KEY'])
      break
  }
  if (guard !== 'affiliates') {
    document.location.reload()
  }
  return {
    type: LOGOUT_USER
  }
}

export function logoutAndRedirect (to: string = '/', guard: string = 'students'): Function {
  return (dispatch: Function) => {
    browserHistory.push(to)
    setTimeout((): Function => dispatch(logout(guard)), 100)
  }
}

export function loginUser ({
  username = '',
  password = '',
  redirectTo = '/',
  guard = 'students' }: Object): Function {
  return function (dispatch: Function) {
    dispatch(loginUserRequest())
    request
      .post(APIBASE + '/auth/login')
      .set('Accept', 'application/json')
      // .withCredentials()
      .set('Content-Type', 'application/json')
      .send(JSON.stringify({ username: username, password: password, version: true, platform: 'web', guard: guard }))
      .end((err: Object, res: Object) => {
        if (err || !res.ok) {
          const { statusText, status } = err.response
          dispatch(loginUserFailure(status, statusText))
        } else {
          let decoded = jwtDecode(res.body.token)
          if (decoded.guard === 'teacher') {
            const { token } = res.body
            dispatch(loginUserSuccess(token, 'teachers'))
            window.location.href = 'https://teacher.el-css.edu.om'
          } else {
            const { token } = res.body
            dispatch(loginUserSuccess(token, `${decoded.guard}s`))
            const redirectToAfterLogin = ((): string => {
              switch (decoded.guard) {
                case 'libraryuser':
                  return 'library/home'
                case 'affiliate':
                  return 'affiliate/home'
                case 'marketuser':
                  return 'eshop/dashboard'
                default:
                  return decoded.guard
              }
            })()
            browserHistory.push(redirectTo === '/auth' ? redirectToAfterLogin : redirectTo)
          }
        }
      })
  }
}

export function resetPassword (username: string, nationalid: string): Function {
  return function (dispatch: Function): Object {
    dispatch(resetPasswordRequest())
    return (
      request
        .post(laroute.route('api.v1.students.password_reset')) // laroute.route('api.v1.auth.login')
        .set('Accept', 'application/json')
        // .withCredentials()
        .set('Content-Type', 'application/json')
        .send(JSON.stringify({ username: username, nationalid: nationalid }))
        .end((err: Object, res: Object) => {
          if (err || !res.ok) {
            // dispatch(loginUserFailure(err))
          } else {
            dispatch(resetPasswordSuccess(res.body.success))
          }
        })
    )
  }
}

function getTokenRequest (): Object {
  return {
    type: GET_TOKEN_REQUEST
  }
}

export function getToken ({ token = false }: Object = {}): Function {
  return (dispatch: Function, getState: Function): Function => {
    dispatch(getTokenRequest())
    return request.post(`${APIBASE}/api/extra/token`)
    .set('x-access-token', token)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .end((error: Object, response: Object) => {
      if (!error) {
        // console.log(response.body)
        dispatch(loginUserSuccess(response.body))
        browserHistory.push('/student')
      }
    })
  }
}

export const actions = {
  loginUserSuccess,
  loginUserFailure,
  loginUserRequest,
  logout,
  logoutAndRedirect,
  loginUser,
  toggleAuthForm
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [TOGGLE_AUTH_FORM]: (state: Object, action: Object): Object =>
    Object.assign({}, state, {
      currentform: action.payload,
      resetpasswordstatus: 0
    }),
  [RESET_PASSWORD_SUCCESS]: (state: Object, action: Object): Object =>
    Object.assign({}, state, {
      resetpasswordstatus: action.payload === true ? 1 : 2,
      passwordischanging: false
    }),
  [RESET_PASSWORD_REQUEST]: (state: Object, action: Object): Object =>
    Object.assign({}, state, {
      resetpasswordstatus: 0,
      passwordischanging: true
    }),
  [LOGIN_USER_REQUEST]: (state: Object, action: Object): Object =>
    Object.assign({}, state, {
      isAuthenticating: true,
      statusText: null
    }),
  [LOGIN_USER_SUCCESS]: (state: Object, action: Object): Object => {
    let tokenKey = 'notoken'
    switch (action.payload.guard) {
      case 'users':
        tokenKey = 'usertoken'
        break
      case 'students':
        tokenKey = 'token'
        break
      case 'marketusers':
        tokenKey = 'token'
        break
      case 'registrars':
        tokenKey = 'registrartoken'
        break
      case 'libraryusers':
        tokenKey = 'librarytoken'
        break
      case 'affiliates':
        tokenKey = CONSTANTS['AUTH_AFFILIATE_LOCAL_STORAGE_KEY']
        break
      default:
        tokenKey = 'notoken'
        break
    }
    let isAuthenticatedKey = 'isAuthenticated'
    switch (action.payload.guard) {
      case 'users':
        isAuthenticatedKey = 'isUserAuthenticated'
        break
      case 'affiliates':
        isAuthenticatedKey = 'isAffiliateAuthenticated'
        break
      default:
        isAuthenticatedKey = 'isAuthenticated'
    }
    return Object.assign({}, state, {
      isAuthenticating: false,
      [tokenKey]: action.payload.token,
      [isAuthenticatedKey]: true,
      userName: jwtDecode(action.payload.token).userName,
      statusText: 'لقد سجلت الدخول بنجاح.'
    })
  },
  [LOGIN_USER_FAILURE]: (state: Object, action: Object): Object =>
    Object.assign({}, state, {
      isAuthenticating: false,
      token: null,
      userName: null,
      statusText: `البيانات التي أدخلت غير صحيحة`
      // 'statusText': `Authentication Error: ${payload.status} ${payload.statusText}`
    }),
  [LOGOUT_USER]: (state: Object, action: Object): Object =>
    Object.assign({}, state, {
      isAuthenticated: false,
      isAffiliateAuthenticated: false,
      token: null,
      affiliatetoken: null,
      userName: null,
      statusText: null
    })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  token: null,
  usertoken: null,
  registrartoken: null,
  librarytoken: null,
  affiliatetoken: null,
  currentform: 'login',
  userName: null,
  resetpasswordstatus: 0,
  isAuthenticated: false,
  isUserAuthenticated: false,
  isAffiliateAuthenticated: false,
  passwordischanging: false,
  isAuthenticating: false,
  statusText: null
}

export default function authReducer (state: Object = initialState, action: Object): Object {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
