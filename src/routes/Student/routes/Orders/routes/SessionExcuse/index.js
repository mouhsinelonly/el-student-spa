import { injectReducer } from 'store/reducers'
export default (store) => ({
  path: 'session_excuse/:id',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const SessionExcuse = require('./containers/SessionExcuseContainer').default

      const uploadProgressReducer = require('modules/upload').default

      const reducer = require('./modules/session_excuse').default

      injectReducer(store, { key: 'uploadProgress', reducer: uploadProgressReducer })

      injectReducer(store, { key: 'session_excuse', reducer })
      /*  Return getComponent   */
      cb(null, SessionExcuse)
      /* Webpack named bundle   */
    }, 'SessionExcuse')
  }
})
