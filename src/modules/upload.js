// @flow
import update from 'immutability-helper'
// ------------------------------------
// Constants
// ------------------------------------
export const UPLOAD_PROGRESS_STARTED: string = 'UPLOAD_PROGRESS_STARTED'
export const UPLOAD_PROGRESS_INCREMENT: string = 'UPLOAD_PROGRESS_INCREMENT'
export const UPLOAD_PROGRESS_FINISHED: string = 'UPLOAD_PROGRESS_FINISHED'

// ------------------------------------
// Actions
// ------------------------------------
export function addFileProgress (id: number = 0): Object {
  return {
    type: UPLOAD_PROGRESS_STARTED,
    payload: {
      id
    }
  }
}

export function incrementFileProgress (id: number = 0, percent: number = 0): Object {
  return {
    type: UPLOAD_PROGRESS_INCREMENT,
    payload: {
      id,
      percent
    }
  }
}

export function removeFileProgress (id: number = 0): Object {
  return {
    type: UPLOAD_PROGRESS_FINISHED,
    payload: {
      id
    }
  }
}

export const actions = {
  addFileProgress,
  removeFileProgress,
  incrementFileProgress
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [UPLOAD_PROGRESS_STARTED]: (state: Object, action: Object): Object => Object.assign({}, state, {
    files: update(state.files, { $push: [{ id: action.payload.id, percent: 0 }] }),
  }),
  [UPLOAD_PROGRESS_INCREMENT]: (state: Object, action: Object): Object => {
    let fileIndex = state.files.findIndex((f: Object): boolean => f.id === action.payload.id)

    let updatedFile = update(state.files[fileIndex], { percent: { $set: action.payload.percent } })

    return Object.assign({}, state, {
      files: update(state.files, { $splice: [[fileIndex, 1, updatedFile]] }),
    })
  },
  [UPLOAD_PROGRESS_FINISHED]: (state: Object, action: Object): Object => {
    let fileIndex = state.files.findIndex((f: Object): boolean => f.id === action.payload.id)
    return Object.assign({}, state, {
      files: update(state.files, { $splice: [[fileIndex, 1]] }),
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  files: []
}

export default function uploadProgressReducer (state: Object = initialState, action: Object): Object {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
