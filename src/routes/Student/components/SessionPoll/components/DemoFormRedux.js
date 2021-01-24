// @flow
import * as React from 'react'
import { reduxForm } from 'redux-form'
import Radio from 'components/Form/V2/Radio'
import Checkbox from 'components/Form/V2/Checkbox'
import { domOnlyProps } from 'utils'

import './style.scss'

type PropType = {
  fields: Object,
  fieldName: string,
  next: Function,
  previous: Function,
  question: string,
  type: string,
  order: number,
  total: number,
  index: number,
  choices: Array<Object>,
  handleSubmit: Function
};
const DemoForm = (props: PropType): React.Element<'form'> => <form onSubmit={props.handleSubmit}>
  <h4 className='m-y-3 c-demo-form-redux__title'>
    <button className='c-demo-form-redux__btn-order'>{props.order}</button> {props.question}
  </h4>
  {
    props.choices.map((c: Object, i: number): React.Element<*> => {
      switch (props.type) {
        case 'radio':
          return <div className='m-b-1'
            key={`${i}`}>
            <Radio
              data={props.fields[props.fieldName]}
              label={c.content}
              value={`${c.id}`} />
          </div>
        default:
          return <div className='m-b-1'
            key={`${i}`}>
            <Checkbox
              data={props.fields[props.fieldName][c.id]}
              label={c.content}
              value={`${c.id}`} />
          </div>
      }
    })
  }
  <div className='c-demo-form-redux__footer p-y-2'>
    <button
      disabled={props.index === 0}
      className='btn btn-success p-x-3 m-l-2'
      onClick={props.previous} >
      السابق
    </button>
    <button
      className={`btn btn-success p-x-3 ${props.index === props.total - 1 ? '' : 'hidden-xs-up'}`}>
      حفظ
    </button>
    <button
      type='submit'
      className={`btn btn-success p-x-3 ${props.index === props.total - 1 ? 'hidden-xs-up' : ''}`}
      onClick={props.next}>
      التالي
    </button>
  </div>
  <input type='hidden' {...domOnlyProps(props.fields.poll_id)} />
</form>

const DemoFormRedux = reduxForm({
  form: 'poll',
  destroyOnUnmount: false
})(DemoForm)

export default DemoFormRedux
