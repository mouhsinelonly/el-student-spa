// @flow
// ------------------------------------
// Constants
// ------------------------------------
export const LOCALE_CHANGE: string = 'locale.LOCALE_CHANGE'

// ------------------------------------
// Actions
// ------------------------------------
export function localeChange (code: string = '/'): Object {
  return {
    type: LOCALE_CHANGE,
    payload: {
      direction: code === 'ar' ? 'rtl' : 'ltr',
      code
    }
  }
}

// ------------------------------------
// Specialized Action Creator
// ------------------------------------
export const updateLocation = ({ dispatch }: Object): Object => {
  return (nextLocale: string): Function => dispatch(localeChange(nextLocale))
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { dir: 'rtl', code: 'ar' }

export default function locationReducer (state: Object = initialState, action: Object): Object {
  return action.type === LOCALE_CHANGE
    ? action.payload
    : state
}
