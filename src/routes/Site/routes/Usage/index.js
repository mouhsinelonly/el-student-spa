export default (store) => ({
  path: 'usage',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const Usage = require('./components/Usage').default
      /*  Return getComponent   */
      cb(null, Usage)
      /* Webpack named bundle   */
    }, 'Usage')
  }
})
