// @flow
import { injectReducer } from 'store/reducers'

export default (store: Object): Object => ({
  path: 'statement',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState: Object, cb: Function) {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require: Function) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const StatementRequest = require('./container').default

      const registrations = require('routes/Student/modules/registrations').default

        /*  Add the reducer to the store on key 'student'  */
      injectReducer(store, { key: 'registrations', reducer: registrations })
      // const reducer = require('./modules/quran_subject').default
      /*  Add the reducer to the store on key 'programme'  */
      // injectReducer(store, { key: 'quran_subject', reducer })
      /*  Return getComponent   */
      cb(null, StatementRequest)
      /* Webpack named bundle   */
    }, 'StatementRequest')
  }
})
