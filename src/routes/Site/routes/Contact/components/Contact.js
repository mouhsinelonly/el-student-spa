// @flow
import * as React from 'react'
import { Helmet } from 'react-helmet'
// import css
import './Contact.scss'
import { reduxForm } from 'redux-form'
// import components
import MaterialInput from 'components/Form/MaterialInput'
import MaterialTextArea from 'components/Form/MaterialTextArea'
import SentThankYou from './SentThankYou'
import Loading from 'components/Loading'
import { Translate } from 'react-localize-redux'

const validate = (values: Object): Object => {
  const errors = {}
  if (!values.name) {
    errors.name = 'المرجو إدخال إسمك كاملا'
  } else if (values.name.length < 6) {
    errors.name = 'يجب أن يكون 6 حروف أو أكثر'
  }
  if (!values.mobile) {
    errors.mobile = 'المرجو إدخال إسمك كاملا'
  } else if (values.mobile.length < 8) {
    errors.mobile = 'يجب أن يكون 8 أرقام أو أكثر'
  } else if (isNaN(parseFloat(values.mobile)) || !isFinite(values.mobile)) {
    errors.mobile = 'يجب أن يكون أرقام'
  }
  if (!values.subject) {
    errors.subject = 'المرجو كتابة موضوع للرسالة'
  } else if (values.subject.length < 3) {
    errors.subject = 'يجب أن يكون 3 حروف أو أكثر'
  }
  if (!values.content) {
    errors.content = 'المرجو إدخال نص الرسالة'
  } else if (values.content.length < 20) {
    errors.content = 'يجب أن يكون 20 حروف أو أكثر'
  }
  if (!values.email) {
    errors.email = 'حقل إجباري.'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'المرجو إدخال بريد إلكتروني صحيح، حتى نستطيع التواصل معك.'
  }
  return errors
}

type PropType = {
   fields: Object,
   handleSubmit: Function,
   showContactMessage: Function,
   postContactMessage: Function,
   sent: boolean,
   submitting: boolean,
   loading: boolean
};

class Contact extends React.Component<PropType> {
  render (): React.Element<'div'> {
    const { fields: { name, mobile, email, subject, content },
    handleSubmit, submitting, sent, showContactMessage, loading } = this.props

    return (
      <div className={'container contact-page__container'}>
        <Translate>
          {({ translate }: Object): React.Element<typeof Helmet> => <Helmet>
            <title>{translate('home.navbar_contact')}</title>
          </Helmet>}
        </Translate>
        <div className='row'>
          <div className='text-xs-center'>
            <h1 className={'contact-page__heading'}>
              <Translate id='contact.welcome_header' />
            </h1>
            <div className='col-xs-12 col-md-4 col-md-pull-4'>
              <p className={'contact-page__description'}>
                <Translate id='contact.welcome_message' />
              </p>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-xs-12 col-md-10 col-lg-10 col-lg-pull-1 col-md-pull-1'>
            <Translate>
              {({ translate }: Object): React.Element<*> => (
                <div className='col-xs-12 col-md-9 col-lg-8'>
                  {loading ? <Loading /> : (!sent ? <form onSubmit={handleSubmit(this.handleSubmit)}>
                    <div className='col-xs-12 col-md-9 col-lg-5'>
                      <MaterialInput label={translate('global.your_name')} data={name} />
                    </div>
                    <div className='clearfix' />
                    <div className='col-xs-12 col-md-9 col-lg-5'>
                      <MaterialInput label={translate('global.your_email')} type='email' data={email} />
                    </div>
                    <div className='col-xs-12 col-md-9 col-lg-5'>
                      <MaterialInput label={translate('global.your_mobile')} type='mobile' data={mobile} />
                    </div>
                    <div className='clearfix' />
                    <div className='col-xs-12 col-md-10'>
                      <MaterialInput label={translate('global.subject')} data={subject} />
                    </div>
                    <div className='col-xs-12 col-md-12'>
                      <MaterialTextArea label={translate('global.message_text')} type='content' data={content} />
                    </div>
                    <div className='clearfix' />
                    <div className='col-xs-12'>
                      <button disabled={submitting}
                        type='submit'
                        className={'btn btn-success contact-page__send-button'}>
                        {translate('global.send_message')}
                      </button>
                    </div>
                  </form>
                : <SentThankYou showContactMessage={showContactMessage} />)}
                </div>
                )}
            </Translate>
            <div className={'col-xs-12 col-md-3 col-lg-4 contact-page__sidebar'}>
              <h6 className='contact-page__info-title'>
                <Translate id='contact.working_hours' />
              </h6>
              <p>
                <Translate id='contact.open_from_to' />
              </p>
              <h6 className='contact-page__info-title'>
                <Translate id='global.address' />
              </h6>
              <p>
              سكة 2535، المها شارع الخوير 33، مسقط سلطنة عمان
              </p>
              <h6 className='contact-page__info-title'>
                <Translate id='global.post_box' />
              </h6>
              <p>
              روي الرمز البريدي : 39.6 112 سلطنة عمان
              </p>
              <h6 className='contact-page__info-title'>
                <Translate id='global.mobile' />
              </h6>
              <p>80099777</p>
              <p>0096824393777</p>
              <h6 className='contact-page__info-title'>
                <Translate id='global.email' />
              </h6>
              <p>80099777</p>
              <p>info@css.edu.om</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  handleSubmit = (values: Object) => {
    const { postContactMessage } = this.props
    postContactMessage(values)
  }
}

const ContactRedux = reduxForm({ // <----- THIS IS THE IMPORTANT PART!
  form: 'contactForm', // a unique name for this form
  fields: ['name', 'subject', 'email', 'mobile', 'subject', 'content'], // all the fields in your form
  destroyOnUnmount: false,
  validate
})(Contact)

export default ContactRedux
