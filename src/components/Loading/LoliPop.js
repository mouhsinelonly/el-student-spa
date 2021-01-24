// @flow
import * as React from 'react'
import './LoliPop.scss'
import PropTypes from 'prop-types'
const LoliPop = (props: Object): React.Element<'div'> =>
  <div className={`lolipop-container
    ${props.centered ? 'is-centered' : ''}
    ${props.inline ? 'is-inline' : ''}
    ${props.hide ? 'hidden-xs-up' : ''} ${props.className}`}>
    <svg className='lolipop-container__spinner-container' width={props.width} height={props.height} viewBox='0 0 43 43'>
      <circle className='lolipop-container__path' stroke={props.strokeColor} cx='21.5' cy='21.5'
        r={props.scale} fill='none'
        strokeWidth={props.stroke} />
    </svg>
    <div className={`text-xs-center p-y-2 ${!props.text ? 'hidden-xs-up' : ''}`}>{props.text}</div>
  </div>

LoliPop.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
  scale: PropTypes.number,
  strokeColor: PropTypes.string,
  hide: PropTypes.bool,
  centered: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number,
  stroke: PropTypes.number
}

LoliPop.defaultProps = {
  scale: 20,
  height: 50,
  strokeColor: 'rgba(27, 154, 89, 0.7)',
  width: 50,
  stroke: 3,
  className: ''
}

export default LoliPop
