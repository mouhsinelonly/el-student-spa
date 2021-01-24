// @flow
import { injectReducer } from 'store/reducers'
import Plans from './routes/Plans'
import Signup from './routes/Signup'
import HomePage from './routes/Home'
import Browse from './routes/Browse'
import MyLibrary from './routes/MyLibrary'
import Invoices from './routes/Invoices'
import Researcher from './routes/Researcher'
import Folder from './routes/Folder'
import { getProfile } from 'modules/library'
import { getBooksList, getFolders } from 'modules/library_research'

export default (store: Object): Object => ({
  path: 'library',
  childRoutes: [
    Plans(store),
    Signup(store),
    HomePage(store),
    Invoices(store),
    MyLibrary(store),
    Researcher(store),
    Folder(store),
    Browse(store)
  ],
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState: Object, cb: Function) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    // $FlowFixMe
    require.ensure([], (require: Function) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Home = require('./Home').default

      const modalsReducer = require('modules/modals').default

      injectReducer(store, { key: 'modals', reducer: modalsReducer })

      const windowReducer = require('modules/window').default

      injectReducer(store, { key: 'window', reducer: windowReducer })

      const libraryAccountReducer = require('modules/library').default

      injectReducer(store, { key: 'library_account', reducer: libraryAccountReducer })

      const paymentViewReducer = require('modules/paymentview').default

      injectReducer(store, { key: 'paymentview', reducer: paymentViewReducer })

      const uiReducer = require('modules/ui').default

      const registrationPeriodReducer = require('modules/registration_period').default

      injectReducer(store, { key: 'registration_period', reducer: registrationPeriodReducer })

      injectReducer(store, { key: 'ui', reducer: uiReducer })

      const netWorkReducer = require('modules/network').default

      injectReducer(store, { key: 'network', reducer: netWorkReducer })

      const paymentReducer = require('components/Modals/PaymentModal/modules/payment').default

      injectReducer(store, { key: 'registrar_payment', reducer: paymentReducer })

      const libraryReducer = require('routes/Student/modules/library').default

      injectReducer(store, { key: 'library', reducer: libraryReducer })

      const reducer = require('modules/library_research').default
      /*  Add the reducer to the store on key 'library'  */
      injectReducer(store, { key: 'library_research', reducer })
      // console.log(store.getState().library_account.profile)
      const state = store.getState()
      if (typeof state.library_account.profile.id === 'undefined' && state.auth.librarytoken) {
        store.dispatch(getProfile())
        store.dispatch(getBooksList({ guard: 'libraryuser' }))
        store.dispatch(getFolders({ guard: 'libraryuser' }))
      }

      /*  Return getComponent   */
      cb(null, Home)

    /* Webpack named bundle   */
    }, 'Library')
  }
})
