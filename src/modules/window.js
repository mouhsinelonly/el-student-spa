// ------------------------------------
// Constants
// ------------------------------------
export const WINDOW_RESIZED = 'WINDOW_RESIZED'

// ------------------------------------
// Actions
// ------------------------------------
export function windowResized(height) {
  return {
    type: WINDOW_RESIZED,
    payload: {
      height: height
    }
  }
}

export const actions = {
  windowResized
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [WINDOW_RESIZED]: (state, action) => Object.assign({}, state, {
            height: action.payload.height,
        })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
    height: 0,
    width:0
};

export default function windowReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
