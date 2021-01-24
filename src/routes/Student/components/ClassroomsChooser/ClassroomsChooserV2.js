// @flow
import * as React from 'react'
import moment from 'moment'
// import utils
import { dayNumberToString, hourNumberToString, minuteNumberToString, secondNumberToString } from 'utils'
// import css
import './style.scss'
// import components
import Icon from 'components/Icon'
import Loading from 'components/Loading'
import ClassroomSubjectRowV2 from './ClassroomSubjectRowV2'
import ClassroomEditNotification from './ClassroomEditNotification'

type PropType = {
  toggleModifyChoosingClassroom: Function,
  toggleDoneChoosingClassroom: Function,
  exitClassroom: Function,
  chooseClassroom: Function,
  setClassroomsActivePage: Function,
  page: number,
  loading: boolean,
  runningactionids: Array<number>,
  classrooms: Array<Object>,
  semesterevents: Array<Object>,
  modify: boolean,
  serverdate: string,
  done: boolean
};

class ClassroomsChooserV2 extends React.Component<PropType> {
  static defaultProps = {
    classrooms: []
  }

  render (): React.Element<'div'> {
    const {
      classrooms,
      semesterevents,
      serverdate,
      done,
      modify,
      loading,
      toggleModifyChoosingClassroom
    } = this.props

    const classroomEvent = semesterevents.find((c: Object): boolean => c.category === 'choose_classroom')

    if (!classroomEvent) return <div />

    const serverTime = moment(serverdate)
    const finishAt = moment(`${classroomEvent.finish_at} ${classroomEvent.time_finish_at}`)
    const startAt = moment(`${classroomEvent.start_at} ${classroomEvent.time_start_at}`)

    if (startAt.isAfter(serverTime) || finishAt.isBefore(serverTime)) return <div />

    if (loading) {
      return <Loading text='جاري تحميل الشعب' className='m-y-3' />
    }

    if (!loading && classrooms.length === 0) return <div />

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
      classrooms.filter((c: Object): boolean =>
        c.findIndex((s: Object): boolean => s.chosen) > -1).length === classrooms.length

    if (isStudentChoseAllClassrooms && !modify) {
      return <ClassroomEditNotification toggle={toggleModifyChoosingClassroom} enddate={enddate} />
    }
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
                <p className='c-classroom-chooser__panel__head__subheading'>سارع بإختيار الأوقات قبل نفاذ الخيارات</p>
              </div>
            </div>
            <div className='col-xs-12 col-md-7'>
              ينتهي بعد
              <p>{enddate}</p>
              <button
                onClick={this._toggleModify}
                disabled={(!modify || !isStudentChoseAllClassrooms) && (!done || !isStudentChoseAllClassrooms)}
                className='c-classroom-chooser__cta btn btn-success btn-lg p-x-2'
              >
                حفظ و إنتهاء
              </button>
            </div>
          </div>
        </header>
        <section>
          {this._renderSubjects()}
        </section>
      </div>
    )
  }
  _renderSubjects = (): Array<Object> => {
    const { classrooms, page, runningactionids, chooseClassroom, exitClassroom, setClassroomsActivePage } = this.props
    const firstUnchosenIndex = classrooms.findIndex((g: Object): boolean =>
      g.filter((c: Object): boolean => c.chosen).length === 0)

    const chosenTimes = classrooms.filter((s: Object): boolean =>
      s.findIndex((c: Object): boolean => c.chosen) >= 0)
    .reduce((prev: Object, current: Array<Object>): Array<Object> => {
      return prev.concat(current.filter((f: Object): boolean => f.chosen))
    }, [])

    return classrooms.map((c: Object, i: number): React.Element<typeof ClassroomSubjectRowV2> => <ClassroomSubjectRowV2
      active={i === ((firstUnchosenIndex >= 0 && page < 0) ? firstUnchosenIndex : page)}
      runningactionids={runningactionids}
      chooseClassroom={chooseClassroom}
      setClassroomsActivePage={setClassroomsActivePage}
      exitClassroom={exitClassroom}
      index={i}
      chosenTimes={chosenTimes}
      key={i}
      classrooms={c} />)
  }
  _toggleDone = () => {
    const { toggleDoneChoosingClassroom } = this.props
    toggleDoneChoosingClassroom()
  }

  _toggleModify = () => {
    const { toggleModifyChoosingClassroom } = this.props
    toggleModifyChoosingClassroom()
  }
  _nextPage = () => {
    const { setClassroomsActivePage, page } = this.props
    setClassroomsActivePage(page + 1)
  }
  _prevPage = () => {
    const { setClassroomsActivePage, page } = this.props
    setClassroomsActivePage(page - 1)
  }
}

export default ClassroomsChooserV2
