// @flow
import { connect } from 'react-redux'
import { toggleSpecialtyActiveTab } from 'modules/ui'

import SpecialtyTabs from './SpecialtyTabs'

const mapActionCreators = {
  toggleSpecialtyActiveTab
}

const mapStateToProps = (state: Object): Object => {
  return {
    active: state.ui.activeSpecialtyTab
  }
}

export default connect(mapStateToProps, mapActionCreators)(SpecialtyTabs)
