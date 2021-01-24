// @flow
import React, { useEffect, useCallback } from 'react'
import './style.scss'
import { unserialize } from 'utils'
import Loading from 'components/Loading'
import moment from 'moment'
import QuranSubjectResultRow from './QuranSubjectResultRow'
import NormalSubjectResultRow from './NormalSubjectResultRow'

type PropType = {
  plaintsids: Array<Object>,
  results: Array<Object>,
  exams: Object,
  blockedMessage: string,
  toggleGradePlaint: Function,
  getResults: Function,
  getPaymentFields: Function,
  subjects: Array<Object>,
  paymentfields: Object,
  profile: Object,
  omanneturl: string,
  events: Array<Object>,
  paymentclicked: boolean,
  blocked: boolean,
  serverdate: string,
  loadingsubjects: boolean,
  loadingpayment: boolean,
  loadingresults: boolean,
  enabled: boolean
};

const preMajSubjectIds = [108, 109, 110, 111, 112, 113, 114];

const isSuccess = (grade: number, degreeType: string, subjetId: number): boolean => {
  if (degreeType === 'maj' && grade >= 65 && !preMajSubjectIds.includes(subjetId)) {
    return true
  } else if (degreeType === 'bac' && grade >= 50) {
    return true
  }else if(degreeType === 'maj' && grade >= 50 && preMajSubjectIds.includes(subjetId)){
    return true
  }

  return false
}

const SemesterResultsTable = (props: PropType): React.Element<'div'> => {
  const { enabled, subjects, loadingresults, loadingsubjects, exams
      , plaintsids, toggleGradePlaint, loadingpayment, paymentfields, events, omanneturl, results,
      blockedMessage, blocked, serverdate, paymentclicked, getPaymentFields,
      profile: { degree_type: degreeType } } = props

  useEffect(() => {
    if (props.enabled) {
      props.getResults()
    }
  }, [])

  const _pay = useCallback(() => {
    if (typeof paymentfields.amount !== 'undefined' && !paymentclicked) {
      // this.refs['form'].submit()
      // paymentFormClicked()
    } else {
      getPaymentFields()
    }
  }, [paymentfields, paymentclicked])

  const _getTotal = useCallback((id: number = 0): number => {
    const totals = results.reduce((total: number, current: Object): number =>
      current.subject_id === id ? total + current.total : total, 0)
    return Math.round(totals)
  }, [results])

  const _getGrade = useCallback((id: number = 0, key: string | Array<>, status: boolean = false): Object => {
    const dynamicKey = typeof key === 'string' ? [key] : key
    if (status) {
      const item = results.find((r: Object): boolean =>
        (r.subject_id === id && (dynamicKey.includes(r.grade_name) || key === '')))
      if (item) {
        return item.status || ''
      }
    }
    const item = results.reduce((total: number, r: Object): Object =>
      (r.subject_id === id && (dynamicKey.includes(r.grade_name) || key === '')) ? total + r.total : total, 0)
    return item
  }, [results])

  const _getGradeNotes = useCallback((id: number = 0, key: string | Array<>): Array<string> => {
    const dynamicKey = typeof key === 'string' ? [key] : key
    const item = results.find((r: Object): Object =>
      r.subject_id === id && (dynamicKey.includes(r.grade_name) || key === ''))
    return item ? unserialize(item.notes) : []
  }, [results])

  if (!enabled) return false

  const plaintsEvent = events.find((e: Object): Object => e.category === 'enable_plaints')

  const serverTime = moment(serverdate)

  const plaintEnabled = plaintsEvent &&
      serverTime.isBetween(`${plaintsEvent.start_at} ${plaintsEvent.time_start_at}`,
        `${plaintsEvent.finish_at} ${plaintsEvent.time_finish_at}`, 'seconds')

  if (loadingresults || loadingsubjects) {
    return (<div className='p-y-3'>
      <Loading />
    </div>)
  }
  if (typeof results.blocked !== 'undefined') {
    return <h5 className='p-a-3 text-xs-center text-danger font-weight-bold'>{results.message}</h5>
  }
  if (blocked) {
    return <h5 className='p-a-3 text-xs-center text-danger font-weight-bold'>{blockedMessage}</h5>
  }
  const hasQuranSubjects = Object.keys(subjects)
  .reduce((total: number, current: number): number => subjects[current].is_quran ? 1 : total, 0)
  const hasNotQuranSubjects = Object.keys(subjects)
  .reduce((total: number, current: number): number => subjects[current].is_quran === 0 ? 1 : total, 0)

  const paymentReady = typeof paymentfields.amount !== 'undefined'

  return (<div className='container'>
    <div className='row p-y-3'>
      <div className='col-xs-12 col-md-10 col-md-pull-1 c-student-results p-y-2'>
        <table className={`table table-bordered table-responsive ${!hasNotQuranSubjects && 'hidden-xs-up'}`}>
          <thead>
            <tr>
              <th>المادة</th>
              <th>اللقائات الافتراضية</th>
              <th>{degreeType === 'bac' ? 'مشاهدة الدروس' : 'المنتدى'}</th>
              <th>النشاط</th>
              <th>اختبار المنتصف</th>
              <th>الاختبار النهائي</th>
              <th>المجموع</th>
              <th>الملاحظة</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {Object.keys(subjects).map((key: Object): Array<React.Element<'*'>> =>
              !subjects[key].is_quran
              ? <NormalSubjectResultRow key={key}
                state={subjects[key].state}
                name={subjects[key].name}
                id={subjects[key].id}
                type={degreeType}
                plaintEnabled={plaintEnabled && degreeType === 'maj' }
                toggleGradePlaint={toggleGradePlaint}
                checked={plaintsids.findIndex((i: number): number =>
                  i.id === subjects[key].id && i.type === 'exam') >= 0}
                exams={Object.keys(exams).map((k: string): boolean => {
                  return (exams[k].subject_id === subjects[key].id) ? exams[k] : undefined
                }).filter((e: Object): boolean => e !== undefined)}
                sessionGrade={_getGrade(subjects[key].id, ['attendance', 'teacher_attendance']) || 0}
                videoGrade={_getGrade(subjects[key].id, 'video_element') || 0}
                activityGrade={_getGrade(subjects[key].id, 'activity') || 0}
                forumGrade={_getGrade(subjects[key].id, 'forum') || 0}
                exammercyGrade={_getGrade(subjects[key].id, 'exammercy') || 0}
                mercyGrade={_getGrade(subjects[key].id, 'mercy') || 0}
                researchActivityGrade={_getGrade(subjects[key].id, 'research_activity') || 0}
                researchResearchGrade={_getGrade(subjects[key].id, 'research_research') || 0}
                roundGrade={_getGrade(subjects[key].id, 'round') || 0}
                finalGradeStatus={_getGrade(subjects[key].id, 'final', true) || ''}
                examessayGrade={_getGrade(subjects[key].id, 'examessay_grade') || 0}
                plaintGrade={_getGrade(subjects[key].id, 'plaint') || 0}
                midtermGrade={_getGrade(subjects[key].id, 'midterm') || 0}
                refinalGrade={_getGrade(subjects[key].id, 'refinal') || 0}
                plaints={subjects[key].plaints}
                disabled={paymentReady}
                totalGrade={parseFloat(_getTotal(subjects[key].id).toFixed(2))}
                success={isSuccess(parseFloat(_getTotal(subjects[key].id).toFixed(2)), degreeType, subjects[key].id)}
                finalGrade={_getGrade(subjects[key].id, 'final')
                ? _getGrade(subjects[key].id, 'final') : 0}
               />
            : null)}
          </tbody>
        </table>
        <table className={`table table-bordered table-responsive m-t-2 ${!hasQuranSubjects && 'hidden-xs-up'}`}>
          <thead>
            <tr>
              <th>المادة</th>
              <th>اللقائات الافتراضية </th>
              <th>درجة التلاوة <br /> (من 40) </th>
              <th>تعليق المقيم</th>
              <th />
              <th>درجة التحريري <br /> (من 50) </th>
              <th />
              <th>المجموع</th>
              <th>الملاحظة</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(subjects).map((key: Object): Array<'*'> => subjects[key].is_quran
              ? <QuranSubjectResultRow key={key}
                name={subjects[key].name}
                state={subjects[key].state}
                plaintEnabled={plaintEnabled}
                id={subjects[key].id}
                toggleGradePlaint={toggleGradePlaint}
                examChecked={plaintsids.findIndex((i: Object): boolean =>
                  i.id === subjects[key].id && i.type === 'exam') >= 0}
                quranChecked={plaintsids.findIndex((i: Object): boolean =>
                  i.id === subjects[key].id && i.type === 'tilawa') >= 0}
                quranGrade={_getGrade(subjects[key].id, 'quran_recordings')
                  ? _getGrade(subjects[key].id, 'quran_recordings') : 0}
                quranMercyGrade={_getGrade(subjects[key].id, 'tilawamercy')
                  ? _getGrade(subjects[key].id, 'tilawamercy') : 0}
                finalGrade={_getGrade(subjects[key].id, 'final')
                ? _getGrade(subjects[key].id, 'final') : 0}
                finalGradeStatus={_getGrade(subjects[key].id, 'final')
                ? _getGrade(subjects[key].id, 'final').status : ''}
                refinalGrade={_getGrade(subjects[key].id, 'refinal')
                ? _getGrade(subjects[key].id, 'refinal') : 0}
                plaintGrade={_getGrade(subjects[key].id, 'plaint')
                ? _getGrade(subjects[key].id, 'plaint') : 0}
                exammercyGrade={_getGrade(subjects[key].id, 'exammercy')
                ? _getGrade(subjects[key].id, 'exammercy') : 0}
                mercyGrade={_getGrade(subjects[key].id, 'mercy')
                ? _getGrade(subjects[key].id, 'mercy') : 0}
                roundGrade={_getGrade(subjects[key].id, 'round')
                ? _getGrade(subjects[key].id, 'round') : 0}
                sessionGrade={_getGrade(subjects[key].id, ['attendance', 'teacher_attendance']) || 0}
                examRoundGrade={_getGrade(subjects[key].id, 'examround')
                ? _getGrade(subjects[key].id, 'examround') : 0}
                disabled={paymentReady}
                tilawaRoundGrade={_getGrade(subjects[key].id, 'tilawaround')
                ? _getGrade(subjects[key].id, 'tilawaround') : 0}
                exams={Object.keys(exams).map((k: Object): Array<Object> => {
                  return (exams[k].subject_id === subjects[key].id) ? exams[k] : undefined
                }).filter((e: Object): boolean => e !== undefined)}
                plaints={subjects[key].plaints}
                notes={_getGradeNotes(subjects[key].id, 'quran_recordings')}
                totalGrade={parseFloat(_getTotal(subjects[key].id).toFixed(2))} />
                : null)}
          </tbody>
        </table>
        {loadingpayment ? <Loading className='m-y-3' /> : ''}
        <a disabled={plaintsids.length === 0 || loadingpayment}
          href={omanneturl} target='_blank' className={`btn btn-success btn-lg m-x-auto m-t-3  p-x-3
        c-student-results__send ${(loadingpayment || !plaintEnabled || omanneturl === '') && 'hidden-xs-up'}`}>
          الدفع ببطاقة Credit
        </a>
        <button disabled={plaintsids.length === 0 || loadingpayment}
          onClick={_pay}
          className={`btn btn-success btn-lg m-x-auto m-t-3 p-x-3
            c-student-results__send ${(loadingpayment || !plaintEnabled) && 'hidden-xs-up'}`}>
          {paymentReady ? 'الدفع الالكتروني' : ''}
          {!loadingpayment && !paymentReady ? 'تقديم تظلم' : ''}
        </button>
        <div className={`p-y-2 text-xs-center ${(plaintsids.length === 0 || !paymentReady || !plaintEnabled) &&
          'hidden-xs-up'}`}>
          عليك دفع مبلغ <b className='text-success'>{plaintsids.length * 10}</b> ريال
          <div className='clearfix' />
          <div className='col-xs-12 col-md-8 col-md-pull-2 p-y-2'>
             تنبيه: عزيزي الطالب، نعلمك أنه في حالة إعادة التصحيح وتعديل الدرجة فسوف تسترد ما تم دفعه،
             أما في حالة عدم تعديل الدرجة فلن تسترد المبلغ المدفوع.
          </div>
        </div>
      </div>
    </div>
  </div>)
}

SemesterResultsTable.defaultProps = {
  enabled: false
}

export default SemesterResultsTable
