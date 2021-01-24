// @flow
export default (store: Object): Object => ({
  path: 'recordings',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState: Object, cb: Function) {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require: Function) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const Recordings = require('./Components/container').default
      /*  Return getComponent   */
      cb(null, Recordings)
      /* Webpack named bundle   */
    }, 'Recordings')
  }
})
