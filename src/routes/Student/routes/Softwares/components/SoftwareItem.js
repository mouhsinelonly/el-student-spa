import React from 'react'
import PropTypes from 'prop-types'

function SoftwareItem (props) {
  return (
    <div className='col-xs-12 col-md-4 text-xs-center'>
      <div className='p-a-2 p-student-softwares__items__item text-xs-center shadow-1 m-b-2'>
        <img src={props.icon && props.icon.thumb} className='p-student-softwares__items__item-icon' alt={props.name} />
        <h1 className='p-student-softwares__items__item-title'>{props.name}</h1>
        <p>{props.comment}</p>
        <a
          href={props.program_link}
          target='_blank'
          className='p-student-softwares__items__item-download btn btn-gray p-x-3'
        >
          تحميل
        </a>
      </div>
    </div>
  )
}

SoftwareItem.propTypes = {
  comment: PropTypes.string,
  icon: PropTypes.object,
  name: PropTypes.string,
  program_link: PropTypes.string
}
export default SoftwareItem
