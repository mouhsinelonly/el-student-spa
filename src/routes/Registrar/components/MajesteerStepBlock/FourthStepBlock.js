// @flow
import React, { useEffect } from 'react'
import Icon from 'components/Icon'
// import css
import { Link } from 'react-router'
import './StepBlock.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getConformityDays } from '../../modules/registrar'
import CollegeLocation from '../StepBlock/CollegeLocation'

export const types = ['nid', 'photo', 'certificate', 'transcript', 'job', 'marriage']

type PropsType = {
  title: string,
  order: number,
  active: boolean,
  step: Object,
  done: boolean,
  showModal: Function
};

const SecondStepBlock = (props: PropsType): React.Element<'div'> => {
  const { title, order, active, step, done, showModal } = props

  let data, hint

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getConformityDays())
  }, [])
  const { conformityDays } = useSelector(state => state.registrar)
  const chosenDateKey = Object.keys(conformityDays).find(key => conformityDays[key].chosen)
  const chosenDate = conformityDays[chosenDateKey]

  const _showModal = () => {
    showModal('documents', { degree_type: 'maj' })
  }

  if (done) {
    data = (
      <div>
        <p>تم مطابقة الوثائق</p>
      </div>
    )
  } else if (step.documents_processing) {
    data = (
      <div>
        <p>
          تهانينا؛ تم قبولك مبدئيًا. لاستكمال إجراءات القبول النهائي ينبغي إحضار
          الوثائق الأصلية مع نسخة منها إلى مقر الكلية.
          . لمزيد من التفاصيل اضغط على الزر التالي
        </p>
        {chosenDate ? <div style={{ backgroundColor: '#e0f6ff', color: '#009ee1', fontSize: 14 }}
          className='m-b-2 bg-info-light p-a-1 text-xs-center'>
        اخترت : {chosenDate.dayName} {chosenDate.dayDate} ٫ {chosenDate.fromTimeName}
        </div> : null}
        <button className='btn btn-gray m-l-1' onClick={_showModal}>
          إظهار الإرشادات
        </button>
        <Link to='/registrar/conform_date' className='btn btn-info'>
          حجز موعد
        </Link>
      </div>
    )
    hint = (
      <p className='m-t-2 c-maj-step-block__step__hint hidden-xs-up'>
        يمكن للنساء تخويل أحد محارمهم في أداء المهمة. يتوجب فقط إرفاق الوثائق
      </p>
    )
  }
  return (
    <div className={`c-maj-step-block__container  ${active ? 'is-active' : ''}`}>
      <article className={`c-maj-step-block__step ${done ? 'is-done' : ''} ${active ? 'is-active' : ''}`}>
        <span className={`c-maj-step-block__order ${active ? 'is-active' : ''}`}>
          {done ? <Icon name='check-single-green' /> : order}
        </span>
        <h4 className='c-maj-step-block__step__title m-b-2'>{title}</h4>
        {data}
      </article>
      {chosenDate ? <CollegeLocation /> : null }
      {hint}
    </div>
  )
}

export default SecondStepBlock
