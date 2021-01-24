// @flow
import * as React from 'react'
import StatementItem from '../StatementItem'
import { useSelector } from 'react-redux'
import './style.scss'

const bachelorType = { type: 'bachelor', title: 'طلب إفادة التخرج', status: 'normal' }
const diplomaType = { type: 'diploma', title: 'طلب إفادة الدبلوم', status: 'normal' }

const StatementsRequests = (): React.Element<'div'> => {
  const { grades } = useSelector((state: Object): Object => state.grades.data)
  const { isFetching: loading, statements } = useSelector((state: Object): Object => state.orders)
  const { state, department_id: departmentId, degree_type: degreeType } = useSelector((state: Object): Object => state.student.profile)

  const isSuccessSubjects = grades.reduce((all, semester) =>
    [ ...all, ...semester.subjects.reduce((allsubjects, subject) => [
      ...allsubjects, subject.subject_state === 'success' ? subject.subject_id : false
    ],[]) ],[])
  const diplomeSubjectsSuccess = isSuccessSubjects.filter(id => [33, 37].includes(id)).length === 2

  const types = [{ type: 'grades', title: 'طلب كشف الدرجات', status: 'normal' }]

  const graduatedBachelor = state === 'graduate' && departmentId > 15

  const graduatedDiploma = (state === 'graduate' && departmentId === 15) ||
  departmentId > 15 ||
  ([14, 13].includes(departmentId) && diplomeSubjectsSuccess)

  if (graduatedBachelor && degreeType === 'bac') {
    types.push(bachelorType)
  }

  if (graduatedDiploma && !graduatedBachelor && degreeType === 'bac') {
    types.push(diplomaType)
  }

  return (
    <div className='c-statements-requests'>
      {types.map((t: Object, i: number): React.Element<typeof StatementItem> => {
        const order = statements.find((s: Object): boolean => s.type === t.type)
        return <StatementItem {...{ ...t, ...order }} key={i} loading={loading} />
      })
      }
    </div>
  )
}

export default StatementsRequests
