import { injectReducer } from 'store/reducers'
export default store => ({
  path: 'sandbox',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    require.ensure(
      [],
      require => {
        /*  Webpack - use require callback to define
       dependencies for bundling   */
        const Sandbox = require('./container').default

        const netWorkReducer = require('modules/network').default

        injectReducer(store, { key: 'network', reducer: netWorkReducer })

        const sandboxReducer = require('./modules').default

        const HTML5VideoRecorderReducer = require('components/HTML5VideoRecorder/module').default

        injectReducer(store, { key: 'html5recorder', reducer: HTML5VideoRecorderReducer })

        injectReducer(store, { key: 'sandbox', reducer: sandboxReducer })

        const paymentViewReducer = require('modules/paymentview').default

        injectReducer(store, { key: 'paymentview', reducer: paymentViewReducer })

        /*  Return getComponent   */
        cb(null, Sandbox)
        /* Webpack named bundle   */
      },
      'Sandbox'
    )
  }
})
