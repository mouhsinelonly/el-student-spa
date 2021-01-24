import { injectReducer } from 'store/reducers'
// import Quran from './routes/Quran'
import Rules from './routes/Rules'
import QuranV2 from './routes/QuranV2'

export default store => ({
  path: 'exams',
  childRoutes: [Rules(store), QuranV2(store)],
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    require.ensure(
      [],
      require => {
        /*  Webpack - use require callback to define
       dependencies for bundling   */
        const Exams = require('./containers/ExamsContainer').default

        const uploadProgressReducer = require('modules/upload').default

        injectReducer(store, { key: 'uploadProgress', reducer: uploadProgressReducer })

        const softwareReducer = require('routes/Student/modules/softwares').default

        injectReducer(store, { key: 'softwares', reducer: softwareReducer })

        // const reducer = require('routes/Student/modules/exams').default
        /*  Add the reducer to the store on key 'student'  */
        // injectReducer(store, { key: 'exams', reducer })
        /*  Return getComponent   */
        cb(null, Exams)
        /* Webpack named bundle   */
      },
      'Exams'
    )
  }
})
