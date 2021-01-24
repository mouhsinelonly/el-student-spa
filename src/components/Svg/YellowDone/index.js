// @flow
import * as React from 'react'
import './style.scss'

type PropsType = {
  animate?: boolean,
  width: number,
  className?: string,
  tooltip: boolean,
  height: number
};
const YellowDone = (props: PropsType): React.Element<'svg'> =>
  (<svg
    key='icon'
    overflow='visible'
    preserveAspectRatio='none'
    viewBox='0 0 117.3 117.3'
    xmlSpace='preserve'
    y={0}
    x={0}
    id='prefix__Layer_1_1551601721809'
    width={props.width}
    height={props.height}
    data-tip={props.tooltip ? 'وسم المشاركة بمسابقة الآراء المرئية' : null}
    style={{ display: 'inline-block', verticalAlign: 'middle' }}
    className={`${props.className} ${props.animate ? 'Svg__YellowDone' : ''}`}
  >
    <g transform='translate(1 1)'>
      <style>{'.prefix__st0_1551601721809{fill:#ffcf40}'}</style>
      <path
        d='M94 97.4H22.3c-2.3 0-4.1-1.9-4.1-4.1V21.6c0-2.3 1.9-4.1 4.1-4.1H94c2.3 0 4.1 1.9 4.1 4.1v71.7c.1 2.2-1.8 4.1-4.1 4.1z'
        className='prefix__st0_1551601721809 Svg__YellowDone__yellow-path-tra'
        vectorEffect='non-scaling-stroke'
      />
      <path
        d='M111.8 60.4l-50.7 50.7c-1.6 1.6-4.2 1.6-5.9 0L4.6 60.4c-1.6-1.6-1.6-4.2 0-5.9L55.3 3.8c1.6-1.6 4.2-1.6 5.9 0l50.7 50.7c1.5 1.7 1.5 4.3-.1 5.9z'
        className='prefix__st0_1551601721809 Svg__YellowDone__yellow-path-square'
        vectorEffect='non-scaling-stroke'
      />
      <path
        d='M70 42.6l-17 17-6.6-6.6c-2.3-2.3-6.1-2.3-8.5 0-2.3 2.3-2.3 6.1 0 8.5l10.8 10.8c1.2 1.2 2.7 1.8 4.2 1.8s3.1-.6 4.2-1.8L78.4 51c2.3-2.3 2.3-6.1 0-8.5-2.3-2.2-6.1-2.2-8.4.1z'
        vectorEffect='non-scaling-stroke'
        className={props.animate ? 'Svg__YellowDone__path' : ''}
        fill='#d60b02'
      />
    </g>
  </svg>)

YellowDone.defaultProps = {
  width: 70,
  tooltip: false,
  height: 70,
  className: '',
  animate: false
}
export default YellowDone
