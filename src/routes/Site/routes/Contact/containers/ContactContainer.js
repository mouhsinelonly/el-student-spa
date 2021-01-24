import { connect } from 'react-redux'
import { postContactMessage, showContactMessage } from 'modules/contact'

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the profile:   */

import Contact from '../components/Contact'

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around getProfile the component doesn't care   */

const mapActionCreators = {
  postContactMessage,
  showContactMessage
}

const mapStateToProps = (state) => {
  return {
    sent: state.contact.sent,
    error: state.contact.error,
    loading: state.contact.loading
  }
}

export default connect(mapStateToProps, mapActionCreators)(Contact)
