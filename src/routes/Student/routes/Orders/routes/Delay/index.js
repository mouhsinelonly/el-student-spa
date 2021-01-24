import { injectReducer } from 'store/reducers'
export default (store) => ({
  path: 'delay',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const Delay = require('./containers/DelayContainer').default

      const uploadProgressReducer = require('modules/upload').default

      injectReducer(store, { key: 'uploadProgress', reducer: uploadProgressReducer })

      const reducer = require('./modules/delay').default

      injectReducer(store, { key: 'delayform', reducer })
      /*  Return getComponent   */
      cb(null, Delay)
      /* Webpack named bundle   */
    }, 'Delay')
  }
})
