// @flow
// import { injectReducer } from 'store/reducers'

export default (store: Object): Object => ({
  path: 'mylibrary',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState: Object, cb: Function) {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    // $FlowFixMe
    require.ensure([], (require: Function) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const MyLibrary = require('./container').default

      // const reducer = require('./modules/paymentsui').default
      /*  Add the reducer to the store on key 'student'  */
      // injectReducer(store, { key: 'paymentsui', reducer })

      /*  Return getComponent   */
      cb(null, MyLibrary)
      /* Webpack named bundle   */
    }, 'MyLibrary')
  }
})
