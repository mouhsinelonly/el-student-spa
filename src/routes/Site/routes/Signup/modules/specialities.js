// @flow
import request from 'superagent'
import { networkError } from 'modules/network'
import { APIBASE } from 'utils'
// ------------------------------------
// Constants
// ------------------------------------
export const GET_SPECIALITIES = 'GET_SPECIALITIES'
export const SELECT_REGISTRATION_SPECIALITY = 'specialities.SELECT_REGISTRATION_SPECIALITY'
export const GET_SPECIALITIES_LOADING = 'GET_SPECIALITIES_LOADING'
export const GET_SPECIALITIES_SUCCESS = 'GET_SPECIALITIES_SUCCESS'
export const SHOW_SIGNUP_REQUIREMENTS = 'SHOW_SIGNUP_REQUIREMENTS'
export const HIDE_SIGNUP_REQUIREMENTS = 'HIDE_SIGNUP_REQUIREMENTS'
export const SET_ACTIVE_DEPARTMENT = 'SET_ACTIVE_DEPARTMENT'

// ------------------------------------
// Actions
// ------------------------------------
//

export function selectRegistrationSpecialtySuccess (id: number = 0): Object {
  return {
    type: SELECT_REGISTRATION_SPECIALITY,
    payload: {
      id
    }
  }
}
export function setActiveDepartment (index: number = 0): Object {
  return {
    type: SET_ACTIVE_DEPARTMENT,
    payload: {
      index
    }
  }
}

export function selectRegistrationSpecialty (id: number = 0): Object {
  return function (dispatch: Function, getState: Function) {
    const state = getState()
    if (state.specialities && !state.specialities.data.length) {
      dispatch(getSpecialities(id))
    } else {
      dispatch(selectRegistrationSpecialtySuccess(id))
    }
  }
}

export function showSignupRequirements (): Object {
  return {
    type: SHOW_SIGNUP_REQUIREMENTS
  }
}

export function hideSinupRequirements (): Object {
  return {
    type: HIDE_SIGNUP_REQUIREMENTS
  }
}

export function getSpecialitiesSuccess (response: string): Object {
  return {
    type: GET_SPECIALITIES_SUCCESS,
    payload: {
      data: response
    }
  }
}

export function getSpecialitiesLoading (): Object {
  return {
    type: GET_SPECIALITIES_LOADING
  }
}

export function getSpecialities (selectedID: number = 0): Object {
  return function (dispatch: Function, getState: Function) {
    const state = getState()
    if (state.specialities.data.length && !state.specialities.loading) {
      dispatch(getSpecialitiesSuccess(state.specialities.data))
    } else if (!state.specialities.loading) {
      dispatch(getSpecialitiesLoading())
      return request.get(`${APIBASE}/api/registration/specialties`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end((err: Object, res: Object) => {
        if (!err && res.ok) {
          dispatch(getSpecialitiesSuccess(res.body))
          dispatch(selectRegistrationSpecialtySuccess(selectedID))
        } else {
          dispatch(networkError('وقع خلل أثناء جلب التخصصات الدراسية ، المرجو إعادة المحاولة لاحقا'))
        }
      })
    }
  }
}

export const actions = {
  getSpecialities,
  showSignupRequirements,
  hideSinupRequirements,
  selectRegistrationSpecialty
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_SPECIALITIES]: (state: Object, action: Object): Object => Object.assign({}, state, {
    data: [],
    loading:true,
    selectedID:0
  }),
  [GET_SPECIALITIES_SUCCESS]: (state: Object, action: Object): Object => {
    return Object.assign({}, state, {
      data: action.payload.data,
      loading:false
    })
  },
  [GET_SPECIALITIES_LOADING]: (state: Object, action: Object): Object => {
    return Object.assign({}, state, {
      loading:true
    })
  },
  [SHOW_SIGNUP_REQUIREMENTS]: (state: Object, action: Object): Object => {
    return Object.assign({}, state, {
      isShowingRequirements:true
    })
  },
  [HIDE_SIGNUP_REQUIREMENTS]: (state: Object, action: Object): Object => {
    return Object.assign({}, state, {
      isShowingRequirements:false
    })
  },
  [SELECT_REGISTRATION_SPECIALITY]: (state: Object, action: Object): Object => {
    return Object.assign({}, state, {
      selectedID: parseInt(action.payload.id, 10),
      selectedSpecialty: state.data.find((s: Object): boolean => s.id === parseInt(action.payload.id, 10))
    })
  },
  [SET_ACTIVE_DEPARTMENT]: (state: Object, action: Object): Object => {
    return Object.assign({}, state, {
      activeDepartment:action.payload.index
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  data:[],
  loading:false,
  isShowingRequirements:false,
  selectedID:0,
  activeDepartment:0,
  selectedSpecialty:{}
}

export default function specialitiesReducer (state: Object = initialState, action: Object): Object {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
