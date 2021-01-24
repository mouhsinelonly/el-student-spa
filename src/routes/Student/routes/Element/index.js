import { injectReducer } from 'store/reducers'

export default (store) => ({
  path: 'element/:id',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const Element = require('./containers/ElementContainer').default

      const reducer = require('./modules/community').default
      /*  Add the reducer to the store on key 'programme'  */
      injectReducer(store, { key: 'element_community', reducer })
      /*  Return getComponent   */
      cb(null, Element)
      /* Webpack named bundle   */
    }, 'Element')
  }
})
