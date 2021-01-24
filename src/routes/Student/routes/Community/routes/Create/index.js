export default (store) => ({
  path: 'create',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const Create = require('./containers/CreateContainer').default
      /*  Return getComponent   */
      cb(null, Create)
      /* Webpack named bundle   */
    }, 'Create')
  }
})
