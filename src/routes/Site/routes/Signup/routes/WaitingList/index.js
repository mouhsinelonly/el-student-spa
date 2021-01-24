// @flow
export default (store: Object): Object => ({
  path: 'waitinglist/:id',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState: Function, cb: Function) {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    // $FlowFixMe
    require.ensure([], (require: Function) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const Specialty = require('./container').default

      // const reducer = require('./modules/specialities').default

      // injectReducer(store, { key: 'specialities', reducer })

      /*  Return getComponent   */
      cb(null, Specialty)

      /* Webpack named bundle   */
    }, 'Specialty')
  }
})
