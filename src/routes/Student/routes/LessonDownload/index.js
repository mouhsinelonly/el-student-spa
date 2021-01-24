// @flow
import { injectReducer } from 'store/reducers'

export default (store: Object): Object => ({
  path: 'lesson_download/:id',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState: Object, cb: Function) {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require: Function) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const LessonDownload = require('./container').default

      const reducer = require('routes/Student/modules/subjects').default
      /*  Add the reducer to the store on key 'library'  */
      injectReducer(store, { key: 'subjects', reducer })

      /*  Return getComponent   */
      cb(null, LessonDownload)
      /* Webpack named bundle   */
    }, 'LessonDownload')
  }
})
