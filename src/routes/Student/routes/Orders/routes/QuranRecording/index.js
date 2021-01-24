import { injectReducer } from 'store/reducers'
export default (store) => ({
  path: 'quran_recording',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const QuranRecording = require('./containers/QuranRecordingContainer').default

      const uploadProgressReducer = require('modules/upload').default

      injectReducer(store, { key: 'uploadProgress', reducer: uploadProgressReducer })

      const reducer = require('./modules/quran_recordings').default

      injectReducer(store, { key: 'quranrecordingform', reducer })
      /*  Return getComponent   */
      cb(null, QuranRecording)
      /* Webpack named bundle   */
    }, 'QuranRecording')
  }
})
