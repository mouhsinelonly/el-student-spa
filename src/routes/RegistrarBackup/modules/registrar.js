import { networkError } from 'modules/network'
import request from 'superagent'
import update from 'immutability-helper'
import { addFileProgress, removeFileProgress, incrementFileProgress } from 'modules/upload'
import { socket } from 'socket'
import { browserHistory } from 'react-router'
// import jwtDecode from 'jwt-decode'
import { logout, loginUserSuccess } from 'routes/Auth/modules/auth'
import { showModal, closeModal } from 'modules/modals'
import { showPaymentView, hidePaymentView, HIDE_PAYMENT_VIEW } from 'modules/paymentview'
import laroute from 'utils/laroute.js'

// ------------------------------------
// Constants
// ------------------------------------
export const GET_REGISTRAR_PROFILE = 'GET_REGISTRAR_PROFILE'
export const GET_REGISTRAR_LOADING = 'GET_REGISTRAR_LOADING'
export const GET_REGISTRAR_SUCCESS = 'GET_REGISTRAR_SUCCESS'
export const GET_REGISTRAR_FAILURE = 'GET_REGISTRAR_FAILURE'

export const TOGGLE_EDITABLE_EMAIL_FORM = 'TOGGLE_EDITABLE_EMAIL_FORM'

export const SEND_EMAIL_VERIFICATION_LINK_LOADING = 'SEND_EMAIL_VERIFICATION_LINK_LOADING'
export const SEND_EMAIL_VERIFICATION_LINK_SUCCESS = 'SEND_EMAIL_VERIFICATION_LINK_SUCCESS'
export const SEND_EMAIL_VERIFICATION_LINK_FAILURE = 'SEND_EMAIL_VERIFICATION_LINK_FAILURE'

export const RECEIVE_EMAIL_VERIFIED = 'RECEIVE_EMAIL_VERIFIED'

export const REGISTRAR_STEP_CHANGED = 'REGISTRAR_STEP_CHANGED'

export const GET_REGISTRAR_FEES_REQUEST = 'GET_REGISTRAR_FEES_REQUEST'
export const GET_REGISTRAR_FEES_SUCCESS = 'GET_REGISTRAR_FEES_SUCCESS'

export const UPDATE_REGISTRAR_REQUEST = 'UPDATE_REGISTRAR_REQUEST'
export const UPDATE_REGISTRAR_SUCCESS = 'UPDATE_REGISTRAR_SUCCESS'
export const UPDATE_REGISTRAR_FAILURE = 'UPDATE_REGISTRAR_FAILURE'

export const GET_REGISTRAR_STUDENT_TOKEN_REQUEST = 'GET_REGISTRAR_STUDENT_TOKEN_REQUEST'
export const GET_REGISTRAR_STUDENT_TOKEN_SUCCESS = 'GET_REGISTRAR_STUDENT_TOKEN_SUCCESS'
export const GET_REGISTRAR_STUDENT_TOKEN_FAILURE = 'GET_REGISTRAR_STUDENT_TOKEN_FAILURE'

export const UPLOAD_REGISTRAR_FILE_SUCCESS = 'UPLOAD_REGISTRAR_FILE_SUCCESS'
export const UPLOAD_REGISTRAR_FILE_REQUEST = 'UPLOAD_REGISTRAR_FILE_REQUEST'
export const UPLOAD_REGISTRAR_FILE_FAILURE = 'UPLOAD_REGISTRAR_FILE_FAILURE'
// ------------------------------------
// Actions
// ------------------------------------
//
//

export function listenForSockets (id) {
  const socketClient = socket()
  return dispatch => {
    socketClient.on('registrar-channel-' + id + ':Modules\\Registration\\Events\\RegistrationEmailVerified', message => {
      dispatch(receiveEmailVerified())
      dispatch(closeModal())
    })
    socketClient.on(
      'registrar-channel-' + id + ':Modules\\Registration\\Events\\BroadCastRegistrationStepChanged',
      message => {
        dispatch(hidePaymentView())
        dispatch(stepChanged(message.histories, message.step, message.registration))
      }
    )
    socketClient.on('registrar-channel-' + id + ':fees-payed', message => {
      dispatch(updateRegistrarSuccess(message.registration))
      dispatch(hidePaymentView())
      setTimeout(() => {
        dispatch(closeModal())
      }, 3000)
    })
  }
}

export function getRegistrationFees () {
  return function (dispatch, getState) {
    dispatch(getRegistrationFeesRequest())
    const state = getState()
    const token = state.auth.registrartoken
    return request
      .get(laroute.route('api.v1.registrar.fees'))
      .set('Authorization', 'Bearer ' + token)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        if (!err && res.ok) {
          dispatch(showPaymentView(res.body.fields, res.body.omanneturl))
          dispatch(getRegistrationFeesSuccess())
        }
      })
  }
}

export function getRegistrationFeesRequest () {
  return {
    type: GET_REGISTRAR_FEES_REQUEST
  }
}

export function getRegistrationFeesSuccess (fields, link) {
  return {
    type: GET_REGISTRAR_FEES_SUCCESS
  }
}

export function stepChanged (histories = [], step = {}, registration = {}) {
  return {
    type: REGISTRAR_STEP_CHANGED,
    payload: {
      step,
      histories,
      profile: { transaction_uuid: registration.transaction_uuid }
    }
  }
}
// update registrar profile
export function getRegistrarStudentSuccess () {
  return {
    type: GET_REGISTRAR_STUDENT_TOKEN_SUCCESS
  }
}

export function getRegistrarStudentError () {
  return {
    type: GET_REGISTRAR_STUDENT_TOKEN_FAILURE
  }
}

export function getRegistrarStudentRequest () {
  return {
    type: GET_REGISTRAR_STUDENT_TOKEN_REQUEST
  }
}

export function loginToStudent () {
  return function (dispatch, getState) {
    dispatch(getRegistrarStudentRequest())
    const state = getState()
    const token = state.auth.registrartoken
    let req = request
      .post(laroute.route('api.v1.registrar.get_student'))
      .set({ Authorization: 'Bearer ' + token })
      .end((err, res) => {
        if (!err && res.ok) {
          // dispatch(getRegistrarStudentSuccess())
          const json = JSON.parse(res.text)
          // let decoded = jwtDecode(json)
          dispatch(loginUserSuccess(json.token))
          browserHistory.push('/student')
          dispatch(closeModal())
        } else {
          dispatch(getRegistrarStudentError())
        }
      })

    return req
  }
}
// update registrar profile
export function updateRegistrarSuccess (fields) {
  return {
    type: UPDATE_REGISTRAR_SUCCESS,
    payload: fields
  }
}

export function updateRegistrarError (errors = {}) {
  return {
    type: UPDATE_REGISTRAR_FAILURE,
    payload: errors
  }
}

export function updateRegistrarRequest () {
  return {
    type: UPDATE_REGISTRAR_REQUEST
  }
}

export function updateRegistrar (fields = {}) {
  return function (dispatch, getState) {
    dispatch(updateRegistrarRequest())
    const state = getState()
    const token = state.auth.registrartoken
    let req = request
      .post(laroute.route('api.v1.registrar.update'))
      .set({ Authorization: 'Bearer ' + token })
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send(fields)
      .end((err, res) => {
        if (res && res.ok) {
          dispatch(updateRegistrarSuccess(JSON.parse(res.text)))
        } else {
          dispatch(updateRegistrarError(res.body))
        }
      })

    return req
  }
}

// upload file
export function uploadFileSuccess (file, index = 0) {
  return {
    type: UPLOAD_REGISTRAR_FILE_SUCCESS,
    payload: file
  }
}

export function uploadFileError () {
  return {
    type: UPLOAD_REGISTRAR_FILE_FAILURE
  }
}

export function uploadFileRequest () {
  return {
    type: UPLOAD_REGISTRAR_FILE_REQUEST
  }
}

export function uploadFile (files = [], type = '', index = 0) {
  return function (dispatch, getState) {
    const state = getState()
    const token = state.auth.registrartoken
    let req = request.post(laroute.route('api.v1.registrar.upload')).set({ Authorization: 'Bearer ' + token })
    dispatch(uploadFileRequest())
    dispatch(addFileProgress(type))
    files.forEach(file => req.attach('file', file))
    req
      .field('type', type)
      .on('progress', e => {
        dispatch(incrementFileProgress(type, e.percent))
      })
      .end((err, res) => {
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

// send email verification link: //
export function sendEmailVerificationLink () {
  return (dispatch, getState) => {
    let state = getState()
    let token = state.auth.registrartoken
    dispatch(sendEmailVerificationLinkLoading())
    return request
      .get(laroute.route('api.v1.registrar.send_verification_email'))
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + token)
      .end((err, res) => {
        if (!err && res.ok) {
          dispatch(sendEmailVerificationLinkSuccess(res.body))
        } else {
          dispatch(sendEmailVerificationLinkFailure())
          if (res.status === 501) {
            dispatch(networkError('وقع خلل قم باعادة تحميل الصفحة'))
          }
        }
      })
  }
}

export function sendEmailVerificationLinkLoading () {
  return {
    type: SEND_EMAIL_VERIFICATION_LINK_LOADING
  }
}
export function sendEmailVerificationLinkSuccess () {
  return {
    type: SEND_EMAIL_VERIFICATION_LINK_SUCCESS
  }
}
export function sendEmailVerificationLinkFailure () {
  return {
    type: SEND_EMAIL_VERIFICATION_LINK_FAILURE
  }
}

export function receiveEmailVerified () {
  return {
    type: RECEIVE_EMAIL_VERIFIED
  }
}
export function toggleEditableEmail () {
  return {
    type: TOGGLE_EDITABLE_EMAIL_FORM
  }
}
// get profile //
export function getProfileSuccess (profile) {
  localStorage.setItem('registrar_profile', profile)
  return function (dispatch, getState) {
    const feesExemption = profile.histories.findIndex(h => h.step.fees_exemption === 1) >= 0
    const filesdone = profile.histories.findIndex(h => h.step.files_done === 1)
    const notCanceled = profile.registration_step_id !== 3 && profile.registration_step_id !== 15
    if (profile.fees_amount <= 0 && filesdone >= 0 && !feesExemption && notCanceled) {
      dispatch(showModal('RegistrationFees', {}, false, true))
    }
    dispatch({
      type: GET_REGISTRAR_SUCCESS,
      payload: {
        profile
      }
    })
  }
}
export function getProfileFailure (profile) {
  localStorage.removeItem('registrar_profile')
  localStorage.removeItem('token')
  return {
    type: GET_REGISTRAR_FAILURE
  }
}
export function getProfileLoading () {
  localStorage.removeItem('registrar_profile')
  return {
    type: GET_REGISTRAR_LOADING
  }
}

export function getProfile () {
  return function (dispatch, getState) {
    let state = getState()
    let token = state.auth.registrartoken
    // console.log(token)
    dispatch(getProfileLoading())
    return request
      .get(laroute.route('api.v1.registrar.profile'))
      .set('Authorization', 'Bearer ' + token)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        if (!err && res.ok) {
          if (
            res.body.transaction_uuid !== '' ||
            (typeof res.body.student !== 'undefined' && res.body.student !== null)
          ) {
            dispatch(showModal('payment'))
          }
          if (res.body.email_verified === 0) {
            dispatch(showModal('registrar_activate_email', {}, false, true))
          }
          dispatch(getProfileSuccess(res.body))
          dispatch(listenForSockets(res.body.id))
        } else {
          switch (err.status) {
            case 401:
              dispatch(networkError(`انتهت جلسة حسابك المرجو إعادة تسجيل الدخول - ${err.status}`))
              dispatch(logout())
              break
            case 500:
              dispatch(getProfileFailure())
              dispatch(networkError(`لم نتمكن من جلب بيانات الحساب ، حدثث خطأ ${err.status}`))
              break
          }
        }
      })
  }
}

export const actions = {
  getProfile,
  getProfileSuccess,
  sendEmailVerificationLink,
  updateRegistrar,
  loginToStudent
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_REGISTRAR_PROFILE]: (state, action) =>
    Object.assign({}, state, {
      profile: {},
      loading: true
    }),
  [GET_REGISTRAR_SUCCESS]: (state, action) => {
    return Object.assign({}, state, {
      profile: action.payload.profile,
      loading: false
    })
  },
  [UPDATE_REGISTRAR_REQUEST]: (state, action) => {
    return Object.assign({}, state, {
      updating: true,
      errors: {}
    })
  },
  [UPDATE_REGISTRAR_SUCCESS]: (state, action) => {
    return Object.assign({}, state, {
      profile: update(state.profile, { $merge: action.payload }),
      updating: false,
      updated: true,
      errors: {}
    })
  },
  [TOGGLE_EDITABLE_EMAIL_FORM]: (state, action) => {
    return Object.assign({}, state, {
      showeditableemail: !state.showeditableemail
    })
  },
  [UPDATE_REGISTRAR_FAILURE]: (state, action) => {
    return Object.assign({}, state, {
      updating: false,
      errors: action.payload
    })
  },
  [GET_REGISTRAR_LOADING]: (state, action) => {
    return Object.assign({}, state, {
      profile: {},
      loading: true
    })
  },
  [GET_REGISTRAR_FAILURE]: (state, action) =>
    Object.assign({}, state, {
      profile: {},
      loading: false
    }),
  [SEND_EMAIL_VERIFICATION_LINK_LOADING]: (state, action) =>
    Object.assign({}, state, {
      sendingVerification: true
    }),
  [SEND_EMAIL_VERIFICATION_LINK_SUCCESS]: (state, action) =>
    Object.assign({}, state, {
      sendingVerification: false,
      verficaitionSent: true
    }),
  [SEND_EMAIL_VERIFICATION_LINK_FAILURE]: (state, action) =>
    Object.assign({}, state, {
      sendingVerification: false,
      verficaitionSent: false,
      sendingError: true
    }),
  [RECEIVE_EMAIL_VERIFIED]: (state, action) =>
    Object.assign({}, state, {
      sendingVerification: false,
      verficaitionSent: false,
      sendingError: false,
      verificationReceived: true
    }),
  [REGISTRAR_STEP_CHANGED]: (state, action) =>
    Object.assign({}, state, {
      profile: update(state.profile, {
        $merge: action.payload.profile,
        step: { $set: action.payload.step },
        histories: { $set: action.payload.histories }
      })
    }),
  [UPLOAD_REGISTRAR_FILE_SUCCESS]: (state, action) => {
    return Object.assign({}, state, { profile: update(state.profile, { files: { $push: [action.payload] } }) })
  },
  [GET_REGISTRAR_FEES_REQUEST]: (state, action) => {
    return Object.assign({}, state, { loadingfees: true })
  },
  [GET_REGISTRAR_FEES_SUCCESS]: (state, action) => Object.assign({}, state, { loadingfees: false }),
  [HIDE_PAYMENT_VIEW]: (state, action) => Object.assign({}, state, { loading: false })
}
// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  profile: {},
  loading: true,
  loadingfees: false,
  updating: false,
  errors: {},
  updated: false,
  showeditableemail: false,
  sendingVerification: false,
  verficaitionSent: false,
  sendingError: false,
  verificationReceived: false
}

export default function registrarReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
