// @flow
import React, { useCallback } from 'react'
import Icon from 'components/Icon'
import './NormalSubjectResultRow.scss'

const excuseTexts = {
  waiting: 'جاري المراجعة',
  accepted: 'تم قبول التظلم',
  refused: 'تم رفض التظلم',
  uncomplete: 'غير مكتمل يرجى مراجعة الدعم',
  complete: 'مكتمل'
}

type PropType = {
  name: string,
  finalGradeStatus: string,
  state: string,
  notes: Array<string>,
  id: number,
  toggleGradePlaint: Function,
  quranGrade: number,
  quranMercyGrade: number,
  exammercyGrade: number,
  totalGrade: number,
  examRoundGrade: number,
  tilawaRoundGrade: number,
  plaints: Array<Object>,
  mercyGrade: number,
  plaintGrade: number,
  roundGrade: number,
  refinalGrade: number,
  exams: Array<Object>,
  examChecked: boolean,
  quranChecked: boolean,
  plaintEnabled: boolean,
  disabled: boolean,
  sessionGrade: number,
  finalGrade: number
};

const QuranSubjectResultRow = (props: PropType): React.Element<'div'> => {
  const { exammercyGrade, name, quranGrade, notes, finalGrade, state, plaintEnabled,
      mercyGrade, roundGrade, totalGrade, examChecked, quranChecked, disabled, examRoundGrade,
      plaints, tilawaRoundGrade, exams,
      quranMercyGrade, refinalGrade, finalGradeStatus, plaintGrade, sessionGrade } = props

  const finalExcuse = exams.find(e => e.type === 'final' && e.excuseStatus === 'accepted')
  const finalWithMerciesGrade = finalGrade + examRoundGrade + plaintGrade +
    mercyGrade + exammercyGrade + roundGrade + refinalGrade
  const quranWithMerciesGrade = quranGrade + quranMercyGrade + tilawaRoundGrade
  const success = (totalGrade) >= 50 && (quranWithMerciesGrade >= 20 && finalWithMerciesGrade >= 30)
  let quranPlaintColor = 'text-info'
  let examPlaintColor = 'text-info'
  let tilawaNotes = []
  if (typeof notes === 'object' && !Array.isArray(notes)) {
    tilawaNotes = Object.keys(notes).map(n => notes[n])
  } else {
    tilawaNotes = notes
  }
  const complete = state !== 'uncomplete'
  const quranPlaint = plaints.find(p => p.type === 'tilawa')
  const examPlaint = plaints.find(p => p.type === 'exam')

  if (quranPlaint) {
    switch (quranPlaint.status) {
      case 'accepted':
        quranPlaintColor = 'text-success'
        break
      case 'refused':
        quranPlaintColor = 'text-danger'
        break
    }
  }

  const _checkSubject = useCallback((e: Object) => {
    const { id, toggleGradePlaint } = props
    const type = e.currentTarget.getAttribute('data-type')
    toggleGradePlaint(id, type)
  })

  let finalGradeClass
  if (finalGradeStatus === 'examcheat') {
    finalGradeClass = 'text-danger'
  }

  return (<tr>
    <td>{name}</td>
    <td>{complete ? sessionGrade : ''}</td>
    <td>
      {complete ? quranWithMerciesGrade : ''}
    </td>
    <td>
      <ul>
        {(complete && Array.isArray(tilawaNotes)) ? tilawaNotes.map((n, i) => <li key={i}>
          {n}
        </li>) : ''}
      </ul>
    </td>
    <td>
      {plaintEnabled && <button data-type='tilawa' onClick={(!disabled && !quranPlaint) ? _checkSubject : null}
        disabled={(disabled || quranPlaint)}
        className={`semesterresult__checkbox ${(quranPlaint || !plaintEnabled) && 'hidden-xs-up'}`}>
        <Icon name={`checkbox-${quranChecked ? 'checked' : 'unchecked'}`} />
        <span className='semesterresult__tip'>اختر لتقديم تظلم في التلاوة</span>
      </button> }
      <span className={`${!quranPlaint && 'hidden-xs-up'} ${quranPlaintColor}`}>
        {quranPlaint && excuseTexts[quranPlaint.status]}
      </span>
    </td>
    <td className={finalGradeClass}>
      {complete ? (finalGradeStatus === 'examcheat' ? 'حالة غش' : finalWithMerciesGrade) : ''}
      {complete && finalExcuse && ` الاعذار`}
    </td>
    <td>
      {plaintEnabled && <button data-type='exam' onClick={(!disabled && !examPlaint)
        ? _checkSubject : null} disabled={(disabled || examPlaint)}
        className={`semesterresult__checkbox ${(examPlaint || !plaintEnabled) && 'hidden-xs-up'}`}>
        <Icon name={`checkbox-${examChecked ? 'checked' : 'unchecked'}`} />
        <span className='semesterresult__tip'>اختر لتقديم تظلم في الاختبار النهائي</span>
      </button>}
      <span className={`${!examPlaint && 'hidden-xs-up'} ${examPlaintColor}`}>
        {examPlaint && excuseTexts[examPlaint.status]}
      </span>
    </td>
    <td className={`bold`}>
      {complete ? totalGrade : ''}
    </td>
    <td className={`${complete ? (success ? 'success' : 'fail') : 'info'} bold`}>
      {complete ? (success ? 'ناجح' : 'لم يجتز') : ''}
      {state === 'uncomplete' ? 'غير مكتملة' : ''}
    </td>
  </tr>)
}

QuranSubjectResultRow.defaultProps = {
  name: '',
  notes: [],
  id: 0,
  quranGrade: 0,
  totalGrade: 0,
  mercyGrade: 0,
  roundGrade: 0,
  success: false,
  disabled: false,
  finalGrade: 0
}

export default QuranSubjectResultRow
