// @flow
import React, { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setVisibleSubjects } from 'routes/Users/modules/students'
import './style.scss'

type PropsType = {
  subjects: Array<Object>,
  setVisibleSubjects: Function,
  failedSubjectsLoading: boolean,
  failedSubjects: Array<Object>,
  researches: Array<Object>,
  state: string
};

const getSuccessType = (type: string): string => ({
  'TILAWA': '(تحريري)',
  'EXAM': '(تلاوة)',
  'NONE': '(تلاوة/تحريري)',
})[type]

const StudentSubjects = (props: PropsType): React.Element<'div'> => {
  const { visibleSubjects: state, failedSubjects, researches } =
  useSelector((state: Object): Object => state.user_students)
  const dispatch = useDispatch()
  const _showStudy = useCallback(() => {
    dispatch(setVisibleSubjects('study'))
  }, [])
  const _showFail = useCallback(() => {
    dispatch(setVisibleSubjects('fail'))
  }, [])
  const _showResearch = useCallback(() => {
    dispatch(setVisibleSubjects('research'))
  }, [])

  const { subjects } = props
  if (typeof subjects === 'undefined') return <div />
  return (
    <div className='v2-ticket-student-subjects p-y-2'>
      <div>
        <span className={`v2-ticket-student-subjects__title
        ${state === 'study' ? 'is-active' : ''} p-x-2`}
          onClick={_showStudy} >المواد</span>|
        <span className={`v2-ticket-student-subjects__title
          ${!failedSubjects.length ? 'hidden-xs-up' : ''}
          ${state === 'fail' ? 'is-active' : ''} p-x-2`}
          onClick={_showFail} >مواد الرسوب</span>|
        <span className={`v2-ticket-student-subjects__title
          ${!researches.length ? 'hidden-xs-up' : ''}
          ${state === 'research' ? 'is-active' : ''} p-x-2`}
          onClick={_showResearch} >البحوث</span>
      </div>
      <div className={state !== 'study' ? 'hidden-xs-up' : ''}>
        {subjects.map((s: Object): React.Element<typeof SubjectCol> => <SubjectCol key={s.id} {...s} />)}
      </div>
      <div className={`${state !== 'fail' ? 'hidden-xs-up' : ''} p-a-2`}>
        {failedSubjects.map((s: Object): React.Element<typeof SubjectCol> => <SubjectCol key={s.id} {...s} />)}
      </div>
      <div className={`${state !== 'research' ? 'hidden-xs-up' : ''} p-a-2`}>
        {researches.map((s: Object): React.Element<typeof ResearchCol> => <ResearchCol key={s.id} {...s} />)}
      </div>
      <div className='clearfix' />
    </div>
  )
}

const SubjectCol = (props: Object): React.Element<'div'> =>
  <div data-rh={`${props.term_name} - ${props.name}`} data-rh-at='right' key={props.id}
    className='col-xs-6 v2-ticket-student-subjects__item p-t-1 text-nowrap'>
    {props.name} {props.is_quran
      ? <span className='text-info v2-ticket-student-subjects__item-success'>{getSuccessType(props.success_type)}</span>
      : null}
  </div>

const ResearchCol = ({ has_upload: uploaded, has_answer: answered, name, id, type }: Object): React.Element<'div'> => {
  let stateClass = ''
  let iconName = ''
  if (uploaded || answered) {
    stateClass = 'is-success'
    iconName = 'check'
  } else {
    stateClass = 'is-warning'
    iconName = 'access_time'
  }
  return (<div data-rh={`${uploaded || answered ? 'تم الرفع' : 'لم يتم الرفع'}`} data-rh-at='right' key={id}
    className='col-xs-12 v2-ticket-student-subjects__item p-t-1 text-nowrap'>
    {type === 'research' ? 'بحث' : 'نشاط'} {name}
    <button
      style={{ display: 'inline-block' }}
      data-rh-at='right'
      className={`v2-ticket-student-sessions__item-button ${stateClass} m-r-1`} >
      <span className='material-icons'>
        {iconName}
      </span>
    </button>
  </div>)
}

export default StudentSubjects
