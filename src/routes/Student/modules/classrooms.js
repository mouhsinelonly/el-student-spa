import request from 'superagent'
// import moment from 'moment'
import { APIBASE } from 'utils'
// import {showModal} from 'modules/modals'
import update from 'immutability-helper'
import laroute from 'utils/laroute.js'

// import {getSemesterEvents} from './semester_events'
// ------------------------------------
// Constants
// ------------------------------------
export const SET_CLASSROOMS_ACTIVE_PAGE = 'SET_CLASSROOMS_ACTIVE_PAGE'

export const TOGGLE_MODIFY_CLASSROOMS_CHOOSING = 'TOGGLE_MODIFY_CLASSROOMS_CHOOSING'

export const TOGGLE_DONE_CLASSROOMS_CHOOSING = 'TOGGLE_DONE_CLASSROOMS_CHOOSING'

export const GET_CLASSROOMS_EVENTS = 'GET_CLASSROOMS_EVENTS'
export const GET_CLASSROOMS_EVENTS_LOADING = 'GET_CLASSROOMS_EVENTS_LOADING'
export const GET_CLASSROOMS_EVENTS_SUCCESS = 'GET_CLASSROOMS_EVENTS_SUCCESS'

export const CHOOSE_CLASSROOM_REQUEST = 'CHOOSE_CLASSROOM_REQUEST'
export const CHOOSE_CLASSROOM_FAILURE = 'CHOOSE_CLASSROOM_FAILURE'
export const CHOOSE_CLASSROOM_SUCCESS = 'CHOOSE_CLASSROOM_SUCCESS'

export const EXIT_CLASSROOM_REQUEST = 'EXIT_CLASSROOM_REQUEST'
export const EXIT_CLASSROOM_FAILURE = 'EXIT_CLASSROOM_FAILURE'
export const EXIT_CLASSROOM_SUCCESS = 'EXIT_CLASSROOM_SUCCESS'

// ------------------------------------
// Actions
// ------------------------------------
//
export function setClassroomsActivePage (page = 0) {
  return {
    type: SET_CLASSROOMS_ACTIVE_PAGE,
    payload: page
  }
}
export function toggleDoneChoosingClassroom () {
  return {
    type: TOGGLE_DONE_CLASSROOMS_CHOOSING
  }
}
export function toggleModifyChoosingClassroom () {
  return {
    type: TOGGLE_MODIFY_CLASSROOMS_CHOOSING
  }
}
export function getClassroomsSuccess (data) {
  return {
    type: GET_CLASSROOMS_EVENTS_SUCCESS,
    payload: {
      data: data
    }
  }
}
export function getClassroomsLoading () {
  return {
    type: GET_CLASSROOMS_EVENTS_LOADING
  }
}

// export function showChooseClassrooms (classrooms) {
//   return function (dispatch, getState) {
//     const state = getState()
//     const momentServerTime = moment(state.serverdate)
//     const canChooseClassroom = classrooms.findIndex((e, key) => {
//       let eventStartat = moment(e.start_at)
//       let eventFinishAt = moment(e.finish_at)
//       return eventStartat.isBefore(momentServerTime) && eventFinishAt.isAfter(momentServerTime)
//     }) > -1
//     if (canChooseClassroom && state.modals.name !== 'paymentmodal') {
//       dispatch(showModal('choose_classroom'))
//     }
//   }
// }
//  start exit classroom
export function exitClassroom (classroomId = 0) {
  return (dispatch, getState) => {
    dispatch(exitClassroomRequest(classroomId))
    const state = getState()
    const token = state.auth.token
    return request.post(laroute.route('api.v1.student.classrooms.delete'))
     .set('Authorization', 'Bearer ' + token)
      .set('Accept', 'application/json')
      .send({ classroom_id: classroomId })
      .set('Content-Type', 'application/json')
    .then(res => {
      dispatch(exitClassroomSuccess(res.body))
    }).catch(err => {
      if (err) {
        dispatch(exitClassroomFailure())
      }
    })
  }
}

export function exitClassroomRequest (classroomId = 0) {
  return {
    type: EXIT_CLASSROOM_REQUEST,
    payload: classroomId
  }
}
export function exitClassroomFailure () {
  return {
    type: EXIT_CLASSROOM_FAILURE
  }
}
export function exitClassroomSuccess (classroom = {}) {
  return {
    type: EXIT_CLASSROOM_SUCCESS,
    payload: classroom
  }
}

// end choose classroom
//  start choose classroom
export function chooseClassroom (classroomId = 0) {
  return (dispatch, getState) => {
    dispatch(chooseClassroomRequest(classroomId))
    const state = getState()
    const token = state.auth.token
    return request.post(laroute.route('api.v1.student.classrooms.store'))
     .set('Authorization', 'Bearer ' + token)
      .set('Accept', 'application/json')
      .send({ classroom_id: classroomId })
      .set('Content-Type', 'application/json')
    .then(res => {
      dispatch(chooseClassroomSuccess(res.body))
    }).catch(err => {
      if (err) {
        dispatch(chooseClassroomFailure())
      }
    })
  }
}

export function chooseClassroomRequest (classroomId = 0) {
  return {
    type: CHOOSE_CLASSROOM_REQUEST,
    payload: classroomId
  }
}
export function chooseClassroomFailure () {
  return {
    type: CHOOSE_CLASSROOM_FAILURE
  }
}
export function chooseClassroomSuccess (classrooms = []) {
  return {
    type: CHOOSE_CLASSROOM_SUCCESS,
    payload: classrooms
  }
}

// end choose classroom
export function getClassrooms () {
  return function (dispatch, getState) {
    const state = getState()
    const token = state.auth.token
    dispatch(getClassroomsLoading())
    let lastUpdated = state.classrooms.lastUpdated
    if (lastUpdated !== null) {
      const now = new Date()
      const dif = lastUpdated - now.getTime()
      const secondsFrom = dif / 1000
      const secondsBetween = Math.abs(secondsFrom)
      if (secondsBetween <= (60 * 60)) {
        dispatch(getClassroomsSuccess(state.classrooms.data))
        // dispatch(getSemesterEvents())
        return {}
      }
    }

    return request.get(`${APIBASE}/api/classrooms/all`)
      .set('Authorization', 'Bearer ' + token)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        if (!err && res.ok) {
          dispatch(getClassroomsSuccess(res.body))
          // dispatch(getSemesterEvents())
        } else {

        }
      })
  }
}

export const actions = {
  getClassrooms,
  chooseClassroom,
  exitClassroom,
  toggleModifyChoosingClassroom
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_CLASSROOMS_EVENTS]: (state, action) => Object.assign({}, state, {
    data: [],
    loading: true
  }),
  [GET_CLASSROOMS_EVENTS_SUCCESS]: (state, action) => {
    return Object.assign({}, state, {
      data: action.payload.data,
      loading: false,
      lastUpdated: new Date().getTime()
    })
  },
  [GET_CLASSROOMS_EVENTS_LOADING]: (state, action) => {
    return Object.assign({}, state, {
      loading: true
    })
  },
  [SET_CLASSROOMS_ACTIVE_PAGE]: (state, action) => {
    return Object.assign({}, state, {
      page: action.payload
    })
  },
  [CHOOSE_CLASSROOM_REQUEST]: (state, action) => {
    return Object.assign({}, state, {
      runningactionids: update(state.runningactionids, { $push: [action.payload] })
    })
  },
  [CHOOSE_CLASSROOM_FAILURE]: (state, action) => {
    return Object.assign({}, state, {
      runningactionids: update(state.runningactionids, { $push: [action.payload] })
    })
  },
  [CHOOSE_CLASSROOM_SUCCESS]: (state, action) => {
    const newData = state.data.map(s => {
      const classroomIndex = s.findIndex(c => c.subject_subject_id ===
        action.payload.find((p, i) => i === 0).subject_subject_id)
      return classroomIndex > -1 ? action.payload : s
    })
    // console.log(newData)
    return Object.assign({}, state, {
      data: newData,
      runningactionids: update(state.runningactionids,
        { $splice: [[state.runningactionids.findIndex(r => action.payload.id), 1]] })
    })
  },
  [EXIT_CLASSROOM_REQUEST]: (state, action) => {
    return Object.assign({}, state, {
      runningactionids: update(state.runningactionids, { $push: [action.payload] })
    })
  },
  [EXIT_CLASSROOM_FAILURE]: (state, action) => {
    return Object.assign({}, state, {
      runningactionids: update(state.runningactionids, { $push: [action.payload] })
    })
  },
  [TOGGLE_DONE_CLASSROOMS_CHOOSING]: (state, action) => {
    return Object.assign({}, state, {
      done: !state.done,
      page: 0,
      modify: true
    })
  },
  [TOGGLE_MODIFY_CLASSROOMS_CHOOSING]: (state, action) => {
    return Object.assign({}, state, {
      done: false,
      page: -1,
      modify: !state.modify
    })
  },
  [EXIT_CLASSROOM_SUCCESS]: (state, action) => {
    const newData = state.data.map(s => {
      const classroomIndex = s.findIndex(c => c.id === action.payload.id)
      return classroomIndex > -1 ? update(s, { $splice: [[classroomIndex, 1, action.payload]] }) : s
    })
    // console.log(newData)
    return Object.assign({}, state, {
      data: newData,
      runningactionids: update(state.runningactionids,
        { $splice: [[state.runningactionids.findIndex(r => action.payload.id), 1]] })
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  data: [],
  done: false,
  loading: false,
  lastUpdated: null,
  page: -1,
  modify: false,
  runningactionids: []
}

export default function classroomsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
