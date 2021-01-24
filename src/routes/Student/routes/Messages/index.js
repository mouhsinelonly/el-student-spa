import { injectReducer } from 'store/reducers'

export default (store) => ({
  path: 'support/messages',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const Messages = require('./containers/MessagesContainer').default

      const reducer = require('routes/Student/modules/messages').default
      /*  Add the reducer to the store on key 'student'  */
      injectReducer(store, { key: 'messages', reducer })
      /*  Return getComponent   */
      cb(null, Messages)
      /* Webpack named bundle   */
    }, 'Messages')
  }
})
