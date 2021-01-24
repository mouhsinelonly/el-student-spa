// ------------------------------------
// Constants
// ------------------------------------
export const SET_REGISTRATION_UPLOADER_PAGE = 'SET_REGISTRATION_UPLOADER_PAGE'

// ------------------------------------
// Actions
// ------------------------------------
//
//

export function setPage(page = 1) {
  return {
    type: SET_REGISTRATION_UPLOADER_PAGE,
    payload: page
  }
}

export const actions = {
 setPage
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_REGISTRATION_UPLOADER_PAGE]: (state, action) => Object.assign({}, state, {page: action.payload})
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  page:1
}

export default function RegistrarUploaderReducer (state = initialState, action) {

  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
