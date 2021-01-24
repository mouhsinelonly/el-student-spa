// @flow
import { injectReducer } from 'store/reducers'
import MarketOrders from './routes/MarketOrders'

export default (store: Object): Object => ({
  path: 'market',
  childRoutes: [MarketOrders(store)],
  /*  Async getComponent is only invoked when route matches   */
  getComponent (_: string, cb: Function) {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require: Function) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const Market = require('./MarketDashboard').default

      const reducer = require('routes/Student/modules/market').default
      /*  Add the reducer to the store on key 'market'  */
      injectReducer(store, { key: 'market', reducer })

      /*  Return getComponent   */
      cb(null, Market)
      /* Webpack named bundle   */
    }, 'Market')
  }
})
