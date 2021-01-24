import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'
import './style.scss'
import QuestionField from './QuestionField'

class Questions extends Component {
  static propTypes = {
    fields: PropTypes.object,
    values: PropTypes.object,
    activityId: PropTypes.number,
    submitted: PropTypes.number,
    handleSubmit: PropTypes.func,
    available: PropTypes.bool,
    saving: PropTypes.bool,
    setQuestionVisible: PropTypes.func,
    storeResearchActivity: PropTypes.func,
    unlockResearchActivity: PropTypes.func,
    visibileQuestions: PropTypes.array,
    unSetQuestionVisible: PropTypes.func,
    windowHeight: PropTypes.number,
    questions: PropTypes.array
  }
  static contextTypes = {
    router: PropTypes.object.isRequired
  }
  constructor (props) {
    super(props)

    this._getQuestion = this._getQuestion.bind(this)
    this._handleUnlock = this._handleUnlock.bind(this)
    this._handleSave = this._handleSave.bind(this)
    this._handleDone = this._handleDone.bind(this)
  }
  render () {
    const { fields, handleSubmit, windowHeight, values, setQuestionVisible, unSetQuestionVisible,
      visibileQuestions, submitted, available, saving } = this.props
    const keys = Object.keys(values)
    const totalAnswered = keys.reduce((total, current) =>
      (values[current] !== '' && typeof values[current] !== 'undefined') ? (total + 1) : total
    , 0)

    return (
      <form onSubmit={handleSubmit} className='c-research-questions' style={{ height: windowHeight - 50 }}>
        <ol className='p-y-3'>
          {Object.keys(fields).map(name =>
            <QuestionField
              setVisible={setQuestionVisible}
              opaque={!submitted && available}
              unSetVisible={unSetQuestionVisible}
              field={fields[name]}
              {...this._getQuestion(name)}
              key={name}
              visibileQuestions={visibileQuestions} />)}
        </ol>
        <div className={`c-research-questions__actions p-y-1 ${!available && 'hidden-xs-up'}`}>
          <div className={`container ${!submitted && 'hidden-xs-up'}`}>
            <div className='row p-t-1'>
              <div className='col-xs-12 col-md-11 col-md-pull-1 col-lg-8 col-lg-pull-2 p-y-1 text-xs-center'>
                <button type='button' disabled={(saving || !submitted)}
                  onClick={this._handleUnlock} name='submit' className='btn btn-success m-l-2'>
                  فتح التعديل
                </button>
              </div>
            </div>
          </div>
          <div className={`container ${submitted && 'hidden-xs-up'}`}>
            <div className='row'>
              <div className='col-xs-12 col-md-11 col-md-pull-1 col-lg-8 col-lg-pull-2
              c-research-questions__actions-percent p-t-1 p-r-1'>
                لقد أنجزت {totalAnswered} من {keys.length}
              </div>
            </div>
          </div>
          <div className={`${submitted && 'hidden-xs-up'}`}>
            <button type='button' disabled={saving || (totalAnswered === 0)}
              onClick={this._handleDone} name='submit' className='btn btn-success pull-md-left m-l-2'>
              تسليم العمل
            </button>
            <button type='button' disabled={saving || (totalAnswered === 0)}
              onClick={this._handleSave} name='save' className='btn btn-dark-gray pull-md-left m-l-2'>
              حفظ للإتمام لاحقا
            </button>
          </div>
        </div>
      </form>
    )
  }
  _handleSave (e) {
    const { values, activityId, storeResearchActivity } = this.props
    // const {router} = this.context
    storeResearchActivity(values, 'save', activityId)
    // router.push('/student/research')
  }
  _handleDone (e) {
    const { values, activityId, storeResearchActivity } = this.props
    // const {router} = this.context
    storeResearchActivity(values, 'submit', activityId)
    // router.push('/student/research')
  }
  _handleUnlock () {
    const { unlockResearchActivity, activityId } = this.props
    unlockResearchActivity(activityId)
  }
  _getQuestion (name) {
    const { questions } = this.props

    return questions.find(q => q.id === parseInt(name.split('_')[1]))
  }
}

export default reduxForm({ form: 'researchActivityForm' })(Questions)
