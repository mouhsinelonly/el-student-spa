// @flow
import * as React from 'react'

type Props = {
  index: number,
  active: number,
  setActive: Function,
  steps: boolean,
  circular: boolean,
  blink: boolean,
  white: boolean
};

class DotElement extends React.Component<Props> {
  static defaultProps = {
    active: 0,
    index: 0,
    white: false,
    blink: false,
    steps: false
  }
  render () {
    const { index, steps, circular, white, active, blink } = this.props
    return (
      <button
        onClick={this.setActive}
        className={`c-dotnav__item ${active === index || (steps && active >= index) ? 'is-active' : ''}
      ${white ? 'is-white' : ''} ${circular ? 'is-circular' : ''} ${blink && 'is-blinking'}`}
      />
    )
  }

  setActive = () => {
    const { index, setActive } = this.props
    setActive(index)
  }
}

export default DotElement
