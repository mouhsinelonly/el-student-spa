// @flow
import * as React from 'react'
import Icon from 'components/Icon'
import { Link } from 'react-router'
// import css
import './StepBlock.scss'

type PropsType = {
  title: string,
  order: number,
  totalsubjects: number,
  active: boolean,
  step: Object,
  done: boolean,
  uncomplete: boolean
};

class ThirdStepBlock extends React.PureComponent<PropsType> {
  static defaultProps = {
    uncomplete: false,
    totalsubjects: 0,
    done: false,
    step: {},
    active: false,
    order: 1,
    title: ''
  }
  render (): React.Element<'div'> {
    const { title, order, active, step, done, totalsubjects, uncomplete } = this.props
    // console.log(active)
    let data, hint

    if (step.equation_input) {
      data = (<div>
        <p>{uncomplete
          ? `البيانات التي ادخلتها غير كافية لمعادلة المواد المرجو ادخال البيانات كلها.`
          : `لمعادلة المواد التي درستها مسبقا،
ينبغي رفع كشف الدرجات مع إدخال
معلومات المواد`}
        </p>
        <Link to={'registrar/equation'} className='btn btn-warning'>
          {uncomplete ? 'ادخال البيانات الناقصة' : 'إبدأ إضافة المواد'}
        </Link>
      </div>)

      hint = <p className='m-t-2 c-step-block__step__hint'>
       لقد حددت مسبقا أن دراستك تكميلية
إدا كان خطء المرجو التواصل مع الدعم الفني
      </p>
    } else if (step.equation_processing) {
      data = (<div>
        <p>
          لمعادلة المواد التي درستها مسبقا،
ينبغي رفع كشف الدرجات مع إدخال
معلومات المواد
        </p>
        <Link to={'registrar/equation'} className={`btn btn-info-outline p-x-2`}>
          جاري المراجعة
        </Link>
      </div>)
      hint = <p className='m-t-2 c-step-block__step__hint'>
        يتم حاليا مراجعة المادة من القسم
المتخصص بتطوير المناهج الدراسية
      </p>
    } else if (done) {
      data = (<div>
        <p>
        تم معادلة {totalsubjects} مواد
        </p>
        <Link to={'registrar/equation'} className={`btn btn-info-outline p-x-2`}>
          الإطلاع على المواد
        </Link>
      </div>)
    }
    return (
      <div className={`c-step-block__container  ${(active === 1 ? 'is-active' : '')}`}>
        <article className={`c-step-block__step ${(done ? 'is-done' : '')} ${(active ? 'is-active' : '')}`}>
          <span className={`c-step-block__order ${(active === 1 ? 'is-active' : '')}`}>
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

export default ThirdStepBlock
