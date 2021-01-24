// @flow
// import { injectReducer } from 'store/reducers'

export default (store: Object): Object => ({
  path: 'v/:code',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState: Object, cb: Function) {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require: Function) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const Visit = require('./Visit').default

      /*  Return getComponent   */
      cb(null, Visit)

      /* Webpack named bundle   */
    }, 'AFFILIATE-VISIT')
  }
})
