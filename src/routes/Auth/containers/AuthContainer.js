import { connect } from 'react-redux'
import {
  loginUserSuccess,
  getToken,
  loginUserFailure,
  loginUserRequest,
  logout,
  logoutAndRedirect,
  loginUser,
  toggleAuthForm,
  resetPassword
} from 'routes/Auth/modules/auth'
import { locationChange } from 'store/location'

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the auth:   */

import Auth from 'components/Auth'

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around increment; the component doesn't care   */

const mapActionCreators = {
  locationChange,
  loginUserSuccess,
  getToken,
  loginUserFailure,
  loginUserRequest,
  logout,
  logoutAndRedirect,
  loginUser,
  toggleAuthForm,
  resetPassword
}

const mapStateToProps = state => ({
  token: state.auth.token,
  userName: state.auth.userName,
  isAuthenticated: state.auth.isAuthenticated,
  isUserAuthenticated: state.auth.isUserAuthenticated,
  usertoken: state.auth.usertoken,
  isAuthenticating: state.auth.isAuthenticating,
  currentform: state.auth.currentform,
  passwordischanging: state.auth.passwordischanging,
  resetpasswordstatus: state.auth.resetpasswordstatus,
  statusText: state.auth.statusText
})

export default connect(mapStateToProps, mapActionCreators)(Auth)
