import { injectReducer } from 'store/reducers'

export default (store) => ({
  path: 'subject/:id',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const Subject = require('./containers/SubjectContainer').default

      const reducer = require('./modules/quran_subject').default
      /*  Add the reducer to the store on key 'programme'  */
      injectReducer(store, { key: 'quran_subject', reducer })
      /*  Return getComponent   */
      cb(null, Subject)
      /* Webpack named bundle   */
    }, 'Subject')
  }
})
