// import { networkError } from 'modules/network'
import request from 'superagent'
import update from 'immutability-helper'
import { APIBASE } from 'utils'
import { getSubjects } from './subjects'
import { getGrades } from './grades'
import { closeModal } from 'modules/modals'

// ------------------------------------
// Constants
// ------------------------------------

export const TOGGLE_SUBJECT_FROM_SUMMER_CHOICE = 'summer_modal.TOGGLE_SUBJECT_FROM_SUMMER_CHOICE'

export const SEND_CHOOSE_SUMMER_SUBJECTS_REQUEST = 'summer_modal.SEND_CHOOSE_SUMMER_SUBJECTS_REQUEST'
export const SEND_CHOOSE_SUMMER_SUBJECTS_SUCCESS = 'summer_modal.SEND_CHOOSE_SUMMER_SUBJECTS_SUCCESS'
// ------------------------------------
// Actions
// ------------------------------------
//
//

export function toggleChoice (id = 0) {
  return {
    type: TOGGLE_SUBJECT_FROM_SUMMER_CHOICE,
    payload: id
  }
}

export function submitChoicesSuccess () {
  return {
    type: SEND_CHOOSE_SUMMER_SUBJECTS_SUCCESS
  }
}

export function submitChoicesRequest () {
  return {
    type: SEND_CHOOSE_SUMMER_SUBJECTS_REQUEST
  }
}

export function submitChoices () {
  return function (dispatch, getState) {
    const state = getState()
    const token = state.auth.token
    dispatch(submitChoicesRequest())

    return request.post(APIBASE + '/api/subjects/choose_summer')
      .set('Authorization', 'Bearer ' + token)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({ ids: state.summer.checkedsubjects })
      .end((err, res) => {
        if (!err && res.ok && res.body.success === 1) {
          dispatch(submitChoicesSuccess())
          dispatch(getSubjects(true))
          dispatch(getGrades(true))
          dispatch(closeModal())
        } else {

        }
      })
  }
}

export const actions = {
  toggleChoice
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [TOGGLE_SUBJECT_FROM_SUMMER_CHOICE]: (state, action) => {
    const currIndex = state.checkedsubjects.findIndex(i => i === action.payload)
    if (currIndex > -1) {
      return Object.assign({}, state, {
        checkedsubjects: update(state.checkedsubjects, { $splice: [[currIndex, 1]] })
      })
    }
    return Object.assign({}, state, {
      checkedsubjects: update(state.checkedsubjects, { $push: [action.payload] })
    })
  },
  [SEND_CHOOSE_SUMMER_SUBJECTS_REQUEST]: (state, action) => Object.assign({}, state, { sendingChoices: true }),
  [SEND_CHOOSE_SUMMER_SUBJECTS_SUCCESS]: (state, action) => Object.assign({}, state, { sendingChoices: false })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  checkedsubjects: [],
  sendingChoices: false
}

export default function summerChoiceReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
