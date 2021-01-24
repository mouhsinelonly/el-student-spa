import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Loading from 'components/Loading'
import Icon from 'components/Icon'
//  import css
import './style.scss'

class RegistrationFees extends Component {
  constructor (props) {
    super(props)
    this.closeModal = this.closeModal.bind(this)
    this._getFees = this._getFees.bind(this)
  }

  closeModal () {
    const { closeModal } = this.props
    closeModal('youtube')
  }
  render () {
    const { loadingfees, fees_amount: feesAmount, logoutAndRedirect } = this.props
    const hasPayed = feesAmount > 0
    return (<div className='shadow-modal modal-body p-a-3 text-xs-center' >
      <div className={`${!hasPayed && 'hidden-xs-up'} text-xs-center`}>
        <Icon name='checkmark-success-leaf-medium' />
        <h3 className='p-y-2'>تم دفع الرسوم بنجاح</h3>
        <p>
          ستتمكن الأن من اتمام باقي الخطوات
        </p>
      </div>
      <div className={`${hasPayed && 'hidden-xs-up'}`}>
        <h4 className='p-b-3 font-weight-bold'>سداد رسوم التسجيل</h4>
        <p className='registration-fees-modal__text'>
           تم التأكد من اكتمال الوثائق المطلوبة،
        </p>
        <p>
          وللبدء في تكوين ملفك وفحصه تمهيدًا لعرضه على لجنة القبول للبت فيه
        </p>
        <p>
          ينبغي سداد رسوم التسجيل الآتي بيانها،
        </p>
        <p className='text-danger'>
         علمًا بأن هذه الرسوم غير مستردة بغض النظر عن قبول الطلب من عدمه.
        </p>
        <h1 className='text-success font-weight-bold'>20 ريال</h1>
        <button disabled={loadingfees} onClick={this._getFees} className='btn btn-lg m-y-2 p-x-3 btn-success'>
          {loadingfees ? <Loading
            scale={20}
            width={25}
            height={25}
            className='registration-fees-modal__loading'
            stroke={2} />
          : 'ادفع إلكترونيا'}
        </button>
        <button onClick={logoutAndRedirect} className='btn btn-lg btn-danger m-r-2'>
          ادفع لاحقا
        </button>
        <div className="clearfix" />
        <a
          href='https://youtu.be/pFw93sJR0dc'
          onClick={this._openVideo}
          className='btn btn-white btn-block' style={{ borderRadius: 5, borderWidth: 0 }}>
          <Icon name='play-black-tiny' className='m-l-1' /> تعرف على كيفية الدفع
        </a>
      </div>
    </div>)
  }
  _getFees () {
    const { getRegistrationFees } = this.props
    getRegistrationFees()
  }
  _openVideo (e) {
    e.preventDefault()
    window.open(e.target.href, '_blank')
  }
}

RegistrationFees.propTypes = {
  logoutAndRedirect: PropTypes.func,
  closeModal: PropTypes.func,
  fees_amount: PropTypes.number,
  loadingfees: PropTypes.bool,
  getRegistrationFees: PropTypes.func
}

export default RegistrationFees
