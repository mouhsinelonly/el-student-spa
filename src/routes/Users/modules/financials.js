// @flow
import { APIBASE } from 'utils'
import request from 'superagent'
import update from 'immutability-helper'
import laroute from 'utils/laroute.js'

// ------------------------------------
// Constants
// ------------------------------------
export const GET_FINANCIALS_REQUEST = 'userstudents.GET_FINANCIALS_REQUEST'
export const GET_FINANCIALS_SUCCESS = 'userstudents.GET_FINANCIALS_SUCCESS'
export const GET_FINANCIALS_FAILURE = 'userstudents.GET_FINANCIALS_FAILURE'

// ------------------------------------
export const GET_INSTALLMENTS_REQUEST = 'userstudents.GET_INSTALLMENTS_REQUEST'
export const GET_INSTALLMENTS_SUCCESS = 'userstudents.GET_INSTALLMENTS_SUCCESS'
export const GET_INSTALLMENTS_FAILURE = 'userstudents.GET_INSTALLMENTS_FAILURE'

export const POST_INSTALLMENTS_SUCCESS = 'userstudents.POST_INSTALLMENTS_SUCCESS'
export const POST_INSTALLMENTS_REQUEST = 'userstudents.POST_INSTALLMENTS_REQUEST'

export const DELETE_INSTALLMENTS_SUCCESS = 'userstudents.DELETE_INSTALLMENTS_SUCCESS'
export const DELETE_INSTALLMENTS_REQUEST = 'userstudents.DELETE_INSTALLMENTS_REQUEST'

// ------------------------------------
// Actions
// ------------------------------------
//

// get financials
export function getFinancials (id: number): Function {
  return (dispatch: Function, getState: Function): Function => {
    const state = getState()
    const { financials } = state.user_financials
    if (financials[`student-${id}`]) {
      dispatch(getFinancialsSuccess(financials[`student-${id}`], id))
      return () => {}
    }
    const { usertoken: token } = state.auth

    dispatch(getFinancialsRequest())
    return request.get(`${APIBASE}/api/admin/financials/${id}`)
         .set('Accept', 'application/json')
         .set({ 'x-access-token': token })
         .set('Content-Type', 'application/json')
         .then((response: Object) => {
           try {
             dispatch(getFinancialsSuccess(response.body, id))
           } catch (e) {
           }
         })
  }
}

export function getFinancialsRequest (): Object {
  return {
    type: GET_FINANCIALS_REQUEST
  }
}

export function getFinancialsSuccess (data: Object = {}, id: number): Object {
  return {
    type: GET_FINANCIALS_SUCCESS,
    payload: {
      data,
      id
    }
  }
}
// get installments
export function getInstalments ({ id, reload = false }: Object): Function {
  return (dispatch: Function, getState: Function): Function => {
    const state = getState()
    const { installments } = state.user_financials
    if (installments[`student-${id}`] && !reload) {
      dispatch(getInstalmentsSuccess(installments[`student-${id}`], id))
      return () => {}
    }
    const { usertoken: token } = state.auth

    dispatch(getInstalmentsRequest())
    return request.get(`${APIBASE}/api/admin/student_installments/${id}`)
         .set('Accept', 'application/json')
         .set({ 'x-access-token': token })
         .set('Content-Type', 'application/json')
         .then((response: Object) => {
           try {
             dispatch(getInstalmentsSuccess(response.body, id))
           } catch (e) {
           }
         })
  }
}

function getInstalmentsRequest (): Object {
  return {
    type: GET_INSTALLMENTS_REQUEST
  }
}

function getInstalmentsSuccess (data: Object = {}, id: number): Object {
  return {
    type: GET_INSTALLMENTS_SUCCESS,
    payload: {
      data,
      id
    }
  }
}
// post installments
export function postInstallment ({ username, roleId, id }: Object): Function {
  return (dispatch: Function, getState: Function): Function => {
    const state = getState()
    const { usertoken: token } = state.auth
    dispatch(postInstallmentRequest())
    return request.post(laroute.route('api.financials.installments.storewithrole'))
         .set('Accept', 'application/json')
         .send({ role_id: roleId, student_list: username, ajax: 1 })
         .set('Authorization', 'Bearer ' + token)
         .set('Content-Type', 'application/json')
         .then((response: Object) => {
           try {
             dispatch(getInstalments({ id, reload :true }))
             dispatch(postInstallmentSuccess())
           } catch (e) {
             dispatch(postInstallmentSuccess())
           }
         }).catch(() => {
           dispatch(postInstallmentSuccess())
         })
  }
}

function postInstallmentRequest (): Object {
  return {
    type: POST_INSTALLMENTS_REQUEST
  }
}

function postInstallmentSuccess (data: Object = {}, id: number): Object {
  return {
    type: POST_INSTALLMENTS_SUCCESS
  }
}
// delete installments
export function deleteInstallment ({ id: studentId }: Object): Function {
  return (dispatch: Function, getState: Function): Function => {
    const state = getState()

    const { usertoken: token } = state.auth
    dispatch(deleteInstallmentRequest())
    return request.post(`${APIBASE}/api/admin/delete_installments/${studentId}`)
         .set('Accept', 'application/json')
         .set('Authorization', 'Bearer ' + token)
         .set('Content-Type', 'application/json')
         .then((response: Object) => {
           try {
             dispatch(getInstalments({ id: studentId, reload :true }))
             dispatch(deleteInstallmentSuccess())
           } catch (e) {
             dispatch(deleteInstallmentSuccess())
           }
         }).catch(() => {
           dispatch(deleteInstallmentSuccess())
         })
  }
}

function deleteInstallmentRequest (): Object {
  return {
    type: DELETE_INSTALLMENTS_REQUEST
  }
}

function deleteInstallmentSuccess (data: Object = {}, id: number): Object {
  return {
    type: DELETE_INSTALLMENTS_SUCCESS
  }
}

export const actions = {}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_FINANCIALS_REQUEST]: (state: Object, action: Object): Object => ({
    ...state,
    loading: true,
    activeStudentFinancials: []
  }),
  [GET_FINANCIALS_SUCCESS]: (state: Object, action: Object): Object => ({
    ...state,
    financials: update(state.financials, {
      [`student-${action.payload.id}`]: { $set: action.payload.data }
    }),
    activeStudentFinancials: action.payload.data,
    loading: false
  }),
  [GET_INSTALLMENTS_REQUEST]: (state: Object, action: Object): Object =>
    ({
      ...state,
      loadingInstallments: true,
      activeStudentInstallments: []
    }),
  [GET_INSTALLMENTS_SUCCESS]: (state: Object, action: Object): Object =>
    ({
      ...state,
      installments: {
        ...state.installments,
        [`student-${action.payload.id}`]: action.payload.data
      },
      loadingInstallments: false,
      activeStudentInstallments: action.payload.data
    }),
  [POST_INSTALLMENTS_SUCCESS]: (state: Object, action: Object): Object =>
    ({
      ...state,
      loadingInstallments: false,
    }),
  [POST_INSTALLMENTS_REQUEST]: (state: Object, action: Object): Object =>
    ({
      ...state,
      loadingInstallments: true,
    }),
  [DELETE_INSTALLMENTS_REQUEST]: (state: Object, action: Object): Object =>
    ({
      ...state,
      loadingInstallments: true,
    }),
  [DELETE_INSTALLMENTS_SUCCESS]: (state: Object, action: Object): Object =>
    ({
      ...state,
      loadingInstallments: false,
    })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  financials: {},
  installments: {},
  activeStudentFinancials: [],
  activeStudentInstallments: [],
  loading: false,
  loadingInstallments: true,
}

export default function userReducer (state: Object = initialState, action: Object): Object {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
