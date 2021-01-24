import { connect } from 'react-redux'
import { closeModal } from 'modules/modals'
import { getRegistrarPayment, startRegistrarPayment, stopRegistrarPayment } from './modules/payment'
import { loginToStudent } from 'routes/Registrar/modules/registrar'
import { showPaymentView } from 'modules/paymentview'

import PaymentModal from './PaymentModal'

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around getProfile; the component doesn't care   */

const mapActionCreators = {
  closeModal,
  getRegistrarPayment,
  startRegistrarPayment,
  stopRegistrarPayment,
  loginToStudent,
  showPaymentView
}

const mapStateToProps = state => {
  return {
    loading: state.registrar_payment.loading,
    waiting: state.registrar_payment.waiting,
    data: state.registrar_payment.data,
    url: state.registrar_payment.url,
    periods: state.registration_period.periods,
    payed:
      state.registrar.profile.transaction_uuid !== '' ||
      (typeof state.registrar.profile.student !== 'undefined' && state.registrar.profile.student !== null),
    fullname: state.registrar.profile.full_name
  }
}

/*  Note: mapStateToProps is where you should use `reselect` to create selectors, ie:

    import { createSelector } from 'reselect'
    const profile = (state) => state.profile
    const tripleCount = createSelector(profile, (count) => count * 3)
    const mapStateToProps = (state) => ({
      profile: tripleCount(state)
    })

    Selectors can compute derived data, allowing Redux to store the minimal possible state.
    Selectors are efficient. A selector is not recomputed unless one of its arguments change.
    Selectors are composable. They can be used as input to other selectors.
    https://github.com/reactjs/reselect    */

export default connect(mapStateToProps, mapActionCreators)(PaymentModal)
