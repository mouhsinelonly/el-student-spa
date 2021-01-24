import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import { Link } from 'react-router'

class ChangeProfilePhotoNotifcation extends Component {
  constructor (props) {
    super(props)

    this._showGuide = this._showGuide.bind(this)
  }
  static propTypes = {
    showModal: PropTypes.func
  }
  render () {
    return (<div className='notification-examappupdate'>
      <div className='container'>
        <div className='col-xs-12 hidden-sm-up'>
          <h4 className='text-warning text-xs-center p-t-2'>
            <strong>تحديث الصورة الشخصية</strong>
          </h4>
        </div>
        <div className='col-xs-12 col-md-8  p-y-2'>
          المرجو اعادة رفع صورتك الشخصية لتناسب مواصفات بطاقة الطالب
        </div>
        <div className='col-xs-6 col-md-2 p-y-2'>
          <Link className='btn btn-warning ' to='/student/upload_photo'>
            المواصفات و رفع الصورة
          </Link>
        </div>
      </div>
    </div>)
  }

  _showGuide () {
    const {showModal} = this.props
    showModal('youtube', {youtubeId: 'yVEnY9rYxCU'}, true, true, 'full')
  }
}

export default ChangeProfilePhotoNotifcation
