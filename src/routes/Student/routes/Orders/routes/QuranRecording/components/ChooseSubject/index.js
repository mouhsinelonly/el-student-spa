import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {reduxForm} from 'redux-form'
import './style.scss'
import validation from './validation'
import MaterialRadio from 'components/Form/MaterialRadio'

const fields = [
  'subject_id'
]

class ChooseSubject extends Component {
  static propTypes = {
    subjects: PropTypes.array,
    fields: PropTypes.object,
    handleSubmit: PropTypes.func
  }
  constructor (props) {
    super(props)

    this._handleSubjectChanged = this._handleSubjectChanged.bind(this)
  }
  render () {
    const {subjects, fields: {subject_id: subjectId}} = this.props

    if (!subjects.length) return null
    return (<div className='c-orders-choose-subject__container'>
      {subjects.map(s => <MaterialRadio
        value={s.id}
        key={s.id}
        checked={parseInt(subjectId.value, 10) === s.id}
        isChanged={this._handleSubjectChanged}
        label={s.name}
        data={subjectId} />)}
    </div>)
  }

  _handleSubjectChanged () {
    const {handleSubmit} = this.props
    handleSubmit()
  }
}

export default reduxForm({
  fields,
  form: 'quranrecordingform',
  destroyOnUnmount: false,
  validate: validation
})(ChooseSubject)
