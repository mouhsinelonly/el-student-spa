// @flow
import { APIBASE } from 'utils'
import request from 'superagent'
import update from 'immutability-helper'
import { getStudentTickets } from './tickets'
import { getSessions } from './sessions'
import { getExams } from './exams'
import { getTilawaRecordings } from './tilawa'
import { getFinancials, getInstalments } from './financials'
import { getCart, getOrders } from './market'
import { getSessionsExcuses, getExamsExcuses } from './excuses'
// ------------------------------------
// Constants
// ------------------------------------
export const GET_STUDENT_REQUEST = 'userstudents.GET_STUDENT_REQUEST'
export const GET_STUDENT_SUCCESS = 'userstudents.GET_STUDENT_SUCCESS'
export const GET_STUDENT_FAILURE = 'userstudents.GET_STUDENT_FAILURE'

export const EXTEND_EXAM_TIME = 'userstudents.EXTEND_EXAM_TIME'

export const GET_FAILED_SUBJECTS_REQUEST = 'userstudents.GET_FAILED_SUBJECTS_REQUEST'
export const GET_FAILED_SUBJECTS_SUCCESS = 'userstudents.GET_FAILED_SUBJECTS_SUCCESS'
export const GET_FAILED_SUBJECTS_FAILURE = 'userstudents.GET_FAILED_SUBJECTS_FAILURE'

export const GET_RESEARCH_REQUEST = 'userstudents.GET_RESEARCH_REQUEST'
export const GET_RESEARCH_SUCCESS = 'userstudents.GET_RESEARCH_SUCCESS'
export const GET_RESEARCH_FAILURE = 'userstudents.GET_RESEARCH_FAILURE'

export const UPDATE_STUDENT_REQUEST = 'userstudents.UPDATE_STUDENT_REQUEST'
export const UPDATE_STUDENT_SUCCESS = 'userstudents.UPDATE_STUDENT_SUCCESS'
export const UPDATE_STUDENT_FAILURE = 'userstudents.UPDATE_STUDENT_FAILURE'

export const GET_STUDENT_SUBJECTS_REQUEST = 'userstudents.GET_STUDENT_SUBJECTS_REQUEST'
export const GET_STUDENT_SUBJECTS_SUCCESS = 'userstudents.GET_STUDENT_SUBJECTS_SUCCESS'
export const GET_STUDENT_SUBJECTS_FAILURE = 'userstudents.GET_STUDENT_SUBJECTS_FAILURE'

export const GET_GRADES_REQUEST = 'userstudents.GET_GRADES_REQUEST'
export const GET_GRADES_SUCCESS = 'userstudents.GET_GRADES_SUCCESS'
export const GET_GRADES_FAILURE = 'userstudents.GET_GRADES_FAILURE'

export const SET_ACTIVE_STUDENT_DETAILS = 'userstudents.SET_ACTIVE_STUDENT_DETAILS'

export const TOGGLE_VISIBLE_SUBJECT = 'userstudents.TOGGLE_VISIBLE_SUBJECT'

export const ADD_ONLINE_STUDENT = 'userstudents.ADD_ONLINE_STUDENT'
export const REMOVE_OFFLINE_STUDENT = 'userstudents.REMOVE_OFFLINE_STUDENT'

// ------------------------------------
// Actions
// ------------------------------------
//
export function setVisibleSubjects (status: string): Object {
  return {
    type: TOGGLE_VISIBLE_SUBJECT,
    payload: status
  }
}

export function addOnlineStudent (id: number): Object {
  return {
    type: ADD_ONLINE_STUDENT,
    payload: id
  }
}

export function removeOnlineStudent (id: number): Object {
  return {
    type: REMOVE_OFFLINE_STUDENT,
    payload: id
  }
}

export function setActiveStudentDetails (id: number): Object {
  return {
    type: SET_ACTIVE_STUDENT_DETAILS,
    payload: id
  }
}

export function getStudent (id: number, ticketID: number): Function {
  return (dispatch: Function, getState: Function): Function => {
    const state = getState()
    dispatch(getExams(id))
    dispatch(getFailedSubjects(id))
    dispatch(getResearch(id))
    dispatch(getGrades(id))
    dispatch(getSessions(id))
    dispatch(getTilawaRecordings(id))
    dispatch(getCart(id))
    dispatch(getOrders(id))
    dispatch(getFinancials(id))
    dispatch(getInstalments({ id }))
    dispatch(getSessionsExcuses(id))
    dispatch(getExamsExcuses(id))
    dispatch(getStudentTickets(id, ticketID))
    const { studentDetails } = state.user_students
    if (studentDetails[`student-${id}`]) {
      return () => {}
    }
    const { usertoken: token } = state.auth
    dispatch(getStudentRequest())
    return request.get(APIBASE + '/api/admin/students/one/' + id)
     .set('Accept', 'application/json')
     .set({ 'x-access-token': token })
     .set('Content-Type', 'application/json')
     .then((response: Object) => {
       try {
         dispatch(getStudentSuccess(response.body))
       } catch (e) {}
     })
  }
}

export function getStudentRequest (): Object {
  return {
    type: GET_STUDENT_REQUEST
  }
}

export function getStudentSuccess (data: Object = {}): Object {
  return {
    type: GET_STUDENT_SUCCESS,
    payload: data
  }
}

export function getFailedSubjects (id: number): Function {
  return (dispatch: Function, getState: Function): Function => {
    const state = getState()
    const { usertoken: token } = state.auth
    dispatch(getFailedSubjectsRequest())
    return request.get(`${APIBASE}/api/admin/students/fail_subjects/${id}`)
    .set('Accept', 'application/json')
    .set({ 'x-access-token': token })
    .set('Content-Type', 'application/json')
    .then((response: Object) => {
      try {
        dispatch(getFailedSubjectsSuccess(response.body))
      } catch (e) {}
    })
  }
}

export function extendExamTime ({ studentId, examId, minutes }: Object): Function {
  return (dispatch: Function, getState: Function): Function => {
    const state = getState()

    const { usertoken: token } = state.auth
    // console.log(studentId, examId, minutes)
    return request.post(`${APIBASE}/api/admin/extendexamtime`)
    .set('Accept', 'application/json')
    .send({
      student_id: studentId,
      minutes,
      exam_id: examId
    })
    .set({ 'x-access-token': token })
    .set('Content-Type', 'application/json')
    .then((response: Object) => {})
  }
}

export function getFailedSubjectsRequest (): Object {
  return {
    type: GET_FAILED_SUBJECTS_REQUEST
  }
}

export function getFailedSubjectsSuccess (data: Object = {}): Object {
  return {
    type: GET_FAILED_SUBJECTS_SUCCESS,
    payload: data
  }
}

export function getResearch (id: number): Function {
  return (dispatch: Function, getState: Function): Function => {
    const state = getState()
    const { usertoken: token } = state.auth
    dispatch(getResearchRequest())
    return request.get(`${APIBASE}/api/admin/students/research/${id}`)
    .set('Accept', 'application/json')
    .set({ 'x-access-token': token })
    .set('Content-Type', 'application/json')
    .then((response: Object) => {
      try {
        dispatch(getResearchSuccess(response.body))
      } catch (e) {}
    })
  }
}

export function getResearchRequest (): Object {
  return {
    type: GET_RESEARCH_REQUEST
  }
}

export function getResearchSuccess (data: Array<Object> = []): Object {
  return {
    type: GET_RESEARCH_SUCCESS,
    payload: data
  }
}

export function getGrades (id: number): Function {
  return (dispatch: Function, getState: Function): Function => {
    const state = getState()
    const { usertoken: token } = state.auth
    dispatch(getGradesRequest())
    return request.get(`${APIBASE}/api/admin/students/grades/${id}`)
    .set('Accept', 'application/json')
    .set({ 'x-access-token': token })
    .set('Content-Type', 'application/json')
    .then((response: Object) => {
      try {
        dispatch(getGradesSuccess(response.body))
      } catch (e) {}
    })
  }
}

export function getGradesRequest (): Object {
  return {
    type: GET_GRADES_REQUEST
  }
}

export function getGradesSuccess (data: Object = {}): Object {
  return {
    type: GET_GRADES_SUCCESS,
    payload: data
  }
}

export function updateStudent (id: number, values: Object): Function {
  return (dispatch: Function, getState: Function): Function => {
    const state = getState()
    const { usertoken: token } = state.auth
    dispatch(updateStudentRequest())
    return request.post(`${APIBASE}/api/admin/students/update/${id}`)
         .set('Accept', 'application/json')
         .send(values)
         .set({ 'x-access-token': token })
         .set('Content-Type', 'application/json')
          .then((response: Object) => {
            try {
              dispatch(updateStudentSuccess(response.body))
            } catch (e) {
            }
          })
  }
}

export function updateStudentRequest (): Object {
  return {
    type: UPDATE_STUDENT_REQUEST
  }
}

export function updateStudentSuccess (data: Object = {}): Object {
  return {
    type: UPDATE_STUDENT_SUCCESS,
    payload: data
  }
}

export function getStudentSubjects (id: number): Function {
  return (dispatch: Function, getState: Function): Function => {
    const state = getState()
    const { studentDetails } = state.user_students
    if (studentDetails[`student-${id}`]) {
      return () => {}
    }
    const { usertoken: token } = state.auth

    dispatch(getStudentSubjectsRequest())
    return request.get(`${APIBASE}/api/admin/students/subjects/${id}`)
         .set('Accept', 'application/json')
         .set({ 'x-access-token': token })
         .set('Content-Type', 'application/json')
          .then((response: Object) => {
            try {
              dispatch(getStudentSubjectsSuccess(response.body))
            } catch (e) {
            }
          })
  }
}

export function getStudentSubjectsRequest (): Object {
  return {
    type: GET_STUDENT_REQUEST
  }
}

export function getStudentSubjectsSuccess (data: Object = {}): Object {
  return {
    type: GET_STUDENT_SUCCESS,
    payload: data
  }
}

export const actions = {
  getStudent
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_STUDENT_REQUEST]: (state: Object, action: Object): Object => {
    return Object.assign({}, state, {
      loadingStudentDetails: true,
      activeStudentDetails: {}
    })
  },
  [TOGGLE_VISIBLE_SUBJECT]: (state: Object, action: Object): Object => {
    return Object.assign({}, state, {
      visibleSubjects: action.payload
    })
  },
  [UPDATE_STUDENT_REQUEST]: (state: Object, action: Object): Object => {
    return Object.assign({}, state, {
      updatingStudentDetails: true
    })
  },
  [UPDATE_STUDENT_SUCCESS]: (state: Object, action: Object): Object => {
    return Object.assign({}, state, {
      updatingStudentDetails: false
    })
  },
  [SET_ACTIVE_STUDENT_DETAILS]: (state: Object, action: Object): Object => {
    const activeStudentDetails = state.studentDetails[`student-${action.payload}`]
      ? state.studentDetails[`student-${action.payload}`]
      : {}
    return Object.assign({}, state, {
      activeStudentDetailsId: action.payload,
      activeStudentDetails
    })
  },
  [GET_STUDENT_SUCCESS]: (state: Object, action: Object): Object => {
    const activeStudentDetails = action.payload.id === state.activeStudentDetailsId ? action.payload : {}

    return Object.assign({}, state, {
      studentDetails: update(state.studentDetails, {
        [`student-${action.payload.id}`]: { $set: action.payload }
      }),
      activeStudentDetails,
      loadingStudentDetails: false
    })
  },
  [ADD_ONLINE_STUDENT]: (state: Object, action: Object): Object => {
    return Object.assign({}, state, {
      onlineIDS: update(state.onlineIDS, { $push: [action.payload] })
    })
  },
  [REMOVE_OFFLINE_STUDENT]: (state: Object, action: Object): Object => {
    const index = state.onlineIDS.findIndex((i: number): boolean => i === action.payload)
    return Object.assign({}, state, {
      onlineIDS: index >= 0 ? update(state.onlineIDS, { $splice: [[index, 1]] }) : state.onlineIDS
    })
  },
  [GET_FAILED_SUBJECTS_REQUEST]: (state: Object, action: Object): Object => Object.assign({}, state, {
    failedSubjects: [],
    failedSubjectsLoading: true
  }),
  [GET_FAILED_SUBJECTS_SUCCESS]: (state: Object, action: Object): Object => Object.assign({}, state, {
    failedSubjects: action.payload,
    failedSubjectsLoading: false
  }),
  [GET_RESEARCH_REQUEST]: (state: Object, action: Object): Object => Object.assign({}, state, {
    researches: [],
    researchesLoading: true
  }),
  [GET_RESEARCH_SUCCESS]: (state: Object, action: Object): Object => Object.assign({}, state, {
    researches: action.payload,
    researchesLoading: false
  }),
  [GET_GRADES_REQUEST]: (state: Object, action: Object): Object => Object.assign({}, state, {
    grades: [],
    gradesLoading: false
  }),
  [GET_GRADES_SUCCESS]: (state: Object, action: Object): Object => Object.assign({}, state, {
    grades: action.payload,
    gradesLoading: false
  })
}
// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  studentDetails: {},
  students: {},
  onlineIDS: [],
  activeStudentDetails: {},
  activeStudentDetailsId: 0,
  loadingStudentDetails: true,
  updatingStudentDetails: false,
  studentsLoading: true,
  subjects: {},
  visibleSubjects: 'study',
  failedSubjects: [],
  failedSubjectsLoading: false,
  grades: [],
  gradesLoading: false,
  researches: [],
  researchesLoading: false
}

export default function userReducer (state: Object = initialState, action: Object): Object {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
