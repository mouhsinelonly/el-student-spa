// @flow
import React from 'react'
type PropsType = {
  fill: string,
  width: number,
  height: number
};

const Copy = (props: PropsType): React.Element<'svg'> => (
  <svg
    overflow='visible'
    preserveAspectRatio='none'
    viewBox='0 0 24 24'
    width={props.width || 18}
    height={props.height || 18}
    {...props}
  >
    <path
      d='M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z'
      vectorEffect='non-scaling-stroke'
      fill={props.fill || '#93a7a9'}
    />
  </svg>
)

Copy.defaultProps = {
  fill: '#93a7a9'
}
export default Copy
