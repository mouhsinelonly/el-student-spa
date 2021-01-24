import { injectReducer } from 'store/reducers'
import Create from './routes/Create'
import Show from './routes/Show'

export default (store) => ({
  path: 'community',
  childRoutes: [
    Create(store),
    Show(store)
  ],
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const Community = require('./containers/CommunityContainer').default

      const vlogsReducer = require('routes/Student/modules/vlogs').default

      const reducer = require('routes/Student/modules/community').default
      /*  Add the reducer to the store on key 'programme'  */
      injectReducer(store, { key: 'studentCommunity', reducer })

      injectReducer(store, { key: 'vlogs', reducer: vlogsReducer })
      /*  Return getComponent   */
      cb(null, Community)
      /* Webpack named bundle   */
    }, 'Community')
  }
})
