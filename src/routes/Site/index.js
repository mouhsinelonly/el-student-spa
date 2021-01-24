import { injectReducer } from 'store/reducers'
import About from './routes/About'
import Registration from './routes/Registration'
import Blog from './routes/Blog'
import Post from './routes/Post'
import Privacy from './routes/Privacy'
import Contact from './routes/Contact'
import Usage from './routes/Usage'
import ReturnPolicy from './routes/ReturnPolicy'
import FAQ from '../Student/routes/FAQ'
import Signup from './routes/Signup'

export default (store) => ({
  childRoutes: [
    About(store),
    Blog(store),
    Post(store),
    Privacy(store),
    Contact(store),
    Usage(store),
    ReturnPolicy(store),
    FAQ(store),
    Registration,
    Signup(store)
  ],
  path: '/',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const Site = require('./containers/SiteContainer').default

      const reducer = require('modules/window').default

      injectReducer(store, { key: 'window', reducer })

      const uiReducer = require('modules/ui').default

      const registrationPeriodReducer = require('modules/registration_period').default

      injectReducer(store, { key: 'registration_period', reducer: registrationPeriodReducer })

      injectReducer(store, { key: 'ui', reducer: uiReducer })

      const paymentViewReducer = require('modules/paymentview').default

      injectReducer(store, { key: 'paymentview', reducer: paymentViewReducer })

      const chatBoxReducer = require('modules/chatbox').default

      const netWorkReducer = require('modules/network').default

      injectReducer(store, { key: 'network', reducer: netWorkReducer })

      injectReducer(store, { key: 'chatbox', reducer: chatBoxReducer })
      /*  Return getComponent   */
      cb(null, Site)
      /* Webpack named bundle   */
    }, 'Site')
  }
})
