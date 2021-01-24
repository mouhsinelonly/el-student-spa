// @flow
import { injectReducer } from 'store/reducers'

export default (store: Object): Object => ({
  path : 'dashboard',
  childRoutes: [],
  /*  Async getComponent is only invoked when route matches   */
  getComponent (_: string, cb: Function) {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require: Function) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const Market = require('./MarketDashboard').default
      const netWorkReducer = require('modules/network').default

      injectReducer(store, {
        key: 'network',
        reducer: netWorkReducer
      })

      const reducer = require('modules/market').default
      /*  Add the reducer to the store on key 'market'  */
      injectReducer(store, { key: 'market', reducer })

      const modalsReducer = require('modules/modals').default

      injectReducer(store, {
        key: 'modals',
        reducer: modalsReducer
      })

      const paymentViewReducer = require('modules/paymentview').default

      injectReducer(store, { key: 'paymentview', reducer: paymentViewReducer })
        
      const paymentsReducer = require('./modules/payments').default

      injectReducer(store, {
        key: 'payments',
        reducer: paymentsReducer
      })

      /*  Return getComponent   */
      cb(null, Market)
      /* Webpack named bundle   */
    }, 'Market')
  }
})
