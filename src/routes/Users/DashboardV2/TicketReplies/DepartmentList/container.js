// @flow
import { connect } from 'react-redux'
import { toggleDepartment } from 'routes/Users/modules/tickets'

import DepartmentList from './DepartmentList'
const mapActionCreators = {
  toggleDepartment
}

const mapStateToProps = (state: Object): Object => {
  return {
    departments: state.user_tickets.departments,
    ticket: state.user_tickets.activeTicket,
    changeDepartmentVisible: state.user_tickets.changeDepartmentVisible
  }
}

export default connect(mapStateToProps, mapActionCreators)(DepartmentList)
