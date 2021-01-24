import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'
import './style.scss'
import Input from 'components/Form/MaterialInput'

import validation from './validation'

export const fields = [
  'id',
  'name',
  'score',
  'score_total',
  'code',
  'hours'
]

class SubjectForm extends Component {
  static propTypes = {
    fields: PropTypes.object,
    handleSubmit: PropTypes.func,
    invalid: PropTypes.bool,
    score_total: PropTypes.object,
    resetForm: PropTypes.func
  }
  constructor (props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  render () {
    const {fields: {name, score, code, score_total, hours}, handleSubmit, invalid} = this.props

    return (<div className='c-reg-equ-subject-form__panel'>
      <form onSubmit={handleSubmit(this.handleSubmit)}>
        <div className='p-a-3'>
          <label className='m-b-2'>معلومات المادة</label>
          <div className='row'>
            <div className='col-xs-8'>
              <Input label='إسم المادة' data={name} />
            </div>
            <div className='clearfix' />
            <div className='col-xs-4'>
              <Input label='عدد الساعات' data={hours} />
            </div>
            <div className='col-xs-4'>
              <Input label='كود المادة' data={code} />
            </div>
          </div>
          <label className='m-b-2 m-t-1'>درجات المادة</label>
          <div className='row'>
            <div className='col-xs-4'>
              <Input label='الدرجة المحصل عليها' data={score} />
            </div>
            <div className='col-xs-4'>
              <Input label='الدرجة الكلية للمادة' data={score_total} />
            </div>
          </div>
        </div>
        <footer className='text-xs-center c-reg-equ-subject-form__footer p-a-2'>
          <button disabled={invalid} className='btn btn-success btn-lg p-x-3'>
            إضافة المادة
          </button>
        </footer>
      </form>
    </div>)
  }

  handleSubmit () {
    const {handleSubmit, resetForm} = this.props
    handleSubmit()
    resetForm()
  }
}

export default reduxForm({
  form: 'create_degree_subject',
  fields,
  destroyOnUnmount: false,
  validate: validation
})(SubjectForm)
