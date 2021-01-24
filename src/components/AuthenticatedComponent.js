// @flow
import * as React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

type PropsType = {
  isAuthenticated: boolean,
  isAffiliateAuthenticated: boolean,
  isUserAuthenticated: boolean,
  token?: string
};

const requireAuthentication = function (Component, type: string = 'students'): Function {
  class AuthenticatedComponent extends React.Component<PropsType> {
    static contextTypes = {
      router: PropTypes.object.isRequired
    }
    static propTypes = {

    }
    componentDidMount () {
      this.checkAuth()
    }
    componentDidUpdate (nextProps: Object) {
      this.checkAuth()
    }

    checkAuth () {
      const { isAuthenticated, isUserAuthenticated, isAffiliateAuthenticated } = this.props

      if (!isAuthenticated && type === 'students') {
        this.context.router.push(`/auth`)
      } else if (!isUserAuthenticated && type === 'users') {
        this.context.router.push(`/auth`)
      } else if (!isAffiliateAuthenticated && type === 'affiliates') {
        this.context.router.push(`/auth`)
      } else if (!isAuthenticated && type === 'registrars') {
        this.context.router.push(`/auth`)
      } else if (!isAuthenticated && type === 'libraryusers') {
        this.context.router.push(`/auth`)
      }
    }

    render (): React.Element<typeof Component> {
      const { isAuthenticated, isUserAuthenticated, isAffiliateAuthenticated } = this.props
      const shouldRender = isAffiliateAuthenticated || isUserAuthenticated || isAuthenticated
      return shouldRender ? <Component {...this.props} /> : null
    }
    }

  const mapStateToProps = (state: Object): Object => ({
    token: state.auth.token,
    userName: state.auth.userName,
    isAuthenticated: state.auth.isAuthenticated,
    isAffiliateAuthenticated: state.auth.isAffiliateAuthenticated,
    isUserAuthenticated: state.auth.isUserAuthenticated
  })

  return connect(mapStateToProps)(AuthenticatedComponent)
}

export default requireAuthentication
