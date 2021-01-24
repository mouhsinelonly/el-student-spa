import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Icon from 'components/Icon'
import './NormalSubjectResultRow.scss'

const excuseTexts = {
  waiting: 'جاري المراجعة',
  accepted: 'تم قبول التظلم',
  refused: 'تم رفض التظلم',
  uncomplete: 'غير مكتمل يرجى مراجعة الدعم',
  complete: 'مكتمل'
}

class NormalSubjectResultRow extends Component {
  static propTypes = {
    name: PropTypes.string,
    exams: PropTypes.array,
    checked: PropTypes.bool,
    finalGradeStatus: PropTypes.string,
    id: PropTypes.number,
    toggleGradePlaint: PropTypes.func,
    activityGrade: PropTypes.number,
    videoGrade: PropTypes.number,
    midtermGrade: PropTypes.number,
    researchActivityGrade: PropTypes.number,
    researchResearchGrade: PropTypes.number,
    sessionGrade: PropTypes.number,
    plaintGrade: PropTypes.number,
    mercyGrade: PropTypes.number,
    roundGrade: PropTypes.number,
    exammercyGrade: PropTypes.number,
    refinalGrade: PropTypes.number,
    totalGrade: PropTypes.number,
    plaintEnabled: PropTypes.bool,
    plaints: PropTypes.array,
    disabled: PropTypes.bool,
    success: PropTypes.bool,
    finalGrade: PropTypes.number
  }

  static defaultProps = {
    name: '',
    plaintEnabled: false,
    checked: false,
    success: false,
    disabled: false,
    notes: [],
    exams: [],
    quranGrade: 0,
    plaintGrade: 0,
    id: 0,
    totalGrade: 0,
    activityGrade: 0,
    mercyGrade: 0,
    midtermGrade: 0,
    sessionGrade: 0,
    roundGrade: 0,
    refinalGrade: 0,
    exammercyGrade: 0,
    finalGrade: 0
  }

  render () {
    const { id, name, sessionGrade, activityGrade, midtermGrade, finalGrade,
      totalGrade, exams, mercyGrade, roundGrade, exammercyGrade, checked, disabled,
      plaints, plaintEnabled, refinalGrade, videoGrade, researchActivityGrade, researchResearchGrade,
    finalGradeStatus, plaintGrade, success, type, forumGrade, state } = this.props

    const researchSubjectIds = [89]

    const activityExcuse = exams.find(e => e.type === 'activity' && e.excuseStatus === 'accepted')
    const midtermExcuse = exams.find(e => e.type === 'midterm' && e.excuseStatus === 'accepted')
    const finalExcuse = exams.find(e => e.type === 'final' && e.excuseStatus === 'accepted')
    const activityComplaint = exams.find(e => e.type === 'activity' && e.complaintStatus === 'accepted')
    const midtermComplaint = exams.find(e => e.type === 'midterm' && e.complaintStatus === 'accepted')

    const hasMovedMidterm = midtermExcuse || midtermComplaint
    const hasMovedActivity = activityExcuse || activityComplaint

    let plaintColor = 'text-info'
    const plaint = plaints[0]
    if (plaint) {
      switch (plaint.status) {
        case 'accepted':
          plaintColor = 'text-success'
          break
        case 'refused':
          plaintColor = 'text-danger'
          break
      }
    }
    let successStatusText = 'لم يجتز'
    const complete = state !== 'uncomplete'
    if(researchSubjectIds.includes(id)){
      successStatusText = ''
    }else{
      if (success) {
        successStatusText = 'ناجح'
      } else if (!success) {
        successStatusText = 'لم يجتز'
      }
   } 
    let finalGradeClass
    if (finalGradeStatus === 'examcheat') {
      finalGradeClass = 'text-danger'
    }
    const totalActivitiesGrade = activityGrade + researchActivityGrade + researchResearchGrade
    return (<tr className='semesterresult__normal'>
      <td width='120'>{name}</td>
      <td>{complete && sessionGrade}</td>
      <td>{complete && (type === 'bac' ? videoGrade : forumGrade)}</td>
      <td>
        {complete && (totalActivitiesGrade > 0 ? (totalActivitiesGrade) : 0)}
        {hasMovedActivity && ' + '}
        {hasMovedActivity ? ` ترحيل للنهائي` : null}
      </td>
      <td>
        {complete && (midtermGrade > 0 ? midtermGrade : 0)}
        {hasMovedMidterm && ' + '}
        {hasMovedMidterm ? ` ترحيل للنهائي` : null}
      </td>
      <td className={finalGradeClass}>
        {complete && (finalGradeStatus === 'examcheat' ? 'حالة غش'
        : (!finalExcuse ? (finalGrade + plaintGrade + mercyGrade + roundGrade + exammercyGrade) : ''))}
        {complete && (finalExcuse ? ` الاعذار ${refinalGrade}` : '')}
      </td>
      <td className={`bold`}>
        {complete && Math.round(totalGrade)}
      </td>
      <td className={`${success ? 'success' : 'fail'} bold`}>
        {complete && successStatusText}
      </td>
      <td>
        {complete && plaintEnabled && <button onClick={(!disabled && !plaint) ? this._checkSubject : null} disabled={(disabled || plaint)}
          className={`semesterresult__checkbox ${(plaint || !plaintEnabled) && 'hidden-xs-up'}`}>
          <Icon name={`checkbox-${checked ? 'checked' : 'unchecked'}`} />
          <span className='semesterresult__tip'>اختر لتقديم تظلم</span>
        </button>}
        <span className={`${!plaint && 'hidden-xs-up'} ${plaintColor}`}>
          {plaint && excuseTexts[plaint.status]}
        </span>
      </td>
      {!complete && <td>غير مكتملة</td>}
    </tr>)
  }

  _checkSubject = () => {
    const { id, toggleGradePlaint } = this.props
    toggleGradePlaint(id, 'exam')
  }
}

export default NormalSubjectResultRow
