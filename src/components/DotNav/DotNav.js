import React from 'react'
import PropTypes from 'prop-types'
// import css
import './DotNav.scss'
import DotElement from 'components/DotElement'

function DotNav (props) {
  return (
    <div className='text-xs-center c-dotnav'>
      {(() =>
        Array.from(Array(props.total).keys()).map(i => (
          <DotElement key={i} setActive={props.setActive} index={i} {...props} />
        )))()}
    </div>
  )
}

DotNav.propTypes = {
  total: PropTypes.number,
  setActive: PropTypes.func
}
export default DotNav
