// ------------------------------------
// Constants
// ------------------------------------
export const SHOW_MORE_QURAN_SUBJECT = 'SHOW_MORE_QURAN_SUBJECT'
export const HIDE_MORE_QURAN_SUBJECT = 'HIDE_MORE_QURAN_SUBJECT'

// ------------------------------------
// Actions
// ------------------------------------
//
export function showMoreQuranSubject () {
  return {
    type: SHOW_MORE_QURAN_SUBJECT
  }
}

export function hideMoreQuranSubject () {
  return {
    type: HIDE_MORE_QURAN_SUBJECT
  }
}

export const actions = {
  showMoreQuranSubject,
  hideMoreQuranSubject
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SHOW_MORE_QURAN_SUBJECT]: (state, action) => Object.assign({}, state, {
    showmore: true
  }),
  [HIDE_MORE_QURAN_SUBJECT]: (state, action) => Object.assign({}, state, {
    showmore: false
  })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  showmore: false
}

export default function quranSubjetReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
