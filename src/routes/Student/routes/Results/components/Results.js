// @flow
import * as React from 'react'
import Loading from 'components/Loading'
import './style.scss'
import { subjectStateToString, TILAWA_SUCCESS_GRADE } from 'utils'
import moment from 'moment'
import SemesterResultsTable from './SemesterResultsTable'

import blockedStudents from 'static/data/nogrades.json'

import waitingStudents from 'static/data/waitinggrades.json'

const hideStudents = []

const cheatStudents = []

type PropType = {
   grades: Array<Object>,
   profile: Object,
   setGradesYear: Function,
   gpas: Array<Object>,
   events: Array<Object>,
   currentyear: number,
   loadinggrades: boolean,
   serverdate: string
};
class Results extends React.Component<PropType> {
  static defaultProps = {
    gardes: [],
    events: []
  }
  render (): React.Element<*> {
    const { grades, loadinggrades, gpas, events, serverdate, profile: { semester, department_id: departmentId, state,
    id: studentId, degree_type: degreeType } } = this.props

    const maxSemesterId = (state === 'active' && departmentId === 15) ? 20 : degreeType === 'maj' ? 35 : 20
    if (loadinggrades) return <Loading />

    let resultsEnabled = false

    const resultEvent = events.find((e: Object): boolean => e.category === 'result')
    if (resultEvent) {
      const serverTime = moment(serverdate)

      const resultEventStartAt = moment(`${resultEvent.start_at} ${resultEvent.time_start_at}`)
      const resultEventFinishAt = moment(`${resultEvent.finish_at} ${resultEvent.time_finish_at}`)
      if (resultEventStartAt.isBefore(serverTime) && resultEventFinishAt.isAfter(serverTime)) {
        resultsEnabled = true
      }
    }
    let blockedMessage = 'عذرا لا يمكنك الاطلاع على النتائج لحين حضورك للتصوير بمقر الكلية'
    if (hideStudents.findIndex((h: number): boolean => h === studentId) >= 0) {
      blockedMessage = 'تم حجب النتائج لحين الحضور لمقابلة رئيس لجنة شؤون الامتحانات'
    } else if (cheatStudents.findIndex((h: number): boolean => h === studentId) >= 0) {
      blockedMessage = 'تم حجب النتائج لحين الانتهاء من النظر في محاضر الغش'
    } else if (waitingStudents.findIndex((h: number): boolean => h === studentId) >= 0) {
      blockedMessage = 'تم حجب النتائج لحين الانتهاء من التصحيح'
    }
    const resultsBlocked = (blockedStudents.findIndex((i: number): boolean => i === studentId) >= 0 ||
                          cheatStudents.findIndex((i: number): boolean => i === studentId) >= 0 ||
                          waitingStudents.findIndex((i: number): boolean => i === studentId) >= 0 ||
                          hideStudents.findIndex((i: number): boolean => i === studentId) >= 0)

    const { currentYearObject, prevYearObject, nextYearObject, maxYear } = this.getYears()
    
    return (<div className='p-student-results'>
      {resultsEnabled && <SemesterResultsTable enabled={resultsEnabled}
        blocked={resultsBlocked}
        blockedMessage={blockedMessage}
        studentId={studentId} />}
      <div className={`${!currentYearObject ? 'hidden-xs-up' : ''} p-student-results__header text-xs-center`}>
        <div className='container'>
          <div className='col-xs-12 col-md-8 col-md-pull-2'>
            <h2 className='p-student-results__header__adjusyearname p-y-3 col-xs-12 col-md-4'>
              {/* prevYearObject && prevYearObject.structureYearName */}
              <div className='p-student-results__header__yeardate p-t-1'>
                {prevYearObject && prevYearObject.year_name}
              </div>
            </h2>
            <h1 className='p-student-results__header__yearname p-y-3 col-xs-12 col-md-4'>
              <button onClick={this._goNextYear} className={`${!prevYearObject ? 'hidden-xs-up' : ''}
              p-student-results__header__nav btn btn-xs btn-white btn-radius next`}>
                ❮
              </button>
              {/* currentYearObject && currentYearObject.structureYearName */}
              <button onClick={this._goPrevYear} className={`${!nextYearObject ? 'hidden-xs-up' : ''}
              p-student-results__header__nav btn btn-xs btn-white btn-radius prev`}>
                ❯
              </button>
              <div className='p-student-results__header__yeardate p-t-1'>
                {currentYearObject && currentYearObject.year_name}
              </div>
            </h1>
            <h2 className='p-student-results__header__adjusyearname p-y-3 col-xs-12 col-md-4'>
              {/* nextYearObject && nextYearObject.structureYearName */}
              <div className='p-student-results__header__yeardate p-t-1'>
                {nextYearObject && nextYearObject.year_name}
              </div>
            </h2>
          </div>
        </div>
        <div className='clearfix' />
      </div>
      <div className='container'>
        <div className='row'>
          <ul className='p-student-results__terms m-a-0 p-a-0 p-t-3'>
            {grades.filter((g: Object): boolean => g.structureYearId === maxYear)
              .map((grade: Object, index: number): React.Element<'li'> =>
                <li key={index} className='p-student-results__terms__item'>
                  <div className='p-student-results__terms__item-title text-xs-center m-x-auto m-b-3'>
                    {`${grade.sem_name} / ${grade.year_name}`}
                  </div>
                  <div className='col-xs-12 col-md-8 col-md-pull-2'>
                    <SubjectsTable
                      showPoints={degreeType !== 'maj'}
                      enabled={([15, 16].findIndex(s => s === grade.semester_id) < 0) ||
                        (([15].findIndex(s => s === +grade.semester_id) >= 0) &&
                        (blockedStudents.findIndex((i: number): boolean => i === studentId) < 0 &&
                          cheatStudents.findIndex((i: number): boolean => i === studentId) < 0 &&
                          hideStudents.findIndex((i: number): boolean => i === studentId) < 0)) ||
                        (([16].findIndex(s => s === +grade.semester_id) >= 0) &&
                        (waitingStudents.findIndex((i: number): boolean => i === studentId) < 0))}
                      blockedMessage={blockedMessage}
                      maxSemesterId={maxSemesterId}
                      semesterId={grade.semester_id}
                      currentSemester={semester.id}
                      studystate={grade.study_state}
                      gpa={gpas.find((g: Object): boolean => g.semester_id === grade.semester_id)}
                      subjects={grade.subjects} />
                  </div>
                  <div className='clearfix' />
                </li>)}
          </ul>
        </div>
      </div>
    </div>)
  }
  getYears = (): Object => {
    const { currentyear: currentYear, grades } = this.props
    const studentYears = grades.reduce((prev: Array<*>, current: Object): Array<*> =>
      prev.findIndex((g: Object): boolean => g.structureYearId === current.structureYearId) > -1
      ? prev
      : prev.concat(current), [])
    let maxYear = 0
    if (currentYear > 0) {
      maxYear = currentYear
    } else {
      maxYear = grades.reduce((prev: Object, current: Object): number =>
      (prev.structureYearId > current.structureYearId)
      ? prev.structureYearId
      : current.structureYearId, 0)
    }
    const currentYearObject = studentYears.find((y: Object): boolean => y.structureYearId === maxYear)
    const prevYearObject = studentYears.find((y: Object): boolean => y.structureYearId === maxYear - 1)
    const nextYearObject = studentYears.find((y: Object): boolean => y.structureYearId === maxYear + 1)

    return { currentYearObject, prevYearObject, nextYearObject, maxYear }
  }
  _goNextYear = () => {
    const { setGradesYear } = this.props
    const { prevYearObject } = this.getYears()
    setGradesYear(prevYearObject.structureYearId)
  }
  _goPrevYear = () => {
    const { setGradesYear } = this.props
    const { nextYearObject } = this.getYears()
    setGradesYear(nextYearObject.structureYearId)
  }
}

type SubjectsTableType = {
  enabled: boolean,
  currentSemester: number,
  maxSemesterId: number,
  semesterId: number,
  gpa: Object,
  showPoints: boolean,
  subjects: Array<Object>,
  studystate: string,
  blockedMessage: string
};

const SubjectsTable = (props: SubjectsTableType): React.Element<'div'> => props.enabled
  ? <div className='p-student-results__subjects m-b-3 table-responsive'>
    <table className='table'>
      <thead>
        <tr>
          <th>المادة</th>
          <th>عدد الساعات</th>
          { props.showPoints && <th>الدرجة</th> }
          <th>القيمة</th>
          <th>التقدير</th>
          <th>النقاط</th>
          <th>الحالة</th>
        </tr>
      </thead>
      <tbody>
        {props.subjects.map((s: Object, i: number): React.Element<typeof SubjectTableRow> => <SubjectTableRow
          currentSemester={props.currentSemester}
          maxSemesterId={props.maxSemesterId}
          showPoints={props.showPoints}
          semesterId={props.semesterId}
          {...s} key={i} />)}
      </tbody>
      <tfoot className={`${(props.studystate !== 'active' &&
        props.studystate !== 'repeat') ? props.studystate : 'success'}
      ${((props.studystate === 'active' || props.studystate === 'repeat') &&
        (props.semesterId > props.maxSemesterId))
      ? 'hidden-xs-up'
      : ''}`}>
        <tr>
          <th>إجمالي الساعات</th>
          <th colSpan='6' className='text-xs-center'>
            {props.gpa.hours}
          </th>
        </tr>
        <tr>
          { props.showPoints && <th>مجموع النقاط</th> }
          { props.showPoints && <th colSpan='6' className='text-xs-center'>
            {props.gpa.points}
          </th> }
        </tr>
        <tr>
          <th>المعدل الفصلي</th>
          <th colSpan='6' className='text-xs-center'>
            {props.gpa && props.gpa.term_average}
          </th>
        </tr>
        <tr>
          <th>المعدل التراكمي</th>
          <th colSpan='6' className='text-xs-center'>
            {props.gpa && props.gpa.gpa}
          </th>
        </tr>
      </tfoot>
    </table>
  </div>
: <div className='p-student-results__subjects m-b-3 table-responsive p-a-3 text-xs-center'>{props.blockedMessage}</div>

type SubjectTableRowType = {
  maxSemesterId: number,
  quran_points: number,
  exam_points: number,
  subject_state: string,
  subject_name: string,
  subject_hours: number,
  is_quran: number,
  semester_id: number,
  subject_points: number,
  details: Object,
  showPoints: boolean,
  semesterId: number,
  currentSemester: number
};

class SubjectTableRow extends React.Component<SubjectTableRowType> {
  render (): React.Element<'tr'> {
    const { maxSemesterId, quran_points: quranPoints, exam_points: examPoints, subject_state: state,
     subject_name: name, subject_hours: hours,
      is_quran: isQuran,
      showPoints,
      semester_id: subjectSemester, subject_points: points, details, semesterId, currentSemester } = this.props

    const showGrades = (state !== 'study' || subjectSemester <= maxSemesterId) && state !== 'uncomplete'

    const success = (((!isQuran && points >= 50) ||
      ((isQuran && ((quranPoints >= TILAWA_SUCCESS_GRADE) && (points - quranPoints) >= 30)) && points >= 50)) ||
      state === 'success')

    let currentSubjectState = subjectStateToString(subjectSemester <= currentSemester ? state : 'coming')

    if (showGrades && subjectSemester === maxSemesterId && state === 'study') {
      currentSubjectState = ((isQuran !== 1 && points >= 50) ||
      (((isQuran === 1) && ((quranPoints >= TILAWA_SUCCESS_GRADE) && (points - quranPoints) >= 30)) && (points >= 50)))
      ? subjectStateToString('success') : subjectStateToString('fail')
    }
    if (isQuran === 1 && subjectSemester === maxSemesterId) {
      // console.log(state)
    }
    return <tr className={`${state}`}>
      <td>{name}</td>
      <td>{hours}</td>
      { showPoints && <td className={`bold`}>
        {showGrades &&
           Math.round(points)} {(showGrades && isQuran && subjectSemester >= 14)
            ? `(${examPoints} تحريري / ${quranPoints} تلاوة)`
            : null}</td> }
      <td className={`bold`}>{showGrades &&
           details && details.numeric_value}</td>
      <td className={`bold`}>{showGrades &&
           details && details.grade}
      </td>
      <td className={`bold`}>{showGrades &&
           details &&
            ((isQuran && semesterId >= 7) || !isQuran) && details.points}</td>
      <td className={`bold ${showGrades ? (subjectSemester <= maxSemesterId
            ? (success ? 'success' : 'fail')
            : (subjectSemester <= currentSemester ? state : 'coming')) : 'info'}`}>
        {currentSubjectState}
      </td>
    </tr>
  }
}

export default Results
