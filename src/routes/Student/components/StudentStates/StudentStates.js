import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './style.scss'

// import states components
import DelayedState from './DelayedState'
import WithdrawState from './WithdrawState'
import DiscontinuousState from './DiscontinuousState'
import FiredState from './FiredState'
import FailState from './FailState'
import GraduateState from './GraduateState'
import SuccessState from './SuccessState'

class StudentStates extends Component {
  static propTypes = {
    profile: PropTypes.object
  }
  render () {
    const {profile: {state, study_state: studyState}} = this.props
// histories, semester,
    // let currentHistory = histories.find(h => h.academycycle_semester_id === semester.id)
    // if (typeof currentHistory === 'undefined') {
      // console.log(histories.length - 1, histories)
      // currentHistory = histories.find((h, i) => i === histories.length - 1)
    // }

    if (!state) return null

    return (<div className='student-satates-container'>
      {
        (() => {
          switch (state) {
            case 'delayed':
              return <DelayedState />
            case 'withdrawn':
              return <WithdrawState />
            case 'discontinuous':
              return <DiscontinuousState />
            case 'fired':
              return <FiredState />
            case 'graduate':
              return <GraduateState />
          }
        })()
      }
      {
        (() => {
          if (state === 'active' && studyState === 'fail') {
            return <FailState />
          } else if (state === 'active' && studyState === 'success') {
            return <SuccessState />
          }
        })()
      }
    </div>)
  }
}

export default StudentStates
