import request from 'superagent'
import { APIBASE } from 'utils'
// ------------------------------------
// Constants
// ------------------------------------
let timeout
export const ELEMENT_UPDATE_WATCHED_SECONDS = 'ELEMENT_UPDATE_WATCHED_SECONDS'
export const ELEMENT_RESET_WATCHED_SECONDS = 'ELEMENT_RESET_WATCHED_SECONDS'

export const ELEMENT_STUDENT_AVAILABLE = 'ELEMENT_STUDENT_AVAILABLE'
export const ELEMENT_PAUSE_WATCHED_SECONDS = 'ELEMENT_PAUSE_WATCHED_SECONDS'

export const ELEMENT_SET_VIDEO_WATCHED_SUCCESS = 'ELEMENT_SET_VIDEO_WATCHED_SUCCESS'
export const ELEMENT_SET_VIDEO_WATCHED_REQUEST = 'ELEMENT_SET_VIDEO_WATCHED_REQUEST'

export const ELEMENT_SET_VIDEO_SEEKED_SUCCESS = 'subject_element.SET_VIDEO_SEEKED_SUCCESS'
export const ELEMENT_SET_VIDEO_SEEKED_REQUEST = 'subject_element.SET_VIDEO_SEEKED_REQUEST'

export const SET_WATCHING_ELEMENT_ID = 'SET_WATCHING_ELEMENT_ID'

// ------------------------------------
// Actions
// ------------------------------------
//
export function setVideoWatchedSuccess (id = 0) {
  clearTimeout(timeout)
  return {
    type: ELEMENT_SET_VIDEO_WATCHED_SUCCESS,
    payload: id
  }
}
export function setVideoWatchedRequest () {
  return {
    type: ELEMENT_SET_VIDEO_WATCHED_REQUEST
  }
}

export function setVideoWatched (id = 0) {
  return function (dispatch, getState) {
    const state = getState()
    const token = state.auth.token
    dispatch(setVideoWatchedRequest())
    return request
      .post(`${APIBASE}/api/subjects/elements/watched/${id}`)
      .set('x-access-token', token)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        if (!err && res.ok) {
          dispatch(setVideoWatchedSuccess(id))
        } else {
        }
      })
  }
}

export function updateVideoSeekSuccess (id = 0, minutes = 0) {
  return {
    type: ELEMENT_SET_VIDEO_SEEKED_SUCCESS,
    payload: {
      id,
      minutes
    }
  }
}
export function updateVideoSeekRequest () {
  return {
    type: ELEMENT_SET_VIDEO_SEEKED_REQUEST
  }
}

export function updateVideoSeek (id = 0, minutes) {
  return function (dispatch, getState) {
    const state = getState()
    const token = state.auth.token
    dispatch(updateVideoSeekRequest())
    return request
      .post(`${APIBASE}/api/subjects/elements/seek/${id}`)
      .set('x-access-token', token)
      .send({ minutes })
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        if (!err && res.ok) {
          dispatch(updateVideoSeekSuccess(id, minutes))
        } else {
        }
      })
  }
}

export function resetTimer () {
  return {
    type: ELEMENT_STUDENT_AVAILABLE
  }
}

export function setWatchingElementId (elementId = 0, emit = false) {
  return function (dispatch, getState) {
    dispatch({
      type: SET_WATCHING_ELEMENT_ID,
      payload: elementId
    })
    if (emit) {
      const { id: studentId } = getState().student.profile
      request.post(`${APIBASE}/api/extra/emitwatching`).send({ studentId, elementId }).end()
    }
  }
}

export function startWatching () {
  return dispatch => {
    return new Promise(resolve => {
      timeout = setTimeout(() => {
        dispatch({
          type: ELEMENT_UPDATE_WATCHED_SECONDS
        })
        resolve()
      }, 1000)
    }).then(() => {
      dispatch(startWatching())
    })
  }
}

export function watchingPaused () {
  return dispatch => {
    clearTimeout(timeout)
    return dispatch({
      type: ELEMENT_PAUSE_WATCHED_SECONDS
    })
  }
}

export function resetWatching () {
  return dispatch => {
    clearTimeout(timeout)
    return dispatch({
      type: ELEMENT_RESET_WATCHED_SECONDS
    })
  }
}

export const actions = {
  startWatching,
  watchingPaused,
  resetWatching,
  resetTimer
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ELEMENT_UPDATE_WATCHED_SECONDS]: state =>
    Object.assign({}, state, {
      timer: state.timer + 1
    }),
  [ELEMENT_SET_VIDEO_WATCHED_REQUEST]: state =>
    Object.assign({}, state, {
      watchedLoading: true
    }),
  [ELEMENT_RESET_WATCHED_SECONDS]: state =>
    Object.assign({}, state, {
      timer: 0,
      cycle: 600,
      seeking: false,
      showgrademessage: false,
      // videoelement: undefined,
      threshold: 30,
      chance: 10
    }),
  [ELEMENT_PAUSE_WATCHED_SECONDS]: state =>
    Object.assign({}, state, {
      timer: 0
    }),
  [SET_WATCHING_ELEMENT_ID]: (state, action) =>
    Object.assign({}, state, {
      currentWatchingElementId: action.payload
    }),
  [ELEMENT_SET_VIDEO_WATCHED_SUCCESS]: state =>
    Object.assign({}, state, {
      showgrademessage: true,
      watchedLoading: false,
      timer: 0
    }),
  [ELEMENT_STUDENT_AVAILABLE]: (state, action) =>
    Object.assign({}, state, {
      timer: 0
    }),
  [ELEMENT_SET_VIDEO_SEEKED_REQUEST]: (state, action) =>
    Object.assign({}, state, {
      seeking: true
    }),
  [ELEMENT_SET_VIDEO_SEEKED_SUCCESS]: (state, action) =>
    Object.assign({}, state, {
      seeking: false
    })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  timer: 0,
  cycle: 600,
  seeking: false,
  watchedLoading: false,
  showgrademessage: false,
  videoelement: undefined,
  threshold: 30,
  currentWatchingElementId: 0,
  chance: 10
}

export default function elementVideoReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
