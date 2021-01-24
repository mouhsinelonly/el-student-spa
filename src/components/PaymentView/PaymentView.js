// @flow
import * as React from 'react'
import './style.scss'
import creditImg from 'static/img/credit.png'
import debitImg from 'static/img/debit.png'

type PropsType = {
  fields: Object,
  paymentClicked: boolean,
  link: string,
  onSubmit: Function,
  hidePaymentView: Function,
  paymentClicked: boolean
};

class PaymentView extends React.Component<PropsType> {
  static defaultProps = {
    fields: {},
    link: '',
    paymentClicked: false
  }
  render (): React.Element<'div'> {
    const { fields, link, hidePaymentView } = this.props
    const paymentReady = typeof fields.amount !== 'undefined'
    if (!paymentReady && !link) {
      return <div />
    }

    return (<div className='c-paymentview text-xs-center p-t-3'>
      <h5 className='c-paymentview__title p-y-3'>اختر نوع بطاقة الدفع</h5>
      <div className='row'>
        <div className='col-xs-12 col-md-3 col-md-pull-3'>
          <a href={link} className='c-paymentview__card m-x-3'>
            <img src={debitImg} alt='debit' className='c-paymentview__card-box' />
            <span className='c-paymentview__card-header'>بطاقة الخصم المباشر / Debit Card <br />
              ( البنوك المحلية العمانية )</span>
          </a>
        </div>
        <div className='col-xs-12 col-md-4 col-md-pull-3'>
          <form ref='form' action='https://secureacceptance.cybersource.com/pay' method='post'>
            { this._renderFields() }
          </form>
          <a onClick={this._pay} className='c-paymentview__card m-x-3'>
            <img src={creditImg} alt='debit' className='c-paymentview__card-box' />
            <span className='c-paymentview__card-header'>بطاقة الائتمان / Credit Card</span> <br />
            <span className='c-paymentview__card-header hidden-xs-up'>( باقي البنوك الخارجية )</span>
          </a>
        </div>
      </div>
      <a className='m-t-3 c-paymentview__cancel' onClick={hidePaymentView}>الغاء</a>
    </div>)
  }
  _renderFields = () => {
    const { fields } = this.props

    if (!fields) return []

    return Object.keys(fields).map((key: string): React.Element<'input'> => <input key={key} name={key}
      value={key === 'amount' ? `${parseFloat(fields[key]).toFixed(3)}` : fields[key]} type='hidden' />)
  }
  _pay = () => {
    const { onSubmit, fields, paymentClicked } = this.props
    if (typeof fields.amount !== 'undefined' && !paymentClicked) {
      this.refs['form'].submit()
      onSubmit()
    }
  }
}

export default PaymentView
