// @flow
import { injectReducer } from 'store/reducers'

export default (store: Object): Object => ({
  path: 'edit',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState: Function, cb: Function) {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require: Function) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const Home = require('./container').default

      // const reducer = require('routes/Student/modules/documents').default
      /*  Add the reducer to the store on key 'student'  */
      // injectReducer(store, { key: 'documents', reducer })
      /*  Return getComponent   */
      cb(null, Home)
      /* Webpack named bundle   */
    }, 'Home')
  }
})
