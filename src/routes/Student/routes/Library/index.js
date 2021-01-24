import { injectReducer } from 'store/reducers'
import MyProfile from './routes/MyProfile'
import Book from './routes/Book'
import Browse from './routes/Browse'
import Folder from './routes/Folder'
import ResearcherPortal from './routes/ResearcherPortal'

export default (store) => ({
  path: 'library',
  childRoutes: [
    MyProfile(store),
    Book(store),
    Folder(store),
    Browse(store),
    ResearcherPortal(store)
  ],
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const Library = require('./containers/MainContainer').default

      const reducer = require('modules/library_research').default
      /*  Add the reducer to the store on key 'library'  */
      injectReducer(store, { key: 'library_research', reducer })

      /*  Return getComponent   */
      cb(null, Library)
      /* Webpack named bundle   */
    }, 'Library')
  }
})
