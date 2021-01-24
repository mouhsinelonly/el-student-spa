// @flow
import * as React from 'react'

type IconType = {
  name: string,
  className: string,
  handleClick: Function
};

export const Icon = (props: IconType): React.Element<'i'> => <i
  onClick={props.handleClick}
  className={`icon icon-${props.name} ${props.className}`} aria-hidden='true' />

Icon.defaultProps = {
  name: 'eye-orange',
  className: '',
  handleClick: () => {}
}

export default Icon
