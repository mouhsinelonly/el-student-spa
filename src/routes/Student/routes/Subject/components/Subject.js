// @flow
import * as React from 'react'
import Loading from 'components/Loading'
import { Link } from 'react-router'
import Icon from 'components/Icon'
import NormalSubject from './NormalSubject'
import QuranSubject from './QuranSubject'
import useMobile from 'hooks/useMobile'
import './style.scss'

type PropsType = {
  setActiveSubjectLesson: Function,
  showMoreQuranSubject: Function,
  hideMoreQuranSubject: Function,
  showLessonMenu: Function,
  hideLessonMenu: Function,
  serverdate: string,
  events: Array<Object>,
  location: Object,
  sessions: Array<Object>,
  getSubjectLessons: Function,
  subjects: Array<Object>,
  params: Object,
  isMobile: boolean,
  loading: boolean,
  lessonmenuvisible: boolean,
  loadingLessons: boolean,
  showmore: boolean,
  active: number
};

const Subject = (props: PropsType): React.Element<'div'> => {
  const { sessions, loading, params, location: { query }, subjects, active,
      setActiveSubjectLesson, showmore, showMoreQuranSubject, hideMoreQuranSubject, serverdate,
      loadingLessons, showLessonMenu, hideLessonMenu, lessonmenuvisible, events } = props
  const isMobile = useMobile()

  React.useEffect(() => {
    const subject = subjects.find((s: Object): boolean => s.id === +params.id)

    if ((subject && !active) || (subject &&
      +subject.lessons.findIndex((l: Object): boolean => +l.id === +active) < 0)) {
      setActiveSubjectLesson(subject.lessons[0].id)
    }
  })

  const subject = subjects.find((s: Object): boolean => s.id === +params.id)

  if (loading || !subject) return <Loading />

  const subjectLessons = subject.lessons.filter((l: Object): boolean =>
      +l.subject_subject_id === +params.id)
    .sort((a: Object, b: Object): number => (+a.lesson_order) - (+b.lesson_order))

  const lesson = subjectLessons.find((l: Object, i: number): boolean => +l.id === +active)

  const showNormal = typeof query.v !== 'undefined'
  return (
    <div className={`p-student-subject__container ${lessonmenuvisible ? 'is-menu-visible' : ''}`}>
      <div className='container'>
        <div className='row m-a-0 p-student-subject__header'>
          <h3>
            <Link to='/student' className='p-student-subject__go-home-link'>
              <Icon name='arrow-right-small-dark' className='m-l-3' />
              <b>{subject.name}</b>
            </Link>
            {!subject.is_quran ? <Link to={`/student/lesson_download/${subject.id}`}
              className='btn btn-white p-student-subject__download btn-md text-dark pull-xs-left'>
              <Icon name='download-black-tiny'
                className={isMobile ? '' : 'm-l-1'} /> {isMobile ? `` : `تحميل المحاضرات`}
            </Link> : null}
          </h3>
        </div>
      </div>
      <hr className='p-student-subject__separator' />
      {subject.is_quran && !showNormal ? <QuranSubject
        {...subject}
        showmore={showmore}
        hideMoreDetails={hideMoreQuranSubject}
        showMoreDetails={showMoreQuranSubject} />
        : <NormalSubject
          subject={subject}
          loading={loading}
          events={events}
          showLessonMenu={showLessonMenu}
          hideLessonMenu={hideLessonMenu}
          loadingLessons={loadingLessons}
          active={active}
          isMobile={isMobile}
          menuVisible={lessonmenuvisible}
          setActiveSubjectLesson={setActiveSubjectLesson}
          subjectLessons={subjectLessons}
          serverdate={serverdate}
          sessions={sessions}
          lesson={lesson} />}
    </div>
  )
}

export default Subject
