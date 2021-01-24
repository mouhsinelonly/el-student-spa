// @flow
import * as React from 'react'
import Icon from 'components/Icon'
// import {Link} from 'react-router'
// import css
import './StepBlock.scss'

type PropsType = {
  title: string,
  order: number,
  active: number,
  step: Object,
  done: boolean,
  showModal: Function
};

class FourthStepBlock extends React.PureComponent<PropsType> {
  showModal = () => {
    const { showModal } = this.props
    showModal('payment')
  }

  render (): React.Element<'div'> {
    const { title, order, active, step, done } = this.props

    let data, hint

    if (step.make_payment) {
      data = (
        <div>
          <p>الأن يجب أن تقوم بدفع رسوم الفصل الأول لكي تلتحق بالدراسة و يتم إعتمادك كطالب</p>
          <button onClick={this.showModal} className='btn btn-warning'>
            دفع رسوم الإلتحاق
          </button>
        </div>
      )

      hint = (
        <p className='m-t-2 c-step-block__step__hint'>
          لقد أنهيت مراحل التسجيل المطلوبة سيتم نقلك إلى بوابتك التعليمية عند الدفع
        </p>
      )
    } else if (done) {
      data = (
        <div>
          <p>تم الدفع</p>
        </div>
      )
    }
    return (
      <div className={`c-step-block__container  ${active === 1 ? 'is-active' : ''}`}>
        <article className={`c-step-block__step ${done ? 'is-done' : ''} ${active === 1 ? 'is-active' : ''}`}>
          <span className={`c-step-block__order ${active === 1 ? 'is-active' : ''}`}>
            {done ? <Icon name='check-single-green' /> : order}
          </span>
          <h4 className={`c-step-block__step__title m-b-2`}>{title}</h4>
          {data} {done}
        </article>
        {hint}
      </div>
    )
  }
}

export default FourthStepBlock
