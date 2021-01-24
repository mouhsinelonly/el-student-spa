// @flow
// import { injectReducer } from 'store/reducers'
import Specialty from './routes/Specialty'
import Form from './routes/Form'
import WaitingList from './routes/WaitingList'

export default (store: Object): Object => ({
  path: 'programmes',
  childRoutes: [
    Specialty(store),
    Form(store),
    WaitingList(store)
  ],
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState: Object, cb: Function) {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require: Function) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const FAQ = require('./FAQ').default

      /*  Return getComponent   */
      cb(null, FAQ)
      /* Webpack named bundle   */
    }, 'FAQ')
  }
})
