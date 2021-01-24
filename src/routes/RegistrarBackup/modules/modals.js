// ------------------------------------
// Constants
// ------------------------------------
export const SHOW_REGISTRAR_MODAL = 'SHOW_REGISTRAR_MODAL'
export const HIDE_REGISTRAR_MODAL = 'HIDE_REGISTRAR_MODAL'

// ------------------------------------
// Actions
// ------------------------------------
//
//

export function showModal (name = '') {
  return {
    type: SHOW_REGISTRAR_MODAL,
    payload: name
  }
}
export function closeModal () {
  return {
    type: HIDE_REGISTRAR_MODAL
  }
}

export const actions = {
  showModal,
  closeModal
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SHOW_REGISTRAR_MODAL]: (state, action) => Object.assign({}, state, {name: action.payload, visible: true}),
  [HIDE_REGISTRAR_MODAL]: (state, action) => Object.assign({}, state, {visible: false})
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  visible: false,
  name: ''
}

export default function modalsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
