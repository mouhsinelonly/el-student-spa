// @flow
export default (store: Object): Object => ({
  path: 'activation',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState: Object, cb: Function) {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require: Function) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const Activation = require('./Activation').default
      /*  Return getComponent   */
      cb(null, Activation)
      /* Webpack named bundle   */
    }, 'Activation')
  }
})
