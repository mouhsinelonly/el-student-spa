// @flow
import { injectReducer } from 'store/reducers'

export default (store: Object): Object => ({
  path: 'researcher',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState: Object, cb: Function) {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    // $FlowFixMe
    require.ensure([], (require: Function) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const Researcher = require('./Researcher').default

      const reducer = require('modules/countries').default
      /*  Add the reducer to the store on key 'programme'  */
      injectReducer(store, { key: 'countries', reducer })
      /*  Return getComponent   */
      cb(null, Researcher)
      /* Webpack named bundle   */
    }, 'Researcher')
  }
})
