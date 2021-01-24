import { injectReducer } from 'store/reducers'
import { getCountries } from 'modules/countries'
import { selectRegistrationSpecialty } from '../../modules/specialities'

export default (store) => ({
  path: 'form(/:specialtyID)',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    if (nextState.params.specialtyID) {
      store.dispatch(selectRegistrationSpecialty(parseInt(nextState.params.specialtyID)))
    }
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const Form = require('./containers/FormContainer').default

      const reducer = require('../../modules/form').default

      injectReducer(store, { key: 'signupform', reducer })

      const uploadProgressReducer = require('modules/upload').default

      injectReducer(store, { key: 'uploadProgress', reducer: uploadProgressReducer })

      const registrationPeriod = require('modules/registration_period').default

      injectReducer(store, { key: 'registration_period', reducer: registrationPeriod })

      const countriesReducer = require('modules/countries').default

      injectReducer(store, { key: 'countries', reducer: countriesReducer })

      store.dispatch(getCountries())

      /*  Return getComponent   */
      cb(null, Form)

      /* Webpack named bundle   */
    }, 'Form')
  }
})
