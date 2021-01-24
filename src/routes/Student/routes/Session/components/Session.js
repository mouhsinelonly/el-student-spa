import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './style.scss'

class Session extends Component {
  static propTypes = {
    sessions: PropTypes.array,
    params: PropTypes.object,
    hideStudentNavbar: PropTypes.func,
    showStudentNavbar: PropTypes.func
  }

  componentDidMount () {
    const {hideStudentNavbar} = this.props
    hideStudentNavbar()
  }
  componentWillUnmount () {
    const {showStudentNavbar} = this.props
    showStudentNavbar()
  }
  render () {
    const {params: {id}, sessions} = this.props
    const session = sessions.find(s => s.id === parseInt(id, 10))
    let link
    if (session.classroom_session.wiziq_recording_status === 'available') {
      link = session.classroom_session.recording_link
    } else {
      link = session.student_link
    }
    return (
      <div className='p-a-3' style={{height: '100%'}}>
        <iframe className='p-student-session'
          src={link} frameBorder='0' />
      </div>
    )
  }
}

export default Session
