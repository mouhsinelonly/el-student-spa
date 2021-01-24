// @flow
import React from 'react'

type PropsType = {
  fill: string,
  width: number,
  height: number
};

const SandClock = (props: PropsType): React.Element<'svg'> => (
    <svg
      overflow='visible'
      preserveAspectRatio='none'
      viewBox='-8.512 0 56 56'
      width={props.width || 64}
      height={props.height || 64}
      {...props}
    >
      <path
        d='M35.5 49h-.4c-.3-9.7-4.9-18-9.6-21 5.1-3.1 9-13.1 9.3-21h.8C37.4 7 39 5.4 39 3.5S37.4 0 35.5 0h-32C1.6 0 0 1.6 0 3.5c0 1.7 1.3 3.1 2.9 3.4.3 9.6 4.9 18.1 9.6 21-5.1 3.2-9 12.6-9.3 21-1.7.2-3.2 1.7-3.2 3.6C0 54.4 1.6 56 3.5 56h32.1c1.9 0 3.5-1.6 3.5-3.5-.1-1.9-1.7-3.5-3.6-3.5zM2 3.5C2 2.7 2.7 2 3.5 2h32.1c.7 0 1.4.7 1.4 1.5S36.3 5 35.5 5h-32C2.7 5 2 4.3 2 3.5zm13.2 25.4c.3 0 .5.1.8.1h1v-2h-1c-.3 0-.5 0-.8.1-3.9-1-9.9-9.5-10.3-20.1h27.8c-.2 4.8-1.5 10.1-3.8 14.1-1.8 3.2-4.1 5.3-6.1 5.8H21v2h1c.3 0 .5 0 .8-.1 3.9 1 9.9 9 10.3 20.1H5.3c.2-5.1 1.5-10.1 3.8-14.2 1.9-3.1 4.2-5.3 6.1-5.8zM35.5 54h-32c-.8 0-1.5-.7-1.5-1.5S2.7 51 3.5 51h32.1c.8 0 1.5.7 1.5 1.5-.1.8-.8 1.5-1.6 1.5z'
        vectorEffect='non-scaling-stroke'
        fill={props.fill || '#b9c2cb'}
      />
    </svg>
  )

export default SandClock
