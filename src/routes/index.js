// @flow
// We only need to import the modules necessary for initial render
import CoreLayout from 'layouts/PageLayout/PageLayout'
import Home from './Home'
import Student from './Student'
// import Teacher from './Teachers'
import Users from './Users'
import Registrar from './Registrar'
import Library from './Library'
import Market from './Market'
import Site from './Site'
import Sandbox from './Sandbox'
import Affiliate from './Affiliate'
import NotFound from './NotFound'
import AuthRoute from './Auth'
import moment from 'moment'
moment.locale('ar-SA')

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

const getChildRoutes = (store: Object): * => {
  const routes = [
    AuthRoute(store),
    Student(store),
    Users(store),
    Registrar(store),
    Sandbox(store),
    Affiliate(store),
    Market(store),
    Site(store)
  ]

  if (__DEV__) {
    routes.push(Library(store))
  }
  routes.push(NotFound(store))
  return routes
}

export const createRoutes = (store: Object): Object => ({
  path: '/',
  component: CoreLayout,
  indexRoute: Home(store),
  childRoutes: getChildRoutes(store)
})

export default createRoutes
