// @flow
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setActiveDepartment } from 'routes/Student/modules/market'
import './MarketSidebar.scss'

const Sidebar = (): React.Element<'div'> => {
  const dispatch = useDispatch()
  const { specialties, departmentId, specialtyId } = useSelector((state: Object): Object => state.market)
  const mySpecialty = specialties.find((specialty: Object): boolean => specialty.id === specialtyId)
  const onClick = (event: Object) => {
    dispatch(setActiveDepartment({ departmentId: +event.currentTarget.dataset.id }))
  }
  const onSpecialtyClick = (event: Object) => {
    dispatch(setActiveDepartment({
      specialtyId: +event.currentTarget.dataset.id,
      departmentId: +event.currentTarget.dataset.specialty
    }))
  }
  const otherSpecialties = specialties.filter(specialty => specialty.id !== specialtyId)
  return <div className='MarketSidebar'>
    { mySpecialty ? <div className='shadow-1 my-panel-white'>
      <h6 className='p-a-1 font-weight-bold'>{mySpecialty.name}</h6>
      <ul className='list-unstyled p-a-0'>
        {mySpecialty.departments.map((department: Object): React.Element<'li'> => <li key={department.id}>
          <button
            onClick={onClick}
            data-id={department.id}
            className={`MarketSidebar__item ${department.id === departmentId ? 'is-active' : ''}`}>
          	{ department.termName }
          </button>
        </li>) }
      </ul>
    </div> : null }
    <h6>باقي التخصصات</h6>
    <ul className='list-unstyled p-a-0 shadow-1 my-panel-white'>
      {otherSpecialties.map((specialty: Object): React.Element<'li'> => <li
        key={specialty.id}>
        <button data-id={specialty.id} data-specialty={specialty.departments[0].id} className='MarketSidebar__item' onClick={onSpecialtyClick}>
          {specialty.name}
        </button>
      </li>)}
    </ul>
  </div>
}

export default Sidebar
