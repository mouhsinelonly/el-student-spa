import request from 'superagent'
import moment from 'moment'
import {APIBASE} from 'utils'
import {showModal} from 'modules/modals'
// ------------------------------------
// Constants
// ------------------------------------
export const GET_SEMESTER_EVENTS = 'GET_SEMESTER_EVENTS'
export const GET_SEMESTER_EVENTS_LOADING = 'GET_SEMESTER_EVENTS_LOADING'
export const GET_SEMESTER_EVENTS_SUCCESS = 'GET_SEMESTER_EVENTS_SUCCESS'

// ------------------------------------
// Actions
// ------------------------------------
//
export function getSemesterEventsSuccess (data) {
  return {
    type: GET_SEMESTER_EVENTS_SUCCESS,
    payload: {
      data: data
    }
  }
}
export function getSemesterEventsLoading () {
  return {
    type: GET_SEMESTER_EVENTS_LOADING
  }
}

export function showChooseClassrooms (semsterevents) {
  return function (dispatch, getState) {
    const state = getState()
    const momentServerTime = moment(state.serverdate)
    const canChooseClassroom = semsterevents.filter(e => e.category === 'choose_classroom').findIndex((e, key) => {
      let eventStartat = moment(e.start_at)
      let eventFinishAt = moment(e.finish_at)
      return eventStartat.isBefore(momentServerTime) && eventFinishAt.isAfter(momentServerTime)
    }) > -1
    if (canChooseClassroom && state.modals.name !== 'paymentmodal') {
      dispatch(showModal('choose_classroom'))
    }
  }
}

export function getSemesterEvents (reload: false) {
  return function (dispatch, getState) {
    const state = getState()
    const token = state.auth.token
    const classrooms = state.classrooms.data
    const hasUnchosen = classrooms.filter(s => s.findIndex(c => c.chosen) < 0).length
    // console.log(hasUnchosen + 'ksjd')
    dispatch(getSemesterEventsLoading())
    let lastUpdated = state.semester_events.lastUpdated
    if (lastUpdated !== null && !reload) {
      const now = new Date()
      const dif = lastUpdated - now.getTime()
      const secondsFrom = dif / 1000
      const secondsBetween = Math.abs(secondsFrom)
      if (secondsBetween <= (60 * 60)) {
        dispatch(getSemesterEventsSuccess(state.semester_events.data))
        if (hasUnchosen) {
          dispatch(showChooseClassrooms(state.semester_events.data))
        }
        return {}
      }
    }

    return request.get(APIBASE + '/api/semesterevents/all')
       .set('Authorization', 'Bearer ' + token)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        if (!err && res.ok) {
          dispatch(getSemesterEventsSuccess(res.body))
          if (hasUnchosen) {
            dispatch(showChooseClassrooms(res.body))
          }
        } else {

        }
      })
  }
}

export const actions = {
  getSemesterEvents,
  getSemesterEventsSuccess
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_SEMESTER_EVENTS]: (state, action) => Object.assign({}, state, {
    data: [],
    loading: true
  }),
  [GET_SEMESTER_EVENTS_SUCCESS]: (state, action) => {
    return Object.assign({}, state, {
      data: action.payload.data,
      loading: false,
      lastUpdated: new Date().getTime()
    })
  },
  [GET_SEMESTER_EVENTS_LOADING]: (state, action) => {
    return Object.assign({}, state, {
      loading: true
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  data: [],
  loading: false,
  lastUpdated: null
}

export default function semesterEventsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
