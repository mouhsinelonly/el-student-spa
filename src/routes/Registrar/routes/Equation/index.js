import { injectReducer } from 'store/reducers'
import {getEquationSubjects} from './modules/equation'

export default (store) => ({
  path: 'equation',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Equation = require('./containers/EquationContainer').default
      
      const reducer = require('./modules/equation').default

      injectReducer(store, { key: 'registration_equation', reducer })

      store.dispatch(getEquationSubjects());
      /*  Return getComponent   */
      cb(null, Equation)

    /* Webpack named bundle   */
    }, 'registration_equation')
  }
})
