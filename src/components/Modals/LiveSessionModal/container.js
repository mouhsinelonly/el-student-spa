// @flow
import { connect } from 'react-redux'
import { closeModal } from 'modules/modals'
import { storeSessionClick } from 'routes/Student/modules/sessions'

import LiveSessionModal from './LiveSessionModal'

const mapActionCreators = {
  closeModal,
  storeSessionClick
}

const mapStateToProps = (state: Object): Object => {
  return {}
}

export default connect(mapStateToProps, mapActionCreators)(LiveSessionModal)
