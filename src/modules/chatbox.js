import { LOCATION_CHANGE } from 'store/location'
// ------------------------------------
// Constants
// ------------------------------------
export const SUPPORT_CHATBOX_OPEN = 'chatbox/SUPPORT_CHATBOX_OPEN'
export const SUPPORT_CHATBOX_CLOSE = 'chatbox/SUPPORT_CHATBOX_CLOSE'
export const SET_SUPPORT_CHATBOX_TAB = 'chatbox/SET_SUPPORT_CHATBOX_TAB'

export const SET_FIRST_LOADED = 'chatbox/SET_FIRST_LOADED'

// ------------------------------------
// Actions
// ------------------------------------
export function openChatbox () {
  document.body.style.overflow = 'hidden'
  return {
    type: SUPPORT_CHATBOX_OPEN
  }
}

export function setChatboxTab (name = '') {
  return {
    type: SET_SUPPORT_CHATBOX_TAB,
    payload: name
  }
}

export function setFirstLoad (name = '') {
  return {
    type: SET_FIRST_LOADED
  }
}

export function closeChatbox () {
  document.body.style.overflow = 'scroll'
  return {
    type: SUPPORT_CHATBOX_CLOSE
  }
}

export const actions = {
  openChatbox,
  closeChatbox
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SUPPORT_CHATBOX_OPEN]: (state, action) => Object.assign({}, state, {
    open: true
  }),
  [SET_FIRST_LOADED]: (state, action) => ({ ...state, firstload: false }),
  [SUPPORT_CHATBOX_CLOSE]: (state, action) => Object.assign({}, state, {
    open: false
  }),
  [LOCATION_CHANGE]: (state, action) => Object.assign({}, state, {
    open: false
  }),
  [SET_SUPPORT_CHATBOX_TAB]: (state, action) => Object.assign({}, state, {
    tab: action.payload
  })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  open: false,
  firstload: true,
  tab: 'home'
}

export default function chatboxReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
