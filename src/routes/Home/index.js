import { injectReducer } from 'store/reducers'

export default (store) => ({

  // path: '/',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const HomeView = require('./components/HomeView').default

      const modalsReducer = require('modules/modals').default

      const uiReducer = require('modules/ui').default

      injectReducer(store, { key: 'ui', reducer: uiReducer })

      injectReducer(store, { key: 'modals', reducer: modalsReducer })

      const reducer = require('modules/registration_period').default

      injectReducer(store, { key: 'registration_period', reducer })

      const blogReducer = require('./modules/news_reducer').default

      injectReducer(store, { key: 'blog', reducer: blogReducer })

      const paymentViewReducer = require('modules/paymentview').default

      injectReducer(store, { key: 'paymentview', reducer: paymentViewReducer })

      const chatboxReducer = require('modules/chatbox').default

      const netWorkReducer = require('modules/network').default

      injectReducer(store, { key: 'network', reducer: netWorkReducer })

      injectReducer(store, { key: 'chatbox', reducer: chatboxReducer })

      /*  Return getComponent   */
      cb(null, HomeView)

      /* Webpack named bundle   */
    }, 'HomeView')
  }
})
