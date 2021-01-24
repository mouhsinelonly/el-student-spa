// @flow
import * as React from 'react'
import ReactDOM from 'react-dom'
import moment from 'moment'
import './StudentGrades.scss'

type PropsType = {
  grades: Array<Object>,
  events: Array<Object>,
  visible: boolean,
  toggleShowFullGrade: Function
};

const gradesPortal = document.getElementById('gradesPortal')

const StudentGrades = (props: PropsType): React.Element<'div'> => {
  const midtermResultEvent = props.events.find((e: Object): boolean => e.category === 'midterm_result')
  const activityResultEvent = props.events.find((e: Object): boolean => e.category === 'short_test')
  const tilawaResultEvent = props.events.find((e: Object): boolean => e.category === 'result')
  const finalResultEvent = props.events.find((e: Object): boolean => e.category === 'filnal_result')
  const refinalResultEvent = props.events.find((e: Object): boolean => e.category === 'result')

  const midtermActive = midtermResultEvent ? moment(midtermResultEvent.start_at).isBefore(moment()) : false
  const activityActive = activityResultEvent ? moment(activityResultEvent.start_at).isBefore(moment()) : false
  const tilawaActive = tilawaResultEvent ? moment(tilawaResultEvent.start_at).isBefore(moment()) : false
  const finalActive = finalResultEvent ? moment(finalResultEvent.start_at).isBefore(moment()) : false
  const refinalActive = refinalResultEvent ? moment(refinalResultEvent.start_at).isBefore(moment()) : false

  return props.visible ? ReactDOM.createPortal((
    <div onClick={props.toggleShowFullGrade}
      className='Users-StudentGrades__container p-b-2 col-xs-12 p-x-0'>
      <h1 className='Users-StudentGrades__title is-active p-y-1 p-x-2'>
        النتائج
      </h1>
      <RowHeader />
      {props.grades.map((grade: Object): React.Element<typeof SubjectGradeRow> => <SubjectGradeRow
        activity={activityActive}
        midterm={midtermActive}
        tilawa={tilawaActive}
        final={finalActive}
        refinal={refinalActive}
        key={grade.id}
        {...grade} />)}
    </div>
  ), gradesPortal) : <div onClick={props.toggleShowFullGrade}
    style={{ overflow: 'hidden' }}>
    <div
      style={{ width: 1140 }}
      className='Users-StudentGrades__container p-b-2 col-xs-12'>
      <h1 className='Users-StudentGrades__title is-active p-y-1 p-x-2'>
          النتائج
      </h1>
      <RowHeader />
      {props.grades.map((grade: Object): React.Element<typeof SubjectGradeRow> => <SubjectGradeRow
        activity={activityActive}
        midterm={midtermActive}
        tilawa={tilawaActive}
        final={finalActive}
        refinal={refinalActive}
        key={grade.id}
        {...grade} />)}
    </div>
  </div>
}

function getGrade (grades: Array<Object> = [], name: string = 'activity', type: string = ''): number {
  let total = 0
  const grade = grades.find((g: Object): boolean => g.grade_name === name)
  if (grade) {
    total = type !== ''
    ? (type === 'qcm' ? grade.exam_grade : grade.examessay_grade)
    : grade.total.toFixed(2)
  }

  if (name === 'video_element' && total > 5) return 5

  return total
}

const RowHeader = (): React.Element<'div'> =>
  (<div className='col-xs-12 Users-StudentGrades__item'>
    <div className='col-xs-12 col-md-4 Users-StudentGrades__item-bl  p-b-1'>
      <div className='col-xs-6' />
      <div className='col-xs-6'>
        <h6 className='col-xs-12 Users-StudentGrades__item-header'>الدراسة</h6>
        <div className='col-xs-4'>الدروس</div>
        <div className='col-xs-4'>فصول</div>
        <div className='col-xs-4'>نشاط</div>
      </div>
    </div>
    <div className='col-xs-12 col-md-2 Users-StudentGrades__item-bl  p-b-1'>
      <h6 className='col-xs-12 Users-StudentGrades__item-header'>المنتصف</h6>
      <div className='col-xs-4'>مقالي</div>
      <div className='col-xs-4'>الكتروني</div>
      <div className='col-xs-4'>مجموع</div>
    </div>
    <div className='col-xs-12 col-md-2 Users-StudentGrades__item-bl  p-b-1'>
      <h6 className='col-xs-12 Users-StudentGrades__item-header'>النهائي</h6>
      <div className='col-xs-4'>مقالي</div>
      <div className='col-xs-4'>الكتروني</div>
      <div className='col-xs-4'>مجموع</div>
    </div>
    <div className='col-xs-12 col-md-2 Users-StudentGrades__item-bl  p-b-1'>
      <h6 className='col-xs-12 Users-StudentGrades__item-header'>اعذار</h6>
      <div className='col-xs-4'>مقالي</div>
      <div className='col-xs-4'>الكتروني</div>
      <div className='col-xs-4'>مجموع</div>
    </div>
    <div className='col-xs-12 col-md-2  p-b-1'>
      <div className='col-xs-4 Users-StudentGrades__item-header'>تظلم</div>
      <div className='col-xs-4 Users-StudentGrades__item-header'>الرأفة</div>
      <div className='col-xs-4 Users-StudentGrades__item-header'>المجموع</div>
    </div>
  </div>)

type SubjectGradeRowType = {
  name: string,
  midterm: boolean,
  final: boolean,
  refinal: boolean,
  activity: boolean,
  tilawa: boolean,
  isQuran: boolean,
  grades: Array<Object>
};

const SubjectGradeRow = (props: SubjectGradeRowType): React.Element<'div'> =>
  <div className='col-xs-12 Users-StudentGrades__item'>
    <div className='col-xs-12 col-md-4 Users-StudentGrades__item-bl'>
      <div className='col-xs-6 Users-StudentGrades__item-name'>
        {props.name}
      </div>
      {!props.isQuran ? <div className='col-xs-6'>
        <div className='col-xs-4'>{getGrade(props.grades, 'video_element')}</div>
        <div className='col-xs-4'>{getGrade(props.grades, 'attendance')}</div>
        <div className={`col-xs-4 ${!props.activity ? 'hidden-xs-up' : ''}`}>
          {getGrade(props.grades, 'activity')}</div>
      </div> : <div className='col-xs-6'>
        <div className='col-xs-8 Users-StudentGrades__item-header'>التلاوة</div>
        <div className={`col-xs-4 ${!props.tilawa ? 'hidden-xs-up' : ''}`}>
          {getGrade(props.grades, 'quran_recordings')}
        </div>
        {!props.tilawa ? <i className='material-icons Users-StudentGrades__item-clock'>access_time</i> : null}
      </div>}
    </div>
    {!props.isQuran ? [<div key='midterm' className='col-xs-12 col-md-2 Users-StudentGrades__item-bl'>
      <div className={`col-xs-4 ${!props.midterm ? 'hidden-xs-up' : ''}`}>
        {getGrade(props.grades, 'midterm', 'essay')}
      </div>
      <div className={`col-xs-4 ${!props.midterm ? 'hidden-xs-up' : ''}`}>
        {getGrade(props.grades, 'midterm', 'qcm')}
      </div>
      <div className={`col-xs-4 ${!props.midterm ? 'hidden-xs-up' : ''}`}>
        {getGrade(props.grades, 'midterm')}
      </div>
      {!props.midterm ? <i className='material-icons Users-StudentGrades__item-clock'>access_time</i> : null}
    </div>,
      <div key='final' className='col-xs-12 col-md-2 Users-StudentGrades__item-bl'>
        <div className={`col-xs-4 ${!props.final ? 'hidden-xs-up' : ''}`}>
          {getGrade(props.grades, 'final', 'essay')}</div>
        <div className={`col-xs-4 ${!props.final ? 'hidden-xs-up' : ''}`}>
          {getGrade(props.grades, 'final', 'qcm')}</div>
        <div className={`col-xs-4 ${!props.final ? 'hidden-xs-up' : ''}`}>
          {getGrade(props.grades, 'final')}</div>
        {!props.final ? <i className='material-icons Users-StudentGrades__item-clock'>access_time</i> : null}
      </div>,
      <div key='refinal' className='col-xs-12 col-md-2 Users-StudentGrades__item-bl'>
        <div className={`col-xs-4 ${!props.refinal ? 'hidden-xs-up' : ''}`}>
          {getGrade(props.grades, 'refinal', 'essay')}</div>
        <div className={`col-xs-4 ${!props.refinal ? 'hidden-xs-up' : ''}`}>
          {getGrade(props.grades, 'refinal', 'qcm')}</div>
        <div className={`col-xs-4 ${!props.refinal ? 'hidden-xs-up' : ''}`}>
          {getGrade(props.grades, 'refinal')}</div>
        {!props.refinal ? <i className='material-icons Users-StudentGrades__item-clock'>access_time</i> : null}
      </div>] : null }
    <div className={`col-xs-12 col-md-2 ${props.isQuran ? 'col-md-pull-6' : ''}`}>
      <div className='col-xs-4'>
        <i className='material-icons Users-StudentGrades__item-clock'>access_time</i>
      </div>
      <div className='col-xs-4'>
        <i className='material-icons Users-StudentGrades__item-clock'>access_time</i>
      </div>
      <div className='col-xs-4'>
        {props.refinal
        ? getGrade(props.grades, 'total')
        : <i className='material-icons Users-StudentGrades__item-clock'>access_time</i>}
      </div>
    </div>
  </div>

export default StudentGrades
