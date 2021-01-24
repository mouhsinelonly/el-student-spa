// @flow
import React from 'react'
import { hydrate, render, unmountComponentAtNode } from 'react-dom'
import createStore from 'store/createStore'
import 'styles/main.scss'
import { loginUserSuccess } from 'routes/Auth/modules/auth'
import { platformIsMobile, getAppBeacon } from 'modules/ui'
import { injectReducer } from 'store/reducers'
import { isMobile, CONSTANTS } from 'utils'
const reducer = require('routes/Auth/modules/auth').default
const uiReducer = require('modules/ui').default

// ========================================================
// Store and History Instantiation
// ========================================================

const store = createStore(window.__INITIAL_STATE__)

/*  Add the reducer to the store on key 'auth'  */
injectReducer(store, { key: 'auth', reducer })
injectReducer(store, { key: 'ui', 'reducer': uiReducer })

store.dispatch(getAppBeacon())

const token = localStorage.getItem('token')

const usertoken = localStorage.getItem('usertoken')

const registrartoken = localStorage.getItem('registrartoken')

const librarytoken = localStorage.getItem('librarytoken')

const affiliatetoken = localStorage.getItem(CONSTANTS['AUTH_AFFILIATE_LOCAL_STORAGE_KEY'])

if (token !== null) {
  store.dispatch(loginUserSuccess(token, 'students'))
}
if (usertoken !== null) {
  store.dispatch(loginUserSuccess(usertoken, 'users'))
}
if (registrartoken !== null) {
  store.dispatch(loginUserSuccess(registrartoken, 'registrars'))
}
if (librarytoken !== null) {
  store.dispatch(loginUserSuccess(librarytoken, 'libraryusers'))
}
if (affiliatetoken !== null) {
  store.dispatch(loginUserSuccess(affiliatetoken, 'affiliates'))
}
if (isMobile()) {
  store.dispatch(platformIsMobile())
}

// function getHeight () {
//   return window.innerHeight ||
//   document.documentElement.clientHeight ||
//   document.body.clientHeight
// }

// setTimeout(() => {
//   store.dispatch(windowResized(getHeight()))
// }, 200)

// window.addEventListener('resize', () => {
//   store.dispatch(windowResized(getHeight()))
// })

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root')

let renderAll = () => {
  const routes = require('routes/index').default(store)
  const App = require('components/App').default

  if (MOUNT_NODE.hasChildNodes() && !__DEV__) {
    hydrate(<App store={store} routes={routes} />, MOUNT_NODE)
  } else {
    render(<App store={store} routes={routes} />, MOUNT_NODE)
  }
}

// This code is excluded from production bundle
if (__DEV__) {
  if (module.hot) {
    const renderApp = renderAll
    const renderError = (error: Object) => {
      const RedBox = require('redbox-react').default

      render(<RedBox error={error} />, MOUNT_NODE)
    }

    // Wrap render in try/catch
    renderAll = () => {
      try {
        renderApp()
      } catch (e) {
        renderError(e)
      }
    }

    // Setup hot module replacement
    module.hot.accept(
      ['components/App', 'routes/index'],
      () => {
        unmountComponentAtNode(MOUNT_NODE)
        renderAll()
      }
    )
  }
}

// ========================================================
// Let's Go!
// ========================================================
if (!__TEST__) renderAll()
