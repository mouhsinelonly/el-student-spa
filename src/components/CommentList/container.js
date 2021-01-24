import { connect } from 'react-redux'

import CommentList from './CommentList'

const mapActionCreators = {}

const mapStateToProps = state => {
  return {
    serverdate: state.serverdate
  }
}

export default connect(mapStateToProps, mapActionCreators)(CommentList)
