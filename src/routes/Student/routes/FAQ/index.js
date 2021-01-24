import { injectReducer } from 'store/reducers'
import Category from './routes/Category'
import Question from './routes/Question'
import Search from './routes/Search'

export default (store) => ({
  path: 'support/faq',
  childRoutes: [
    Category(store),
    Search(store),
    Question(store)
  ],
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const FAQ = require('./containers/FaqContainer').default

      const reducer = require('routes/Student/modules/faq').default
      /*  Add the reducer to the store on key 'student'  */
      injectReducer(store, { key: 'faq', reducer })

      /*  Return getComponent   */
      cb(null, FAQ)
      /* Webpack named bundle   */
    }, 'FAQ')
  }
})
