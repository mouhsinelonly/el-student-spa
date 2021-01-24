import request from 'superagent'
import { APIBASE } from 'utils'
import { showPaymentView, hidePaymentView, HIDE_PAYMENT_VIEW,
  PAYMENT_VIEW_PAYMENT_SUBMITTED } from 'modules/paymentview'
import update from 'immutability-helper'
import laroute from 'utils/laroute.js'

// ------------------------------------
// Constants
// ------------------------------------
export const GET_GRADES_LOADING = 'GET_GRADES_LOADING'
export const GET_GRADES_SUCCESS = 'GET_GRADES_SUCCESS'

export const GET_RESULTS_REQUEST = 'GET_RESULTS_REQUEST'
export const GET_SEMESTER_RESULTS_LOADING = 'GET_SEMESTER_RESULTS_LOADING'
export const GET_SEMESTER_RESULTS_SUCCESS = 'GET_SEMESTER_RESULTS_SUCCESS'

export const SET_STUDENT_GRADES_YEAR = 'SET_STUDENT_GRADES_YEAR'

export const TOGGLE_ADD_SUBJECT_TO_PLAINT = 'TOGGLE_ADD_SUBJECT_TO_PLAINT'

export const GET_PLAINT_PAYMENT_FIELDS_REQUEST = 'GET_PLAINT_PAYMENT_FIELDS_REQUEST'
export const GET_PLAINT_PAYMENT_FIELDS_SUCCESS = 'GET_PLAINT_PAYMENT_FIELDS_SUCCESS'

export const PLAINT_PAYMENT_RECEIVED = 'PLAINT_PAYMENT_RECEIVED'

export const PLAINT_FORM_CLICKED = 'PLAINT_FORM_CLICKED'

// ------------------------------------
// Actions
// ------------------------------------
//

export function setPlaintsPayment () {
  return function (dispatch) {
    dispatch(hidePaymentView())
    dispatch({
      type: PLAINT_PAYMENT_RECEIVED
    })
  }
}

export function setGradesYear (structureYearId = 0) {
  return {
    type: SET_STUDENT_GRADES_YEAR,
    payload: structureYearId
  }
}

export function paymentFormClicked () {
  return {
    type: PLAINT_FORM_CLICKED
  }
}

export function getResultsSuccess (data) {
  return {
    type: GET_SEMESTER_RESULTS_SUCCESS,
    payload: data
  }
}
function getResultsLoading () {
  return {
    type: GET_SEMESTER_RESULTS_LOADING
  }
}

export function toggleGradePlaint (id = 0, type = 'exam') {
  return {
    type: TOGGLE_ADD_SUBJECT_TO_PLAINT,
    payload: { id, type }
  }
}

export function getResults () {
  return function (dispatch, getState) {
    const state = getState()
    const token = state.auth.token
    dispatch(getResultsLoading())
    // let lastUpdated = state.grades.lastUpdatedResults
    // if (lastUpdated !== null && state.grades.results.length > 0) {
    //   const now = new Date()
    //   const dif = lastUpdated - now.getTime()
    //   const secondsFrom = dif / 1000
    //   const secondsBetween = Math.abs(secondsFrom)
    //   if (secondsBetween <= (60 * 60)) {
    //     dispatch(getResultsSuccess(state.grades.results))
    //     return {}
    //   }
    // }

    return request.get(APIBASE + '/api/grades/all')
       .set('Authorization', 'Bearer ' + token)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        if (!err && res.ok) {
          dispatch(getResultsSuccess(res.body))
        } else {

        }
      })
  }
}
export function getGradesSuccess (data) {
  return {
    type: GET_GRADES_SUCCESS,
    payload: {
      data: data
    }
  }
}
function getGradesLoading () {
  return {
    type: GET_GRADES_LOADING
  }
}

export function getGrades (reload = false) {
  return function (dispatch, getState) {
    const state = getState()
    const token = state.auth.token
    let lastUpdated = state.grades.lastUpdated
    if (lastUpdated !== null && state.grades.data.grades.length > 0 && !reload) {
      const now = new Date()
      const dif = lastUpdated - now.getTime()
      const secondsFrom = dif / 1000
      const secondsBetween = Math.abs(secondsFrom)
      if (secondsBetween <= (60 * 60)) {
        dispatch(getGradesSuccess(state.grades.data))
        return {}
      }
    }
    dispatch(getGradesLoading())
    return request.get(APIBASE + '/api/grades/terms')
       .set('Authorization', 'Bearer ' + token)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        if (!err && res.ok) {
          dispatch(getGradesSuccess(res.body))
        } else {

        }
      })
  }
}
export function getPaymentFieldsSuccess (data) {
  return {
    type: GET_PLAINT_PAYMENT_FIELDS_SUCCESS,
    payload: data
  }
}
function getPaymentFieldsLoading () {
  return {
    type: GET_PLAINT_PAYMENT_FIELDS_REQUEST
  }
}

export function getPaymentFields () {
  return function (dispatch, getState) {
    const state = getState()
    const token = state.auth.token
    dispatch(getPaymentFieldsLoading())
    return request.get(laroute.route('api.v1.student.payments.gradeplaint'))
      .set('Authorization', 'Bearer ' + token)
      .query({ 'subjects_ids[]': state.grades.plaintsids })
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        if (!err && res.ok) {
          dispatch(getPaymentFieldsSuccess(res.body))
          // console.log(res.body.fields, res.body.omanneturl)
          dispatch(showPaymentView(res.body.fields, res.body.omanneturl))
        } else {

        }
      })
  }
}

export const actions = {
  getGrades,
  paymentFormClicked,
  toggleGradePlaint,
  getPaymentFields
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_GRADES_SUCCESS]: (state, action) => {
    return Object.assign({}, state, {
      data: action.payload.data,
      loadinggrades: false,
      lastUpdated: new Date().getTime()
    })
  },
  [GET_GRADES_LOADING]: (state, action) => {
    return Object.assign({}, state, {
      loadinggrades: true
    })
  },
  [GET_SEMESTER_RESULTS_SUCCESS]: (state, action) => {
    return Object.assign({}, state, {
      results: action.payload,
      loadingresults: false,
      lastUpdatedResults: new Date().getTime()
    })
  },
  [GET_SEMESTER_RESULTS_LOADING]: (state, action) => {
    return Object.assign({}, state, {
      loadingresults: true
    })
  },
  [SET_STUDENT_GRADES_YEAR]: (state, action) => {
    return Object.assign({}, state, {
      currentyear: action.payload
    })
  },
  [GET_PLAINT_PAYMENT_FIELDS_SUCCESS]: (state, action) => {
    return Object.assign({}, state, {
      loadingpayment: false,
      paymentfields: action.payload.fields,
      omanneturl: action.payload.omanneturl
    })
  },
  [GET_PLAINT_PAYMENT_FIELDS_REQUEST]: (state, action) => {
    return Object.assign({}, state, {
      paymentclicked: false,
      loadingpayment: true
    })
  },
  [PLAINT_PAYMENT_RECEIVED]: (state, action) => {
    return Object.assign({}, state, {
      paymentclicked: false,
      loadingpayment: false,
      paymentfields: {},
      omanneturl: '',
      plaintsids: []
    })
  },
  [HIDE_PAYMENT_VIEW]: (state, action) => {
    return Object.assign({}, state, {
      paymentclicked: false,
      loadingpayment: false,
      paymentfields: {},
      omanneturl: '',
      plaintsids: []
    })
  },
  [PAYMENT_VIEW_PAYMENT_SUBMITTED]: (state, action) => {
    return Object.assign({}, state, {
      paymentclicked: true
    })
  },
  [TOGGLE_ADD_SUBJECT_TO_PLAINT]: (state, action) => {
    const currIndex = state.plaintsids.findIndex(i => i.id === action.payload.id && i.type === action.payload.type)
    if (currIndex > -1) {
      return Object.assign({}, state, {
        plaintsids: update(state.plaintsids, { $splice: [[currIndex, 1]] })
      })
    }
    return Object.assign({}, state, {
      plaintsids: update(state.plaintsids, { $push: [action.payload] })
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  data: {
    grades: [],
    gpas: []
  },
  results: [],
  currentyear: 0,
  plaintsids: [],
  loadinggrades: false,
  loadingresults: false,
  loadingpayment: false,
  paymentfields: {},
  omanneturl: '',
  paymentclicked: false,
  lastUpdated: null,
  lastUpdatedResults: null
}

export default function gradesReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
