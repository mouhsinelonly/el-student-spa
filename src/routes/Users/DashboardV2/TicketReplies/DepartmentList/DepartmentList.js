// @flow
import * as React from 'react'
import './DepartmentList.scss'
import { Scrollbars } from 'react-custom-scrollbars'

type PropsType = {
  departments: Array<Object>,
  toggleDepartment: Function,
  ticket: Object,
  changeDepartmentVisible: boolean
};

const DepartmentList = ({
  changeDepartmentVisible, // visibility of the component
  ticket, //  the current ticket
  departments, // all the departments
  toggleDepartment // toggle department function
  }: PropsType): React.Element<'div'> => {

  const ticketDepartments = departments.filter((d: Object): boolean => (d.parent_id === ticket.department_id) || (ticket.department && d.parent_id === ticket.department.parent_id))
  return (
    <div className='pull-xs-left'>
      <button style={{ backgroundColor: 'transparent', borderWidth: 0 }}
        onClick={toggleDepartment}>
        تحويل الرسالة <i className='material-icons m-r-2'>reply</i>
      </button>
      <div className={`DepartmentList my-panel-white shadow-3
        ${!changeDepartmentVisible ? 'hidden-xs-up' : 'animated fadeIn'}`}>
        <Scrollbars style={{ height: 250, width: 300 }}>
          {ticketDepartments.map((d: Object): React.Element<'li'> =>
            <li className='DepartmentList__item text-truncate' key={d.id}>{d.name}</li>)}
        </Scrollbars>
      </div>
    </div>
  )
}

export default DepartmentList
