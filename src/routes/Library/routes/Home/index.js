// @flow
// import { injectReducer } from 'store/reducers'

export default (store: Object): Object => ({
  path: 'home',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState: Object, cb: Function) {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    // $FlowFixMe
    require.ensure([], (require: Function) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const Home = require('./container').default

      // const reducer = require('./modules/community').default
      /*  Add the reducer to the store on key 'programme'  */
      // injectReducer(store, { key: 'element_community', reducer })
      /*  Return getComponent   */
      cb(null, Home)
      /* Webpack named bundle   */
    }, 'Library-Home')
  }
})
