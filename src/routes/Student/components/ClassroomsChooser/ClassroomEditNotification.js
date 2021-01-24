import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import css
import './style.scss'
// import component
import Icon from 'components/Icon'

class ClassroomEditNotification extends Component {
  static propTypes = {
    enddate: PropTypes.string,
    toggle: PropTypes.func
  }

  constructor (props) {
    super(props)

    this._toggle = this._toggle.bind(this)
  }

  render () {
    const { enddate } = this.props
    return (
      <div className={`c-classroom-chooser__notification p-y-1 p-x-2 m-t-3`}>
        <div className='row'>
          <div className='col-xs-12 col-md-4'>
            <Icon name='cclassroom-chooser-avatar' className='c-classroom-chooser__notification__icon m-l-2' />
            <span className='c-classroom-chooser__notification__title'>إختيار أوقات اللقائات</span>
          </div>
          <div className='col-xs-12 col-md-7'>
            <div className='c-classroom-chooser__notification__end'>
              ينتهي بعد {enddate}
            </div>
          </div>
          <div className='col-xs-12 col-md-1'>
            <a onClick={this._toggle} className='c-classroom-chooser__notification__cta'>
              تعديل
            </a>
          </div>
        </div>
      </div>
    )
  }

  _toggle () {
    const {toggle} = this.props
    toggle()
  }
}

export default ClassroomEditNotification
