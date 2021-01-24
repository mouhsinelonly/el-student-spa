// @flow
import * as React from 'react'
import './style.scss'

type PropsType = {
  animate?: boolean,
  width: number,
  height: number
};

const Trophy = (props: PropsType): React.Element<'svg'> => (
  <svg
    overflow='visible'
    preserveAspectRatio='none'
    viewBox='0 0 282 282'
    xmlSpace='preserve'
    y={0}
    x={0}
    id='prefix__Layer_1_1551597314861'
    width={props.width || 70}
    height={props.height || 70}
    className='Svg__Trophy'
  >
    <g transform='translate(1 1)'>
      <style>
        {
          '.prefix__st0_1551597314861{fill:#ffcf40}.prefix__st1_1551597314861{fill:#d60b02}'
        }
      </style>
      <path
        d='M223.1 39c.8-8.3.8-15.8.8-25H57.1c0 9.2 0 16.7.8 25H7v8.3c0 74.3 94.3 126.8 116.8 138.5v28.4c0 14.2-10.8 25-25 25H82.1v33.4h116.8v-33.4h-16.7c-14.2 0-25-10.8-25-25v-28.4C179.7 174.2 274 121.6 274 47.4V39h-50.9zM24.5 55.7h35C62.8 93.2 72 120 82 139.1c-26.6-20.8-54.1-50-57.5-83.4zm175.2 83.5c10-19.2 19.2-45.9 22.5-83.4h35c-4.1 33.3-31.6 62.5-57.5 83.4z'
        className='prefix__st0_1551597314861 Svg__Trophy__holder'
        vectorEffect='non-scaling-stroke'
      />
      <path
        d='M176.3 123h-71.7c-2.3 0-4.1-1.9-4.1-4.1V47.2c0-2.3 1.9-4.1 4.1-4.1h71.7c2.3 0 4.1 1.9 4.1 4.1v71.7c.1 2.2-1.8 4.1-4.1 4.1z'
        className='prefix__st1_1551597314861'
        vectorEffect='non-scaling-stroke'
      />
      <path
        d='M194.1 85.9l-50.7 50.7c-1.6 1.6-4.2 1.6-5.9 0L86.9 85.9c-1.6-1.6-1.6-4.2 0-5.9l50.7-50.7c1.6-1.6 4.2-1.6 5.9 0L194.2 80c1.5 1.7 1.5 4.3-.1 5.9z'
        className='prefix__st1_1551597314861'
        vectorEffect='non-scaling-stroke'
      />
      {props.animate ? <React.Fragment>
        <path
          d='M194.1 85.9l-50.7 50.7c-1.6 1.6-4.2 1.6-5.9 0L86.9 85.9c-1.6-1.6-1.6-4.2 0-5.9l50.7-50.7c1.6-1.6 4.2-1.6 5.9 0L194.2 80c1.5 1.7 1.5 4.3-.1 5.9z'
          className='prefix__st1_1551597314861 Svg__Trophy__particle is-first'
          vectorEffect='non-scaling-stroke'
        />
        <path
          d='M194.1 85.9l-50.7 50.7c-1.6 1.6-4.2 1.6-5.9 0L86.9 85.9c-1.6-1.6-1.6-4.2 0-5.9l50.7-50.7c1.6-1.6 4.2-1.6 5.9 0L194.2 80c1.5 1.7 1.5 4.3-.1 5.9z'
          className='prefix__st1_1551597314861 Svg__Trophy__particle is-second'
          vectorEffect='non-scaling-stroke'
        />
        <path
          d='M194.1 85.9l-50.7 50.7c-1.6 1.6-4.2 1.6-5.9 0L86.9 85.9c-1.6-1.6-1.6-4.2 0-5.9l50.7-50.7c1.6-1.6 4.2-1.6 5.9 0L194.2 80c1.5 1.7 1.5 4.3-.1 5.9z'
          className='prefix__st1_1551597314861 Svg__Trophy__particle is-third'
          vectorEffect='non-scaling-stroke'
        />
        <path
          d='M194.1 85.9l-50.7 50.7c-1.6 1.6-4.2 1.6-5.9 0L86.9 85.9c-1.6-1.6-1.6-4.2 0-5.9l50.7-50.7c1.6-1.6 4.2-1.6 5.9 0L194.2 80c1.5 1.7 1.5 4.3-.1 5.9z'
          className='prefix__st1_1551597314861 Svg__Trophy__particle is-third'
          vectorEffect='non-scaling-stroke'
        />
        <path
          className='prefix__st0_1551597314861 Svg__Trophy__particle is-first'
          vectorEffect='non-scaling-stroke'
          d='M162 83.2l-28.7 18.7V64.5z'
        />
        <path
          className='prefix__st0_1551597314861 Svg__Trophy__particle is-second'
          vectorEffect='non-scaling-stroke'
          d='M162 83.2l-28.7 18.7V64.5z'
        />
        <path
          className='prefix__st0_1551597314861 Svg__Trophy__particle is-third'
          vectorEffect='non-scaling-stroke'
          d='M162 83.2l-28.7 18.7V64.5z'
        />
      </React.Fragment> : null }
      <path
          className='prefix__st0_1551597314861'
          vectorEffect='non-scaling-stroke'
          d='M162 83.2l-28.7 18.7V64.5z'
        />
    </g>
  </svg>
)

export default Trophy
