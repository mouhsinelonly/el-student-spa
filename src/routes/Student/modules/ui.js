// ------------------------------------
// Constants
// ------------------------------------
export const HIDE_STUDENT_NAVBAR = 'HIDE_STUDENT_NAVBAR'
export const SHOW_STUDENT_NAVBAR = 'SHOW_STUDENT_NAVBAR'

export const HIDE_STUDENT_NAVBAR_DROPDOWN = 'HIDE_STUDENT_NAVBAR_DROPDOWN'
export const SHOW_STUDENT_NAVBAR_DROPDOWN = 'SHOW_STUDENT_NAVBAR_DROPDOWN'

export const WINDOW_RESIZED = 'ui.WINDOW_RESIZED'

export const HIDE_LESSON_MENU = 'HIDE_LESSON_MENU'
export const SHOW_LESSON_MENU = 'SHOW_LESSON_MENU'

export const HIDE_HOMEPAGE_UPCOMING_SESSION = 'HIDE_HOMEPAGE_UPCOMING_SESSION'
export const SHOW_HOMEPAGE_UPCOMING_SESSION = 'SHOW_HOMEPAGE_UPCOMING_SESSION'

export const HIDE_HOMEPAGE_UPCOMING_SESSION_PAST = 'HIDE_HOMEPAGE_UPCOMING_SESSION_PAST'
export const SHOW_HOMEPAGE_UPCOMING_SESSION_PAST = 'SHOW_HOMEPAGE_UPCOMING_SESSION_PAST'

export const HIDE_HOMEPAGE_UPCOMING_SESSION_LIVE = 'HIDE_HOMEPAGE_UPCOMING_SESSION_LIVE'
export const SHOW_HOMEPAGE_UPCOMING_SESSION_LIVE = 'SHOW_HOMEPAGE_UPCOMING_SESSION_LIVE'

// ------------------------------------
// Actions
// ------------------------------------
//

// SHOW HIDE STUDENT NAVBAR
export function showLessonMenu () {
  document.body.style.overflow = 'hidden'
  return {
    type: SHOW_LESSON_MENU
  }
}

export function windowResized () {
  return {
    type: WINDOW_RESIZED
  }
}

export function hideLessonMenu () {
  document.body.style.overflow = 'scroll'
  return {
    type: HIDE_LESSON_MENU
  }
}
// sshow hide navbar dropdown
export function showNavbarDropdown () {
  return {
    type: SHOW_STUDENT_NAVBAR_DROPDOWN
  }
}

export function hideNavbarDropdown () {
  return {
    type: HIDE_STUDENT_NAVBAR_DROPDOWN
  }
}

export function hideStudentNavbar () {
  return {
    type: HIDE_STUDENT_NAVBAR
  }
}
export function showStudentNavbar () {
  return {
    type: SHOW_STUDENT_NAVBAR
  }
}

// HOME PAGE SESSION
export function hideHomePageSession () {
  return {
    type: HIDE_HOMEPAGE_UPCOMING_SESSION
  }
}
export function showHomePageSession () {
  return {
    type: SHOW_HOMEPAGE_UPCOMING_SESSION
  }
}

export function hideHomePagePastSession () {
  return {
    type: HIDE_HOMEPAGE_UPCOMING_SESSION_PAST
  }
}
export function showHomePagePastSession () {
  return {
    type: SHOW_HOMEPAGE_UPCOMING_SESSION_PAST
  }
}
export function hideHomePageLiveSession () {
  return {
    type: HIDE_HOMEPAGE_UPCOMING_SESSION_LIVE
  }
}
export function showHomePageLiveSession () {
  return {
    type: SHOW_HOMEPAGE_UPCOMING_SESSION_LIVE
  }
}
export const actions = {
  hideHomePageSession,
  showHomePageSession,
  hideHomePagePastSession,
  showHomePagePastSession,
  hideStudentNavbar,
  showStudentNavbar,
  showLessonMenu,
  hideLessonMenu
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [WINDOW_RESIZED]: (state, action) => Object.assign({}, state, {windowHeight: window.innerHeight}),
  [HIDE_HOMEPAGE_UPCOMING_SESSION]: (state, action) => Object.assign({}, state, {homepagesessionvisible: false}),
  [SHOW_HOMEPAGE_UPCOMING_SESSION]: (state, action) => Object.assign({}, state, {homepagesessionvisible: true}),
  [HIDE_HOMEPAGE_UPCOMING_SESSION_PAST]: (state, action) =>
  Object.assign({}, state, {homepagesessionpastvisible: false}),
  [SHOW_HOMEPAGE_UPCOMING_SESSION_PAST]: (state, action) =>
  Object.assign({}, state, {homepagesessionpastvisible: true}),
  [HIDE_HOMEPAGE_UPCOMING_SESSION_LIVE]: (state, action) =>
  Object.assign({}, state, {homepagesessionlivevisible: false}),
  [HIDE_STUDENT_NAVBAR]: (state, action) => Object.assign({}, state, {navbarvisible: false}),
  [SHOW_STUDENT_NAVBAR]: (state, action) => Object.assign({}, state, {navbarvisible: true}),
  [SHOW_STUDENT_NAVBAR_DROPDOWN]: (state, action) => Object.assign({}, state, {dropdownvisible: true}),
  [HIDE_STUDENT_NAVBAR_DROPDOWN]: (state, action) => Object.assign({}, state, {dropdownvisible: false}),
  'LOCATION_CHANGE': (state, action) => Object.assign({}, state, {dropdownvisible: false}),
  [SHOW_LESSON_MENU]: (state, action) => Object.assign({}, state, {lessonmenuvisible: true}),
  [HIDE_LESSON_MENU]: (state, action) => Object.assign({}, state, {lessonmenuvisible: false}),
  [SHOW_HOMEPAGE_UPCOMING_SESSION_LIVE]: (state, action) => Object.assign({}, state, {homepagesessionlivevisible: true})
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  homepagesessionvisible: true,
  navbarvisible: true,
  windowHeight: window.innerHeight,
  dropdownvisible: false,
  homepagesessionpastvisible: true,
  homepagesessionlivevisible: true,
  lessonmenuvisible: false
}

export default function uiReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
