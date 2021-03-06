// import { injectReducer } from 'store/reducers'

export default (store) => ({
  path: 'browse/:id',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const Browse = require('./container').default

      // const reducer = require('./modules/paymentsui').default
      /*  Add the reducer to the store on key 'student'  */
      // injectReducer(store, { key: 'paymentsui', reducer })

      /*  Return getComponent   */
      cb(null, Browse)
      /* Webpack named bundle   */
    }, 'Browse')
  }
})
