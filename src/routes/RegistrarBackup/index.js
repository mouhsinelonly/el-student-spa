import { injectReducer } from 'store/reducers'
import {getRegistrationPeriod} from 'modules/registration_period'
import FilesUploader from './routes/FilesUploader'
import Equation from './routes/Equation'

export default (store) => ({
  path: 'registrar',
  childRoutes: [
    FilesUploader(store),
    Equation(store)
  ],
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Registrar = require('./containers/RegistrarContainer').default

      const reducer = require('./modules/registrar').default

      const modalsReducer = require('modules/modals').default

      injectReducer(store, { key: 'modals', reducer: modalsReducer })

      // const modalreducer = require('./modules/modals').default

      // injectReducer(store, { key: 'modal', reducer: modalreducer })

      const windowReducer = require('modules/window').default

      injectReducer(store, { key: 'window', reducer: windowReducer })

      const paymentViewReducer = require('modules/paymentview').default

      injectReducer(store, { key: 'paymentview', reducer: paymentViewReducer })

      const uiReducer = require('modules/ui').default

      injectReducer(store, { key: 'ui', reducer: uiReducer })

      const chatBoxReducer = require('modules/chatbox').default

      const netWorkReducer = require('modules/network').default

      injectReducer(store, {key: 'network', reducer: netWorkReducer})

      const paymentReducer = require('components/Modals/PaymentModal/modules/payment').default

      injectReducer(store, {key: 'registrar_payment', reducer: paymentReducer})

      injectReducer(store, { key: 'chatbox', reducer: chatBoxReducer })

      const RegistrationPeriodReducer = require('modules/registration_period').default

      injectReducer(store, { key: 'registration_period', reducer: RegistrationPeriodReducer })

      const uploadProgressReducer = require('modules/upload').default

      injectReducer(store, { key: 'uploadProgress', reducer: uploadProgressReducer })

      /*  Add the reducer to the store on key 'registrar'  */
      injectReducer(store, { key: 'registrar', reducer })

      store.dispatch(getRegistrationPeriod())
      /*  Return getComponent   */
      cb(null, Registrar)

    /* Webpack named bundle   */
    }, 'registrar')
  }
})
