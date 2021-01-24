import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Icon from 'components/Icon'
import classes from './Contact.scss'

class SentThankYou extends Component {
  static propTypes = {
    // sent: PropTypes.bool,
    showContactMessage: PropTypes.func
  }
  constructor (props) {
    super(props)
    this._showSendMessage = this._showSendMessage.bind(this)
  }
  render () {
    return <div className={`${classes['thank-you']} text-xs-center`}>
      <Icon name='checkmark-success-leaf-medium' />
      <h3 className={`p-y-2 ${classes['thank-you__title']}`}>نشكرك على مراسلتنا</h3>
      <p className={classes['thank-you__text']}>
        تم إستقبال رسالتك، سنقوم بالرد عليك في أقصى مدة 24 ساعة
      </p>
      <a onClick={this._showSendMessage}>إضغط هنا لإرسال رسالة أخرى</a>
    </div>
  }

  _showSendMessage () {
    const {showContactMessage} = this.props
    showContactMessage()
  }
}

export default SentThankYou
