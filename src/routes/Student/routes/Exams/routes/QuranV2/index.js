import { injectReducer } from 'store/reducers'

export default store => ({
  path: 'quranv2/:subjectId',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    require.ensure(
      [],
      require => {
        /*  Webpack - use require callback to define
       dependencies for bundling   */
        const Home = require('./container').default

        const HTML5VideoRecorderReducer = require('components/HTML5VideoRecorder/module').default

        injectReducer(store, { key: 'html5recorder', reducer: HTML5VideoRecorderReducer })

        const reducer = require('./module').default
        /*  Add the reducer to the store on key 'student'  */
        injectReducer(store, { key: 'quranexamv2', reducer })

        const RecorderReducer = require('../QuranV2/modules/quran_recorder').default
        /*  Add the RecorderReducer to the store on key 'student'  */
        injectReducer(store, { key: 'quran_recorder', reducer: RecorderReducer })

        /*  Return getComponent   */
        cb(null, Home)
        /* Webpack named bundle   */
      },
      'Home'
    )
  }
})
