// @flow
import { injectReducer } from 'store/reducers'

export default (store: Object): Object => ({
  path: 'thesis_draft/:id',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (_: string, cb: Function) {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require: Function) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const ThesisDraft = require('./ThesisDraft').default

      const reducer = require('routes/Student/modules/thesis').default
      /*  Add the reducer to the store on key 'thesis'  */
      injectReducer(store, { key: 'thesis', reducer })

      /*  Return getComponent   */
      cb(null, ThesisDraft)
      /* Webpack named bundle   */
    }, 'ThesisDraft')
  }
})
