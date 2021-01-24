import request from 'superagent'
import laroute from 'utils/laroute.js'

// ------------------------------------
// Constants
// ------------------------------------
export const GET_STUDENT_DOCUMENTS_REQUEST = 'GET_STUDENT_DOCUMENTS_REQUEST'
export const GET_STUDENT_DOCUMENTS_SUCCESS = 'GET_STUDENT_DOCUMENTS_SUCCESS'

// ------------------------------------
// Actions
// ------------------------------------
//
export function getDocumentsSuccess (data) {
  return {
    type: GET_STUDENT_DOCUMENTS_SUCCESS,
    payload: {
      data: data
    }
  }
}
export function getDocumentsRequest () {
  return {
    type: GET_STUDENT_DOCUMENTS_REQUEST
  }
}

export function getDocuments () {
  return function (dispatch, getState) {
    const state = getState()
    const token = state.auth.token
    dispatch(getDocumentsRequest())
    let lastUpdated = state.documents.lastUpdated
    if (lastUpdated !== null) {
      const now = new Date()
      const dif = lastUpdated - now.getTime()
      const secondsFrom = dif / 1000
      const secondsBetween = Math.abs(secondsFrom)
      if (secondsBetween <= (60 * 60)) {
        dispatch(getDocumentsSuccess(state.documents.data))
        //dispatch(showChooseClassrooms(state.documents.data))
        return {}
      }
    }

    return request.get(laroute.route('api.v1.student.documents.index'))
      .set('Authorization', 'Bearer ' + token)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        if (!err && res.ok) {
          dispatch(getDocumentsSuccess(res.body))
          //dispatch(showChooseClassrooms(res.body))
        } else {

        }
      })
  }
}

export const actions = {
  getDocuments
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_STUDENT_DOCUMENTS_REQUEST]: (state, action) => Object.assign({}, state, {
    loading: true
  }),
  [GET_STUDENT_DOCUMENTS_SUCCESS]: (state, action) => {
    return Object.assign({}, state, {
      data: action.payload.data,
      loading: false,
      lastUpdated: new Date().getTime()
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

export default function documentsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
