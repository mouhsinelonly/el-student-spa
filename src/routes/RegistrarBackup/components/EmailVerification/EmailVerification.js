import React from 'react'
import PropTypes from 'prop-types'
import HeadAlert from 'components/HeadAlert'

export const EmailVerification = (props) => (<HeadAlert level={props.received ? 'success' : 'warning'}>
  {
    props.sending && !props.received ? 'جاري ارسال رابط تفعيل البريد' : null
  }
  {
    props.sent && !props.sending && !props.received ? <span>
          تم إرسال رسالة لتفعيل بريدك الإلكتروني، إدا لم تصلك رسالة التفعيل
      <a style={{cursor: 'pointer'}} onClick={props.sendEmailVerificationLink}
        className='text-success'>
        <u>إضغط هنا</u>
      </a> لإرسالها من جديد
    </span> : null
  }
  {
    !props.sending && !props.sent && !props.received && !props.error ? <span>
    المرجو تفعيل بريدك الإلكتروني، إذا لم تصلك رسالة التفعيل
      <a style={{cursor: 'pointer'}} onClick={props.sendEmailVerificationLink}
        className='text-success'><u>إضغط هنا</u></a> لإرسالها من جديد
    </span> : null
  }
  {
    props.received ? 'تم تفعيل بريدك بنجاح' : null
  }
</HeadAlert>)

EmailVerification.propTypes = {
  error: PropTypes.bool.isRequired,
  sending: PropTypes.bool.isRequired,
  sent: PropTypes.bool.isRequired,
  sendEmailVerificationLink: PropTypes.func.isRequired,
  received: PropTypes.bool.isRequired
}
EmailVerification.defaultProps = {
  sending: false,
  sent: false,
  error: false,
  received: false
}

export default EmailVerification
