// @flow
import * as React from 'react'
import LessonMenu from './LessonMenu'
import Loading from 'components/Loading'
import LessonElements from './LessonElements'
import LessonNotes from './LessonNotes'
import SubjectForum from './SubjectForum'
import SubjectSession from './SubjectSession'
import useMobile from 'hooks/useMobile'

import './style.scss'
type RefObjectType = {|
  current: any
|};

type PropType = {
  setActiveSubjectLesson: Function,
  serverdate: string,
  sessions: Array<Object>,
  lesson: Object,
  subject: Object,
  showLessonMenu: Function,
  hideLessonMenu: Function,
  loading: boolean,
  menuVisible: boolean,
  isMobile: boolean,
  loadingLessons: boolean,
  subjectLessons: Array<Object>,
  events: Array<Object>,
  active: number
};

const NormalSubject = (props: PropType): React.Element<'div'> => {
  const { active, sessions, lesson, serverdate,
    subjectLessons, loading, subject, loadingLessons, menuVisible, events } = props
  const ref: RefObjectType = React.createRef()
  const isMobile = useMobile()

  const [ firstView, setFirstView ] = React.useState(false)
  React.useEffect(() => {
    if (isMobile && !firstView) {
      props.showLessonMenu()
      setFirstView(true)
    }
  })
  const _toggleMenu = () => {
    const { showLessonMenu, hideLessonMenu, menuVisible } = props
    !menuVisible ? showLessonMenu() : hideLessonMenu()
  }

  const _setActive = (id: number) => {
    // props.setActiveSubjectLesson(id)
    props.hideLessonMenu()
  }
  React.useEffect((): Function => {
    function handleClickOutside (e: Object) {
      if (ref.current && !ref.current.contains(e.target)) {
        props.hideLessonMenu()
      }
    }
    document && document.addEventListener('mousedown', handleClickOutside, false)
    return () => {
      document && document.removeEventListener('mousedown', handleClickOutside, false)
    }
  })
  let lessonData
  if (lesson && lesson.type === 'session') {
    lessonData = <SubjectSession {...lesson} serverdate={serverdate} events={events}
      attendedInOther={sessions.findIndex((o: Object): boolean =>
              o.subject_id === +subject.id &&
              o.order === +lesson.order &&
              (o.attended === 1 || ((o.excuseStatus !== 'refused') && o.excuseStatus !== null)) &&
              o.id !== lesson.id) >= 0} />
  } else if (lesson && lesson.type === 'forum') {
    lessonData = <SubjectForum {...lesson} />
  } else if (lesson) {
    lessonData = [<LessonElements
      loading={loading}
      isQuran={subject.is_quran}
      downloadable={!subject.hasBook}
      {...lesson}
      serverdate={serverdate}
      sessions={sessions}
      key='elements' />,
      <LessonNotes notes={lesson.notes} key='notes' />]
  }

  return (<div className='container'>
    <Loading className={`${(loadingLessons || subjectLessons.length <= 1) ? 'p-y-3' : 'hidden-xs-up'} m-t-3`} />
    <div className={`${(loadingLessons || subjectLessons.length <= 1) ? 'hidden-xs-up' : ''}`}>
      <div className='row'>
        <div className='col-xs-12 col-md-3'>
          <div ref={ref} className={`p-student-subject__menu-container ${menuVisible ? 'is-visible' : ''}`}>
            <div className='p-student-subject__back hidden-sm-up'>
              <button onClick={_toggleMenu}
                className='p-t-2 p-r-2 p-b-2 hidden-sm-up p-student-subject__btn-striped'>
                {/* <Icon name='arrow-right-small-dark'  /> */}
                <i className='material-icons m-l-1'>
                  {isMobile ? 'format_list_bulleted' : 'arrow_forward'}
                </i>
                {!isMobile ? 'رجوع' : 'تصفح قائمة الدروس'}
              </button>
            </div>
            <LessonMenu
              active={active}
              className={`p-student-subject__menu`}
              sessions={sessions}
              onItemClick={_setActive}
              lessons={subjectLessons} />
          </div>
        </div>
        <div className='col-xs-12 col-md-9 is-sticky p-student-subject__left'>
            { lessonData }
        </div>
      </div>
    </div>
  </div>)
}

export default NormalSubject
