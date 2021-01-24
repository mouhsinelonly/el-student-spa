// @flow
import request from 'superagent'
import { APIBASE } from 'utils'

// ------------------------------------
// Constants
// ------------------------------------
export const GET_REGISTRATION_PERIOD_LOADING: string = 'registration_period/GET_REGISTRATION_PERIOD_LOADING'
export const GET_REGISTRATION_PERIOD_SUCCESS: string = 'registration_period/GET_REGISTRATION_PERIOD_SUCCESS'

export const ADD_WAITING_LIST_REQUEST: string = 'registration_period/ADD_WAITING_LIST_LOADING'
export const ADD_WAITING_LIST_SUCCESS: string = 'registration_period/ADD_WAITING_LIST_SUCCESS'

// ------------------------------------
// Actions
// ------------------------------------
//
export function getRegistrationPeriodSuccess (periods: Array<Object>): Object {
  return {
    type: GET_REGISTRATION_PERIOD_SUCCESS,
    payload: periods
  }
}
export function getRegistrationPeriodLoading (): Object {
  return {
    type: GET_REGISTRATION_PERIOD_LOADING
  }
}

export function getRegistrationPeriod (regToken: string = ''): Object {
  return function (dispatch: Function, getState: Function): Object {
    const token = getState().location.query.regToken || regToken
    dispatch(getRegistrationPeriodLoading())
    let lastUpdated = getState().registration_period.lastUpdated
    if (lastUpdated !== null) {
      let now = new Date()
      let dif = lastUpdated - now.getTime()

      let secondsFromT1ToT2 = dif / 1000
      let secondsBetweenDates = Math.abs(secondsFromT1ToT2)

      if (secondsBetweenDates <= (60 * 60)) {
        dispatch(getRegistrationPeriodSuccess(getState().registration_period.periods))
        return {}
      }
    }

    return request.get(APIBASE + '/api/registration/active')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .query({ token })
      .then((response: Object) => {
        dispatch(getRegistrationPeriodSuccess(response.body))
        // console.log(response.body)
      })
      .catch((error: Object) => {
        console.error('ELCSS , error happend while fetching registration periods ', error)
      })
  }
}

function addWaitingListSuccess (): Object {
  return {
    type: ADD_WAITING_LIST_SUCCESS
  }
}
function addWaitingListRequest (): Object {
  return {
    type: ADD_WAITING_LIST_REQUEST
  }
}

export function addWaitingList (values: Object = {}): Object {
  return function (dispatch: Function, getState: Function): Object {
    dispatch(addWaitingListRequest())
    return request.post(`${APIBASE}/api/registration/store_waiting`)
      .set('Accept', 'application/json')
      .send(values)
      .set('Content-Type', 'application/json')
      .then((response: Object) => {
        dispatch(addWaitingListSuccess())
      })
      .catch((error: Object) => {
        console.error('ELCSS , error while adding to waiting list ', error)
      })
  }
}

export const actions = {
  getRegistrationPeriod
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_REGISTRATION_PERIOD_SUCCESS]: (state: Object, action: Object): Object => {
    return Object.assign({}, state, {
      periods: action.payload,
      loading: false,
      lastUpdated: new Date().getTime()
    })
  },
  [ADD_WAITING_LIST_REQUEST]: (state: Object, action: Object): Object => ({ ...state, loadingAddToWaitingList: true }),
  [ADD_WAITING_LIST_SUCCESS]: (state: Object, action: Object): Object => ({ ...state,
    addedWaitingList: true,
    loadingAddToWaitingList: false }),
  [GET_REGISTRATION_PERIOD_LOADING]: (state: Object, action: Object): Object => {
    return Object.assign({}, state, {
      loading: true
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  periods: [],
  loading: false,
  loadingAddToWaitingList: false,
  addedWaitingList: false,
  lastUpdated: null
}

export default function registrationPeriodReducer (state: Object = initialState, action: Object): Object {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
