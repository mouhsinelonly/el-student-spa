// @flow
// import { injectReducer } from 'store/reducers'
import Withdraw from './routes/Withdraw'
import Delay from './routes/Delay'
import SessionExcuse from './routes/SessionExcuse'
import QuranRecording from './routes/QuranRecording'
import StatementRequest from './routes/StatementRequest'

export default (store: Object): Object => ({
  path: 'orders',
  childRoutes: [
    SessionExcuse(store),
    Withdraw(store),
    Delay(store),
    StatementRequest(store),
    QuranRecording(store)
  ],
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState: Object, cb: Function) {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require: Function) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const Orders = require('./containers/OrdersContainer').default
      /*  Return getComponent   */
      cb(null, Orders)
      /* Webpack named bundle   */
    }, 'Orders')
  }
})
