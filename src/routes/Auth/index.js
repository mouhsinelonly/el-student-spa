import { injectReducer } from 'store/reducers'

export default (store) => ({
  path: 'auth',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Auth = require('./containers/AuthContainer').default

      const reducer = require('./modules/auth').default

      const modalsReducer = require('modules/modals').default

      injectReducer(store, { key: 'modals', reducer: modalsReducer })

      const uiReducer = require('modules/ui').default

      injectReducer(store, { key: 'ui', reducer: uiReducer })

      const paymentViewReducer = require('modules/paymentview').default

      injectReducer(store, { key: 'paymentview', reducer: paymentViewReducer })

      const chatBoxReducer = require('modules/chatbox').default

      const netWorkReducer = require('modules/network').default

      injectReducer(store, { key: 'network', reducer: netWorkReducer })

      injectReducer(store, { key: 'chatbox', reducer: chatBoxReducer })
      /*  Add the reducer to the store on key 'auth'  */
      injectReducer(store, { key: 'auth', reducer })

      /*  Return getComponent   */
      cb(null, Auth)

    /* Webpack named bundle   */
    }, 'auth')
  }
})
