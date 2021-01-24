import './Circular.scss'
import React from 'react'
import PropTypes from 'prop-types'
export const Circular = (props) => (<div className={`circular-loading__container ${props.className}`}>
{props.number === 1 ? <section className='circular-loading__loaders'>
  <span className='circular-loading__loader circular-loading__loader-quart' />
</section> : null }
{props.number === 2 ? <section className='circular-loading__loaders'>
  <span className='circular-loading__loader circular-loading__loader-double' />
</section> : null }
{props.number === 3 ? <section className='circular-loading__loaders'>
  <span className='circular-loading__loader circular-loading__loader-circles' />
</section> : null }
{props.number === 4 ? <section className='circular-loading__loaders'>
  <span className='circular-loading__loader circular-loading__loader-bars' /><span />
</section> : null }
</div>)

Circular.propTypes = {
  number: PropTypes.number,
  className: PropTypes.string
}

Circular.defaultProps = {
  number: 1,
  className: ''
}

export default Circular
