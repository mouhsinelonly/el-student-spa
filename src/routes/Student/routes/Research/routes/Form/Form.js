import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import Questions from './components/Questions'
import Progress from './components/Progress'
import { Link } from 'react-router'
import Loading from 'components/Loading'
import Icon from 'components/Icon'

import './style.scss'
class Form extends Component {
  static propTypes = {
    activities: PropTypes.array,
    serverdate: PropTypes.string,
    savingIds: PropTypes.array,
    loadingActivities: PropTypes.bool,
    // route: PropTypes.object,
    showStudentNavbar: PropTypes.func,
    hideStudentNavbar: PropTypes.func,
    params: PropTypes.object
  }
  constructor (props) {
    super(props)

    this._handleSubmit = this._handleSubmit.bind(this)
  }
  componentDidMount () {
    const {hideStudentNavbar} = this.props
    hideStudentNavbar()
  }
  componentWillUnmount () {
    const {showStudentNavbar} = this.props
    showStudentNavbar()
  }
  render () {
    const {activities, params: {id: paramsId}, serverdate, savingIds, loadingActivities} = this.props
    const serverTime = moment(serverdate)
    if (!activities.length) return <Loading />

    const activity = activities.find(a => a.id === parseInt(paramsId))

    if (!activity) return false

    const {id, start_at: startAt, finish_at: finishAt, active, questions, submitted} = activity
    const available = moment(startAt).isBefore(serverTime) && moment(`${finishAt} 23:59:59`).isAfter(serverTime) &&
    active

    const saving = savingIds.findIndex(i => i === id) >= 0
    // if (!available) {
      // return false
    // }
    let initialValues = {}
    questions.map(q => {
      initialValues[`q_${q.id}_${q.answer_id}_${q.type}`] = q.answer_text ? q.answer_text : ''
    })

    return (
      <div className='c-research-form'>
        <div className='container'>
          <div className='row'>
            <div className='col-xs-12'>
              <Link to={`/student/research/details/${id}`}>
                <Icon name='arrow-right-small-dark' className='c-research-form__back-arrow' />
              </Link>
            </div>
          </div>
          <div className='row'>
            <div className='col-xs-12 col-md-11 col-md-pull-1 col-lg-8 col-lg-pull-2'>
              <Questions questions={questions}
                activityId={id}
                saving={saving || loadingActivities}
                available={available}
                submitted={submitted}
                fields={questions.map(q => `q_${q.id}_${q.answer_id}_${q.type}`)}
                initialValues={initialValues}
                onSubmit={this._handleSubmit} />
            </div>
          </div>
        </div>
        <Progress questions={initialValues} />
      </div>
    )
  }
  _handleSubmit (values, e) {
    // console.log(e)
    // console.log(values)
  }
}

export default Form
