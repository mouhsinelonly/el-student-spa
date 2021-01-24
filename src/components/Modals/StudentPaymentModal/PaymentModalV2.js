// @flow
import * as React from 'react'

type PropsType = {};

class PaymentModalV2 extends React.Component<PropsType> {
  render (): React.Element<'div'> {
    return (
      <div>
        <div className='shadow-modal'>
          <header className='c-student-payment-modal__header modal-header text-xs-center p-y-3'>
            <h5 className='font-weight-bold modal-title'>سارع بالدفع قبل إنتهاء الوقت</h5>
          </header>
          <div className='row'>
            <div className='col-xs-4'>المبلغ</div>
            <div className='col-xs-4'></div>
            <div className='col-xs-4'></div>
          </div>
        </div>
        <div className='modal-body c-student-payment-modal__body'>
          subjects
        </div>
      </div>
    )
  }
}

export default PaymentModalV2
