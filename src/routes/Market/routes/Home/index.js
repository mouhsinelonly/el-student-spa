// @flow
export default (store: Object): Object => ({
  path : 'home',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (_: string, cb: Function) {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require: Function) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const Home = require('./Home').default

      /*  Return getComponent   */
      cb(null, Home)
      /* Webpack named bundle   */
    }, 'Home')
  }
})
