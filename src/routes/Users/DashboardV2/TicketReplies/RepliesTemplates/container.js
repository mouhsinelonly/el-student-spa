// @flow
import { connect } from 'react-redux'
import { toggleTemplatesVisiblity } from 'routes/Users/modules/tickets'

import RepliesTemplates from './RepliesTemplates'
const mapActionCreators = {
  toggleTemplatesVisiblity
}

const mapStateToProps = (state: Object): Object => {
  return {
    visible: state.user_tickets.templatesVisible,
    templatesLoading: state.user_tickets.templatesLoading,
    templates: state.user_tickets.templates
  }
}

export default connect(mapStateToProps, mapActionCreators)(RepliesTemplates)
