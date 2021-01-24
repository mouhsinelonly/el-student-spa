export default (store) => ({
  path: 'upload_photo',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const UploadPhoto = require('./container').default
      /*  Return getComponent   */
      cb(null, UploadPhoto)
      /* Webpack named bundle   */
    }, 'UploadPhoto')
  }
})
