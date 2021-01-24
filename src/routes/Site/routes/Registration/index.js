// @flow
export default ({
  path: 'info',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState: Object, cb: Function) {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require: Function) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const Registration = require('./components/Registration').default
      /*  Return getComponent   */
      cb(null, Registration)
      /* Webpack named bundle   */
    }, 'Registration')
  }
})
