import request from 'superagent'
import update from 'immutability-helper'
import { addFileProgress, removeFileProgress, incrementFileProgress } from 'modules/upload'
import { browserHistory } from 'react-router'
import { loginUserSuccess } from 'routes/Auth/modules/auth'
import { networkError } from 'modules/network'
import { APIBASE } from 'utils'
import laroute from 'utils/laroute.js'

// ------------------------------------
// Constants
// ------------------------------------
export const SET_ACTIVE_PAGE = 'SET_ACTIVE_PAGE'

export const UPLOAD_SIGNUP_FILE_SUCCESS = 'UPLOAD_SIGNUP_FILE_SUCCESS'
export const UPLOAD_SIGNUP_FILE_REQUEST = 'UPLOAD_SIGNUP_FILE_REQUEST'
export const UPLOAD_SIGNUP_FILE_FAILURE = 'UPLOAD_SIGNUP_FILE_FAILURE'

export const GET_NATIONALITY_CITIES_SUCCESS = 'GET_NATIONALITY_CITIES_SUCCESS'
export const GET_NATIONALITY_CITIES_LOADING = 'GET_NATIONALITY_CITIES_LOADING'
export const GET_NATIONALITY_CITIES_FAILURE = 'GET_NATIONALITY_CITIES_FAILURE'

export const GET_NATIONALITY_STATES_SUCCESS = 'GET_NATIONALITY_STATES_SUCCESS'
export const GET_NATIONALITY_STATES_LOADING = 'GET_NATIONALITY_STATES_LOADING'
export const GET_NATIONALITY_STATES_FAILURE = 'GET_NATIONALITY_STATES_FAILURE'

export const GET_CONTACT_CITIES_SUCCESS = 'GET_CONTACT_CITIES_SUCCESS'
export const GET_CONTACT_CITIES_LOADING = 'GET_CONTACT_CITIES_LOADING'
export const GET_CONTACT_CITIES_FAILURE = 'GET_CONTACT_CITIES_FAILURE'

export const GET_CONTACT_STATES_SUCCESS = 'GET_CONTACT_STATES_SUCCESS'
export const GET_CONTACT_STATES_LOADING = 'GET_CONTACT_STATES_LOADING'
export const GET_CONTACT_STATES_FAILURE = 'GET_CONTACT_STATES_FAILURE'

export const GET_SOCIAL_CITIES_SUCCESS = 'GET_SOCIAL_CITIES_SUCCESS'
export const GET_SOCIAL_CITIES_LOADING = 'GET_SOCIAL_CITIES_LOADING'
export const GET_SOCIAL_CITIES_FAILURE = 'GET_SOCIAL_CITIES_FAILURE'

export const SEND_REGISTRATION_FORM_SUCCESS = 'SEND_REGISTRATION_FORM_SUCCESS'
export const SEND_REGISTRATION_FORM_LOADING = 'SEND_REGISTRATION_FORM_LOADING'
export const SEND_REGISTRATION_FORM_FAILURE = 'SEND_REGISTRATION_FORM_FAILURE'
// ------------------------------------
// Actions
// ------------------------------------
//

export function setActivePage (active = 0) {
  return {
    type: SET_ACTIVE_PAGE,
    payload: {
      active
    }
  }
}

export function uploadFileSuccess (file, index = 0) {
  return {
    type: UPLOAD_SIGNUP_FILE_SUCCESS,
    payload: {
      preview: file.attachments.thumb,
      id: file.id,
      type: file.type,
      index
    }
  }
}

export function uploadFileError () {
 return {
      type: UPLOAD_SIGNUP_FILE_FAILURE
    }
}

export function uploadFileRequest () {
 return {
      type: UPLOAD_SIGNUP_FILE_REQUEST
    }
}

export function uploadFile (files = [], type = '', index = 0) {
  return function (dispatch) {
    let req = request.post(laroute.route('api.v1.registration.upload'))
    dispatch(uploadFileRequest())
    dispatch(addFileProgress(type))
    files.forEach((file) => req.attach('file', file))
    req.field('type', type)
    .on('progress', (e) => {
      dispatch(incrementFileProgress(type, e.percent))
    })
    .end((err, res) =>{
      dispatch(removeFileProgress(type))

      if (res && res.ok) {
        dispatch(uploadFileSuccess(JSON.parse(res.text), index))
      } else {
        dispatch(uploadFileError())
      }
    })

    return req
  }
}

// social cities

export function getSocialCitiesSuccess (response) {
  return {
    type: GET_SOCIAL_CITIES_SUCCESS,
    payload: {
      data: response
    }
  }
}
export function getSocialCitiesLoading () {
  return {
    type: GET_SOCIAL_CITIES_LOADING
  }
}

export function getSocialCities (countryId = 0) {
  return function (dispatch, getState) {
    dispatch(getSocialCitiesLoading())
    return request.get(APIBASE + '/api/lists/cities')
    .query({ country_id: countryId })
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .end((err, res) => {
      if (!err && res.ok) {
        dispatch(getSocialCitiesSuccess(res.body))
      } else {

      }
    })
  }
}

// nationality cities

export function getNationalityCitiesSuccess (response) {
  return {
    type: GET_NATIONALITY_CITIES_SUCCESS,
    payload: {
      data: response
    }
  }
}
export function getNationalityCitiesLoading () {
  return {
    type: GET_NATIONALITY_CITIES_LOADING
  }
}

export function getNationalityCities (countryId = 0) {
  return function (dispatch, getState) {
    dispatch(getNationalityCitiesLoading())
    return request.get(APIBASE + '/api/lists/cities')
    .query({country_id: countryId})
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .end((err, res) => {
      if (!err && res.ok) {
        dispatch(getNationalityCitiesSuccess(res.body))
      } else {

      }
    })
  }
}

// nationality states

export function getNationalityStatesSuccess (response) {
  return {
    type: GET_NATIONALITY_STATES_SUCCESS,
    payload: {
      data: response
    }
  }
}
export function getNationalityStatesLoading () {
  return {
    type: GET_NATIONALITY_STATES_LOADING
  }
}

export function getNationalityStates (cityId = 0) {
  return function (dispatch) {
    dispatch(getNationalityStatesLoading())
    return request.get(APIBASE + '/api/lists/states')
    .query({city_id: cityId})
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
     .end((err, res) => {
       if (!err && res.ok) {
         dispatch(getNationalityStatesSuccess(res.body))
       } else {

       }
     })
  }
}

//
//
// // nationality cities

export function getContactCitiesSuccess (response) {
  return {
    type: GET_CONTACT_CITIES_SUCCESS,
    payload: {
      data: response
    }
  }
}
export function getContactCitiesLoading() {
  return {
    type: GET_CONTACT_CITIES_LOADING
  }
}

export function getContactCities (countryId = 0) {
  return function (dispatch, getState) {
    dispatch(getContactCitiesLoading())
    return request.get(APIBASE + '/api/lists/cities')
    .query({country_id: countryId})
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .end((err, res) => {
      if (!err && res.ok) {
        dispatch(getContactCitiesSuccess(res.body))
      } else {

      }
    })
  }
}

//

// nationality states

export function getContactStatesSuccess(response) {
  return {
    type: GET_CONTACT_STATES_SUCCESS,
    payload: {
      data:response
    }
  }
}
export function getContactStatesLoading () {
  return {
    type: GET_CONTACT_STATES_LOADING
  }
}

export function getContactStates (cityId = 0) {
  return function (dispatch) {
    dispatch(getContactStatesLoading())
    return request.get(APIBASE + '/api/lists/states')
    .query({city_id: cityId})
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
     .end((err, res) => {
       if (!err && res.ok) {
         dispatch(getContactStatesSuccess(res.body))
       } else {

       }
     })
  }
}

// nationality states

export function sendRegistrationFormSuccess (response) {
  return {
    type: SEND_REGISTRATION_FORM_SUCCESS,
    payload: {
      data: response
    }
  }
}
export function sendRegistrationFormFailure (errors = []) {
  return {
    type: SEND_REGISTRATION_FORM_FAILURE,
    payload: errors
  }
}
export function sendRegistrationFormLoading () {
  return {
    type: SEND_REGISTRATION_FORM_LOADING
  }
}

export function sendRegistrationForm (fields, files) {
  return function (dispatch) {
    dispatch(sendRegistrationFormLoading())
    return request.post(laroute.route('api.v1.registration.store'))
     .set('Accept', 'application/json')
     .set('Content-Type', 'application/json')
     .send(JSON.stringify(Object.assign(fields, { files })))
     .then((res, err) => {
       if (!err && res.ok) {
         dispatch(sendRegistrationFormSuccess(res.body))
         dispatch(loginUserSuccess(res.body.token, 'registrars'))
         browserHistory.push('registrar')
       } else {
         if (err.status === 500) {
           dispatch(networkError('وقع خلل اثناء تقديم طلبك لمرجو التواصل مع الإدارة'))
         } else if (err.status === 422) {
           dispatch(sendRegistrationFormFailure())
         } else {
           dispatch(sendRegistrationFormFailure(res.body))
         }
       }
     }).catch(err => {
       dispatch(sendRegistrationFormFailure(err.response.body))
     })
  }
}

export const actions = {
  setActivePage,
  uploadFile,
  getNationalityStates,
  getNationalityCities,
  getContactStates,
  getContactCities,
  sendRegistrationForm
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_ACTIVE_PAGE]: (state, action) => Object.assign({}, state, {
            active: action.payload.active
        }),
  [UPLOAD_SIGNUP_FILE_SUCCESS]: (state, action) => Object.assign({}, state, {
            files: update(state.files, {$push: [{preview: action.payload.preview,index:action.payload.index,id: action.payload.id, type: action.payload.type}]})
        }),
  [GET_NATIONALITY_CITIES_SUCCESS]: (state, action) => Object.assign({}, state, {
            nationalityCities: action.payload.data
        }),
  [GET_NATIONALITY_CITIES_LOADING]: (state, action) => Object.assign({}, state, {
            nationalityCities: [],
            nationalityStates:[]
        }),
  [GET_NATIONALITY_STATES_SUCCESS]: (state, action) => Object.assign({}, state, {
            nationalityStates: action.payload.data
        }),
  [GET_NATIONALITY_STATES_LOADING]: (state, action) => Object.assign({}, state, {
            nationalityStates: []
        }),
  [GET_CONTACT_CITIES_SUCCESS]: (state, action) => Object.assign({}, state, {
            contactCities: action.payload.data
        }),
  [GET_CONTACT_CITIES_LOADING]: (state, action) => Object.assign({}, state, {
            contactCities: [],
            contactStates:[]
        }),
  [GET_SOCIAL_CITIES_SUCCESS]: (state, action) => Object.assign({}, state, {
            socialCities: action.payload.data
        }),
  [GET_SOCIAL_CITIES_LOADING]: (state, action) => Object.assign({}, state, {
            socialCities: []
        }),
  [GET_CONTACT_STATES_SUCCESS]: (state, action) => Object.assign({}, state, {
            contactStates: action.payload.data
        }),
  [GET_CONTACT_STATES_LOADING]: (state, action) => Object.assign({}, state, {
            contactStates: []
        }),
  [SEND_REGISTRATION_FORM_LOADING]: (state, action) => Object.assign({}, state, {
            loading: true
        }),
  [SEND_REGISTRATION_FORM_SUCCESS]: (state, action) => Object.assign({}, state, {
            loading: false
        }),
  [SEND_REGISTRATION_FORM_FAILURE]: (state, action) => Object.assign({}, state, {
    loading: false,
    errors: action.payload
  })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  errors: {},
  active: 1,
  files: [],
  loading: false,
  nationalityCities: [],
  nationalityStates: [],
  contactStates: [],
  contactCities: [],
  socialCities: []
}

export default function formPageReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
