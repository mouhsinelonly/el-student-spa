import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import FirstStep from './FirstStep'
import FirstStepV2 from './FirstStepV2'
import SecondStep from './SecondStep'

class ExamResultTable extends Component {
  static propTypes = {
    // sendingcomplaint: PropTypes.bool,
    visible: PropTypes.bool,
    // goToComplaintStep: PropTypes.func,
    // toggleExamComplaint: PropTypes.func,
    // toggleAllExamComplaints: PropTypes.func,
    // checkedlist: PropTypes.array,
    complaintstep: PropTypes.number,
    showModal: PropTypes.func,
    type: PropTypes.string,
    exams: PropTypes.array
  }
  render () {
    const { exams, visible, complaintstep } = this.props

    if (!exams.length || !visible) return false

    return (<div className='c-exam-row-complaint-table'>
      {(() => {
        switch (complaintstep) {
          case 1:
            return <FirstStepV2 {...this.props} />
          case 2:
            return <SecondStep {...this.props} />
        }
      })()}
    </div>)
  }
}

export default ExamResultTable
