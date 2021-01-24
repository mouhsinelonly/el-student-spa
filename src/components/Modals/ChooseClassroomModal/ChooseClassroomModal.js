import React, {Component} from 'react'
import PropTypes from 'prop-types'
//  import css
import './style.scss'
import Icon from 'components/Icon'

class ChooseClassroomModal extends Component {
  constructor (props) {
    super(props)
    this.closeModal = this.closeModal.bind(this)
  }

  closeModal () {
    const {closeModal} = this.props
    closeModal('documents')
  }
  render () {
    return (<div className='shadow-modal'>
      <div className='modal-body p-a-2 text-xs-center p-a-3'>
        <span className='c-choose-classroom-modal__indicator'>
          <Icon name='classroom-teacher-avatar-medium' className='c-choose-classroom-modal__icon' />
          <Icon name='cursor-small-success' className='c-choose-classroom-modal__indicator__arrow' />
        </span>
        <h5 className='p-y-2 m-a-0'><b>إختيار تواقيت اللقاءات المباشرة</b></h5>
        <p className={'p-x-3'} style={{lineHeight: 1.7}}>
          لتتمكن من الحضور للقاءات المباشرة يتوجب عليك إختيار الأيام و التواقيت المناسبة لك لكل مادة
        </p>
        <button type='button'
          onClick={this.closeModal}
          className='btn btn-success btn-lg m-y-2 p-x-3'>
               ابدأ إختيار التواقيت
        </button>
      </div>
    </div>)
  }
}

ChooseClassroomModal.propTypes = {
  closeModal: PropTypes.func.isRequired
}

export default ChooseClassroomModal

