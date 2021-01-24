import React, { Component } from 'react'
import { Link } from 'react-router'
import PropTypes from 'prop-types'
import './style.scss'
import Icon from 'components/Icon'

class UpdateExamAppNotification extends Component {
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
            <strong>تحديث ضروري لبرنامج الاختبارات</strong>
          </h4>
        </div>
        <div className='col-xs-12 col-md-8  p-y-2'>
          عزيزي الطالب ٫تم رفع تحديثات جديدة لبرنامج الاختبارات منذ آخر مرة استخدمته٫ سارع الآن إلى تحديث البرنامج.
        </div>
        <div className='col-xs-6 col-md-2 hidden-xs-down  p-y-2'>
          <Link className='btn btn-warning ' to='/student/support/softwares'>
            تحميل النسخة الجديدة
          </Link>
        </div>
        <div className='col-xs-12 col-md-2  p-y-2'>
          <button className='btn btn-warning btn-block notification-examappupdate__guide' onClick={this._showGuide}>
            <Icon name='play-black-tiny' className='m-l-1' /> شرح التثبيت
         </button>
        </div>
      </div>
    </div>)
  }

  _showGuide () {
    const {showModal} = this.props
    showModal('youtube', {youtubeId: 'yVEnY9rYxCU'}, true, true, 'full')
  }
}

export default UpdateExamAppNotification
