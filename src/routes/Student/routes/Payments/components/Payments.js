import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import Loading from 'components/Loading'
import Invoice from './Invoice'

class Payments extends React.Component {
  static propTypes = {
    invoices: PropTypes.array,
    getInvoices: PropTypes.func,
    visibleinvoices: PropTypes.array,
    showPaymentDetails: PropTypes.func,
    hidePaymentsDetails: PropTypes.func,
    invoicesloading: PropTypes.bool
  }
  componentDidMount () {
    const { getInvoices } = this.props
    getInvoices()
  }
  render () {
    const { invoices, visibleinvoices, showPaymentDetails, hidePaymentsDetails, invoicesloading } = this.props

    if (invoicesloading) {
      return <Loading />
    }
    return (
      <div className='payments-container'>
        <h1 className={`text-xs-center payments-container__heading m-y-3`}>المالية و الدفع</h1>
        <ul className={`payments-container__invoices col-xs-12 col-md-10 col-lg-8 col-md-pull-1 col-lg-pull-2`}>
          {invoices.map((i, key) => (
            <Invoice
              key={key}
              {...i}
              showPaymentDetails={showPaymentDetails}
              hidePaymentsDetails={hidePaymentsDetails}
              visibleinvoices={visibleinvoices}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default Payments
