// @flow
import React from 'react'
import PropTypes from 'prop-types'
// import css
import './style.scss'

import Icon from 'components/Icon'
import Loading from 'components/Loading'
import moment from 'moment'

class PaymentModal extends React.Component {
  static propTypes = {
    showPaymentView: PropTypes.func,
    stopRegistrarPayment: PropTypes.func,
    getRegistrarPayment: PropTypes.func,
    closeModal: PropTypes.func,
    payed: PropTypes.bool,
    data: PropTypes.object,
    url: PropTypes.string,
    loading: PropTypes.bool,
    waiting: PropTypes.bool,
    period: PropTypes.object,
    loginToStudent: PropTypes.func.isRequired
  }
  componentDidMount () {
    const { getRegistrarPayment, payed } = this.props
    if (!payed) {
      getRegistrarPayment()
    }
  }
  componentWillUnmount () {
    const { stopRegistrarPayment } = this.props
    stopRegistrarPayment()
  }
  closeModal = () => {
    const { closeModal } = this.props
    closeModal('payment')
  }
  render () {
    const { payed, data: { subjects }, loading, loginToStudent, waiting } = this.props
    // const hasPeriod = periods !== null

    if (loading || waiting) {
      return (
        <div className='m-a-3'>
          <Loading />
          <p className={`${!waiting ? 'hidden-xs-up' : ''} text-xs-center`}>في إنتظار استكمال الدفع</p>
        </div>
      )
    }

    let data = <div />

    if (!payed) {
      data = (
        <div className='shadow-modal'>
          <header className={`c-payment-modal__header modal-header text-xs-center p-y-3`}>
            <h4 className='modal-title'>
              <b>سارع بالدفع قبل إنتهاء الوقت</b>
            </h4>
            {/* <small className={`hidden-xs-up ${!hasPeriod ? 'hidden-xs-up' : ''}`}> */}
            {/*   باقي {hasPeriod ? moment(period.finish_at).diff(moment(), 'days') : null} ايام فقط */}
            {/* </small> */}
          </header>
          <div className={`modal-body c-payment-modal__body`}>
            <div className='p-x-3 p-y-1'>
              <table className={`table m-a-0 c-payment-modal__table`}>
                <thead>
                  <tr>
                    <th>المادة</th>
                    <th>الرسوم بالريال</th>
                  </tr>
                </thead>
                <tbody className='p-x-2'>{this.renderSubjects()}</tbody>
              </table>
            </div>
            <footer className='c-payment-modal__tfoot p-x-3 p-y-1'>
              <table className={`table m-a-0 c-payment-modal__table`}>
                <tfoot>
                  <tr>
                    <td>المجموع</td>
                    <td width='150px'>
                      <h4 className='m-a-0'>
                        <b className='text-success'>
                          {subjects && subjects.length && subjects.reduce((t, s) => t + s.fee, 0)} ريال
                        </b>
                      </h4>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </footer>
          </div>

          <div className={`c-payment-modal__footer modal-footer text-xs-center`}>
            <button className='btn btn-white-outline m-y-2 p-x-3' type='button' onClick={this.closeModal}>
              إدفع لاحقا
            </button>
            <button onClick={this._submitForm} className='btn btn-success m-r-2  m-y-2   p-x-3'>
              إدفع إلكترونيا
            </button>
            <div className='clearfix' />
            <div className='c-payment-modal__info p-y-1'>
              <a
                href='https://youtu.be/pFw93sJR0dc'
                onClick={this._openVideo}
                className='btn btn-white btn-block' style={{ borderRadius: 5, borderWidth: 0 }}>
                <i className='m-l-1 material-icons' style={{ display: 'inline-block', verticalAlign: 'middle' }} >play_circle_filled</i> تعرف على كيفية الدفع
              </a>
            </div>
          </div>
        </div>
      )
    } else {
      data = (
        <div>
          <div className={`c-payment-modal__success-modal-body modal-body text-xs-center`}>
            <p>
              <Icon name='checkmark-success-leaf-medium' />
            </p>
            <h1 className='m-t-3 m-b-1'>
              <b>لقد أصبحت طالبا معنا</b>
            </h1>
            <p className='c-payment-modal__success-p'>
              لقد أصبحت طالبا معتمدا لدينا <br /> سنقودك في جولة للتعرف على برنامج التعليم عن بعد.
              <br />
              ستتعرف على مختلف العناصر التي ستتعامل معها <br />طيلة دراستك
            </p>
            <button onClick={loginToStudent} className='btn btn-lg btn-success p-x-3'>
              حسنا ابدأ الآن
            </button>
          </div>
        </div>
      )
    }

    return <div>{data}</div>
  }
  _openVideo = (e: Object) => {
    e.preventDefault()
    window.open(e.target.href, '_blank')
  }
  renderSubjects = () => {
    const { data: { subjects } } = this.props

    if (!subjects) return false

    return subjects.map(s => (
      <tr key={s.name}>
        <td style={{ paddingLeft: 100 }}>
        <div>{s.name}</div>
        <small>{s.subtitle}</small>
        </td>
        <td width='150px'>{s.fee}</td>
      </tr>
    ))
  }
  _submitForm = () => {
    const { showPaymentView, data: { fields }, url } = this.props
    showPaymentView(fields, url)
  }
}

export default PaymentModal
