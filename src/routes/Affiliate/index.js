// @flow
import { injectReducer } from 'store/reducers'
import Home from './routes/Home'
import Settings from './routes/Settings'
import Visit from './routes/Visit'

export default (store: Object): Object => ({
  path: 'affiliate',
  childRoutes: [
    Home(store),
    Settings(store),
    Visit(store)
  ],
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState: Object, cb: Function) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require: Function) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Affiliate = require('./Affiliate').default

      const netWorkReducer = require('modules/network').default

      injectReducer(store, { key: 'network', reducer: netWorkReducer })

      const affiliateReducer = require('./modules/affiliates').default

      const registrationPeriodReducer = require('modules/registration_period').default

      injectReducer(store, { key: 'registration_period', reducer: registrationPeriodReducer })

      injectReducer(store, { key: 'affiliates', reducer: affiliateReducer })

      const countriesReducer = require('modules/countries').default

      injectReducer(store, { key: 'countries', reducer: countriesReducer })

      /*  Return getComponent   */
      cb(null, Affiliate)

    /* Webpack named bundle   */
    }, 'Affiliate')
  }
})
