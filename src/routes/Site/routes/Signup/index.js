// @flow
import { injectReducer } from 'store/reducers'
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
      const Signup = require('./components/Signup').default

      const reducer = require('./modules/specialities').default

      const registrationPeriod = require('modules/registration_period').default

      const uiReducer = require('modules/ui').default

      const countriesReducer = require('modules/countries').default

      injectReducer(store, { key: 'countries', reducer: countriesReducer })

      injectReducer(store, { key: 'ui', reducer: uiReducer })

      injectReducer(store, { key: 'registration_period', reducer: registrationPeriod })

      injectReducer(store, { key: 'specialities', reducer })

      /*  Return getComponent   */
      cb(null, Signup)
      /* Webpack named bundle   */
    }, 'Site-Signup')
  }
})
