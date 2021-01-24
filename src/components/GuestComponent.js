// @flow
import * as React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

type PropsType = {
  isAuthenticated: boolean
};

export default function requireGuest (Component): Function {
  class GuestComponent extends React.Component<PropsType> {
    static contextTypes = {
      router: PropTypes.object.isRequired
    }

    componentDidMount () {
      this.checkAuth()
    }

    componentDidUpdate () {
      this.checkAuth()
    }

    checkAuth () {
      if (this.props.isAuthenticated) {
        this.context.router.push(`/auth`)
      }
    }

    render (): React.Element<typeof Component> {
      return (<div>
        {this.props.isAuthenticated === false ? <Component {...this.props} /> : null}
      </div>)
    }
    }

  const mapStateToProps = (state: Object): Object => ({
    token: state.auth.token,
    userName: state.auth.userName,
    isAuthenticated: state.auth.isAuthenticated
  })

  return connect(mapStateToProps)(GuestComponent)
}
