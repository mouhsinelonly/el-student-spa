import React, { Component } from 'react'
import PropTypes from 'prop-types'

class LessonNotes extends Component {
  static propTypes = {
    notes: PropTypes.array
  }
  static defaultProps = {
    notes: []
  }
  render () {
    const { notes } = this.props

    return (
      <div>
        {notes.map((n, i) => <div className='m-t-2 alert alert-info shadow-1' key={i}>{n.notes}</div>)}
      </div>
    )
  }
}

export default LessonNotes
