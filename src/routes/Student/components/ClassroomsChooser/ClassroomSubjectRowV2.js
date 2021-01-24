// @flow
import * as React from 'react'
import './rowv2.scss'
import moment from 'moment'
import ClassroomItem from './ClassroomItem'
import Icon from 'components/Icon'

import { getDayString } from 'utils'

type PropsType = {
  classrooms: Array<Object>,
  active: boolean,
  index: number,
  chosenTimes: Array<Object>,
  runningactionids: Array<number>,
  setClassroomsActivePage: Function,
  exitClassroom: Function,
  chooseClassroom: Function
};

class ClassroomSubjectRowV2 extends React.Component<PropsType> {
  render (): Array<React.Element<'div'>> {
    const { classrooms, active, runningactionids, chooseClassroom, exitClassroom, chosenTimes } = this.props

    if (!classrooms.length) return []

    const chosen = classrooms.find((c: Object): boolean => c.chosen)
    const first = classrooms.find((c: Object, i: number): boolean => i === 0)
    // const subject = first ? first.subject : null

    if (!first) return []

    return [
      <div
        key='disabled'
        onClick={this._setActive}
        className={`classroom-chooser-item-v2__disabled p-a-2 ${active ? 'hidden-xs-up' : ''}`}
      >
        <div className='row'>
          <div className='col-xs-12 col-md-5'>
            <h2 className='classroom-chooser-item-v2__disabled-title'>
              <Icon name='check-circle' className={`${chosen ? '' : 'hidden-xs-up'} m-l-2`} />
              {first.subject_name}
            </h2>
          </div>
          <div className='col-xs-12 col-md-5'>
            يوم<span className={`p-x-1 ${chosen ? 'font-weight-bold' : ''}`}>
              {chosen ? getDayString(chosen.day) : '................'}
            </span>. الساعة{' '}
            <span className='p-x-1'>
              {chosen
                ? `${moment(chosen.hour, 'H:m:i')
                    .locale('en-us')
                    .format(' h:mm ')}
            ${moment(chosen.hour, 'H:m:i')
              .locale('en-us')
              .format('a') === 'am'
              ? 'صباحا'
              : 'مساءا'}`
                : '................'}
            </span>
          </div>
          <div className='col-xs-12 col-md-2'>
            <button className={`classroom-chooser-item-v2__disabled-edit ${!chosen ? 'hidden-xs-up' : ''}`}>
              تعديل
            </button>
          </div>
        </div>
      </div>,
      <div
        key='enabled'
        className={`classroom-chooser-item-v2__enabled ${!active ? 'hidden-xs-up' : 'is-active'} p-x-2`}
      >
        <h5 className='p-y-3 p-r-1 font-weight-bold'>{first.subject_name}</h5>
        {classrooms.map((s: Object, i: number): React.Element<typeof ClassroomItem> => (
          <ClassroomItem
            loading={runningactionids.findIndex((r: number): boolean => s.id) > -1}
            chooseClassroom={chooseClassroom}
            chosenTimes={chosenTimes}
            exitClassroom={exitClassroom}
            key={i}
            classroom={s}
          />
        ))}
        <div className='clearfix' />
      </div>
    ]
  }

  _setActive = () => {
    const { index, setClassroomsActivePage } = this.props
    setClassroomsActivePage(index)
  }
}

export default ClassroomSubjectRowV2
