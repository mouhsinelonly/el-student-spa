// @flow
import * as React from 'react'
import './style.scss'
import { LESSONS_SERVER } from 'utils'
import Icon from 'components/Icon'

type PropsType = {
  name: string,
  subjectName: string,
  lesson_order: number,
  subject_subject_id: number,
  now: string
};

class DownloadRow extends React.Component<PropsType> {
  render (): React.Element<'div'> {
    const { name, lesson_order: order, subject_subject_id: subjectId, now } = this.props

    const mp4Payload = window.btoa(JSON.stringify({ type: 'mp4',
      subjectId,
      lessonOrder: order,
      date: now }))

    const mp3ayload = window.btoa(JSON.stringify({ type: 'mp3',
      subjectId,
      lessonOrder: order,
      date: now }))

    return (
      <div className={`c-l-d-row p-a-2 ${order === 0 ? 'hidden-xs-up' : ''}`}>
        <div className='row'>
          <div className='col-xs-12 col-md-6'>
            {name}
          </div>
          <div className='col-xs-12 col-md-2 col-md-3 c-l-d-row__first'>
            <a href={`${LESSONS_SERVER}?p=${mp4Payload}`}
              className='btn btn-white btn-block c-l-d-row__action text-xs-right'>
              <Icon name='play-black-tiny' />
              <div>تحميل الفيديو</div>
            </a>
          </div>
          <div className='col-xs-12 col-md-2 col-md-3'>
            <a href={`${LESSONS_SERVER}?p=${mp3ayload}`}
              className='btn btn-white btn-block c-l-d-row__action text-xs-right'>
              <Icon name='volume-black-tiny' />
              <div>تحميل الصوت</div>
            </a>
          </div>
        </div>
      </div>
    )
  }
}

export default DownloadRow
