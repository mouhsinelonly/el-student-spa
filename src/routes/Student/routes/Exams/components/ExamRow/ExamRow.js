// @flow
import * as React from 'react'
import moment from 'moment'
import Icon from 'components/Icon'
import './style.scss'
import { Link } from 'react-router'
import ExamResultTable from './ExamResultTable'
import ExamRowExcuseTable from './ExamRowExcuseTable'
import ExamScheduleTable from './ExamScheduleTable'
import Dot from 'components/Notifications/Dot'

type PropsType = {
  exams: Array<Object>,
  onToggleSchedule: Function,
  onToggleResult: Function,
  showModal: Function,
  onToggleExcuse: Function,
  schedulevisible: boolean,
  excusevisible: boolean,
  resultvisible: boolean,
  softwares: Array<Object>,
  type: string,
  enableExcuses: boolean,
  hasChosenCenter: boolean,
  videoPlaintEnabled: boolean,
  enableResults: boolean,
  serverdate: string
};

class ExamRow extends React.Component<PropsType> {
  static defaultProps = {
    enableResults: false,
    enableExcuses: false
  }
  render (): React.Element<'div'> {
    const { exams, type, schedulevisible, excusevisible,
      serverdate,
      videoPlaintEnabled,
      resultvisible,
      enableExcuses,
      enableResults,
      softwares,
      hasChosenCenter } = this.props
    // const serverTime = moment(serverdate)
    if (exams.length === 0) return <div />

    const ExamAppLink = softwares.find((s: Object): boolean => s.slug === 'exam_app')

    let examHeader
    let examIcon

    const firstExamstartAtMoment = moment(exams[0].id !== 490 ? exams[0].start_at : exams[1].start_at)
    const lastExamfinishAtMoment = moment(exams[exams.length - 1].id !== 490
      ? exams[exams.length - 1].finish_at
      : exams[exams.length - 2].finish_at)

    // const examsRunning = lastExamfinishAtMoment.isAfter(serverTime)

    const finalTypesStep = (type === 'summer' || type === 'final' || type === 'refinal')

    switch (type) {
      case 'activity':
        examIcon = 'quarter-exam'
        examHeader = 'الإختبار القصير'
        break
      case 'midterm':
        examIcon = 'exam-midterm-medium'
        examHeader = 'اختبار المنتصف'
        break
      case 'final':
        examIcon = 'exam-final-medium'
        examHeader = 'الاختبار النهائي'
        break
      case 'summer':
        examIcon = 'exam-final-medium'
        examHeader = 'الاختبار النهائي'
        break
      case 'refinal':
        examIcon = 'exam-final-medium'
        examHeader = 'أعذار الاختبار النهائي'
        break
    }
    return (<div className='c-general-exam-row'>
      <div className='my-panel-white shadow-1 clearfix c-general-exam-row__panel'>
        <div className='col-xs-12 col-md-7 col-lg-5 p-y-2 c-general-exam-row__hc
        c-general-exam-row__header text-xs-center text-sm-right'>
          <Icon name={examIcon} className='c-general-exam-row__icon' />
          <h5 className='c-general-exam-row__title'>{examHeader}</h5>
          <div className='c-general-exam-row__meta'>
            <Link to={`/student/exams/rules/${type}`} className='c-general-exam-row__meta__rules'>
              القوانين و الشروط
            </Link>
            <span
              onClick={this._showGuide}
              className={`c-general-exam-row__meta__guide hidden-xs-up ${(type === 'refinal') ? 'hidden-xs-up' : ''}`}>
              <Icon name='play-black-tiny' /> طريقة الانجاز
            </span>
          </div>
          <button className={`${type !== 'activity' ? '' : 'hidden-xs-up'} btn btn-sm btn-light m-t-1 c-general-exam-row__hc-excuse`}
            onClick={this._toggleExcuse}>
            الاعتذار عن الحضور
          </button>
        </div>
        <div className={`col-xs-12 col-md-2 col-lg-3 p-y-2 c-general-exam-row__hc text-xs-center text-md-right`}>
          <div className={`c-general-exam-row__l`}>
            يبدأ في {firstExamstartAtMoment
              ? firstExamstartAtMoment.locale('en').format('DD') + ' ' +
            firstExamstartAtMoment.locale('ar-SA').format('MMMM') + ' ' +
            firstExamstartAtMoment.locale('en').format('HH:mm') : null}
          </div>
          <div className='c-general-exam-row__l'>
            ينتهي في {lastExamfinishAtMoment ? lastExamfinishAtMoment.locale('en').format('DD') + ' ' +
            lastExamfinishAtMoment.locale('ar-SA').format('MMMM') + ' ' +
            lastExamfinishAtMoment.locale('en').format('HH:mm') : null}
          </div>
          <button className='btn btn-sm c-general-exam-row__hc-schedule btn-light m-t-1' onClick={this._toggleSchedule}>
            <span className={!schedulevisible ? 'hidden-xs-up' : ''}>إخفاء الجدول</span>
            <span className={schedulevisible ? 'hidden-xs-up' : ''}>إظهار الجدول</span>
          </button>
        </div>
        <div className={`${(!enableResults || (!hasChosenCenter && type === 'midterm')) ? 'hidden-xs-up' : ''}
        col-xs-12 col-md-3 col-lg-4 p-y-2 text-xs-center text-md-right c-general-exam-row__hc`}>
          <div style={{ color: '#777d84', fontSize: 16 }} className='hidden-xs-down'>التقويم</div>
          <button className={`btn btn-sm c-general-exam-row__hc-result btn-success m-t-1 p-x-3
            ${(!enableResults || type === 'refinal') ? 'hidden-xs-up' : ''}`}
            onClick={this._toggleResult}>
            عرض النتائج
          </button>
        </div>
        {ExamAppLink && ((hasChosenCenter && type === 'final') || type !== 'final') && !finalTypesStep && !enableResults
          ? <div className={`col-xs-12 col-md-3 col-lg-4 p-y-2 c-general-exam-row__hc`}>
            <div className={`c-general-exam-row__l p-b-1 `}>
              المطلوب منك
            </div>
            <a href={ExamAppLink.program_link}
              className={`btn btn-gray btn-block`}>
              تحميل برنامج الاختبار
            </a>
          </div> : null }
        {!hasChosenCenter && enableResults && type === 'midterm'
          ? <div className={`col-xs-12 col-md-3 col-lg-4 p-y-2 c-general-exam-row__hc`}>
            <div className={`c-general-exam-row__l p-b-1 `}>
              المطلوب منك
            </div>
            <a className={`btn btn-gray btn-block`} style={{ cursor: 'default' }}>
              اختيار مركز الاختبار
            </a>
          </div> : null }
        <div className='clearfix' />
        <ExamResultTable videoPlaintEnabled={videoPlaintEnabled} visible={resultvisible} exams={exams} type={type} />
        <div className='clearfix' />
        <ExamRowExcuseTable
          type={type}
          enabled={enableExcuses}
          visible={excusevisible}
          exams={exams} />
        <div className='clearfix' />
        <ExamScheduleTable visible={schedulevisible} exams={exams} type={type} />
      </div>
    </div>)
  }

  _toggleSchedule = (id: number) => {
    const { exams, onToggleSchedule } = this.props
    onToggleSchedule(exams[0].id)
  }

  _toggleResult = (id: number) => {
    const { exams, onToggleResult } = this.props
    onToggleResult(exams[0].id)
  }

  _showGuide = () => {
    const { showModal } = this.props
    showModal('youtube', { youtubeId: 'yVEnY9rYxCU' }, true, true, 'full')
  }

  _toggleExcuse = (id: number) => {
    const { exams, onToggleExcuse } = this.props
    onToggleExcuse(exams[0].id)
  }
}

export default ExamRow
