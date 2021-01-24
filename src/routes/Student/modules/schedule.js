// ------------------------------------
// Constants
// ------------------------------------
export const SET_SCHEDULE_ACTIVE_TAB = 'SET_SCHEDULE_ACTIVE_TAB'

// ------------------------------------
// Actions
// ------------------------------------
//
export function toggleActiveTab (index = 1) {
  return {
    type: SET_SCHEDULE_ACTIVE_TAB,
    payload: index
  }
}

export const actions = {
  toggleActiveTab
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_SCHEDULE_ACTIVE_TAB]: (state, action) => Object.assign({}, state, {
    activetab: action.payload
  })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  activetab: 1
}

export default function scheduleReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
