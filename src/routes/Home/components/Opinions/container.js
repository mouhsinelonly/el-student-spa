import { connect } from 'react-redux'
import { showModal } from 'modules/modals'

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the profile:   */

import Opinions from './Opinions'

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around getProfile the component doesn't care   */

const mapActionCreators = {
  showModal
}

const mapStateToProps = (state) => {
  return {
    data: state.modals.data,
    loading: state.modals.loading
  }
}

export default connect(mapStateToProps, mapActionCreators)(Opinions)
