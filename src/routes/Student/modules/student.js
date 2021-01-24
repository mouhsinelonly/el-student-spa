// @flow
import { logout } from 'routes/Auth/modules/auth'
import { startSyncedDate } from './serverdate'
import { setPlaintsPayment } from './grades'
import { setSubjectHasPlaint } from './subjects'
import update from 'immutability-helper'
import request from 'superagent'
import { socket } from 'socket'
import { showModal } from 'modules/modals'
import { setWatchingElementId } from './element_video'
import { ticketNewReplyReceived, ticketIsSeen } from './tickets'
import { addFileProgress, removeFileProgress, incrementFileProgress } from 'modules/upload'
import { getActivePaymentSuccess } from './payments'
import { generateIssueSuccess } from './library'
import { APIBASE } from 'utils'
import JOYRIDES from 'utils/joyrides'
import laroute from 'utils/laroute.js'

// ------------------------------------
// Constants
// ------------------------------------
export const THESIS_SET_ALL_VISIBLE = 'students.THESIS_SET_ALL_VISIBLE'
export const GET_GENERAL_SETTINGS = 'students.GET_GENERAL_SETTINGS'

export const GET_SPECIALTIES_REQUEST = 'students.GET_SPECIALTIES_REQUEST'
export const GET_SPECIALTIES_SUCCESS = 'students.GET_SPECIALTIES_SUCCESS'

export const GET_STUDENT_CERTIFICATE_DAY_REQUEST = 'userstudents.GET_STUDENT_CERTIFICATE_DAY_REQUEST'
export const GET_STUDENT_CERTIFICATE_DAY_SUCCESS = 'userstudents.GET_STUDENT_CERTIFICATE_DAY_SUCCESS'

export const CHOOSE_CERTIFICATE_DAY_REQUEST = 'userstudents.CHOOSE_CERTIFICATE_DAY_REQUEST'
export const CHOOSE_CERTIFICATE_DAY_SUCCESS = 'userstudents.CHOOSE_CERTIFICATE_DAY_SUCCESS'

export const GET_TYPEFORMS_SUCCESS = 'students.GET_TYPEFORMS_SUCCESS'
export const GET_TYPEFORMS_REQUEST = 'students.GET_TYPEFORMS_REQUEST'

export const UPDATE_SPECIALTY_SUCCESS = 'students.UPDATE_SPECIALTY_SUCCESS'
export const UPDATE_SPECIALTY_REQUEST = 'students.UPDATE_SPECIALTY_REQUEST'

export const GET_STUDENT_PROFILE = 'students.GET_STUDENT_PROFILE'
export const GET_STUDENT_LOADING = 'students.GET_STUDENT_LOADING'
export const GET_STUDENT_SUCCESS = 'students.GET_STUDENT_SUCCESS'

export const UPDATE_STUDENT_PROFILE = 'students.UPDATE_STUDENT_PROFILE'
export const UPDATE_STUDENT_LOADING = 'students.UPDATE_STUDENT_LOADING'
export const UPDATE_STUDENT_SUCCESS = 'students.UPDATE_STUDENT_SUCCESS'

export const ADD_STUDENT_JOYRIDE_REQUEST = 'students.ADD_STUDENT_JOYRIDE_REQUEST'
export const ADD_STUDENT_JOYRIDE_FAILURE = 'students.ADD_STUDENT_JOYRIDE_FAILURE'
export const ADD_STUDENT_JOYRIDE_SUCCESS = 'students.ADD_STUDENT_JOYRIDE_SUCCESS'

export const UPLOAD_STUDENT_PHOTO_SUCCESS = 'students.UPLOAD_STUDENT_PHOTO_SUCCESS'
export const UPLOAD_STUDENT_PHOTO_REQUEST = 'students.UPLOAD_STUDENT_PHOTO_REQUEST'
export const UPLOAD_STUDENT_PHOTO_FAILURE = 'students.UPLOAD_STUDENT_PHOTO_FAILURE'
export const UPLOAD_STUDENT_PHOTO_RESET = 'students.UPLOAD_STUDENT_PHOTO_RESET'

export const SET_REMOTE_CALL_ID = 'students.SET_REMOTE_CALL_ID'

export const TOGGLE_CHOOSE_SPECIALTY = 'students.TOGGLE_CHOOSE_SPECIALTY'
export const TOGGLE_EDIT_SPECIALTY = 'students.TOGGLE_EDIT_SPECIALTY'
// ------------------------------------
// Actions
// ------------------------------------
// upload file
export function uploadPhotoSuccess (student, index = 0) {
  return {
    type: UPLOAD_STUDENT_PHOTO_SUCCESS,
    payload: student.photo
  }
}

export function toggleChooseSpecialty () {
  return {
    type: TOGGLE_CHOOSE_SPECIALTY
  }
}
export function toggleEdit () {
  return {
    type: TOGGLE_EDIT_SPECIALTY
  }
}

export function uploadPhotoError () {
  return {
    type: UPLOAD_STUDENT_PHOTO_FAILURE
  }
}
export function uploadReset () {
  return {
    type: UPLOAD_STUDENT_PHOTO_RESET
  }
}

export function uploadPhotoRequest () {
  return {
    type: UPLOAD_STUDENT_PHOTO_REQUEST
  }
}

export function uploadPhoto (files = [], type = '', index = 0) {
  return function (dispatch, getState) {
    const state = getState()
    const token = state.auth.token
    let req = request.post(laroute.route('api.v1.student.profile'))
    .set({ 'Authorization': 'Bearer ' + token })
    dispatch(uploadPhotoRequest())
    dispatch(addFileProgress(type))
    files.forEach((photo) => req.attach('photo', photo))
    req.field('type', type)
    .on('progress', (e) => {
      dispatch(incrementFileProgress(type, e.percent))
    })
    .end((err, res) => {
      if (res && res.ok) {
        const photo = res.body
        dispatch(removeFileProgress(type))
        dispatch(uploadPhotoSuccess(photo, index))
      } else {
        dispatch(uploadPhotoError())
      }
    })

    return req
  }
}

export function showPaymentModal (data = {}) {
  return function (dispatch, getState) {
    dispatch(showModal('paymentmodal', data, data.closable))
  }
}
export const listenForSockets = (id: number): Function => {
  const socketClient = socket({ userId: id, userType: 'student' })

  return (dispatch) => {
    socketClient.on(`student-channel-${id}:student-ticket-replied`, message => {
      dispatch(ticketNewReplyReceived(message.reply))
    })
    socketClient.on(`student-channel-${id}:watching_video`, message => {
      dispatch(setWatchingElementId(message.elementId))
    })

    socketClient.on(`student-channel-${id}:receive_call`, message => {
      dispatch(setRemoteCallId(message.userId))
    })

    socketClient.on(`student-channel-${id}:stop_call`, message => {
      dispatch(setRemoteCallId(0))
    })

    socketClient.on(`library-${id}:generated`, issue => {
      dispatch(generateIssueSuccess(issue))
    })

    socketClient.emit(`store_client_info`, { userId: id, type: 'student' })

    socketClient.on(`student-channel-${id}:user-seen-ticket`, message => {
      dispatch(ticketIsSeen(message.ticket_id))
    })
    socketClient.on(`student-channel-${id}:grade-plaint-paid`, message => {
      dispatch(setPlaintsPayment())
      dispatch(setSubjectHasPlaint(message.plaints))
    })
  }
}
// add student joyride
export function addStudentJoyride (slug: string = ''): Object {
  return function (dispatch: Function, getState: Function): Object {
    dispatch(addStudentJoyrideRequest())
    dispatch(addStudentJoyrideSuccess({ slug }))
    let token = getState().auth.token
    return request.post(`${APIBASE}/api/students/joyrides/store`)
      .set('x-access-token', token)
      .set('Accept', 'application/json')
      .send({ slug })
      .set('Content-Type', 'application/json')
      .end((err: Object, res: Object) => {
        if (!err && res.ok) {
          dispatch(addStudentJoyrideSuccess({ ...res.body, first_time: true }))
        } else {
          dispatch(addStudentJoyrideFailure())
        }
      })
  }
}

export function addStudentJoyrideRequest () {
  return {
    type: ADD_STUDENT_JOYRIDE_REQUEST
  }
}
export function addStudentJoyrideFailure () {
  return {
    type: ADD_STUDENT_JOYRIDE_FAILURE
  }
}
export function addStudentJoyrideSuccess (joyride) {
  return {
    type: ADD_STUDENT_JOYRIDE_SUCCESS,
    payload: joyride
  }
}
// choose days

function chooseDaySuccess (payload: Object): Function {
  return {
    type: CHOOSE_CERTIFICATE_DAY_SUCCESS,
    payload: payload
  }
}
function chooseDayLoading (): Function {
  return {
    type: CHOOSE_CERTIFICATE_DAY_REQUEST
  }
}

export function chooseDay ({ dayId }: Object): Function {
  return function (dispatch: Function, getState: Function): Function {
    dispatch(chooseDayLoading())
    const { auth: { token } } = getState()
    return request.post(`${APIBASE}/api/students/certificate_days`)
      .set('x-access-token', token)
      .set('Accept', 'application/json')
      .send({ dayId })
      .set('Content-Type', 'application/json')
      .end((err: Object, res: Object) => {
        if (!err && res.ok) {
          dispatch(chooseDaySuccess(res.body))
        }
      })
  }
}
// get student certificate days
export function getCertificateDaysSuccess (days: Object): Object {
  return {
    type: GET_STUDENT_CERTIFICATE_DAY_SUCCESS,
    payload: days
  }
}
export function getCertificateDaysRequest () {
  return {
    type: GET_STUDENT_CERTIFICATE_DAY_REQUEST
  }
}
export function getCertificateDays () {
  return function (dispatch, getState) {
    dispatch(getCertificateDaysRequest())
    let state = getState()
    let token = state.auth.token
    return request.get(`${APIBASE}/api/students/certificate_choose_day`)
      .set('x-access-token', token)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .then((res) => {
        if (res.ok) {
          dispatch(getCertificateDaysSuccess(res.body))
        }
      })
  }
}
// get settings
export function getSettings (): Function {
  return function (dispatch: Function, getState: Function): Function {
    let state = getState()
    let token = state.auth.token
    return request.get(`${APIBASE}/api/students/general_settings`)
      .set('x-access-token', token)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .then((res) => {
        if (res.ok) {
          dispatch(({
            type: GET_GENERAL_SETTINGS,
            payload: res.body
          }))
        }
      })
  }
}
// get student profile
export function getProfileSuccess (profile: Object): Object {
  return {
    type: GET_STUDENT_SUCCESS,
    payload: {
      profile: profile,
      loading: false
    }
  }
}
export function getProfileLoading () {
  return {
    type: GET_STUDENT_LOADING,
    payload: {
      profile: {},
      loading: true
    }
  }
}

export function getProfileExtra () {
  return function (dispatch, getState) {
    let state = getState()
    let token = state.auth.token
    return request.get(laroute.route('api.v1.student.profile'))
      .set('Authorization', 'Bearer ' + token)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .then((res) => {
        if (res.ok) {
          dispatch(getActivePaymentSuccess(res.body.activePayment))
          if (res.body.activePayment !== false &&
            !['ChooseSummerSubjects', 'covid', 'typeform'].includes(getState().modals.name)) {
            dispatch(showPaymentModal(res.body.activePayment))
          }
        }
      })
  }
}

export function getBooksInvoice () {
  return function (dispatch, getState) {
    let state = getState()
    let token = state.auth.token
    return request.get('https://admin.el-css.edu.om/api/v1/student/books_payments')
      .set('Authorization', 'Bearer ' + token)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .then((res) => {
        if (res.ok) {
          dispatch(getActivePaymentSuccess(res.body.activePayment))
          if (res.body.activePayment !== false &&
            !['ChooseSummerSubjects', 'covid', 'typeform'].includes(getState().modals.name)) {
            dispatch(showPaymentModal(res.body.activePayment))
          }
        }
      })
  }
}

export function setRemoteCallId (remoteId) {
  return {
    type: SET_REMOTE_CALL_ID,
    payload: {
      remoteId
    }
  }
}
export function setThesisAllVisible (visibility: boolean): Object {
  return {
    type: THESIS_SET_ALL_VISIBLE,
    payload: visibility
  }
}

export function getProfile (): Object {
  return function (dispatch: Function, getState: Function): Object {
    let token = getState().auth.token
    dispatch(getProfileLoading())
    return request.get(`${APIBASE}/api/students/profile`)
      .set('Authorization', 'Bearer ' + token)
      .query({ 'platform': 'web' })
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .then((res: Object): Object => {
        const { body } = res
        if (res.ok) {
          dispatch(getProfileSuccess(body))
          const shouldSwitchToCommunity = body.joyrides.findIndex((j: Object): boolean =>
            j.slug === JOYRIDES['redirect_to_community_vlog']) < 0
          if (shouldSwitchToCommunity) {
            dispatch(addStudentJoyride(JOYRIDES['redirect_to_community_vlog']))
          }
          if (body.amount < 0) {
            dispatch(getProfileExtra())
          }
          dispatch(startSyncedDate(body.server_date))
          dispatch(listenForSockets(body.id))
        } else {
          dispatch(logout())
        }

        return body
      }).catch((res: Object) => {
        dispatch(logout())
      })
  }
}
// post student profile
export function updateProfileSuccess (profile) {
  return {
    type: UPDATE_STUDENT_SUCCESS,
    payload: {
      profile: profile
    }
  }
}
export function updateProfileLoading () {
  return {
    type: UPDATE_STUDENT_LOADING
  }
}

export function updateProfile (values = {}) {
  return function (dispatch, getState) {
    let token = getState().auth.token
    dispatch(updateProfileLoading())
    return request.post(laroute.route('api.v1.student.profile.update'))
      .set('Authorization', 'Bearer ' + token)
      .send(values)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .then((res) => {
        if (res.ok) {
          dispatch(updateProfileSuccess(res.body))
          request.post(`${APIBASE}/api/students/password_updated`)
           .set('x-access-token', token)
           .set('Accept', 'application/json')
           .set('Content-Type', 'application/json')
           .send(values)
           .then(res => {})
        } else {
          dispatch(logout())
        }
      }).catch(res => {
        dispatch(logout())
      })
  }
}

// get specialties
export function getSpecialtiesSuccess (specialties = {}) {
  return {
    type: GET_SPECIALTIES_SUCCESS,
    payload: specialties
  }
}
export function getSpecialtiesLoading () {
  return {
    type: GET_SPECIALTIES_REQUEST
  }
}

export function getSpecialties () {
  return function (dispatch, getState) {
    let token = getState().auth.token
    dispatch(getSpecialtiesLoading())
    return request.get(`${APIBASE}/api/students/specialties`)
      .set('x-access-token', token)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .then((res) => {
        if (res.ok) {
          dispatch(getSpecialtiesSuccess(res.body))
        } else {
          dispatch(logout())
        }
      }).catch(res => {
        dispatch(logout())
      })
  }
}
// get specialties
export function getTypeFormsSuccess (specialties = {}) {
  return {
    type: GET_TYPEFORMS_SUCCESS,
    payload: specialties
  }
}
export function getTypeFormsLoading () {
  return {
    type: GET_TYPEFORMS_REQUEST
  }
}

export function getTypeForms () {
  return function (dispatch, getState) {
    let token = getState().auth.token
    dispatch(getTypeFormsLoading())
    return request.get(`${APIBASE}/api/students/typeform`)
      .set('x-access-token', token)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .then((res) => {
        if (res.ok) {
          if (typeof res.body.id !== 'undefined') {
            dispatch(showModal('typeform', { hi: true }, false))
          }
          dispatch(getTypeFormsSuccess(res.body))
        } else {
          dispatch(logout())
        }
      }).catch(res => {
        dispatch(logout())
      })
  }
}
// get specialties
export function setSpecialtySuccess (specialtyId = 0) {
  return {
    type: UPDATE_SPECIALTY_SUCCESS,
    payload: specialtyId
  }
}
export function setSpecialtyLoading () {
  return {
    type: UPDATE_SPECIALTY_REQUEST
  }
}

export function setSpecialty (specialtyId = 0, departmentId = 0) {
  return function (dispatch, getState) {
    let token = getState().auth.token
    dispatch(setSpecialtyLoading())
    return request.post(`${APIBASE}/api/students/update_specialty`)
      .set('x-access-token', token)
      .send({ specialty_id:specialtyId, department_id: departmentId })
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .then((res) => {
        if (res.ok) {
          dispatch(setSpecialtySuccess(res.body.specialty_id))
        } else {
          // dispatch(logout())
        }
      }).catch(res => {
        // dispatch(logout())
      })
  }
}

export const actions = {
  getProfile,
  getProfileSuccess,
  updateProfile
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [UPLOAD_STUDENT_PHOTO_SUCCESS]: (state, action) => Object.assign({}, state, {
    uploadingphoto: false,
    uploaddone: true,
    profile: update(state.profile, { $merge: { photo: action.payload, croped: 1 } })
  }),
  [UPLOAD_STUDENT_PHOTO_FAILURE]: (state, action) => Object.assign({}, state, {
    uploadingphoto: false
  }),
  [UPLOAD_STUDENT_PHOTO_RESET]: (state, action) => Object.assign({}, state, {
    uploadingphoto: false,
    uploaddone: false
  }),
  [UPLOAD_STUDENT_PHOTO_REQUEST]: (state, action) => Object.assign({}, state, {
    uploadingphoto: true
  }),
  [GET_STUDENT_PROFILE]: (state, action) => Object.assign({}, state, {
    profile: {},
    loading: true
  }),
  [GET_STUDENT_SUCCESS]: (state, action) => {
    return Object.assign({}, state, {
      profile: action.payload.profile,
      loading: action.payload.loading
    })
  },
  [GET_STUDENT_LOADING]: (state, action) => {
    return Object.assign({}, state, {
      'profile': action.payload.profile,
      loading: action.payload.loading
    })
  },
  [UPDATE_STUDENT_SUCCESS]: (state, action) => {
    return Object.assign({}, state, {
      'profile': action.payload.profile,
      loading: false
    })
  },
  [UPDATE_STUDENT_LOADING]: (state, action) => {
    return Object.assign({}, state, {
      loading: true
    })
  },
  [ADD_STUDENT_JOYRIDE_SUCCESS]: (state, action) => {
    return Object.assign({}, state, {
      profile: update(state.profile, { joyrides: { $push: [action.payload] } })
    })
  },
  [SET_REMOTE_CALL_ID]: (state, action) => {
    return Object.assign({}, state, {
      userId: action.payload.remoteId,
      callUrl: action.payload.url
    })
  },
  [GET_SPECIALTIES_REQUEST]: (state, action) => {
    return Object.assign({}, state, {
      loadingSpecialties: true
    })
  },
  [GET_SPECIALTIES_SUCCESS]: (state, action) => {
    return Object.assign({}, state, {
      loadingSpecialties: false,
      specialties: action.payload.specialties,
      chosenSpecialtyID: action.payload.chosen ? action.payload.chosen.specialty_id : 0,
      editSpecialtyVisible: !!action.payload.chosen
    })
  },
  [UPDATE_SPECIALTY_REQUEST]: (state, action) => {
    return Object.assign({}, state, {
      loadingSpecialties: true
    })
  },
  [UPDATE_SPECIALTY_SUCCESS]: (state, action) => {
    return Object.assign({}, state, {
      chosenSpecialtyID: action.payload,
      loadingSpecialties: false,
      editSpecialtyVisible: false,
      chooseSpecialtyVisible: true
    })
  },
  [TOGGLE_CHOOSE_SPECIALTY]: (state, action) => {
    return Object.assign({}, state, {
      chooseSpecialtyVisible: !state.chooseSpecialtyVisible,
      editSpecialtyVisible: false
    })
  },
  [TOGGLE_EDIT_SPECIALTY]: (state, action) => {
    return Object.assign({}, state, {
      editSpecialtyVisible: !state.editSpecialtyVisible
    })
  },
  [GET_TYPEFORMS_SUCCESS]: (state, action) => {
    return Object.assign({}, state, {
      typeform: action.payload
    })
  },
  [GET_TYPEFORMS_REQUEST]: (state, action) => {
    return Object.assign({}, state, {
      typeform: {}
    })
  },
  [GET_GENERAL_SETTINGS]: (state: Object, action: Object) => ({ ...state, settings: action.payload }),
  [CHOOSE_CERTIFICATE_DAY_SUCCESS]: (state, action) => ({ ...state, certificateDays: action.payload }),
  [GET_STUDENT_CERTIFICATE_DAY_SUCCESS]: (state, action) => ({ ...state, certificateDays: action.payload }),
  [GET_STUDENT_CERTIFICATE_DAY_REQUEST]: (state, action) => ({ ...state, certificateDays: {} }),
  [THESIS_SET_ALL_VISIBLE]: (state: Object, action: Object): Object =>
  ({ ...state, thesisAllVisible: action.payload })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  profile: {},
  isThesis: false,
  thesisAllVisible: false,
  loading: true,
  callUrl: '',
  typeform: {},
  uploadingphoto: false,
  uploaddone: false,
  userId: 0,
  certificateDays: {},
  loadingSpecialties: false,
  specialties: [],
  settings: {},
  chosenSpecialtyID: 0,
  editSpecialtyVisible: true,
  chooseSpecialtyVisible: false
}

export default function studentReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
