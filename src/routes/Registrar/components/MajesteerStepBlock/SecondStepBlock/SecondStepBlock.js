// @flow
import * as React from 'react'
import Icon from 'components/Icon'
import moment from 'moment'
import { Link } from 'react-router'
// import css
import '../StepBlock.scss'

export const types = ['nid', 'photo', 'certificate', 'transcript', 'job', 'marriage']

type PropsType = {
  title: string,
  order: number,
  active: boolean,
  step: Object,
  exams: Array<Object>,
  done: boolean,
  examAppDownloaded: boolean,
  showResult: boolean,
  showModal: Function
};

class SecondStepBlock extends React.PureComponent<PropsType> {
  showModal = () => {
    const { showModal } = this.props
    showModal('MajExamRules')
  }
  render (): React.Element<'div'> {
    const { title, order, active, step, done, examAppDownloaded, showResult, exams } = this.props

    const firstExam = exams.find((e: Object): boolean => e.type === 'first')

    let firstExamStartAtMoment
    if (firstExam) {
      const startAtMoment = moment(firstExam.start_at)
      firstExamStartAtMoment = `${startAtMoment.locale('en-us').format('D')}
            ${startAtMoment.locale('ar-SA').format(' MMMM ')}
          ${startAtMoment.locale('en-us').format(' h:mm ')}
            ${startAtMoment.locale('en-us').format('a') === 'am' ? 'صباحا' : 'مساءا'}`
    }

    let firstExamResultAt
    if (firstExam) {
      const resultAtMoment = moment(firstExam.result_at)
      firstExamResultAt = `${resultAtMoment.locale('en-us').format('D')}
            ${resultAtMoment.locale('ar-SA').format(' MMMM ')}
          ${resultAtMoment.locale('en-us').format(' h:mm ')}
            ${resultAtMoment.locale('en-us').format('a') === 'am' ? 'صباحا' : 'مساءا'}`
    }

    let data, downloadAppData

    if (done) {
      data = (
        <div>
          <p>اجتزت الاختبار بنجاح</p>
        </div>
      )
    } else if (step.first_exam_required) {
      data = (
        <div>
          <p className='c-maj-step-block__step__header'>
           اختبار يتكون من 70 سؤال موضوعي، ومدته 50 دقيقة، يتم إنجازه عن طريق برنامج الاختبارات؛ سارع بتحميل البرنامج
          </p>
          {showResult ? <p className='c-maj-step-block__step__dateinfo success'>إعلان النتائج : {firstExamResultAt}
          </p> : <p className='c-maj-step-block__step__dateinfo info'>تاريخ الاختبار : {firstExamStartAtMoment}
          </p> }
          <Link className={`${showResult ? 'hidden-xs-up' : 'btn btn-gray m-t-2'}`}
            to={{ pathname: 'registrar/examrules', query: { o: 1 } }}>
            ضوابط ومعلومات الاختبار
          </Link>
        </div>
      )
      // if (examAppDownloaded) {
        // downloadAppData = (
        //   <a className='m-t-2 c-maj-step-block__downloadapp hidden-xs-up'>
        //     <h1 className='c-maj-step-block__downloadapp__title'>إنشاء إختبار تجريبي</h1>
        //     <h2 className='c-maj-step-block__downloadapp__hint'>يساعدك في تجربة برنامج الاختبارات</h2>
        //     <button className='btn btn-warning c-maj-step-block__downloadapp__create-exam' onClick={this.showModal}> أنشئ
        //     </button>
        //   </a>
        //   )
      // } else {
        downloadAppData = (
          <a className={`${showResult ? 'hidden-xs-up' : 'm-t-2 c-maj-step-block__downloadapp'}`}
            href='//el-css.com/ftp/bob/SetupCssExam_1.7.2_Css.exe'>
            <Icon name='install-app' className='c-maj-step-block__downloadapp__icon m-l-1' />
            <h1 className='c-maj-step-block__downloadapp__title'>تحميل برنامج الإ​​​​​​​ختبارات</h1>
            <h2 className='c-maj-step-block__downloadapp__hint'>يفضل تشغيله على ويندوز 10</h2>
          </a>)
      // }
    }
    return (
      <div className={`c-maj-step-block__container  ${active ? 'is-active' : ''}`}>
        <article className={`c-maj-step-block__step ${done ? 'is-done' : ''} ${active ? 'is-active-exam' : ''}`}>
          <span className={`c-maj-step-block__order ${active ? 'is-active' : ''}`}>
            {done ? <Icon name='check-single-green' /> : order}
          </span>
          <h4 className='c-maj-step-block__step__title m-b-2'>{title}</h4>
          {data}
        </article>
        {downloadAppData}
      </div>
    )
  }
}

export default SecondStepBlock
