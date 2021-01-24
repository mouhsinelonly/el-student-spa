// @flow
import * as React from 'react'

const Book = (props: Object): React.Element<'svg'> => (
  <svg
    overflow='visible'
    preserveAspectRatio='none'
    viewBox='0 0 102 102'
    width={70}
    height={70}
    {...props}
  >
    <g data-name='Layer 2' fill='#795e4b'>
      <path
        d='M58.58 27.25H35.06a1.59 1.59 0 0 0 0 3.17h23.52a1.59 1.59 0 1 0 0-3.17zM58.58 44.51H35.06a1.59 1.59 0 0 0 0 3.17h23.52a1.59 1.59 0 1 0 0-3.17zM58.58 61.77H35.06a1.59 1.59 0 0 0 0 3.17h23.52a1.59 1.59 0 1 0 0-3.17z'
        vectorEffect='non-scaling-stroke'
      />
      <path
        d='M83.58 17.5h-4.26v-4.25a4.75 4.75 0 0 0-4.74-4.75H19.07a4.75 4.75 0 0 0-4.75 4.75v66.5a4.75 4.75 0 0 0 4.75 4.75h4.25v4.25a4.75 4.75 0 0 0 4.75 4.75h55.51a4.75 4.75 0 0 0 4.74-4.75v-66.5a4.75 4.75 0 0 0-4.74-4.75zM17.49 79.75v-66.5a1.58 1.58 0 0 1 1.58-1.58h55.51a1.58 1.58 0 0 1 1.58 1.58v66.5a1.58 1.58 0 0 1-1.58 1.58H19.07a1.58 1.58 0 0 1-1.58-1.58zm67.67 9a1.58 1.58 0 0 1-1.58 1.58H28.07a1.58 1.58 0 0 1-1.58-1.58V84.5h48.09a4.75 4.75 0 0 0 4.74-4.75V20.67h4.26a1.58 1.58 0 0 1 1.58 1.58z'
        vectorEffect='non-scaling-stroke'
      />
    </g>
  </svg>
)

export default Book
