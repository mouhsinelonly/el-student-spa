import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import {getDayString} from 'utils'

class ClassroomSubjectIsChosen extends Component {
  static propTypes = {
    toggleDoneChoosingClassroom: PropTypes.func,
    classrooms: PropTypes.array
  }
  static defaultProps = {
    classrooms: []
  }
  constructor (props) {
    super(props)

    this._renderClassrooms = this._renderClassrooms.bind(this)
  }
  render () {
    return (<div className={'text-xs-center'}>
      <h5 className='p-a-3'>تم الإنتهاء</h5>
      <section className='p-x-3'>
        {this._renderClassrooms()}
      </section>
    </div>)
  }

  _renderClassrooms () {
    const {classrooms, toggleDoneChoosingClassroom} = this.props
    return classrooms.map(s => s.map((c, i) => c.chosen && <ChosenClassroomItem
      toggleDoneChoosingClassroom={toggleDoneChoosingClassroom}
      key={i} classroom={c} />))
  }
}

class ChosenClassroomItem extends Component {
  static propTypes = {
    toggleDoneChoosingClassroom: PropTypes.func,
    classroom: PropTypes.object
  }
  static defaultProps = {
    classroom: {}
  }
  constructor (props) {
    super(props)

    this._toggleDone = this._toggleDone.bind(this)
  }
  render () {
    const {classroom} = this.props
    return (<div className='col-xs-12 col-md-4 col-lg-3'>
      <article className='c-classroom-chooser__chosen-classroom m-b-3'>
        <h4 className='c-classroom-chooser__chosen-classroom__title p-x-2 p-b-0 p-t-2 text-nowrap'>
          {classroom.subject.name}
        </h4>
        <span>{getDayString(classroom.day)} | {classroom.hour}</span>
        <button onClick={this._toggleDone} className='btn btn-block c-classroom-chooser__chosen-classroom__cta'>
            تعديل
        </button>
      </article>
    </div>)
  }

  _toggleDone () {
    const {toggleDoneChoosingClassroom} = this.props
    toggleDoneChoosingClassroom()
  }
}

export default ClassroomSubjectIsChosen
