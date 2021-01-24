// @flow
import { APIBASE, version } from 'utils'
import request from 'superagent'
// ------------------------------------
// Constants
// ------------------------------------
export const TOGGLE_HOME_MENU: string = 'TOGGLE_HOME_MENU'
export const HIDE_HOMEPAGE_MENU: string = 'HIDE_HOMEPAGE_MENU'

export const STORE_ACTIVE_LOCALE: string = 'ui.STORE_ACTIVE_LOCALE'

export const SERVICE_WORKER_SUPPORTED: string = 'ui.SERVICE_WORKER_SUPPORTED'
export const SERVICE_WORKER_REGISTRED: string = 'ui.SERVICE_WORKER_REGISTRED'

export const UI_PLATFORM_IS_MOBILE: string = 'UI_PLATFORM_IS_MOBILE'

export const TOGGLE_SPECIALTY_ACTIVE_TAB: string = 'TOGGLE_SPECIALTY_ACTIVE_TAB'

export const GET_APP_BEACON_REQUEST: string = 'ui.GET_APP_BEACON_REQUEST'
export const GET_APP_BEACON_SUCCESS: string = 'ui.GET_APP_BEACON_SUCCESS'
export const GET_APP_BEACON_FAILURE: string = 'ui.GET_APP_BEACON_FAILURE'

export const TOGGLE_SUPPORT_FLOATION_BUTTON: string = 'ui/TOGGLE_SUPPORT_FLOATION_BUTTON'

export const HIDE_HOMEPAGE_UPCOMING_SESSION: string = 'HIDE_HOMEPAGE_UPCOMING_SESSION'
export const SHOW_HOMEPAGE_UPCOMING_SESSION: string = 'SHOW_HOMEPAGE_UPCOMING_SESSION'

// ------------------------------------
// Actions
// ------------------------------------
//
export function platformIsMobile (): Object {
  return {
    type: UI_PLATFORM_IS_MOBILE
  }
}
export function storeActiveLocale (locale: string): Object {
  localStorage.setItem('elcsslocale', locale)
  if (locale !== 'ar' && document.body) {
    document.body.style.direction = 'ltr'
  } else if (document.body) {
    document.body.style.direction = 'rtl'
  }
  return {}
}

export function toggleHomePageMenu (): Object {
  return {
    type: TOGGLE_HOME_MENU
  }
}

export function toggleSupportFloatingButton (visible: boolean = true): Object {
  return {
    type: TOGGLE_SUPPORT_FLOATION_BUTTON,
    payload: visible
  }
}

export function toggleSpecialtyActiveTab (key: string): Object {
  return {
    type: TOGGLE_SPECIALTY_ACTIVE_TAB,
    payload: key
  }
}

export function hideHomePageMenu (): Object {
  return {
    type: HIDE_HOMEPAGE_MENU
  }
}

export function hideHomePageSession (): Object {
  return {
    type: HIDE_HOMEPAGE_UPCOMING_SESSION
  }
}
export function showHomePageSession (): Object {
  return {
    type: SHOW_HOMEPAGE_UPCOMING_SESSION
  }
}

export function unregisterServiceWorker () {
  if (navigator.serviceWorker) {
    navigator.serviceWorker.getRegistrations().then((registrations: Object) => {
      for (let registration of registrations) {
        registration.unregister()
      }
      document.location.reload()
    })
  }
}
export function getAppBeacon (): Object {
  return function (dispatch: Function, getState: Function): Function {
    dispatch(getAppBeaconRequest())
    return request.get(`${APIBASE}/api/extra/beacon`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end((err: Object, res: Object) => {
        if (!err && res.ok) {
          dispatch(getAppBeaconSuccess(res.body))
          if (res.body && (+version < +res.body.version)) {
            unregisterServiceWorker()
          }
        } else {
          dispatch(getAppBeaconFailure())
        }
      })
  }
}

export function getAppBeaconRequest (): Object {
  return {
    type: GET_APP_BEACON_REQUEST
  }
}
export function getAppBeaconFailure (): Object {
  return {
    type: GET_APP_BEACON_FAILURE
  }
}
export function getAppBeaconSuccess (beacon: string): Object {
  return {
    type: GET_APP_BEACON_SUCCESS,
    payload: beacon
  }
}

export const actions = {
  platformIsMobile,
  hideHomePageSession,
  showHomePageSession,
  toggleHomePageMenu
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [HIDE_HOMEPAGE_UPCOMING_SESSION]: (state: Object, action: Object): Object =>
    ({ ...state, homepagesessionvisible: false }),
  [UI_PLATFORM_IS_MOBILE]: (state: Object, action: Object): Object =>
    ({ ...state, isMobile: true }),
  [SHOW_HOMEPAGE_UPCOMING_SESSION]: (state: Object, action: Object): Object =>
    ({ ...state, homepagesessionvisible: true }),
  [TOGGLE_HOME_MENU]: (state: Object, action: Object): Object =>
    ({ ...state, topmenuvisible: !state.topmenuvisible }),
  [HIDE_HOMEPAGE_MENU]: (state: Object, action: Object): Object =>
    ({ ...state, topmenuvisible: false }),
  [TOGGLE_SUPPORT_FLOATION_BUTTON]: (state: Object, action: Object): Object =>
    ({ ...state, supportButtonVisible: action.payload }),
  [GET_APP_BEACON_SUCCESS]: (state: Object, action: Object): Object =>
    ({ ...state, appVersion: action.payload.version }),
  'LOCATION_CHANGE': (state: Object, action: Object): Object =>
    ({ ...state, topmenuvisible: false }),
  'TOGGLE_SPECIALTY_ACTIVE_TAB': (state: Object, action: Object): Object =>
    ({ ...state, activeSpecialtyTab: action.payload })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  homepagesessionvisible: true,
  topmenuvisible: false,
  isMobile: false,
  supportButtonVisible: true,
  activeSpecialtyTab: 'maj',
  appVersion: 0,
  windowHeight: window.innerHeight,
}

export default function homeUiReducer (state: Object = initialState, action: Object): Object {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
