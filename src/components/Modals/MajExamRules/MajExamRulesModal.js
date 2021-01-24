import React, { Component } from 'react'
import Collapsible from 'react-collapsible'

import PropTypes from 'prop-types'
//  import css
import './style.scss'

class MajExamRulesModal extends Component {
  constructor (props) {
    super(props)
    this.closeModal = this.closeModal.bind(this)
  }

  closeModal () {
    const { closeModal } = this.props
    closeModal('documents')
  }
  render () {
    return (<div className='shadow-modal'>
      <div className='modal-header'>
        {/* <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
          <span aria-hidden='true'>&times;</span>
        </button> */}
        <h4 className='modal-title text-xs-center p-y-2'>ضوابط معلومات الاخبار</h4>
      </div>
      <div className='modal-body p-a-1 p-b-3'>
        <Collapsible trigger='شرح تثبيت البرنامج' open={true}>
          <p className='Collapsible__content'>ألا يقل معدله التراكمي عن (2,75) من نظام يتكون من " 4,00" ويقبل الحاصل على "2,5" إذا كان يملك خبرة عملية في تخصصه لا تقل عن س</p>
          <div className='embed-responsive embed-responsive-16by9 m-b-2'>
              <iframe
              className='embed-responsive-item'
              src={`//www.youtube.com/embed/8BLUsjGVeT8?rel=0&modestbranding=1&showinfo=0&color=white&autoplay=0`}
              />
          </div>
           
        </Collapsible>
        <Collapsible trigger='محتوى الاختبار'>
          <p className='Collapsible__content'>ألا يقل معدله التراكمي عن (2,75) من نظام يتكون من " 4,00" ويقبل الحاصل على "2,5" إذا كان يملك خبرة عملية في تخصصه لا تقل عن س</p>
          

        </Collapsible>
        <Collapsible trigger='طريقة استخدام البرنامج'>
          <p className='Collapsible__content'>ألا يقل معدله التراكمي عن (2,75) من نظام يتكون من " 4,00" ويقبل الحاصل على "2,5" إذا كان يملك خبرة عملية في تخصصه لا تقل عن س</p>
        </Collapsible>
        <Collapsible trigger='ضوابط الإختبار'> 
        <p className='Collapsible__content'>ألا يقل معدله التراكمي عن (2,75) من نظام يتكون من " 4,00" ويقبل الحاصل على "2,5" إذا كان يملك خبرة عملية في تخصصه لا تقل عن س</p>
        </Collapsible>
        <Collapsible trigger='لم يتم رفع إختبارك ؟'>
        <p className='Collapsible__content'>ألا يقل معدله التراكمي عن (2,75) من نظام يتكون من " 4,00" ويقبل الحاصل على "2,5" إذا كان يملك خبرة عملية في تخصصه لا تقل عن س</p>
        </Collapsible>
      </div>  
    </div>)
  }
}

MajExamRulesModal.propTypes = {
  closeModal: PropTypes.func.isRequired
}

export default MajExamRulesModal
