import { connect } from 'react-redux'
import { getSoftwares } from 'routes/Student/modules/softwares'
import { toggleModalVisibility } from 'modules/modals'

import Softwares from '../components/Softwares'

const mapActionCreators = {
  getSoftwares,
  toggleModalVisibility
}

const mapStateToProps = (state) => {
  return {
    loading: state.softwares.loading,
    softwares: state.softwares.data
  }
}

export default connect(mapStateToProps, mapActionCreators)(Softwares)
