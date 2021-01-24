// @flow
import * as React from 'react'
import Icon from 'components/Icon'
import { domOnlyProps } from 'utils'

// import css
import './style.scss'

type PropType = {
   data: Object,
   required: boolean,
   checked: boolean,
   value: string,
   label: string,
   isChanged: Function
};
class Checkbox extends React.Component<PropType> {
  static defaultProps = {
    required: false,
    type: 'text',
    checked: false,
    isChanged: () => {}
  }

  render (): React.Element<'label'> {
    const { data, label } = this.props
    return (<label htmlFor={data.name} className={`input-checkbox-v2
    ${data.checked ? 'is-checked' : ''}`}>
      { label }
      <Icon name='checkbox-gray' className='input-checkbox-v2__checkbox' />
      <input
        {...domOnlyProps(data)}
        type='checkbox' />
    </label>)
  }
}

export default Checkbox
