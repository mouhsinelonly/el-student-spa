// @flow
import request from 'superagent'
import { APIBASE } from 'utils'

// ------------------------------------
// Constants
// ------------------------------------
export const GET_COUNTRIES = 'countries.GET_COUNTRIES'
export const GET_COUNTRIES_LOADING = 'countries.GET_COUNTRIES_LOADING'
export const GET_COUNTRIES_SUCCESS = 'countries.GET_COUNTRIES_SUCCESS'

// ------------------------------------
// Actions
// ------------------------------------

export function getCountriesSuccess (response: Object): Object {
  return {
    type: GET_COUNTRIES_SUCCESS,
    payload: {
      data: response
    }
  }
}

export function getCountriesLoading (): Object {
  return {
    type: GET_COUNTRIES_LOADING
  }
}

export function getCountries (id: number = 0): Object {
  return function (dispatch: Function, getState: Function): Object {
    const state = getState()
    dispatch(getCountriesLoading())
    let lastUpdated = state.countries.lastUpdated
    if (lastUpdated !== null) {
      const now = new Date()
      const dif = lastUpdated - now.getTime()
      const secondsFrom = dif / 1000
      const secondsBetween = Math.abs(secondsFrom)
      if (secondsBetween <= (60 * 60)) {
        // dispatch(getCountriesSuccess(state.countries.data))
        // dispatch(showChooseClassrooms(state.vlogs.active))
        return {}
      }
    }

    return request.get(APIBASE + '/api/lists/countries')
         .set('Accept', 'application/json')
         .set('Content-Type', 'application/json')
          .then((response: Object) => {
            try {
              dispatch(getCountriesSuccess(response.body))
            } catch (e) {
            }
          })
          .catch((error: Object) => {
                // dispatch(loginUserFailure(error))
          })
  }
}

export const actions = {
  getCountries
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_COUNTRIES]: (state: Object, action: Object): Object => Object.assign({}, state, {
    data: [],
    loading: true
  }),
  [GET_COUNTRIES_SUCCESS]: (state: Object, action: Object): Object => {
    return Object.assign({}, state, {
      data: action.payload.data,
      loading: false,
      lastUpdated: new Date().getTime()
    })
  },
  [GET_COUNTRIES_LOADING]: (state: Object, action: Object): Object => {
    return Object.assign({}, state, {
      loading: true
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  data: [],
  loading: false,
  lastUpdated: null
}

export default function countriesReducer (state: Object = initialState, action: Object): Object {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
