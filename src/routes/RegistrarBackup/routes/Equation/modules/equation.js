import { networkError } from 'modules/network'
import request from 'superagent'
import { addFileProgress, removeFileProgress, incrementFileProgress } from 'modules/upload'
import update from 'immutability-helper'
import { change, reset } from 'redux-form'
import laroute from 'utils/laroute.js'

// ------------------------------------
// Constants
// ------------------------------------
export const GET_EQUATION_SUBJECTS_REQUEST = 'GET_EQUATION_SUBJECTS_REQUEST'
export const GET_EQUATION_SUBJECTS_SUCCESS = 'GET_EQUATION_SUBJECTS_SUCCESS'
export const GET_EQUATION_SUBJECTS_FAILURE = 'GET_EQUATION_SUBJECTS_FAILURE'

export const ADD_EQUATION_SUBJECT_REQUEST = 'ADD_EQUATION_SUBJECT_REQUEST'
export const ADD_EQUATION_SUBJECT_SUCCESS = 'ADD_EQUATION_SUBJECT_SUCCESS'
export const ADD_EQUATION_SUBJECT_FAILURE = 'ADD_EQUATION_SUBJECT_FAILURE'

export const SHOW_ADD_EQUATION_FORM = 'SHOW_ADD_EQUATION_FORM'
export const HIDE_ADD_EQUATION_FORM = 'HIDE_ADD_EQUATION_FORM'

export const CHANGE_EQUATION_FORM_PAGE = 'CHANGE_EQUATION_FORM_PAGE'
export const SET_EQUATION_EDIT_ID = 'SET_EQUATION_EDIT_ID'

export const UPLOAD_REGISTRAR_EQUATION_FILE_SUCCESS = 'UPLOAD_REGISTRAR_EQUATION_FILE_SUCCESS'
export const UPLOAD_REGISTRAR_EQUATION_FILE_REQUEST = 'UPLOAD_REGISTRAR_EQUATION_FILE_REQUEST'
export const UPLOAD_REGISTRAR_EQUATION_FILE_FAILURE = 'UPLOAD_REGISTRAR_EQUATION_FILE_FAILURE'

export const EDIT_EQUATION_SUBJECT = 'EDIT_EQUATION_SUBJECT'
// ------------------------------------
// Actions
// ------------------------------------
//
//

export function editEquationSubject (subject = {}) {
  return (dispatch) => {
    dispatch(change('create_degree_subject', 'id', subject.id))
    dispatch(change('create_degree_subject', 'name', subject.name))
    dispatch(change('create_degree_subject', 'score', subject.score))
    dispatch(change('create_degree_subject', 'score_total', subject.score_total))
    dispatch(change('create_degree_subject', 'code', subject.code))
    dispatch(change('create_degree_subject', 'hours', subject.hours))
  }
}
// upload file
export function uploadFileSuccess (file, index = 0) {
  return {
    type: UPLOAD_REGISTRAR_EQUATION_FILE_SUCCESS,
    payload: file
  }
}

export function uploadFileError () {
  return {
    type: UPLOAD_REGISTRAR_EQUATION_FILE_FAILURE
  }
}

export function changeFormPage (page = 1) {
  return {
    type: CHANGE_EQUATION_FORM_PAGE,
    payload:page
  }
}

export function setEquationEditId (id = 1) {
  return {
    type: SET_EQUATION_EDIT_ID,
    payload:id
  }
}

export function setEquationEditFields (degree) {
  return (dispatch) => {
    dispatch(change('create_degree', 'id', degree.id))
    dispatch(change('create_degree', 'level', degree.level))
    dispatch(change('create_degree', 'grade', degree.grade))
    dispatch(change('create_degree', 'university', degree.university))
    degree.files.map((d, i) => {
      dispatch(change('create_degree', 'files[' + i + '].id', degree.files[i].id))
      dispatch(change('create_degree', 'files[' + i + '].attachments', degree.files[i].attachments))
      dispatch(change('create_degree', 'files[' + i + '].type', degree.files[i].type))
    })
    degree.subjects.map((d, i) => {
      dispatch(change('create_degree', 'subjects[' + i + '].id', degree.subjects[i].id))
      dispatch(change('create_degree', 'subjects[' + i + '].code', degree.subjects[i].code))
      dispatch(change('create_degree', 'subjects[' + i + '].score', degree.subjects[i].score))
      dispatch(change('create_degree', 'subjects[' + i + '].score_total', degree.subjects[i].score_total))
      dispatch(change('create_degree', 'subjects[' + i + '].hours', degree.subjects[i].hours))
      dispatch(change('create_degree', 'subjects[' + i + '].name', degree.subjects[i].name))
      dispatch(change('create_degree', 'subjects[' + i + '].status', degree.subjects[i].status))
    })
  }
}

export function uploadFileRequest () {
  return {
    type: UPLOAD_REGISTRAR_EQUATION_FILE_REQUEST
  }
}

export function uploadFile (files = [], type = '', index = 0) {
  return function (dispatch, getState) {
    const state = getState()
    const token = state.auth.token
    let req = request.post(laroute.route('api.v1.registrar.equations.files.store'))
    .set({ 'Authorization':'Bearer ' + token })
    dispatch(uploadFileRequest())
    dispatch(addFileProgress(type))
    files.forEach((file) => req.attach('file', file))
    req.field('type', type)
    .on('progress', (e) => {
      dispatch(incrementFileProgress(type, e.percent))
    })
    .end((err, res) => {
      if (!err && res && res.ok) {
        let file = JSON.parse(res.text)
        dispatch(removeFileProgress(type))
        dispatch(change('create_degree', 'files[' + state.registration_equation.files.length + '].type', file.type))
        dispatch(
          change('create_degree', 'files[' + state.registration_equation.files.length + '].id', file.id)
          )
        dispatch(change('create_degree', 'files[' + state.registration_equation.files.length + '].attachments',
          file.attachments))
        dispatch(uploadFileSuccess(file, index))
      } else {
        dispatch(uploadFileError())
      }
    })

    return req
  }
}

// show hide add equation form
export function showAddEquation () {
  return {
    type: SHOW_ADD_EQUATION_FORM
  }
}
export function hideAddEquation () {
  return {
    type: HIDE_ADD_EQUATION_FORM
  }
}
// get equation subjects //
export function getEquationSubjectsSuccess (degrees) {
  return {
    type: GET_EQUATION_SUBJECTS_SUCCESS,
    payload:degrees
  }
}

export function getEquationSubjectsFailure () {
  return {
    type: GET_EQUATION_SUBJECTS_FAILURE
  }
}

export function getEquationSubjectsLoading () {
  return {
    type: GET_EQUATION_SUBJECTS_REQUEST
  }
}

export function getEquationSubjects () {
  return function (dispatch, getState) {
    let state = getState()
    let token = state.auth.token
    dispatch(getEquationSubjectsLoading())
    return request.get(laroute.route('api.v1.registrar.equations.equations.index'))
      .set('Authorization', 'Bearer ' + token)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        if (!err && res.ok) {
          dispatch(getEquationSubjectsSuccess(res.body))
          if (res.body.length) {
            dispatch(changeFormPage(2))
            dispatch(setEquationEditId(res.body[0].id))
            dispatch(setEquationEditFields(res.body[0]))
          } else {
            dispatch(getEquationSubjectsFailure())
            switch (err.status) {
              case 500:
                dispatch(networkError('حدث خلل أثناء جلب المعادلات'))
                break
              case 401:
                dispatch(networkError('المرجو تسجيل الدخول لحسابك'))
                break
            }
          }
        }
      })
  }
}
// add equation subject //
export function addEquationSubjectSuccess (response) {
  return {
    type: ADD_EQUATION_SUBJECT_SUCCESS,
    payload:response.equation
  }
}

export function addEquationSubjectFailure () {
  return {
    type: ADD_EQUATION_SUBJECT_FAILURE
  }
}

export function addEquationSubjectLoading () {
  return {
    type: ADD_EQUATION_SUBJECT_REQUEST
  }
}

export function addEquationSubject (fields = {}) {
  return function (dispatch, getState) {
    let state = getState()
    let token = state.auth.token
    dispatch(addEquationSubjectLoading())
    return request.post(laroute.route('api.v1.registrar.equations.equations.store'))
      .set('Authorization', 'Bearer ' + token)
      .set('Accept', 'application/json')
      .send(JSON.stringify(fields))
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        if (!err && res.ok) {
          dispatch(reset('create_degree'))
          dispatch(reset('create_degree_subject'))
          dispatch(addEquationSubjectSuccess(res.body))
          dispatch(setEquationEditId(res.body.equation.id))
          dispatch(setEquationEditFields(res.body.equation))
        } else {
          dispatch(addEquationSubjectFailure())
          switch (err.status) {
            case 500:
              dispatch(networkError('حدث خلل أثناء إضافة الشهادة'))
              break
            case 401:
              dispatch(networkError('المرجو تسجيل الدخول لحسابك'))
              break
          }
        }
      })
  }
}

export const actions = {
  getEquationSubjects,
  showAddEquation,
  hideAddEquation,
  changeFormPage,
  addEquationSubject
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_EQUATION_SUBJECTS_REQUEST]: (state, action) => Object.assign({}, state, { degrees: [], loading: true }),
  [GET_EQUATION_SUBJECTS_SUCCESS]: (state, action) => Object.assign({},
    state, { degrees: action.payload, loading: false }),
  [GET_EQUATION_SUBJECTS_FAILURE]: (state, action) => Object.assign({}, state, { loading: false }),
  [SHOW_ADD_EQUATION_FORM]: (state, action) => Object.assign({}, state, { add_form:true }),
  [HIDE_ADD_EQUATION_FORM]: (state, action) => Object.assign({}, state, { add_form:false }),
  [CHANGE_EQUATION_FORM_PAGE]: (state, action) => Object.assign({}, state, { page:action.payload }),
  [SET_EQUATION_EDIT_ID]: (state, action) => Object.assign({}, state, { edit_id:action.payload }),
  [ADD_EQUATION_SUBJECT_SUCCESS]: (state, action) => {
    const index = state.degrees.findIndex(d => d.id === action.payload.id)
    return Object.assign({}, state, {
      degrees:index > -1 ? update(state.degrees,
        { $splice: [[index, 1, action.payload]] }) : update(state.degrees, { $push: [action.payload] }),
      loading:false,
      add_form:false,
      edit_form:false,
      page:2,
      edit_id:action.payload.id
    })
  },
  [ADD_EQUATION_SUBJECT_REQUEST]:(state, action) => Object.assign({}, state, { loading:true }),
  [ADD_EQUATION_SUBJECT_FAILURE]:(state, action) => Object.assign({}, state, { loading:false }),
  [UPLOAD_REGISTRAR_EQUATION_FILE_FAILURE]:(state, action) => Object.assign({}, state, { loading:false }),
  [UPLOAD_REGISTRAR_EQUATION_FILE_SUCCESS]: (state, action) => Object.assign({},
    state, { files: update(state.files, { $push :[action.payload] }) })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  page:1,
  degrees:[],
  files:[],
  loading:false,
  add_form:false,
  edit_form:false,
  edit_id:0
}

export default function equationSubjectsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
