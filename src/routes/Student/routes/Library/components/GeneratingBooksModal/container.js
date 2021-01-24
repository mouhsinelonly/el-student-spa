import { connect } from 'react-redux'

import GeneratingBooksModal from './GeneratingBooksModal'

const mapActionCreators = {}

const mapStateToProps = (state) => {
  return {
    ids: state.library.borrowingids
  }
}

export default connect(mapStateToProps, mapActionCreators)(GeneratingBooksModal)
