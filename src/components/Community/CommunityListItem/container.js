import { connect } from 'react-redux'

import CommunityListItem from './CommunityListItem'

const mapActionCreators = {}

const mapStateToProps = state => {
  return {
    serverdate: state.serverdate
  }
}

export default connect(mapStateToProps, mapActionCreators)(CommunityListItem)
