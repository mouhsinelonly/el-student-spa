// @flow

export default (store: Object): Object => ({
  path: 'settings',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState: Object, cb: Function) {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require: Function) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const Settings = require('./Settings').default

      /*  Return getComponent   */
      cb(null, Settings)

      /* Webpack named bundle   */
    }, 'AFFILIATE-SETTINGS')
  }
})
