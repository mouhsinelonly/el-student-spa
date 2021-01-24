import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

class Invoice extends React.Component {
  static propTypes = {
    subjects: PropTypes.array,
    amount: PropTypes.number,
    id: PropTypes.number,
    name: PropTypes.string,
    created_at: PropTypes.string,
    visibleinvoices: PropTypes.array,
    showPaymentDetails: PropTypes.func,
    hidePaymentsDetails: PropTypes.func
  }

  render () {
    const { amount, subjects, name, id, visibleinvoices, created_at } = this.props
    const visible = visibleinvoices.findIndex(i => i === id) >= 0
    const createdAtMoment = moment(created_at)
    const total = subjects.reduce(
      (total, subject) => (subject.is_quran === 1 ? subject.hour * 7.5 : subject.hour * 15) + total,
      0
    )

    return (
      <li className={`payments-container__invoices__item m-b-2 p-y-2 p-x-3`}>
        <h1 className='payments-container__semester-name'>{name}</h1>
        <span className='payments-container__invoices__amount'>المبلغ المدفوع : {amount} ريال عماني</span>
        <button
          className={`payments-container__switch-button btn
        hidden-xs-up
        ${visible ? 'btn-gray' : 'btn-success'} pull-xs-left p-x-3`}
          onClick={this._handleShowDetails}
        >
          {!visible ? 'تفاصيل أكثر' : 'إخفاء التفاصيل'}
        </button>
        <div className='clearfix' />
        <div className={`payments-container__invoices__items ${visible ? 'is-visible' : ''}`}>
          <table className={`payments-container__table table m-t-3`} cellSpacing='0'>
            <tbody>
              {subjects.map((subject, key) => (
                <tr key={key}>
                  <td>{subject.name}</td>
                  <td width='60px'>{subject.is_quran === 1 ? subject.hour * 7.5 : subject.hour * 15}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className='payments-container__footer'>
              <tr>
                <td>المجموع</td>
                <td>{total}</td>
              </tr>
            </tfoot>
          </table>
          <div className='text-xs-center m-t-2'>
            <b className='text-success p-l-2'>تم الدفع</b>
            <span className='payments-container__invoices__date'>
              {`بتاريخ ${createdAtMoment.locale('en').format('DD')}
          ${createdAtMoment.locale('ar-SA').format('MMMM')}
          ${createdAtMoment.locale('en').format('YYYY')}`}
            </span>
          </div>
        </div>
      </li>
    )
  }

  _handleShowDetails = () => {
    const { showPaymentDetails, hidePaymentsDetails, visibleinvoices, id } = this.props
    if (visibleinvoices.findIndex(i => i === id) >= 0) {
      hidePaymentsDetails(id)
    } else {
      showPaymentDetails(id)
    }
  }
}

export default Invoice
