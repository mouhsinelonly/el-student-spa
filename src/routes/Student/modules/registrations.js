// @flow
import request from 'superagent'
import { APIBASE } from 'utils'
import laroute from 'utils/laroute.js'

// ------------------------------------
// Constants
// ------------------------------------
export const GET_REGISTRATIONS_FILES_REQUEST = 'GET_REGISTRATIONS_FILES_REQUEST'
export const GET_REGISTRATIONS_FILES_SUCCESS = 'GET_REGISTRATION_FILES_SUCCESS'

export const STORE_REGISTRATION_FILES_REQUEST = 'STORE_REGISTRATION_FILES_REQUEST'
export const STORE_REGISTRATION_FILES_SUCCESS = 'STORE_REGISTRATION_FILES_SUCCESS'

// ------------------------------------
// Actions
// ------------------------------------
//

export function getFilesSuccess (files: Object): Object {
  return {
    type: GET_REGISTRATIONS_FILES_SUCCESS,
    payload: files
  }
}

export function getFilesRequest (): Object {
  return {
    type: GET_REGISTRATIONS_FILES_REQUEST
  }
}

export function getFiles (): Function {
  return function (dispatch: Function, getState: Function): Object {
    const state = getState()
    const { token } = state.auth
    dispatch(getFilesRequest())
    // let lastUpdatedFiles = state.registrations.lastUpdatedFiles
    // if (lastUpdatedFiles !== null) {
    //   const now = new Date()
    //   const dif = lastUpdatedFiles - now.getTime()
    //   const secondsFrom = dif / 1000
    //   const secondsBetween = Math.abs(secondsFrom)
    //   if (secondsBetween <= (60 * 60)) {
    //     dispatch(getFilesSuccess(state.registrations.files))
    //     return {}
    //   }
    // }

    return request.get(`${APIBASE}/api/students/registration/files`)
      .set('x-access-token', token)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end((err: Object, res: Object) => {
        if (!err && res.ok) {
          dispatch(getFilesSuccess(res.body))
        } else {}
      })
  }
}

export function storeFilesSuccess (): Object {
  return {
    type: STORE_REGISTRATION_FILES_SUCCESS
  }
}

export function storeFilesRequest (): Object {
  return {
    type: STORE_REGISTRATION_FILES_REQUEST
  }
}

export function storeFiles (files: Array<Object>, type: string = 'nid'): Function {
  return function (dispatch: Function, getState: Function): Object {
    const state = getState()
    const { token } = state.auth
    dispatch(storeFilesRequest())
    const req = request.post(laroute.route('api.v1.student.registration.upload_files'))
      .set('Authorization', `Bearer ${token}`)
      .field('type', type)
    files.map((f: Object, i: number) => {
      // console.log(f)
      req.attach(`files[${i}]`, f)
    })

    return req.end((err: Object, res: Object) => {
      if (!err && res.ok) {
        dispatch(storeFilesSuccess())
      } else {}
    })
  }
}

export const actions = {
  getFiles,
  storeFiles
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_REGISTRATIONS_FILES_REQUEST]: (state: Object, action: Object): Object => Object.assign({}, state, {
    loadingFiles: true
  }),
  [GET_REGISTRATIONS_FILES_SUCCESS]: (state: Object, action: Object): Object => {
    return Object.assign({}, state, {
      files: action.payload,
      loadingFiles: false,
      lastUpdatedFiles: new Date().getTime()
    })
  },
  [STORE_REGISTRATION_FILES_REQUEST]: (state: Object, action: Object): Object => Object.assign({}, state, {
    uploadingFiles: true
  }),
  [STORE_REGISTRATION_FILES_SUCCESS]: (state: Object, action: Object): Object => {
    return Object.assign({}, state, {
      uploadingFiles: false
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  files: [],
  uploadingFiles: false,
  loadingFiles: false,
  lastUpdatedFiles: null
}

export default function registrationsReducer (state: Object = initialState, action: Object): Object {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
