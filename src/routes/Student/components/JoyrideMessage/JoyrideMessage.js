// @flow
import * as React from 'react'
import Icon from 'components/Icon'
import joyridesConfig from 'utils/joyrides'
import './style.scss'

type PropsType = {
  className?: string,
  render: Function,
  joyrides: Array<Object>,
  onClose: Function,
  slug: string
};

const JoyrideMessage = (props: PropsType): React.Element<'div'> => {
  const seen = props.joyrides.findIndex((j: Object): boolean =>
                  j.slug === joyridesConfig[props.slug]) >= 0

  if (seen) return <div />

  const closeMe = () => {
    props.onClose(joyridesConfig[props.slug])
  }
  return (
    <div className={`c-joyride-message__panel p-y-1 ${props.className ? props.className : ''} m-t-2 text-xs-center`}>
      {props.render()}
      <button onClick={closeMe} className='c-joyride-message__close'>
        <Icon name='times-small' />
      </button>
    </div>
  )
}

JoyrideMessage.defaultProps = {
  render: () => {}
}
export default JoyrideMessage
