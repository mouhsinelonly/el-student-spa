// import { injectReducer } from 'store/reducers'
export default (store) => ({
  path: 'paymenterror',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const PaymentError = require('./container').default

      // const netWorkReducer = require('modules/network').default

      // injectReducer(store, { key: 'network', reducer: netWorkReducer })

      // const paymentViewReducer = require('modules/paymentview').default

      // injectReducer(store, { key: 'paymentview', reducer: paymentViewReducer })

      /*  Return getComponent   */
      cb(null, PaymentError)
      /* Webpack named bundle   */
    }, 'PaymentError')
  }
})
