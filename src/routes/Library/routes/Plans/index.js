// @flow
// import { injectReducer } from 'store/reducers'

export default (store: Object): Object => ({
  path: 'plans',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState: Object, cb: Function) {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    // $FlowFixMe
    require.ensure([], (require: Function) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const Plans = require('./Plans').default

      // const reducer = require('./modules/community').default
      /*  Add the reducer to the store on key 'programme'  */
      // injectReducer(store, { key: 'element_community', reducer })
      /*  Return getComponent   */
      cb(null, Plans)
      /* Webpack named bundle   */
    }, 'Plans')
  }
})
