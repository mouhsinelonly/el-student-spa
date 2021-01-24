// import { injectReducer } from 'store/reducers'
import Details from './routes/Details'
import Form from './routes/Form'
// import Rules from './routes/Rules'

export default (store) => ({
  path: 'research',
  childRoutes: [
    Details(store),
    Form(store)
  ],
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const Research = require('./Research').default

      // const uploadProgressReducer = require('modules/upload').default

      // injectReducer(store, { key: 'uploadProgress', reducer: uploadProgressReducer })

      // const reducer = require('routes/Student/modules/exams').default
      /*  Add the reducer to the store on key 'student'  */
      // injectReducer(store, { key: 'exams', reducer })
      /*  Return getComponent   */
      cb(null, Research)
      /* Webpack named bundle   */
    }, 'Research')
  }
})
