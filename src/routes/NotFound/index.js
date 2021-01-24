import { injectReducer } from 'store/reducers'
export default (store) => ({
  path: '*',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      const NotFound = require('./NotFound').default

      const netWorkReducer = require('modules/network').default

      injectReducer(store, { key: 'network', reducer: netWorkReducer })
      /*  Return getComponent   */
      cb(null, NotFound)

    /* Webpack named bundle   */
    }, 'NotFound')
  }
})
