// @flow
import * as React from 'react'
import { Link } from 'react-router'
import Icon from 'components/Icon'
import Loading from 'components/Loading'
import './style.scss'
import moment from 'moment'
import DownloadRow from './Components/DownloadRow'
import { LESSONS_SERVER } from 'utils'

type PropsType = {
  params: Object,
  serverdate: string,
  subjects: Array<Object>
};

class LessonDownload extends React.Component<PropsType> {
  static defaultProps = {
    subjects: []
  }
  render (): React.Element<'div'> {
    const { params: { id }, subjects, serverdate } = this.props

    const subjectId = +id

    const subject = subjects.find((s: Object): boolean => s.id === subjectId)

    if (!subject) {
      return <div className='p-y-3'><Loading /></div>
    }

    const now = moment(serverdate).locale('en').format('YYYY-MM-DD HH:00:00')

    const mp4Payload = window.btoa(JSON.stringify({ type: 'mp4',
      subjectId,
      date: now }))

    const mp3Payload = window.btoa(JSON.stringify({ type: 'mp3',
      subjectId,
      date: now }))
    // console.log(subject.lessons)
    const subjectLessons = subject.lessons.filter((l: Object): boolean => l.type === 'درس' &&
      +l.subject_subject_id === +subjectId)
    .sort((a: Object, b: Object): number => (+a.lesson_order) - (+b.lesson_order))

    return (
      <div className='p-lesson-download p-b-3 m-b-3'>
        <div className='p-lesson-download__header'>
          <div className='container'>
            <div className='row'>
              <div className='col-xs-12 col-md-6 p-y-2 m-t-1'>
                <h3>
                  <Link to={`/student/subject/${subject.id}`} className='p-lesson-download__go-home-link'>
                    <Icon name='arrow-right-small-dark' className='m-l-3' />
                    <b>تحميل المحاضرات</b>
                  </Link>
                </h3>
              </div>
              <div className='col-xs-12 col-md-3 p-t-1'>
                <a href={`${LESSONS_SERVER}?p=${mp4Payload}`} className='btn btn-white m-t-2 btn-block
                text-xs-right p-lesson-download__action'>
                  <Icon name='play-black-tiny' /> تحميل كل الفيديوهات
                </a>
              </div>
              <div className='col-xs-12 col-md-3 p-t-1 m-b-2'>
                <a href={`${LESSONS_SERVER}?p=${mp3Payload}`} className='btn btn-white m-t-2 btn-block
                text-xs-right p-lesson-download__action'>
                  <Icon name='volume-black-tiny' /> تحميل كل الصوتيات
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className='container'>
          <div className='row'>
            <div className='col-xs-12 col-md-8 col-md-pull-2 m-t-3'>
              <div className='card shadow-1'>
                <div className='card-body'>
                  {subjectLessons.map((l: Object): React.Element<typeof DownloadRow> =>
                    <DownloadRow {...l} subjectName={subject.name} now={now} key={l.id} />)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default LessonDownload
