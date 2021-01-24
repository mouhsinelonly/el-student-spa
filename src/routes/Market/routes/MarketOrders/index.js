import { injectReducer } from 'store/reducers'

export default (store) => ({
  path: 'orders',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const MarketOrders = require('./MarketOrders').default

      const reducer = require('modules/market').default
      /*  Add the reducer to the store on key 'student'  */
      injectReducer(store, { key: 'market', reducer })
      /*  Return getComponent   */
      cb(null, MarketOrders)
      /* Webpack named bundle   */
    }, 'MarketOrders')
  }
})
