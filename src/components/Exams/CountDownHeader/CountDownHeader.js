// @flow
import * as React from 'react'
import './style.scss'
import { padZero } from 'utils'
import moment from 'moment'

type PropsType = {
  title: string,
  startAt: string,
  duration: number,
  serverdate: string
};

class CountDownHeader extends React.Component<PropsType> {
  render (): React.Element<'div'> {
    const { title, serverdate, startAt, duration } = this.props
    const momentServerTime = typeof serverdate === 'undefined' ? moment() : moment(serverdate)

    const startAtMoment = moment(startAt)
    const finishAtMoment = startAtMoment.add(duration, 'minutes')
    const diff = finishAtMoment.diff(momentServerTime)
    const momentDuration = moment.duration(diff)
    const diffInMinutes = momentDuration.minutes()
    const diffInSeconds = momentDuration.seconds()
    const progress = 100 - (((duration * 60) - momentDuration.asSeconds()) / (duration * 60) * 100)
    let progressClass = 'bg-success'
    if (progress < 10) {
      progressClass = 'bg-danger'
    } else if (progress < 20) {
      progressClass = 'bg-warning'
    }

    return (
      <div className='exams-countdown-header'>
        <div style={{ borderBottom: 'solid #dad7e1 1px' }}>
          <div className='container'>
            <div className='row col-xs-12 col-md-8 col-md-pull-2 exams-countdown-header__title p-y-2'>
              <b>{ title }</b>
            </div>
          </div>
        </div>
        <div className='exams-countdown-header__time'>
          <div className='exams-countdown-header__time-label'>
            باقي على الإنتهاء
          </div>
          <div className='exams-countdown-header__time-minutes'>
            {padZero(diffInMinutes, '00')}:{padZero(diffInSeconds, '00')}
          </div>
        </div>
        <div className='progress' style={{ height: 5, borderBottom: 'solid #dad7e1 1px' }}>
          <div className={`progress-bar ${progressClass} exams-countdown-header__progress`}
            role='progressbar'
            style={{ width: `${progress}%` }}
            aria-valuenow='25' aria-valuemin='0' aria-valuemax='100' />
        </div>
      </div>
    )
  }
}

export default CountDownHeader
