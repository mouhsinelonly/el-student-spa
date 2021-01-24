import React, {Component} from 'react'
import PropTypes from 'prop-types'
// import css
import './style.scss'
import { reduxForm } from 'redux-form'

import Input from 'components/Form/MaterialInput'

import validation from './validation'

import Loading from 'components/Loading'

export const fields = [
  'contact_mobile',
  'contact_email'
]

class EditProfileModal extends Component {
  constructor (props) {
    super(props)
    this.closeModal = this.closeModal.bind(this)
    this.updateProfile = this.updateProfile.bind(this)
  }

  updateProfile (fields) {
    const {updateRegistrar, closeModal} = this.props

    updateRegistrar(fields)
    closeModal('profile_edit')
  }

  closeModal () {
    const {closeModal} = this.props
    closeModal('profile_edit')
  }
  render () {
    const {loading, profile: {email_verified: verified, contactcountry},
    fields: {contact_mobile: mobile, contact_email: email}, handleSubmit, updating} = this.props

    if (loading) return <Loading />

    return (<form onSubmit={handleSubmit(this.updateProfile)} className='shadow-modal'>
      <header className='c-edit-profile-modal__header modal-header text-xs-center p-y-3'>
        <h4 className='modal-title'>
          <b>تعديل معلومات التواصل</b>
        </h4>
      </header>
      <div className={`modal-body c-edit-profile-modal__body p-a-3`}>
        <Input type='email'
          data={email}
          disabled={verified === 1}
          label='بريدك الإلكتروني' />
        <Input type='number'
          after={contactcountry && contactcountry.calling_code > 0}
          data={mobile}
          afterText={contactcountry && contactcountry.calling_code + '+'}
          label='رقم الهاتف' />
      </div>
      <div className='modal-footer p-y-3 text-xs-center'>
        <button disabled={updating} className='btn btn-lg btn-success'>
          {updating ? 'جاري الحفظ...' : 'حفظ التعديلات'}
        </button>
        <button type='button' onClick={this.closeModal} className='btn btn-lg btn-secondary m-r-2'>
            اغلاق
        </button>
      </div>
    </form>)
  }
}

EditProfileModal.propTypes = {
  fields: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  updating: PropTypes.bool.isRequired,
  profile: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  updateRegistrar: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'edit_registrar_profile',
  fields: fields,
  validate: validation
},
state => ({
  initialValues: {
    contact_mobile: state.registrar.profile.contact_mobile,
    contact_email: state.registrar.profile.contact_email
  }
}))(EditProfileModal)
