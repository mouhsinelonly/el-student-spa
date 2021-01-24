import { injectReducer } from 'store/reducers'

export default (store) => ({
  path: 'uploader',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const FilesUploader = require('./containers/FilesUploaderContainer').default
      
      const reducer = require('./modules/uploader').default

      injectReducer(store, { key: 'registration_uploader', reducer })

      /*  Return getComponent   */
      cb(null, FilesUploader)

    /* Webpack named bundle   */
    }, 'registration_uploader')
  }
})
