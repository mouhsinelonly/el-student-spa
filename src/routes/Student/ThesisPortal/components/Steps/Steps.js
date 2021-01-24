// @flow
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actions, getResources } from 'routes/Student/modules/thesis'
import { setThesisAllVisible } from 'routes/Student/modules/student'

import './Steps.scss'

const { getSteps, getChosenTeachers } = actions

type PropertiesType = {
  preliminary: boolean,
  visible: boolean,
  onToggleVisibility: Function
};

const className = 'col-xs-12 col-md-2  my-panel-white shadow-1 Thesis-Steps'
const style = {
  position: 'fixed',
  padding: 0,
  right: 0,
  left: 'auto',
  bottom: 0,
  paddingTop: 67,
  top: 0,
  borderRadius: 0
}

const waitingStep = [{
  label: 'اختيار المشرف',
  value: 'waiting',
  order: '-'
}]

const defaultSteps = [
  {
    label: 'العنوان و الخطة',
    value: 'upload',
    order: 1
  },
  {
    label: 'السيمينار',
    value: 'siminar',
    order: 2
  },
  {
    label: 'العمل على البحث',
    value: 'work',
    order: 3
  },
  {
    label: 'لجنة جاهزية البحث',
    value: 'committee',
    order: 4
  },
  {
    label: 'مناقشة البحث',
    value: 'discussion',
    order: 5
  },
  {
    label: 'إنهاء البحث',
    value: 'finish',
    order: 6
  }
]

const inlineStyle = { display: 'inline-block', verticalAlign: 'middle' }

const Steps = ({ preliminary, visible, onToggleVisibility }: PropertiesType): React.Element<'div'> => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getSteps())
    dispatch(getResources())
    dispatch(getChosenTeachers())
  }, [])
  const onShowSubjects = () => {
    dispatch(setThesisAllVisible(!thesisAllVisible))
  }
  const { steps, loadingSteps, resources } = useSelector((state: Object): Object => state.thesis)
  const { thesisAllVisible } = useSelector((state: Object): Object => state.student)

  const isPresenterStep = steps.some((step: Object): boolean => step.active === 1 && step.step === 'presenter')
  const isVisible = isPresenterStep || (steps.length === 0 && !loadingSteps)
  const activeStepValue = steps.reduce((current: string, next: Object): string =>
  next.active ? current.concat(next.step) : current, '')

  return <div
    style={{ ...style, ...(loadingSteps || isVisible ? { opacity: 0, visibility: 'hidden' } : {}) }}
    className={`${className} ${visible && 'is-visible'}`}>
     {preliminary ? <button onClick={onShowSubjects} className={`p-a-1 ${thesisAllVisible ? 'is-active' : ''} Thesis-Steps__item is-button`}>
      دراسة مواد الاعادة <span className='Thesis-Steps__badge'>استثنائي</span>
    </button> : null }
    <h6 className='font-weight-bold p-x-2 p-y-2 m-a-0'>
    مراحل البحث
      <button style={{ top: -5, left: -20, position: 'relative' }} className='hidden-sm-up btn pull-xs-left'
        onClick={(): Function => onToggleVisibility({ chat: false, steps: false })}>
        <i className='material-icons' style={inlineStyle}>arrow_back</i>
       </button>
    </h6>
    <ul className='list-unstyled p-a-0'>
      {([ ...(activeStepValue === 'waiting' ? waitingStep : []), ...defaultSteps ])
      .map((step: Object, index: number): React.Element<'li'> => <li
        onClick={(): Function => preliminary ? onShowSubjects() : () => {}}
        className={`${(step.value === activeStepValue && !thesisAllVisible) ? 'is-active' : ''} p-a-1 p-r-3 Thesis-Steps__item`}
        key={step.label}> <span className='Thesis-Steps__item-label m-l-1 label label-default'>{ step.order }</span> {step.label}</li>)}
    </ul>
    <h6 className='font-weight-bold p-x-3 p-y-2 m-a-0'>مصادر مساعدة</h6>
    <ul className='list-unstyled Thesis-Steps__help'>
      {resources.map((resource: Object): React.Element<'div'> => <li key={resource.id} className='text-gray font-helvetica p-b-1'>
        <a href={resource.fileUrl}>{resource.title}</a>
        </li>)}
    </ul>
  </div>
}

export default Steps
