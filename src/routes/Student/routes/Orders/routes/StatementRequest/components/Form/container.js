// @flow
import { connect } from 'react-redux'
import { storeStatement, toggleStatementNotification } from 'routes/Student/modules/orders'
import { getFiles, storeFiles } from 'routes/Student/modules/registrations'

import Form from './Form'

const mapActionCreators = {
  storeStatement,
  getFiles,
  storeFiles,
  toggleStatementNotification
}

const mapStateToProps = (state: Object): Object => {
  return {
    countries: state.countries.data,
    files: state.registrations.files,
    uploadingFiles: state.registrations.uploadingFiles
  }
}

export default connect(mapStateToProps, mapActionCreators)(Form)
