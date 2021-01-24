import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import FirstStep from './FirstStep'
import SecondStep from './SecondStep'
import ThirdStep from './ThirdStep'

class ExamRowExcuseTable extends Component {
  static propTypes = {
    // sendingexcuse: PropTypes.bool,
    visible: PropTypes.bool,
    enabled: PropTypes.bool,
    // goToExcuseStep: PropTypes.func,
    // toggleExamExcuse: PropTypes.func,
    excusestep: PropTypes.number,
    // toggleAllExamExcuses: PropTypes.func,
    type: PropTypes.string,
    // events: PropTypes.array,
    exams: PropTypes.array
  }
  render () {
    const { exams, visible, excusestep, enabled } = this.props

    if (!exams.length || !visible) return false
    let truestep = excusestep

    if (!enabled) {
      truestep = 1
    }
    return (<div className='c-exam-row-excuse-table p-t-3'>
      {(() => {
        switch (truestep) {
          case 1:
            return <FirstStep {...this.props} enabled={enabled} />
          case 2:
            return <SecondStep {...this.props} />
          case 3:
            return <ThirdStep {...this.props} />
        }
      })()}
    </div>)
  }
}

export default ExamRowExcuseTable
