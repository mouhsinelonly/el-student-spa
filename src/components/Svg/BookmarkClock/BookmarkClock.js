// @flow
import * as React from 'react'

const SvgComponent = (props: Object): React.Element<'svg'> => (
  <svg
    overflow='visible'
    preserveAspectRatio='none'
    viewBox='0 0 102 102'
    width={70}
    height={70}
    {...props}
  >
    <g data-name='Layer 2' fill='#cbad62'>
      <path
        d='M66.5 43H53V27.5a1.5 1.5 0 0 0-3 0v17a1.5 1.5 0 0 0 1.5 1.5h15a1.5 1.5 0 0 0 0-3z'
        vectorEffect='non-scaling-stroke'
      />
      <path
        d='M51 9a27 27 0 0 0-27 27v54.5a1.5 1.5 0 0 0 2.43 1.18L51 72.41l24.57 19.27a1.52 1.52 0 0 0 .93.32 1.55 1.55 0 0 0 .66-.15A1.51 1.51 0 0 0 78 90.5V36A27 27 0 0 0 51 9zm24 78.42l-23.07-18.1a1.51 1.51 0 0 0-1.86 0L27 87.42V36a24 24 0 0 1 48 0z'
        vectorEffect='non-scaling-stroke'
      />
    </g>
  </svg>
)

export default SvgComponent
