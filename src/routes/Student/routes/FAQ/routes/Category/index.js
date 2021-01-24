import { injectReducer } from 'store/reducers'

export default (store) => ({
  path: 'category/:id',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const Category = require('./container').default

      const reducer = require('routes/Student/modules/faq').default
      /*  Add the reducer to the store on key 'student'  */
      injectReducer(store, { key: 'faq', reducer })

      /*  Return getComponent   */
      cb(null, Category)
      /* Webpack named bundle   */
    }, 'Category')
  }
})
