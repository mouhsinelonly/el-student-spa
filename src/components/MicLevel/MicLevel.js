import React from 'react'
import './style.scss'
import PropTypes from 'prop-types'
export const MicLevel = (props) => <div className={`c-mic-level ${props.className}`}>
  <div className='c-mic-level__level' style={{width: props.level}} />
  <ul className='c-mic-level__items'>
    <li className='c-mic-level__item' />
    <li className='c-mic-level__item' />
    <li className='c-mic-level__item' />
    <li className='c-mic-level__item' />
    <li className='c-mic-level__item' />
    <li className='c-mic-level__item' />
    <li className='c-mic-level__item' />
    <li className='c-mic-level__item' />
    <li className='c-mic-level__item' />
    <li className='c-mic-level__item' />
  </ul>
</div>

MicLevel.propTypes = {
  level: PropTypes.number,
  className: PropTypes.string
}

MicLevel.defaultProps = {
  level: 0,
  className: ''
}

export default MicLevel
