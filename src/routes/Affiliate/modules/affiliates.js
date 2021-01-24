// @flow
import request from 'superagent'
import { APIBASE } from 'utils'
// ------------------------------------
// Constants
// ------------------------------------
export const GET_PROFILE_REQUEST = 'affilaites/GET_PROFILE_REQUEST'
export const GET_PROFILE_SUCCESS = 'affilaites/GET_PROFILE_SUCCESS'

export const GET_REGISTRATIONS_REQUEST = 'affilaites/GET_REGISTRATIONS_REQUEST'
export const GET_REGISTRATIONS_SUCCESS = 'affilaites/GET_REGISTRATIONS_SUCCESS'

export const GET_STATS_REQUEST = 'affilaites/GET_STATS_REQUEST'
export const GET_STATS_SUCCESS = 'affilaites/GET_STATS_SUCCESS'

export const UPDATE_PASSWORD_REQUEST = 'affilaites/UPDATE_PASSWORD_REQUEST'
export const UPDATE_PASSWORD_SUCCESS = 'affilaites/UPDATE_PASSWORD_SUCCESS'

export const GET_COMPLETE_SINGLE_REGISTRATION_REQUEST = 'affilaites/GET_COMPLETE_SINGLE_REGISTRATION_REQUEST'
export const GET_COMPLETE_SINGLE_REGISTRATION_SUCCESS = 'affilaites/GET_COMPLETE_SINGLE_REGISTRATION_SUCCESS'
export const GET_COMPLETE_SINGLE_REGISTRATION_CACHED = 'affilaites/GET_COMPLETE_SINGLE_REGISTRATION_CACHED'

export const GET_SEARCH_STEPS_REQUEST = 'affilaites/GET_SEARCH_STEPS_REQUEST'
export const GET_SEARCH_STEPS_SUCCESS = 'affilaites/GET_SEARCH_STEPS_SUCCESS'

export const SET_REGISTRATION_QUERY = 'affilaites/SET_REGISTRATION_QUERY'

export const SET_REGISTRATION_CURRENT_PAGE_REQUEST = 'affilaites/SET_REGISTRATION_CURRENT_PAGE_REQUEST'

export const RESET_REGISTRATIONS = 'affilaites/RESET_REGISTRATIONS'

export const SET_ACTIVE_REGISTRATION = 'affilaites/SET_ACTIVE_REGISTRATION'

export const GET_REGISTRATIONS_ADJACENT_SUCCESS = 'affilaites/GET_REGISTRATIONS_ADJACENT_SUCCESS'

// ------------------------------------
// Actions
// ------------------------------------
//

const RUNNING_REQUESTS_PAGES = []

export function setActiveRegistration (id: number = null): Object {
  return {
    type: SET_ACTIVE_REGISTRATION,
    payload: id
  }
}
// get search steps

export function getStepsSuccess (data: Object): Object {
  return {
    type: GET_SEARCH_STEPS_SUCCESS,
    payload: data
  }
}

export function getStepsRequest (): Object {
  return {
    type: GET_SEARCH_STEPS_REQUEST
  }
}

export function getSearchSteps (): Function {
  return function (dispatch: Function, getState: Function): Object {
    const state = getState()
    const { affiliatetoken } = state.auth
    dispatch(getStepsRequest())

    return request.get(`${APIBASE}/api/affiliates/steps`)
      .set('x-access-token', affiliatetoken)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end((err: Object, res: Object) => {
        if (!err && res.ok) {
          dispatch(getStepsSuccess(res.body))
        } else {}
      })
  }
}
// get stats
export function getStatsSuccess (data: Object): Object {
  return {
    type: GET_STATS_SUCCESS,
    payload: data
  }
}

export function getStatsRequest (): Object {
  return {
    type: GET_STATS_REQUEST
  }
}

export function getStats (): Function {
  return function (dispatch: Function, getState: Function): Object {
    const state = getState()
    const { affiliatetoken } = state.auth
    dispatch(getStatsRequest())

    return request.get(`${APIBASE}/api/affiliates/stats`)
      .set('x-access-token', affiliatetoken)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end((err: Object, res: Object) => {
        if (!err && res.ok) {
          dispatch(getStatsSuccess(res.body))
        } else {}
      })
  }
}

// get single registration
export function getSingleRegistrationSuccess (record: Object): Object {
  return {
    type: GET_COMPLETE_SINGLE_REGISTRATION_SUCCESS,
    payload: record
  }
}
export function getSingleFromCache (record: Object): Object {
  return {
    type: GET_COMPLETE_SINGLE_REGISTRATION_CACHED,
    payload: record
  }
}

export function getSingleRegistrationRequest (): Object {
  return {
    type: GET_COMPLETE_SINGLE_REGISTRATION_REQUEST
  }
}

export function getSingleRegistration (id: number = 0): Function {
  return function (dispatch: Function, getState: Function): Object {
    const state = getState()
    const { auth: { affiliatetoken }, affiliates: { fullRegistrations: { data: rows } } } = state
    dispatch(getSingleRegistrationRequest())
    if (rows !== null && typeof rows[`id-${id}`] !== 'undefined') {
      dispatch(getSingleFromCache(rows[`id-${id}`]))
      return
    }
    return request.get(`${APIBASE}/api/affiliates/find/${id}`)
      .set('x-access-token', affiliatetoken)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end((err: Object, res: Object) => {
        if (!err && res.ok) {
          dispatch(getSingleRegistrationSuccess(res.body))
        } else {}
      })
  }
}
// get profile
export function getProfileSuccess (profile: Object): Object {
  return {
    type: GET_PROFILE_SUCCESS,
    payload: profile
  }
}

export function getProfileRequest (): Object {
  return {
    type: GET_PROFILE_REQUEST
  }
}

export function getProfile (): Function {
  return function (dispatch: Function, getState: Function): Object {
    const state = getState()
    const { affiliatetoken } = state.auth
    dispatch(getProfileRequest())

    return request.get(`${APIBASE}/api/affiliates/profile`)
      .set('x-access-token', affiliatetoken)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end((err: Object, res: Object) => {
        if (!err && res.ok) {
          dispatch(getProfileSuccess(res.body))
        } else {}
      })
  }
}

export function updateProfileSuccess (): Object {
  return {
    type: UPDATE_PASSWORD_SUCCESS
  }
}

export function updateProfileRequest (): Object {
  return {
    type: UPDATE_PASSWORD_REQUEST
  }
}

export function updateProfile (fields: Object = {}): Function {
  return function (dispatch: Function, getState: Function): Object {
    const state = getState()
    const { affiliatetoken } = state.auth
    dispatch(updateProfileRequest())

    return request.post(`${APIBASE}/api/affiliates/update`)
      .set('x-access-token', affiliatetoken)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send(fields)
      .end((err: Object, res: Object) => {
        if (!err && res.ok) {
          dispatch(updateProfileSuccess(res.body))
        } else {}
      })
  }
}

export function setRegistrationsCurrentPage (page: number = 0): Object {
  return {
    type: SET_REGISTRATION_CURRENT_PAGE_REQUEST,
    payload: page
  }
}

export function setRegistrationQuery (query: Object, reset: boolean = false): Object {
  return {
    type: SET_REGISTRATION_QUERY,
    payload: { reset, query }
  }
}

export function resetRegistrations (): Object {
  return {
    type: RESET_REGISTRATIONS
  }
}

// get registrations
export function getRegistrationsSuccess (data: Object): Object {
  return {
    type: GET_REGISTRATIONS_SUCCESS,
    payload: data
  }
}

export function getRegistrationsRequest (): Object {
  return {
    type: GET_REGISTRATIONS_REQUEST
  }
}

export function getRegistrations (): Function {
  return function (dispatch: Function, getState: Function): Object {
    const state = getState()
    const { affiliatetoken } = state.auth
    const { query, data } = state.affiliates.registrations

    query.page > 1 && dispatch(getRegistrationsAdjacent(query.page - 1))
    dispatch(getRegistrationsAdjacent(query.page + 1))

    if (data && typeof data.rows[`page-${query.page}`] !== 'undefined') {
      dispatch(setRegistrationsCurrentPage(+query.page))
      return
    }
    dispatch(getRegistrationsRequest())
    return request.get(`${APIBASE}/api/affiliates/registrations`)
      .set('x-access-token', affiliatetoken)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .query(query)
      .end((err: Object, res: Object) => {
        if (!err && res.ok) {
          dispatch(getRegistrationsSuccess(res.body))
        } else {}
      })
  }
}

// get adjacent registrations silently
export function getRegistrationsAdjacentSuccess (data: Object): Object {
  return {
    type: GET_REGISTRATIONS_ADJACENT_SUCCESS,
    payload: data
  }
}

export function getRegistrationsAdjacent (page: number = 1): Function {
  return function (dispatch: Function, getState: Function): Object {
    const state = getState()
    const { affiliatetoken } = state.auth
    const { data, query } = state.affiliates.registrations
    if (data && typeof data.rows[`page-${page}`] !== 'undefined') {
      return
    }
    return request.get(`${APIBASE}/api/affiliates/registrations`)
      .set('x-access-token', affiliatetoken)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .query({ ...query, page })
      .end((err: Object, res: Object) => {
        if (!err && res.ok) {
          dispatch(getRegistrationsAdjacentSuccess(res.body))
        } else {}
      })
  }
}
export const actions = {}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_PROFILE_REQUEST]: (state: Object, action: Object): Object => {
    return ({ ...state, profile: { loading: true, data: null } })
  },
  [GET_PROFILE_SUCCESS]: (state: Object, action: Object): Object => {
    return ({ ...state, profile: { loading: false, data: action.payload } })
  },
  [SET_ACTIVE_REGISTRATION]: (state: Object, action: Object): Object => {
    return ({ ...state, activeRegistrationId: action.payload, activeFullRegistration: action.payload })
  },
  [UPDATE_PASSWORD_REQUEST]: (state: Object, action: Object): Object => {
    return ({ ...state, profile: { ...state.profile, loading: true } })
  },
  [UPDATE_PASSWORD_SUCCESS]: (state: Object, action: Object): Object => {
    return ({ ...state,
      profile: {
        loading: false,
        data: { ...state.profile.data, force_password_change: 0 }
      }
    })
  },
  [GET_STATS_REQUEST]: (state: Object, action: Object): Object => {
    return ({ ...state, stats: { loading: true } })
  },
  [GET_STATS_SUCCESS]: (state: Object, action: Object): Object => {
    return ({ ...state, stats: { loading: false, data: action.payload } })
  },
  [SET_REGISTRATION_QUERY]: (state: Object, action: Object): Object => {
    return ({ ...state,
      registrations: { ...state.registrations,
        query: {
          ...state.registrations.query,
          ...action.payload.query
        }
      } })
  },
  [GET_COMPLETE_SINGLE_REGISTRATION_REQUEST]: (state: Object, action: Object): Object => {
    return ({ ...state,
      activeRegistrationId: action.payload,
      fullRegistrations: {
        ...state.fullRegistrations,
        loading: true
      }
    })
  },
  [GET_COMPLETE_SINGLE_REGISTRATION_SUCCESS]: (state: Object, action: Object): Object => {
    return ({ ...state,
      fullRegistrations: {
        data: { ...state.fullRegistrations.data, [`id-${action.payload.id}`]: action.payload },
        loading: true
      },
      activeFullRegistration: action.payload
    })
  },
  [GET_COMPLETE_SINGLE_REGISTRATION_CACHED]: (state: Object, action: Object): Object => {
    return ({ ...state,
      activeFullRegistration: action.payload
    })
  },
  [GET_REGISTRATIONS_REQUEST]: (state: Object, action: Object): Object => {
    return ({ ...state, registrations: { ...state.registrations, loading: true } })
  },
  [GET_SEARCH_STEPS_SUCCESS]: (state: Object, action: Object): Object => {
    return ({ ...state, steps: { data: action.payload, loading: false } })
  },
  [GET_SEARCH_STEPS_REQUEST]: (state: Object, action: Object): Object => {
    return ({ ...state, steps: { ...state.steps, loading: true } })
  },
  [RESET_REGISTRATIONS]: (state: Object, action: Object): Object => {
    return ({ ...state, registrations: { ...state.registrations, data: null } })
  },
  [GET_REGISTRATIONS_SUCCESS]: (state: Object, action: Object): Object => {
    return ({ ...state,
      registrations: {
        ...state.registrations,
        loading: false,
        data: {
          ...state.registrations.data,
          ...action.payload,
          rows: { ...(state.registrations.data !== null ? state.registrations.data.rows : null),
            ...action.payload.rows }
        }
      } })
  },
  [GET_REGISTRATIONS_ADJACENT_SUCCESS]: (state: Object, action: Object): Object => {
    return ({ ...state,
      registrations: {
        ...state.registrations,
        data: {
          ...state.registrations.data,
          rows: { ...(state.registrations.data !== null ? state.registrations.data.rows : null),
            ...action.payload.rows }
        }
      } })
  },
  [SET_REGISTRATION_CURRENT_PAGE_REQUEST]: (state: Object, action: Object): Object => {
    return ({ ...state,
      registrations: {
        ...state.registrations,
        loading: false,
        data: { ...state.registrations.data,
          current_page: action.payload
        }
      } })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  profile: { loading: true, data: null, message: null },
  registrations: { loading: true, data: null, message: null, query: { page: 1, per_page: 10 } },
  stats: { loading: true, data: null },
  steps: { loading: true, data: null },
  fullRegistrations: { loading: true, data: null },
  activeRegistrationId: null,
  activeFullRegistration: null
}

export default function affiliatesReducer (state: Object = initialState, action: Object): Object {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
