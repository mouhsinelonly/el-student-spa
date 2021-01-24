// @flow
import * as React from 'react'
import Loading from 'components/Loading'
import moment from 'moment'
import './style.scss'
import { LESSONS_SERVER } from 'utils'
import Icon from 'components/Icon'

// import component
import DocumentsElements from './DocumentsElements'
import VideoElement from './VideoElement'

type PropsType = {
  sessions: Array<Object>,
  elements: Array<Object>,
  name: string,
  serverdate: string,
  isQuran: number,
  lesson_order: number,
  type: string,
  loading: boolean,
  downloadable: boolean,
  // id: number,
  subject_subject_id: number
};

class LessonElements extends React.PureComponent<PropsType> {
  render (): React.Element<'div'> {
    const { isQuran, subject_subject_id: subjectId, serverdate, name, type,
      lesson_order: lessonOrder, elements, sessions, loading, downloadable } = this.props
    const momentServerTime = moment(serverdate)
    const sessionsPastAttended = sessions.filter((s: Object): boolean => {
      if (!s.classroom_session) return false
      return moment(s.classroom_session.start_at).isBefore(momentServerTime) &&
      s.classroom_session.subject_subject_id === subjectId && s.attended
    })

    const sessionsPastNotAttended = sessions.filter((s: Object): boolean => {
      if (!s.classroom_session) return false
      return moment(s.classroom_session.start_at).isBefore(momentServerTime) &&
      s.classroom_session.subject_subject_id === subjectId && s.attended === 0
    })

    if (loading) return <Loading />

    const intro = elements && elements.find((e: Object): boolean => e.type === 'نص')
    const video = elements && elements.find((e: Object): boolean => e.type === 'فيديو')
    const pdfs = elements && elements.filter((e: Object): boolean => ['PDF', 'SVG'].includes(e.type) && e.title !== 'نسخة للطباعة')
    const toprint = elements && elements.find((e: Object): boolean => e.type === 'PDF' && e.title === 'نسخة للطباعة')

    const mp4Payload = window.btoa(JSON.stringify({ type: 'mp4',
      subjectId,
      lessonOrder: lessonOrder,
      date: momentServerTime.locale('en').format('YYYY-MM-DD HH:00:00') }))

    const mp3ayload = window.btoa(JSON.stringify({ type: 'mp3',
      subjectId,
      lessonOrder: lessonOrder,
      date: momentServerTime.locale('en').format('YYYY-MM-DD HH:00:00') }))

    return <div className='p-t-3 c-studnet-lesson-elements'>
      <span className='c-studnet-lesson-elements__heading p-l-2'>
        {name}
      </span>
      {type === 'درس' ? <span >|</span> : ''}
      {type === 'درس' ? <span className='p-r-2'>الدرس {lessonOrder}</span> : ''}
      {intro && <div className='c-studnet-lesson-elements__intro-text m-t-2'
        dangerouslySetInnerHTML={{ __html: intro.value }} />}
      {type !== 'درس' ? <div className={`c-studnet-lesson-elements__meta-info p-y-2 m-t-2
        ${isQuran ? 'hidden-xs-up' : ''}`}>
        <div className='row hidden-xs-up'>
          <div className='col-xs-12 col-md-3'>
            <h4>لقد حضرت </h4>
            <span>{sessionsPastAttended.length} لقاء مباشر</span>
          </div>
          <div className='col-xs-12 col-md-4'>
            <h4>و تغيبت</h4>
            <span>{sessionsPastNotAttended.length} لقاء مباشر</span>
          </div>
          <div className='col-xs-12 col-md-5' />
        </div>
      </div>
         : <div className='row m-t-3'>
           <div className='col-xs-12 col-md-6 p-b-2'>
             {video && <VideoElement id={video.id} title={video.title} link={video.value} />}
             <div className={intro || isQuran ? 'hidden-xs-up' : ''}>
               <a href={`${LESSONS_SERVER}?p=${mp4Payload}`}
                 className='btn btn-white c-studnet-lesson-elements__download m-t-2'
                 style={{ borderRadius: 20 }} >
                 <Icon name='play-black-tiny' className='m-l-1' />
                  تحميل الفيديو
               </a>
               <a href={`${LESSONS_SERVER}?p=${mp3ayload}`}
                 className='btn btn-white c-studnet-lesson-elements__download m-t-2 pull-xs-left'
                 style={{ borderRadius: 20 }} >
                 <Icon name='volume-black-tiny' className='m-l-1' />
                  تحميل mp3
               </a>
             </div>
           </div>
           <div className='col-xs-12 col-md-6'>
             {pdfs.length ? <DocumentsElements elements={pdfs} /> : null}
             {(toprint && toprint.file && downloadable) ? <a href={toprint.file.original}
               target='_blank'
               className='btn btn-curved p-x-2 btn-secondary m-t-2 m-x-auto'
               style={{ width: 160, display: 'block' }}>تحميل الكتيب PDF</a> : null}
           </div>
         </div>}
    </div>
  }
}

export default LessonElements
