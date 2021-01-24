import request from 'superagent'
import update from 'immutability-helper'
import { APIBASE } from 'utils'
import { addFileProgress, removeFileProgress, incrementFileProgress } from 'modules/upload'
import { browserHistory } from 'react-router'
import laroute from 'utils/laroute.js'

// ------------------------------------
// Constants
// ------------------------------------
export const GO_TO_EXAM_EXCUSE_STEP = 'GO_TO_EXAM_EXCUSE_STEP'

export const GO_TO_EXAM_COMPLAINT_STEP = 'GO_TO_EXAM_COMPLAINT_STEP'

export const TOGGLE_EXAM_EXCUSE_VISIBLE = 'TOGGLE_EXAM_EXCUSE_VISIBLE'

export const TOGGLE_EXAM_RESULT_VISIBLE = 'TOGGLE_EXAM_RESULT_VISIBLE'

export const ADD_EXAM_REASON_TO_COMPLAINT = 'ADD_EXAM_REASON_TO_COMPLAINT'

export const ADD_EXAM_REASON_TO_EXCUSE = 'ADD_EXAM_REASON_TO_EXCUSE'

export const TOGGLE_EXAM_SCHEDULE_VISIBLE = 'TOGGLE_EXAM_SCHEDULE_VISIBLE'

export const TOGGLE_ADD_EXAM_TO_EXUSES = 'TOGGLE_ADD_EXAM_TO_EXUSES'
export const TOGGLE_ALL_EXAM_TO_EXUSES = 'TOGGLE_ALL_EXAM_TO_EXUSES'

export const TOGGLE_ADD_EXAM_TO_COMPLAINTS = 'TOGGLE_ADD_EXAM_TO_COMPLAINTS'
export const TOGGLE_ALL_EXAM_TO_COMPLAINTS = 'TOGGLE_ALL_EXAM_TO_COMPLAINTS'

export const GET_STUDENT_EXAMS_REQUEST = 'GET_STUDENT_EXAMS_REQUEST'
export const GET_STUDENT_EXAMS_SUCCESS = 'GET_STUDENT_EXAMS_SUCCESS'

export const STORE_EXAM_RECORDING_PLAINT_REQUEST = 'exams/STORE_EXAM_RECORDING_PLAINT_REQUEST'
export const STORE_EXAM_RECORDING_PLAINT_SUCCESS = 'exams/STORE_EXAM_RECORDING_PLAINT_SUCCESS'

export const GET_RECORDING_PLAINTS_REQUEST = 'exams/GET_RECORDING_PLAINTS_REQUEST'
export const GET_RECORDING_PLAINTS_SUCCESS = 'exams/GET_RECORDING_PLAINTS_SUCCESS'

export const SEND_EXAM_EXCUSE_REQUEST = 'SEND_EXAM_EXCUSE_REQUEST'
export const SEND_EXAM_EXCUSE_SUCCESS = 'SEND_EXAM_EXCUSE_SUCCESS'

export const SEND_EXAM_COMPLAINT_REQUEST = 'SEND_EXAM_COMPLAINT_REQUEST'
export const SEND_EXAM_COMPLAINT_SUCCESS = 'SEND_EXAM_COMPLAINT_SUCCESS'

export const GET_DEMO_EXAM_REQUEST = 'exams.GET_DEMO_EXAM_REQUEST'
export const GET_DEMO_EXAM_SUCCESS = 'exams.GET_DEMO_EXAM_SUCCESS'

export const REQUEST_DEMO_EXAM_REQUEST = 'exams.REQUEST_DEMO_EXAM_REQUEST'
export const REQUEST_DEMO_EXAM_SUCCESS = 'exams.REQUEST_DEMO_EXAM_SUCCESS'

export const UPLOAD_EXAM_EXCUSE_SUCCESS = 'UPLOAD_EXAM_EXCUSE_SUCCESS'
export const UPLOAD_EXAM_EXCUSE_REQUEST = 'UPLOAD_EXAM_EXCUSE_REQUEST'
export const UPLOAD_EXAM_EXCUSE_FAILURE = 'UPLOAD_EXAM_EXCUSE_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------
//
// upload file
export function uploadFileSuccess (file, index = 0) {
  return {
    type: UPLOAD_EXAM_EXCUSE_SUCCESS,
    payload: {
      preview: file.preview,
      id: file.id,
      index
    }
  }
}

export function uploadFileError () {
  return {
    type: UPLOAD_EXAM_EXCUSE_FAILURE
  }
}

export function uploadFileRequest () {
  return {
    type: UPLOAD_EXAM_EXCUSE_REQUEST
  }
}

export function uploadFile (files = [], type = '', index = 0) {
  return function (dispatch, getState) {
    const state = getState()
    const token = state.auth.token
    let req = request.post(laroute.route('api.v1.exams.storeexcusefile'))
    .set({'Authorization': 'Bearer ' + token})
    dispatch(uploadFileRequest())
    dispatch(addFileProgress(type))
    files.forEach((file) => req.attach('file', file))
    req.field('type', type)
    .on('progress', (e) => {
      dispatch(incrementFileProgress(type, e.percent))
    })
    .end((err, res) => {
      if (res && res.ok) {
        const file = res.body
        dispatch(removeFileProgress(type))
        dispatch(uploadFileSuccess(file, index))
      } else {
        dispatch(uploadFileError())
      }
    })

    return req
  }
}
// add excuse reason
export function addExamComplaintReason (string = '') {
  return {
    type: ADD_EXAM_REASON_TO_COMPLAINT,
    payload: string
  }
}
export function addExamExcuseReason (string = '') {
  return {
    type: ADD_EXAM_REASON_TO_EXCUSE,
    payload: string
  }
}

export function goToExcuseStep (index = 1) {
  return {
    type: GO_TO_EXAM_EXCUSE_STEP,
    payload: index
  }
}
export function goToComplaintStep (index = 1) {
  return {
    type: GO_TO_EXAM_COMPLAINT_STEP,
    payload: index
  }
}
export function toggleScheduleVisible (id = 0) {
  return {
    type: TOGGLE_EXAM_SCHEDULE_VISIBLE,
    payload: id
  }
}
export function toggleAllExamExcuses (ids = []) {
  return {
    type: TOGGLE_ALL_EXAM_TO_EXUSES,
    payload: ids
  }
}
export function toggleExamExcuse (id = 0) {
  return {
    type: TOGGLE_ADD_EXAM_TO_EXUSES,
    payload: id
  }
}
export function toggleExcuseVisible (id = 0) {
  return {
    type: TOGGLE_EXAM_EXCUSE_VISIBLE,
    payload: id
  }
}
export function toggleAllExamComplaints (ids = []) {
  return {
    type: TOGGLE_ALL_EXAM_TO_COMPLAINTS,
    payload: ids
  }
}
export function toggleExamComplaint (id = 0) {
  return {
    type: TOGGLE_ADD_EXAM_TO_COMPLAINTS,
    payload: id
  }
}
export function toggleResultVisible (id = 0) {
  return {
    type: TOGGLE_EXAM_RESULT_VISIBLE,
    payload: id
  }
}

export function getExamsRequest () {
  return {
    type: GET_STUDENT_EXAMS_REQUEST
  }
}

export function getExamsSuccess (exams = []) {
  return {
    type: GET_STUDENT_EXAMS_SUCCESS,
    payload: exams
  }
}

export function getExams () {
  return function (dispatch, getState) {
    const state = getState()
    const token = state.auth.token
    dispatch(getExamsRequest())
    let lastUpdated = state.exams.lastUpdated
    if (lastUpdated !== null) {
      const now = new Date()
      const dif = lastUpdated - now.getTime()
      const secondsFrom = dif / 1000
      const secondsBetween = Math.abs(secondsFrom)
      if (secondsBetween <= (60 * 60)) {
        // dispatch(getExamsSuccess(state.exams.data))
        return {}
      }
    }

    return request.get(APIBASE + '/api/exams/all')
      .query({nq: 1, l: 60})
      .set('Authorization', 'Bearer ' + token)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        if (!err && res.ok) {
          dispatch(getExamsSuccess(res.body.exams))
        } else {

        }
      })
  }
}

export function getRecordingPlaintsRequest () {
  return {
    type: GET_RECORDING_PLAINTS_REQUEST
  }
}

export function getRecordingPlaintsSuccess (plaints = []) {
  return {
    type: GET_RECORDING_PLAINTS_SUCCESS,
    payload: plaints
  }
}

export function getRecordingPlaints () {
  return function (dispatch, getState) {
    const state = getState()
    const token = state.auth.token
    dispatch(getRecordingPlaintsRequest())
    return request.get(APIBASE + '/api/exams/recording_plaints')
      .set('x-access-token', token)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        if (!err && res.ok) {
          dispatch(getRecordingPlaintsSuccess(res.body))
        } else {

        }
      })
  }
}

export function storeRecordingPlaintRequest () {
  return {
    type: STORE_EXAM_RECORDING_PLAINT_REQUEST
  }
}

export function storeRecordingPlaintSuccess (plaint = {}) {
  return {
    type: STORE_EXAM_RECORDING_PLAINT_SUCCESS,
    payload: plaint
  }
}

export function storeRecordingPlaint (values = {}) {
  return function (dispatch, getState) {
    const state = getState()
    const token = state.auth.token
    dispatch(storeRecordingPlaintRequest())
    return request.post(APIBASE + '/api/exams/insert_recording_plaint')
      .set('x-access-token', token)
      .send(values)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        if (!err && res.ok) {
          dispatch(storeRecordingPlaintSuccess(res.body))
         browserHistory.push('/student/exams')
        } else {

        }
      })
  }
}

export function getDemoRequest () {
  return {
    type: GET_DEMO_EXAM_REQUEST
  }
}

export function getDemoSuccess (exam) {
  return {
    type: GET_DEMO_EXAM_SUCCESS,
    payload: exam
  }
}

export function getDemo () {
  return function (dispatch, getState) {
    const state = getState()
    const token = state.auth.token
    dispatch(getDemoRequest())
    let lastUpdatedDemo = state.exams.lastUpdatedDemo
    if (lastUpdatedDemo !== null) {
      const now = new Date()
      const dif = lastUpdatedDemo - now.getTime()
      const secondsFrom = dif / 1000
      const secondsBetween = Math.abs(secondsFrom)
      if (secondsBetween <= (60 * 60)) {
        dispatch(getDemoSuccess(state.exams.demo))
        return {}
      }
    }

    return request.get(APIBASE + '/api/exams/demo')
      .set('x-access-token', token)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        if (!err && res.ok) {
          dispatch(getDemoSuccess(res.body))
        } else {

        }
      })
  }
}

export function requestDemoRequest () {
  return {
    type: REQUEST_DEMO_EXAM_REQUEST
  }
}

export function requestDemoSuccess (exam) {
  return {
    type: REQUEST_DEMO_EXAM_SUCCESS,
    payload: exam
  }
}

export function requestDemo () {
  return function (dispatch, getState) {
    const state = getState()
    const token = state.auth.token
    dispatch(getDemoRequest())

    return request.get(APIBASE + '/api/exams/request_demo')
      .set('x-access-token', token)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        if (!err && res.ok) {
          dispatch(getDemoSuccess(res.body))
        } else {

        }
      })
  }
}

export function sendExamExcuseRequest () {
  return {
    type: SEND_EXAM_EXCUSE_REQUEST
  }
}

export function sendExamExcuseSuccess (response) {
  return {
    type: SEND_EXAM_EXCUSE_SUCCESS,
    payload: response
  }
}

export function sendExamExcuse () {
  return function (dispatch, getState) {
    dispatch(sendExamExcuseRequest())
    const state = getState()
    const token = state.auth.token
    return request.post(APIBASE + '/api/exams/excuse')
      .send({
        files: state.exams.excusefiles,
        reason: state.exams.excusereason,
        exams: state.exams.checkedexcuses
      })
      .set('x-access-token', token)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        if (!err && res.ok) {
          dispatch(sendExamExcuseSuccess(res.body))
        } else {
        }
      })
  }
}

export function sendExamComplaintRequest () {
  return {
    type: SEND_EXAM_COMPLAINT_REQUEST
  }
}

export function sendExamComplaintSuccess (response) {
  return {
    type: SEND_EXAM_COMPLAINT_SUCCESS,
    payload: response
  }
}

export function sendExamComplaint () {
  return function (dispatch, getState) {
    dispatch(sendExamComplaintRequest())
    const state = getState()
    const token = state.auth.token
    return request.post(APIBASE + '/api/exams/complaint')
      .send({
        exams: state.exams.checkedcomplaints,
        reason: state.exams.complaintreason
      })
      .set('x-access-token', token)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        if (!err && res.ok) {
          dispatch(sendExamComplaintSuccess(res.body))
        } else {}
      })
  }
}

export const actions = {
  getExams,
  toggleScheduleVisible
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [TOGGLE_EXAM_EXCUSE_VISIBLE]: (state, action) => {
    const currIndex = state.excusevisible.findIndex(i => i === action.payload)
    if (currIndex > -1) {
      return Object.assign({}, state, {
        excusevisible: update(state.excusevisible, {$splice: [[currIndex, 1]]}),
        schedulevisible: [],
        resultvisible: []
      })
    }
    return Object.assign({}, state, {
      excusevisible: update(state.excusevisible, {$push: [action.payload]}),
      schedulevisible: [],
      resultvisible: []
    })
  },
  [TOGGLE_EXAM_SCHEDULE_VISIBLE]: (state, action) => {
    const currIndex = state.schedulevisible.findIndex(i => i === action.payload)
    if (currIndex > -1) {
      return Object.assign({}, state, {
        schedulevisible: update(state.schedulevisible, {$splice: [[currIndex, 1]]}),
        excusevisible: [],
        resultvisible: []
      })
    }
    return Object.assign({}, state, {
      schedulevisible: update(state.schedulevisible, {$push: [action.payload]}),
      excusevisible: [],
      resultvisible: []
    })
  },
  [TOGGLE_EXAM_RESULT_VISIBLE]: (state, action) => {
    const currIndex = state.resultvisible.findIndex(i => i === action.payload)
    if (currIndex > -1) {
      return Object.assign({}, state, {
        resultvisible: update(state.resultvisible, { $splice: [[currIndex, 1]] }),
        excusevisible: [],
        schedulevisible: []
      })
    }
    return Object.assign({}, state, {
      resultvisible: update(state.resultvisible, { $push: [action.payload] }),
      excusevisible: [],
      schedulevisible: []
    })
  },
  [TOGGLE_ALL_EXAM_TO_EXUSES]: (state, action) => {
    return Object.assign({}, state, {
      checkedexcuses: action.payload
    })
  },
  [GET_RECORDING_PLAINTS_REQUEST]: (state, action) => {
    return Object.assign({}, state, {
      recordingPlaints: [],
      recordingPlaintsLoading: true
    })
  },
  [GET_RECORDING_PLAINTS_SUCCESS]: (state, action) => {
    return Object.assign({}, state, {
      recordingPlaints: action.payload,
      recordingPlaintsLoading: false
    })
  },
  [TOGGLE_ALL_EXAM_TO_COMPLAINTS]: (state, action) => {
    return Object.assign({}, state, {
      checkedcomplaints: action.payload
    })
  },
  [SEND_EXAM_EXCUSE_REQUEST]: (state, action) => {
    return Object.assign({}, state, {
      sendingexcuse: true
    })
  },
  [SEND_EXAM_COMPLAINT_REQUEST]: (state, action) => {
    return Object.assign({}, state, {
      sendingcomplaint: true
    })
  },
  [SEND_EXAM_EXCUSE_SUCCESS]: (state, action) => {
    const exams = state.data
    // console.log(action.payload.excuses, exams)
    for (const key of Object.keys(exams)) {
      const excuse = action.payload.excuses.find(e => e.exam_id === exams[key].id)
      // console.log(excuse)
      if (excuse) {
        exams[key].excuseStatus = excuse.status
      }
    }
    return Object.assign({}, state, {
      sendingexcuse: false,
      exams: exams,
      excusestep: 1,
      checkedexcuses: [],
      excusereason: '',
      excusefiles: []
    })
  },
  [SEND_EXAM_COMPLAINT_SUCCESS]: (state, action) => {
    const exams = state.data
    // console.log(action.payload.excuses, exams)
    for (const key of Object.keys(exams)) {
      const complaint = action.payload.find(e => e.exam_id === exams[key].id)
      // console.log(complaint, action.payload, exams[key].id)
      if (complaint) {
        exams[key].complaintStatus = complaint.status
      }
    }
    return Object.assign({}, state, {
      sendingcomplaint: false,
      exams: exams,
      complaintreason: '',
      complaintstep: 1,
      checkedcomplaints: []
    })
  },
  [ADD_EXAM_REASON_TO_EXCUSE]: (state, action) => {
    return Object.assign({}, state, {
      excusereason: action.payload
    })
  },
  [ADD_EXAM_REASON_TO_COMPLAINT]: (state, action) => {
    return Object.assign({}, state, {
      complaintreason: action.payload
    })
  },

  [STORE_EXAM_RECORDING_PLAINT_SUCCESS]: (state, action) => {
    return Object.assign({}, state, {
      recordingPlaintsLoading: false,
      recordingPlaints: update(state.recordingPlaints, { $push: [ action.payload ] })
    })
  },
  [STORE_EXAM_RECORDING_PLAINT_REQUEST]: (state, action) => {
    return Object.assign({}, state, {
      recordingPlaintsLoading: true
    })
  },
  [UPLOAD_EXAM_EXCUSE_SUCCESS]: (state, action) => {
    return Object.assign({}, state, {
      excusefiles: update(state.excusefiles, { $push: [action.payload] })
    })
  },
  [TOGGLE_ADD_EXAM_TO_EXUSES]: (state, action) => {
    const currIndex = state.checkedexcuses.findIndex(i => i === action.payload)
    if (currIndex > -1) {
      return Object.assign({}, state, {
        checkedexcuses: update(state.checkedexcuses, {$splice: [[currIndex, 1]]})
      })
    }
    return Object.assign({}, state, {
      checkedexcuses: update(state.checkedexcuses, {$push: [action.payload]})
    })
  },
  [TOGGLE_ADD_EXAM_TO_COMPLAINTS]: (state, action) => {
    const currIndex = state.checkedcomplaints.findIndex(i => i === action.payload)
    if (currIndex > -1) {
      return Object.assign({}, state, {
        checkedcomplaints: update(state.checkedcomplaints, {$splice: [[currIndex, 1]]})
      })
    }
    return Object.assign({}, state, {
      checkedcomplaints: update(state.checkedcomplaints, {$push: [action.payload]})
    })
  },
  [GET_STUDENT_EXAMS_REQUEST]: (state, action) => Object.assign({}, state, {
    loading: true
  }),
  [GO_TO_EXAM_EXCUSE_STEP]: (state, action) => Object.assign({}, state, {
    excusestep: action.payload
  }),
  [GET_DEMO_EXAM_REQUEST]: (state, action) => Object.assign({}, state, {
    loadingDemo: true
  }),
  [GET_DEMO_EXAM_SUCCESS]: (state, action) => Object.assign({}, state, {
    demo: action.payload,
    loadingDemo: false,
    lastUpdatedDemo: new Date().getTime()
  }),
  [GO_TO_EXAM_COMPLAINT_STEP]: (state, action) => Object.assign({}, state, {
    complaintstep: action.payload
  }),
  [REQUEST_DEMO_EXAM_REQUEST]: (state, action) => Object.assign({}, state, {
    demo: action.payload,
    loadingDemo: true,
    lastUpdatedDemo: new Date().getTime()
  }),
  [REQUEST_DEMO_EXAM_SUCCESS]: (state, action) => Object.assign({}, state, {
    loadingDemo: false
  }),
  [GET_STUDENT_EXAMS_SUCCESS]: (state, action) => {
    let _exams = {}

    for (let exam of action.payload) {
      _exams = {
        ..._exams,
        ['exam-' + exam.id]: exam
      }
    }
    return Object.assign({}, state, {
      data: _exams,
      loading: false,
      lastUpdated: new Date().getTime()
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  data: {},
  loading: false,
  loadingDemo: true,
  demo: {},
  schedulevisible: [],
  resultvisible: [],
  excusevisible: [],
  excusestep: 1,
  complaintstep: 1,
  excusereason: '',
  complaintreason: '',
  recordingPlaints: [],
  recordingPlaintsLoading: false,
  sendingexcuse: false,
  checkedexcuses: [],
  excusefiles: [],
  lastUpdated: null,
  checkedcomplaints: [],
  sendingcomplaint: false
}

export default function examsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
