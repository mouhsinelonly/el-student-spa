import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
// import utils
import { dayNumberToString, hourNumberToString, minuteNumberToString, secondNumberToString } from 'utils'
// import css
import './style.scss'
// import components
import Icon from 'components/Icon'
import ClassroomSubjectItem from './ClassroomSubjectItem'
import ClassroomSubjectIsChosen from './ClassroomSubjectIsChosen'
import ClassroomEditNotification from './ClassroomEditNotification'

class ClassroomsChooser extends Component {
  static propTypes = {
    toggleModifyChoosingClassroom: PropTypes.func,
    toggleDoneChoosingClassroom: PropTypes.func,
    exitClassroom: PropTypes.func,
    chooseClassroom: PropTypes.func,
    setClassroomsActivePage: PropTypes.func,
    page: PropTypes.number,
    runningactionids: PropTypes.array,
    classrooms: PropTypes.array,
    semesterevents: PropTypes.array,
    modify: PropTypes.bool,
    // classroomsloading: PropTypes.bool,
    // semestereventsloading: PropTypes.bool,
    serverdate: PropTypes.string,
    done: PropTypes.bool
  }
  static defaultProps = {
    classrooms: []
  }
  constructor (props) {
    super(props)

    this._nextPage = this._nextPage.bind(this)
    this._prevPage = this._prevPage.bind(this)
    this._toggleDone = this._toggleDone.bind(this)
    this._toggleModify = this._toggleModify.bind(this)
  }
  render () {
    const {
      page,
      classrooms,
      semesterevents,
      serverdate,
      done,
      modify,
      toggleDoneChoosingClassroom,
      chooseClassroom,
      runningactionids,
      exitClassroom,
      toggleModifyChoosingClassroom
    } = this.props
    const classroomEvent = semesterevents.find(c => c.category === 'choose_classroom')

    const hasClassroomSubjects = true // classrooms.filter(c => c.subject && !c.subject.is_quran).length

    if (!classroomEvent) return false

    if (!hasClassroomSubjects) return false

    if (classrooms.length === 0) return false

    const serverTime = moment(serverdate)
    const finishAt = moment(`${classroomEvent.finish_at} 23:59:59`)
    const startAt = moment(classroomEvent.start_at)

    if (startAt.isAfter(serverTime) || finishAt.isBefore(serverTime)) return false

    const diff = finishAt.diff(serverTime)
    const duration = moment.duration(diff)

    const diffInDays = duration.days()
    const diffInHours = duration.hours()
    const diffInMinutes = duration.minutes()
    const diffInSeconds = duration.seconds()

    const enddate = `${diffInDays > 0 ? dayNumberToString(diffInDays) + '  و' : ''}
               ${diffInHours > 0 ? hourNumberToString(diffInHours) + ' و' : ''}
               ${diffInMinutes > 0 ? `${minuteNumberToString(diffInMinutes)} و` : ''}
              ${diffInSeconds > 0 ? diffInSeconds + ' ' + secondNumberToString(diffInSeconds) : ''}`

    const isStudentChoseAllClassrooms =
      classrooms.filter(c => c.findIndex(s => s.chosen) > -1).length === classrooms.length

    if (isStudentChoseAllClassrooms && !modify) {
      return <ClassroomEditNotification toggle={toggleModifyChoosingClassroom} enddate={enddate} />
    }

    const subject = classrooms.find((s, i) => i === page)
    const chosenTimes = classrooms.filter(s => s.findIndex(c => c.chosen) >= 0).reduce((prev, current) => {
      return prev.concat(current.filter(f => f.chosen))
    }, [])

    const hasChosenCurrentSubjectClassroom = subject && subject.findIndex(c => c.chosen) > -1

    return (
      <div className='c-classroom-chooser__panel m-t-3'>
        <header className='c-classroom-chooser__panel__head p-a-2'>
          <div className='row'>
            <div className='c-classroom-chooser__left-bar col-xs-12 col-md-5'>
              <div className='col-xs-2'>
                <Icon name='cclassroom-chooser-avatar' />
              </div>
              <div className='col-xs-10'>
                <h4 className='c-classroom-chooser__panel__head__title'>اختيار الشعب الدراسية</h4>
                <p className='c-classroom-chooser__panel__head__subheading'>سارع إختيار الأوقات قبل نفاذ الخيارات</p>
              </div>
            </div>
            <div className='col-xs-12 col-md-7'>
              ينتهي بعد
              <p>{enddate}</p>
              <button
                onClick={this._toggleModify}
                disabled={!done || !isStudentChoseAllClassrooms}
                className='c-classroom-chooser__cta btn btn-success btn-lg p-x-2'
              >
                حفظ و إنتهاء
              </button>
            </div>
          </div>
        </header>
        <section>
          {!done ? (
            <ClassroomSubjectItem
              runningactionids={runningactionids}
              chooseClassroom={chooseClassroom}
              exitClassroom={exitClassroom}
              chosenTimes={chosenTimes}
              subject={subject}
            />
          ) : (
            <ClassroomSubjectIsChosen
              toggleDoneChoosingClassroom={toggleDoneChoosingClassroom}
              classrooms={classrooms}
            />
          )}
        </section>
        <div className='clearfix' />
        {!done && (
          <footer className='p-a-2 text-xs-center m-t-2 c-classroom-chooser__panel__footer'>
            <div
              onClick={page > 0 && this._prevPage}
              className={`c-classroom-chooser__panel__footer__goback ${page > 0 && 'is-active'}`}
            >
              الرجوع للسابق
            </div>
            <button
              onClick={page === classrooms.length - 1 ? this._toggleDone : this._nextPage}
              disabled={!hasChosenCurrentSubjectClassroom}
              className='btn btn-success btn-lg p-x-3'
            >
              {page === classrooms.length - 1 ? 'حفظ و خروج' : 'التالي'}
            </button>
          </footer>
        )}
      </div>
    )
  }

  _toggleDone () {
    const { toggleDoneChoosingClassroom } = this.props
    toggleDoneChoosingClassroom()
  }

  _toggleModify () {
    const { toggleModifyChoosingClassroom } = this.props
    toggleModifyChoosingClassroom()
  }
  _nextPage () {
    const { setClassroomsActivePage, page } = this.props
    setClassroomsActivePage(page + 1)
  }
  _prevPage () {
    const { setClassroomsActivePage, page } = this.props
    setClassroomsActivePage(page - 1)
  }
}

export default ClassroomsChooser
