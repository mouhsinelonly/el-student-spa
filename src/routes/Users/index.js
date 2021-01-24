// @flow
import { injectReducer } from 'store/reducers'
import Recordings from './routes/Recordings'
import Activation from './routes/Activation'

export default (store: Object): Object => ({
  path: 'user',
  childRoutes: [
    Recordings(store),
    Activation(store)
  ],
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState: Object, cb: Function) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require: Function) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Admin = require('./containers/UsersContainer').default

      const reducer = require('./modules/users').default

      /*  Add the reducer to the store on key 'teacher'  */
      injectReducer(store, { key: 'user_profile', reducer })

      const studentsReducer = require('./modules/students').default
      /*  Add the reducer to the store on key 'teacher'  */
      injectReducer(store, { key: 'user_students', reducer: studentsReducer })

      const sessionsReducer = require('./modules/sessions').default
      /*  Add the reducer to the store on key 'teacher'  */
      injectReducer(store, { key: 'user_sessions', reducer: sessionsReducer })

      const uiReducer = require('./modules/userui').default
      /*  Add the reducer to the store on key 'teacher'  */
      injectReducer(store, { key: 'user_ui', reducer: uiReducer })

      const examsReducer = require('./modules/exams').default
      /*  Add the reducer to the store on key 'teacher'  */
      injectReducer(store, { key: 'user_exams', reducer: examsReducer })

      const examRecordingsReducer = require('./modules/recordings').default
      /*  Add the reducer to the store on key 'teacher'  */
      injectReducer(store, { key: 'user_recordings', reducer: examRecordingsReducer })

      const tilawaReducer = require('./modules/tilawa').default
      /*  Add the reducer to the store on key 'teacher'  */
      injectReducer(store, { key: 'user_tilawa', reducer: tilawaReducer })

      const marketReducer = require('./modules/market').default
      /*  Add the reducer to the store on key 'teacher'  */
      injectReducer(store, { key: 'user_market', reducer: marketReducer })

      const modalsReducer = require('modules/modals').default

      injectReducer(store, { key: 'modals', reducer: modalsReducer })

      const excusesReducer = require('./modules/excuses').default
      /*  Add the reducer to the store on key 'teacher'  */
      injectReducer(store, { key: 'user_excuses', reducer: excusesReducer })

      const financialsReducer = require('./modules/financials').default
      /*  Add the reducer to the store on key 'teacher'  */
      injectReducer(store, { key: 'user_financials', reducer: financialsReducer })

      const ticketsReducer = require('./modules/tickets').default

      /*  Add the reducer to the store on key 'teacher'  */
      injectReducer(store, { key: 'user_tickets', reducer: ticketsReducer })

      // const serverDateReducer = require('./modules/serverdate').default

      // injectReducer(store, { key: 'serverdate', reducer: serverDateReducer })

      const netWorkReducer = require('modules/network').default

      injectReducer(store, { key: 'network', reducer: netWorkReducer })

      /*  Return getComponent   */
      cb(null, Admin)

    /* Webpack named bundle   */
    }, 'Admin')
  }
})
