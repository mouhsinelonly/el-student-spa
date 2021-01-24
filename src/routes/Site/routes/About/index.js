// @flow
export default (store: Object): Object => ({
  path: 'our_vision',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState: Object, cb: Function) {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require: Object) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const About = require('./components/About').default

      /*  Return getComponent   */
      cb(null, About)
      /* Webpack named bundle   */
    }, 'About')
  }
})
