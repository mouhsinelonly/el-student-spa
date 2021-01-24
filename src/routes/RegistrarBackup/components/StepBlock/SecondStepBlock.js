// @flow
import * as React from 'react'
import Icon from 'components/Icon'
// import css
import './StepBlock.scss'

export const types = ['nid', 'photo', 'certificate', 'transcript', 'job', 'marriage']

type PropsType = {
  title: string,
  order: number,
  active: boolean,
  step: Object,
  done: boolean,
  showModal: Function
};

class SecondStepBlock extends React.PureComponent<PropsType> {
  showModal = () => {
    const { showModal } = this.props
    showModal('documents')
  }
  render (): React.Element<'div'> {
    const { title, order, active, step, done } = this.props

    let data, hint

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
          <button className='btn btn-warning' onClick={this.showModal}>
            إظهار الإرشادات
          </button>
        </div>
      )
      hint = (
        <p className='m-t-2 c-step-block__step__hint hidden-xs-up'>
          يمكن للنساء تخويل أحد محارمهم في أداء المهمة. يتوجب فقط إرفاق الوثائق
        </p>
      )
    }
    return (
      <div className={`c-step-block__container  ${active ? 'is-active' : ''}`}>
        <article className={`c-step-block__step ${done ? 'is-done' : ''} ${active ? 'is-active' : ''}`}>
          <span className={`c-step-block__order ${active ? 'is-active' : ''}`}>
            {done ? <Icon name='check-single-green' /> : order}
          </span>
          <h4 className='c-step-block__step__title m-b-2'>{title}</h4>
          {data}
        </article>
        {hint}
      </div>
    )
  }
}

export default SecondStepBlock
