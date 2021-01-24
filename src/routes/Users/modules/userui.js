// @flow
import { SET_ACTIVE_TICKET } from './tickets'
// ------------------------------------
// Constants
// ------------------------------------
export const TOGGLE_EDIT_STUDENT_PROFILE = 'usersui.TOGGLE_EDIT_STUDENT_PROFILE'
export const TOGGLE_TICKETS_LIST_MENU = 'usersui.TOGGLE_TICKETS_LIST_MENU'
export const TOGGLE_SHOW_FULL_GRADE = 'usersui.TOGGLE_SHOW_FULL_GRADE'
export const TOGGLE_TICKETS_INFO_MENU = 'usersui.TOGGLE_TICKETS_INFO_MENU'
// ------------------------------------
// Actions
// ------------------------------------
//

export function toggleEditStudentProfile (): Object {
  return {
    type: TOGGLE_EDIT_STUDENT_PROFILE
  }
}
export function toggleTicketsListMenu (visible: boolean): Object {
  return {
    type: TOGGLE_TICKETS_LIST_MENU,
    payload: visible
  }
}
export function toggleShowFullGrade (visible: boolean): Object {
  return {
    type: TOGGLE_SHOW_FULL_GRADE,
    payload: visible
  }
}
export function toggleTicketsInfoMenu (visible: boolean): Object {
  return {
    type: TOGGLE_TICKETS_INFO_MENU,
    payload: visible
  }
}

export const actions = {}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [TOGGLE_EDIT_STUDENT_PROFILE]: (state: Object, action: Object): Object => Object.assign({}, state, {
    editStudentProfileVisible: !state.editStudentProfileVisible
  }),
  [TOGGLE_TICKETS_LIST_MENU]: (state: Object, action: Object): Object => Object.assign({}, state, {
    ticketsListMenuVisible: action.payload,
    ticketsInfoMenuVisible: false
  }),
  [TOGGLE_TICKETS_INFO_MENU]: (state: Object, action: Object): Object => Object.assign({}, state, {
    ticketsInfoMenuVisible: action.payload,
    ticketsListMenuVisible: false
  }),
  [TOGGLE_SHOW_FULL_GRADE]: (state: Object, action: Object): Object => Object.assign({}, state, {
    showFullGrade: !state.showFullGrade
  }),
  [SET_ACTIVE_TICKET]: (state: Object, action: Object): Object => Object.assign({}, state, {
    ticketsListMenuVisible: false,
    ticketsInfoMenuVisible: false
  })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  editStudentProfileVisible: false,
  ticketsListMenuVisible: true,
  ticketsInfoMenuVisible: false,
  showFullGrade: false
}

export default function usersuiReducer (state: Object = initialState, action: Object): Object {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
