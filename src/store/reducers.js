// @flow
import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import locationReducer from './location'
import { LOGOUT_USER } from 'routes/Auth/modules/auth'
import { scrollToTop } from 'utils'
import { localizeReducer } from 'react-localize-redux'

export const makeRootReducer = (asyncReducers: Object): Object => {
  const appReducer = combineReducers({
    // Add sync reducers here
    location: locationReducer,
    form: formReducer,
    localize: localizeReducer,
    ...asyncReducers
  })

  const rootReducer = (state: Object, action: Object): Object => {
    switch (action.type) {
      case LOGOUT_USER:
        // console.log('logout dispatched')
        // state = undefined
        break
      case 'LOCATION_CHANGE':
        scrollToTop()
        break
    }

    return appReducer(state, action)
  }

  return rootReducer
}

export const injectReducer = (store: Object, { key, reducer }: Object) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
