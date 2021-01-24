import request from 'superagent'
import laroute from 'utils/laroute.js'

// ------------------------------------
// Constants
// ------------------------------------
export const GET_LESSONS = 'GET_LESSONS'
export const GET_LESSONS_LOADING = 'GET_LESSONS_LOADING'
export const GET_LESSONS_SUCCESS = 'GET_LESSONS_SUCCESS'

export const SET_ACTIVE_SUBJECT_LESSON = 'SET_ACTIVE_SUBJECT_LESSON'

// ------------------------------------
// Actions
// ------------------------------------
//
export function setActiveSubjectLesson (id = 0) {
  // console.log(`was called with active ${id}`)
  return {
    type: SET_ACTIVE_SUBJECT_LESSON,
    payload: id
  }
}
export function getLessonsSuccess (data) {
  return {
    type: GET_LESSONS_SUCCESS,
    payload: {
      data: data
    }
  }
}
export function getLessonsLoading () {
  return {
    type: GET_LESSONS_LOADING
  }
}

export function getLessons () {
  return function (dispatch, getState) {
    let token = getState().auth.token
    dispatch(getLessonsLoading())
    let lastUpdated = getState().lessons.lastUpdated
    if (lastUpdated !== null) {
      let now = new Date()
      let dif = lastUpdated - now.getTime()
      let secpndsFrom = dif / 1000
      let secondsBetween = Math.abs(secpndsFrom)
      if (secondsBetween <= (60 * 60)) {
        dispatch(getLessonsSuccess(getState().lessons.data))
        return {}
      }
    }

    return request.get(laroute.route('api.v1.student.lessons'))
       .set('Authorization', 'Bearer ' + token)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        if (!err && res.ok) {
          dispatch(getLessonsSuccess(res.body))
        } else {
        }
      })
  }
}

export const actions = {
  getLessons,
  getLessonsSuccess,
  setActiveSubjectLesson
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_LESSONS]: (state, action) => Object.assign({}, state, {
    data: [],
    loading: true
  }),
  [GET_LESSONS_SUCCESS]: (state, action) => {
    return Object.assign({}, state, {
      data: action.payload.data,
      loading: false,
      lastUpdated: new Date().getTime()
    })
  },
  [GET_LESSONS_LOADING]: (state, action) => {
    return Object.assign({}, state, {
      loading: true
    })
  },
  [SET_ACTIVE_SUBJECT_LESSON]: (state, action) => {
    return Object.assign({}, state, {
      active: action.payload
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  data: [],
  active: 0,
  loading: false,
  lastUpdated: null
}

export default function studentReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
