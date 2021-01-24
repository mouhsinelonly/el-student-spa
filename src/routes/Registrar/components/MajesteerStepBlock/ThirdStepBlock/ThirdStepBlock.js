// @flow
import * as React from 'react'
import moment from 'moment'
import Icon from 'components/Icon'
import { Link } from 'react-router'

// import css
import '../StepBlock.scss'

type PropsType = {
  title: string,
  order: number,
  exams: Array<Object>,
  totalsubjects: number,
  active: boolean,
  step: Object,
  done: boolean,
  uncomplete: boolean
};

class ThirdStepBlock extends React.PureComponent<PropsType> {
  showModal = () => {
    const { showModal } = this.props
    showModal('MajExamRules')
  }
  render (): React.Element<'div'> {
    const { title, order, active, step, done, showResult, exams } = this.props

    const secondExam = exams.find((e: Object): boolean => e.type === 'second')

    let secondExamStartAtMoment
    if (secondExam) {
      const startAtMoment = moment(secondExam.start_at)
      secondExamStartAtMoment = `${startAtMoment.locale('en-us').format('D')}
            ${startAtMoment.locale('ar-SA').format(' MMMM ')}
          ${startAtMoment.locale('en-us').format(' h:mm ')}
            ${startAtMoment.locale('en-us').format('a') === 'am' ? 'صباحا' : 'مساءا'}`
    }

    let secondExamResultAt
    if (secondExam) {
      const resultAtMoment = moment(secondExam.result_at)
      secondExamResultAt = `${resultAtMoment.locale('en-us').format('D')}
            ${resultAtMoment.locale('ar-SA').format(' MMMM ')}
          ${resultAtMoment.locale('en-us').format(' h:mm ')}
            ${resultAtMoment.locale('en-us').format('a') === 'am' ? 'صباحا' : 'مساءا'}`
    }

    let data
    let downloadAppData
    if (done) {
      data = (
        <div>
          <p>اجتزت الاختبار بنجاح</p>
        </div>
      )
    } else if (step.second_exam_required) {
      data = (
        <div>
          <p className='c-maj-step-block__step__header'>
           اختبار يتكون من 3 أسئلة مقالية، مدته ساعة و نصف ينجز على نفس برنامج الاختبارات الخاص باختبار التصفية الأولي
          </p>
          {showResult ? <p className='c-maj-step-block__step__dateinfo success'>إعلان النتائج : {secondExamResultAt}
          </p> : <p className='c-maj-step-block__step__dateinfo info'>تاريخ الاختبار : {secondExamStartAtMoment}
          </p> }
          <Link className='btn btn-gray m-t-2' to={{ pathname: 'registrar/examrules', query: { o: 2 } }}>
            ضوابط ومعلومات الاختبار
          </Link>
        </div>
      )
      downloadAppData = (
        <a className={`${showResult ? 'hidden-xs-up' : 'm-t-2 c-maj-step-block__downloadapp'}`}
          href='//el-css.com/ftp/bob/SetupCssExam_1.7.2_Css.exe'>
          <Icon name='install-app' className='c-maj-step-block__downloadapp__icon m-l-1' />
          <h1 className='c-maj-step-block__downloadapp__title'>تحميل برنامج الإ​​​​​​​ختبارات</h1>
          <h2 className='c-maj-step-block__downloadapp__hint'>يفضل تشغيله على ويندوز 10</h2>
        </a>)
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

export default ThirdStepBlock
