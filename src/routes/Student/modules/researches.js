import request from 'superagent'
import { APIBASE } from 'utils'
import update from 'immutability-helper'
import laroute from 'utils/laroute.js'

// ------------------------------------
// Constants
// ------------------------------------
export const GET_STUDENT_RESEARCH_ACTIVITIES_REQUEST = 'researches.GET_STUDENT_RESEARCH_ACTIVITIES_REQUEST'
export const GET_STUDENT_RESEARCH_ACTIVITIES_SUCCESS = 'researches.GET_STUDENT_RESEARCH_ACTIVITIES_SUCCESS'

export const STORE_RESEARCH_ACTIVITY_REQUEST = 'researches.STORE_RESEARCH_ACTIVITY_REQUEST'
export const STORE_RESEARCH_ACTIVITY_SUCCESS = 'researches.STORE_RESEARCH_ACTIVITY_SUCCESS'

export const UNLOCK_RESEARCH_ACTIVITY_REQUEST = 'researches.UNLOCK_RESEARCH_ACTIVITY_REQUEST'
export const UNLOCK_RESEARCH_ACTIVITY_SUCCESS = 'researches.UNLOCK_RESEARCH_ACTIVITY_SUCCESS'

export const SET_ACTIVITY_QUESTIONS_VISIBILE = 'researches.SET_ACTIVITY_QUESTIONS_VISIBILE'
export const UNSET_ACTIVITY_QUESTIONS_VISIBILE = 'researches.UNSET_ACTIVITY_QUESTIONS_VISIBILE'

export const TOGGLE_ACTIVITY_NOTES = 'researches.TOGGLE_ACTIVITY_NOTES'

export const UPLOAD_STUDENT_RESEARCH_REQUEST = 'researches.UPLOAD_STUDENT_RESEARCH_REQUEST'
export const UPLOAD_STUDENT_RESEARCH_SUCCESS = 'researches.UPLOAD_STUDENT_RESEARCH_SUCCESS'

// ------------------------------------
// Actions
// ------------------------------------
//

export function uploadResearchRequest (activityId = 0) {
  return {
    type: UPLOAD_STUDENT_RESEARCH_REQUEST,
    payload: {
      id: activityId
    }
  }
}

export function uploadResearchSuccess (activityId = 0, file) {
  return {
    type: UPLOAD_STUDENT_RESEARCH_SUCCESS,
    payload: {
      id: activityId,
      file
    }
  }
}

export function uploadResearch (files = [], activityId = 0) {
  return (dispatch, getState) => {
    dispatch(uploadResearchRequest(activityId))

    const state = getState()
    const token = state.auth.token

    const req = request.post(laroute.route('api.v1.researches.upload'))
    files.forEach((file) => req.attach('file', file))
    req.field('activity_id', activityId)
    .field('token', token)
    .end((err, res) => {
      dispatch(uploadResearchSuccess(activityId, res.body))
    })
  }
}

export function setQuestionVisible (questionId = 0) {
  return {
    type: SET_ACTIVITY_QUESTIONS_VISIBILE,
    payload: questionId
  }
}

export function unSetQuestionVisible (questionId = 0) {
  return {
    type: UNSET_ACTIVITY_QUESTIONS_VISIBILE,
    payload: questionId
  }
}

export function toggleNotesVisiblity (activityId = 0) {
  return {
    type: TOGGLE_ACTIVITY_NOTES,
    payload: activityId
  }
}

export function getResearchActivitiesSuccess (activities) {
  return {
    type: GET_STUDENT_RESEARCH_ACTIVITIES_SUCCESS,
    payload: {
      activities: activities
    }
  }
}

export function getResearchActivitiesRequest () {
  return {
    type: GET_STUDENT_RESEARCH_ACTIVITIES_REQUEST
  }
}

export function getResearchActivities (reset = false) {
  return function (dispatch, getState) {
    const state = getState()
    const token = state.auth.token
    dispatch(getResearchActivitiesRequest())
    let lastUpdated = state.researches.lastUpdated
    if (lastUpdated !== null && reset !== true) {
      const now = new Date()
      const dif = lastUpdated - now.getTime()
      const secondsFrom = dif / 1000
      const secondsBetween = Math.abs(secondsFrom)
      if (secondsBetween <= (60 * 60)) {
        dispatch(getResearchActivitiesSuccess(state.researches.activities))
        return {}
      }
    }

    return request.get(`${APIBASE}/api/researches/activities/all`)
       .set('x-access-token', token)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        if (!err && res.ok) {
          dispatch(getResearchActivitiesSuccess(res.body))
        } else {

        }
      })
  }
}

export function storeResearchActivitySuccess (activityId = 0) {
  return {
    type: STORE_RESEARCH_ACTIVITY_SUCCESS,
    payload: activityId
  }
}

export function storeResearchActivityRequest (activityId = 0) {
  return {
    type: STORE_RESEARCH_ACTIVITY_REQUEST,
    payload: activityId
  }
}

export function storeResearchActivity (values = {}, action = 'save', activityId = 0) {
  return function (dispatch, getState) {
    const state = getState()
    const token = state.auth.token
    dispatch(storeResearchActivityRequest(activityId))
    const formData = new FormData()
    formData.append('action', action)
    formData.append('activity_id', activityId)
    const filteredAnswers = {}
    const req = request.post(`${APIBASE}/api/researches/activities/store`)
    // console.log(values)
    Object.keys(values).map(k => {
      if (typeof values[k] === 'object') {
        formData.append(k, values[k][0])
      } else {
        filteredAnswers[k] = values[k]
      }
    })
    formData.append('answers', JSON.stringify(filteredAnswers))
    req.set('x-access-token', token)
      .send(formData)
      .end((err, res) => {
        if (!err && res.ok) {
          dispatch(storeResearchActivitySuccess(activityId))
          dispatch(getResearchActivities(true))
        } else {

        }
      })
  }
}

export function unlockResearchActivitySuccess (activityId = 0) {
  return {
    type: STORE_RESEARCH_ACTIVITY_SUCCESS,
    payload: activityId
  }
}

export function unlockResearchActivityRequest (activityId = 0) {
  return {
    type: STORE_RESEARCH_ACTIVITY_REQUEST,
    payload: activityId
  }
}

export function unlockResearchActivity (activityId = 0) {
  return function (dispatch, getState) {
    const state = getState()
    const token = state.auth.token
    dispatch(unlockResearchActivityRequest(activityId))

    return request.post(`${APIBASE}/api/researches/activities/unlock`)
      .set('x-access-token', token)
      .send({ activity_id: activityId })
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        if (!err && res.ok) {
          dispatch(unlockResearchActivitySuccess(activityId))
          dispatch(getResearchActivities(true))
        } else {

        }
      })
  }
}

export const actions = {
  getResearchActivities,
  uploadResearch,
  toggleNotesVisiblity,
  unlockResearchActivity,
  storeResearchActivity
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_STUDENT_RESEARCH_ACTIVITIES_REQUEST]: (state, action) => Object.assign({}, state, {
    loadingActivities: true
  }),
  [TOGGLE_ACTIVITY_NOTES]: (state, action) => {
    const index = state.notesVisible.findIndex(i => i === action.payload)
    const isVisible = index >= 0
    return Object.assign({}, state, {
      notesVisible: isVisible ? update(state.notesVisible, { $splice: [[index, 1]] })
      : update(state.notesVisible, { $push: [action.payload] })
    })
  },
  [UPLOAD_STUDENT_RESEARCH_REQUEST]: (state, action) => {
    const index = state.activities.findIndex(r => r.id === action.payload.id)
    const uploadedIndex = state.uploadedActivities.findIndex(id => id === action.payload.id)
    return Object.assign({}, state, {
      activities: update(state.activities, { [index]: { $merge: { uploading: true } } }),
      uploadedActivities: uploadedIndex >= 0 ? update(state.uploadedActivities, { $splice: [[uploadedIndex, 1]] })
      : state.uploadedActivities
    })
  },
  [UPLOAD_STUDENT_RESEARCH_SUCCESS]: (state, action) => {
    const index = state.activities.findIndex(r => r.id === action.payload.id)
    return Object.assign({}, state, {
      activities: update(state.activities, { [index]: {
        $merge: { uploading: false, upload: { file: action.payload.file } }
      } }),
      uploadedActivities: update(state.uploadedActivities, { $push: [action.payload.id] })
    })
  },
  [SET_ACTIVITY_QUESTIONS_VISIBILE]: (state, action) => {
    // const index = state.visibileQuestions.findIndex(i => i === action.payload)
    return Object.assign({}, state, {
      visibileQuestions: update(state.visibileQuestions, { $push: [action.payload] })
    })
  },
  [UNSET_ACTIVITY_QUESTIONS_VISIBILE]: (state, action) => {
    const index = state.visibileQuestions.findIndex(i => i === action.payload)
    return Object.assign({}, state, {
      visibileQuestions: update(state.visibileQuestions, { $splice: [[index, 1]] })
    })
  },
  [STORE_RESEARCH_ACTIVITY_REQUEST]: (state, action) => {
    return Object.assign({}, state, {
      savingIds: update(state.savingIds, { $push: [action.payload] })
    })
  },
  [STORE_RESEARCH_ACTIVITY_SUCCESS]: (state, action) => {
    const index = state.savingIds.findIndex(i => i === action.payload)
    return Object.assign({}, state, {
      savingIds: update(state.savingIds, { $splice: [[index, 1]] })
    })
  },
  [GET_STUDENT_RESEARCH_ACTIVITIES_SUCCESS]: (state, action) => {
    return Object.assign({}, state, {
      activities: action.payload.activities,
      loadingActivities: false,
      lastUpdated: new Date().getTime()
    })
  }
}
// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  activities: [],
  visibileQuestions: [],
  loadingActivities: false,
  notesVisible: [],
  lastUpdated: null,
  uploadedActivities: [],
  savingIds: []
}

export default function researchesReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
