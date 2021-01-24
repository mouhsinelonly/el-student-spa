// import { injectReducer } from 'store/reducers'

export default (store) => ({
  path: 'support/guides',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const Guides = require('./components/Guides').default

      // const reducer = require('routes/Student/modules/guides').default
      /*  Add the reducer to the store on key 'student'  */
      // injectReducer(store, { key: 'guides', reducer })

      /*  Return getComponent   */
      cb(null, Guides)
      /* Webpack named bundle   */
    }, 'Guides')
  }
})
