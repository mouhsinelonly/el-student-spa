// @flow
import * as React from 'react'
import Icon from 'components/Icon'
import './style.scss'

type PropsType = {
  hideStudentNavbar: Function,
  showStudentNavbar: Function
};

class PaymentError extends React.Component<PropsType> {
  componentDidMount () {
    const { hideStudentNavbar } = this.props
    hideStudentNavbar()
  }
  // componentDidMount () {
  //   const { showStudentNavbar } = this.props
  //   showStudentNavbar()
  // }
  render (): React.Element<'div'> {
    return (
      <div className='c-page-payment-error text-xs-center p-t-3'>
        <div className='container p-t-2'>
          <Icon name='blocked-red' />
          <h2 className='p-y-3'>نعتذر، لقد حصل خطأ ما</h2>
          <p>
            لقد حصل خطأ ما أثناء عملية الدفع، قد يكون بسبب مشكل في بطاقة الدفع أو في خطوات عملية الدفع.
          </p>
          <p>
            يرجى إعادة المحاولة، و في حالة ظهور المشكل مرة أخرى المرجو التواصل مع مركز خدمة العملاء للبنك الخاص بك
          </p>
        </div>
      </div>
    )
  }
}

export default PaymentError
