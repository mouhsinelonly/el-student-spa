// @flow
import * as React from 'react'
import './SpecialtyTabs.scss'

type PropsType = {
  options: Array<Object>,
  active: boolean,
  toggleSpecialtyActiveTab: Function,
  className: string
};

const SpecialtyTabs = (props: PropsType): React.Element<'div'> => {
  return (
    <div className={`row text-xs-center SpecialtyTabs ${props.className}`}>
      {props.options.map((o: Object, i: number): React.Element<'div'> =>
        <div className='col-xs-6 col-md-3 col-md-pull-3 p-a-0'
          key={o.id}>
          <button onClick={(): Function => props.toggleSpecialtyActiveTab(o.key)}
            className={`SpecialtyTabs__item btn btn-block
            ${props.active === o.key && i < props.options.length - 1 ? 'is-first' : ''}
            ${props.active === o.key && i === props.options.length - 1 ? 'is-last' : ''}
            ${props.active === o.key ? 'is-active' : ''}`}>
            {o.text}
          </button>
        </div>)}
    </div>
  )
}

SpecialtyTabs.defaultProps = {
  options: [],
  active: 0,
  className: ''
}

export default SpecialtyTabs
