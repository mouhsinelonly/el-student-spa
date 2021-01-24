export default (store) => ({
  path: 'specialty/:specialtyID',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const Specialty = require('./components/SpecialtyContainer').default

      // const reducer = require('./modules/specialities').default

      // injectReducer(store, { key: 'specialities', reducer })

      /*  Return getComponent   */
      cb(null, Specialty)

      /* Webpack named bundle   */
    }, 'Specialty')
  }
})
