// @flow
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Link, browserHistory } from 'react-router'
import { getYoutubeId, inArray } from 'utils'
import CommentForm from 'components/CommentForm'
import VideoConfirmAvailability from './VideoConfirmAvailability'
import ReactPlayer from 'react-player'
import Icon from 'components/Icon'
import Loading from 'components/Loading'
import CommentList from 'components/CommentList'
import LessonMenu from 'routes/Student/routes/Subject/components/LessonMenu'
import ElementHeader from './ElementHeader'
import logo from 'static/img/32x32.png'
import StudentElementSwitch from './StudentElementSwitch'
// import css
import './style.scss'
const playerVars = {
  rel: 0,
  fs: 0,
  disablekb: 1,
  modestbranding: 1,
  showinfo: 0,
  color: 'white',
  playsinline: 1,
  autoplay: false,
  origin: ''
}
const operaStyle = {
  width: '100%',
  height: '200px',
  backgroundColor: 'rgb(36, 38, 39)',
  padding: '50px',
  textAlign: 'center',
  top: '-50px',
  position: 'relative',
  borderRadius: '5px',
  fontSize: '30px',
  color: '#efd8a5',
}

var isUiWebView = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent)

const browserHasDetach = navigator.userAgent.toLowerCase().indexOf('op') > -1
// window.YTConfig = {
  // host: 'https://www.youtube.com'
// }
class Element extends Component {
  _commentRef = React.createRef()
  state = {
    playing: false,
    duration: 0,
    currentTime: 0,
    element: null,
    subject: null,
    nextLesson: null,
    lesson: null,
    alternate: null,
    prevLesson: null,
    seeked: 0 }
  static propTypes = {
    pagination: PropTypes.object,
    posts: PropTypes.object,
    student: PropTypes.object,
    params: PropTypes.object,
    // history: PropTypes.object,
    insertingIds: PropTypes.array,
    likingIds: PropTypes.array,
    subjects: PropTypes.array,
    loading: PropTypes.bool,
    activeLesson: PropTypes.number,
    currentWatchingElementId: PropTypes.number,
    events: PropTypes.array,
    lessonmenuvisible: PropTypes.bool,
    serverdate: PropTypes.string,
    watchedLoading: PropTypes.bool,
    getElementPosts: PropTypes.func,
    setActiveSubjectLesson: PropTypes.func,
    hideStudentNavbar: PropTypes.func,
    createElementPost: PropTypes.func,
    showStudentNavbar: PropTypes.func,
    showLessonMenu: PropTypes.func,
    hideLessonMenu: PropTypes.func,
    startWatching: PropTypes.func,
    setWatchingElementId: PropTypes.func,
    resetWatching: PropTypes.func,
    readyWatching: PropTypes.func,
    watchingPaused: PropTypes.func,
    setVideoWatched: PropTypes.func,
    likeElementPost: PropTypes.func
  }
  componentDidMount () {
    const { hideStudentNavbar, hideLessonMenu, getElementPosts, params, resetWatching } = this.props
    hideStudentNavbar()
    getElementPosts(+params.id, 1)
    hideLessonMenu()
    resetWatching()
    window.addEventListener('onbeforeunload', this._onPageUnload)
    this.setCurrentLessonData()
  }
  componentDidUpdate (prevProps: Object) {
    const { params: { id }, currentWatchingElementId, subjects, getElementPosts, setWatchingElementId } = this.props
    const { lesson, playing } = this.state
    const { params: { id: prevId } } = prevProps

    if ((+currentWatchingElementId !== +id) && playing && currentWatchingElementId !== 0) {
      this.pauseVideo()
    }

    if ((+prevId !== +id) || (!lesson && subjects.length > 0)) {
      this.setCurrentLessonData()
      setWatchingElementId(+id, true)
      getElementPosts(+id, 1)
    }
  }

  setCurrentLessonData = () => {
    const { params: { id } } = this.props
    const { subjects } = this.props
    let element
    let subject
    let lesson
    let alternate
    let firstLessonIndex = 0
    let nextLesson = null
    let prevLesson = null
    subjects.map(s =>
      s.lessons.map((l, li) => {
        if (l.elements) {
          l.elements.map(e => {
            if (+e.id === +id) {
              element = e
              lesson = l
              subject = s
              if (typeof s.lessons[li + 1] !== 'undefined') {
                nextLesson = s.lessons[li + 1]
              }
              if (typeof s.lessons[li - 1] !== 'undefined') {
                prevLesson = s.lessons[li - 1]
              }
            }
          })
        }
      }
      )
    )
    if (element) {
      this.setState((): Object => ({
        element,
        subject,
        lesson,
        alternate,
        seeked: element.seek_minutes,
        firstLessonIndex,
        nextLesson,
        prevLesson }))
    }
  }

  componentWillUnmount () {
    const { showStudentNavbar, resetWatching } = this.props
    showStudentNavbar()
    resetWatching()
  }
  render () {
    const {
      params,
      events,
      serverdate,
      loading,
      likingIds,
      lessonmenuvisible,
      activeLesson,
      posts,
      pagination,
      insertingIds,
      student
    } = this.props
    let {
      playing,
      currentTime,
      duration,
      element,
      subject,
      lesson,
      firstLessonIndex,
      alternate,
      seeked,
      commentActive } = this.state

    if (loading || !element) return <Loading />

    const serverTime = moment(serverdate)
    const event = events.find(e => e.category === 'lesson_video_grade')
    const propConfirmEnabled = event &&
    serverTime.isBetween(event.start_at, `${event.finish_at} 23:59:59`) && !subject.is_quran

    const confirmEnabled = (propConfirmEnabled && student.semester && student.semester.order !== 'summer') ||
    (propConfirmEnabled && student.semester && student.semester.order === 'summer' &&
      subject && subject.failed_before === 0 &&
      inArray(subject.id, [33, 37, 44, 125]) && !subject.is_quran)

    if (!element) return <Loading />

    if (subject.lessons.findIndex(l => l.type === 'مقدمة') > -1) {
      firstLessonIndex = 1
    }

    if (element.type === 'فيديو') {
      alternate = lesson.elements.find(e => e.type === 'PDF' && e.title === 'التلخيص')
    } else if (element.type === 'PDF') {
      alternate = lesson.elements.find(e => e.type === 'فيديو')
    }

    return (
      <div className='p-student-element__container'>
        <div className={`p-student-element__container__menu ${lessonmenuvisible && 'is-active'}`}>
          <div className='p-student-element__container__menu__head'>
            <Link to={`/student/subject/${subject.id}`} className='p-student-element__container__menu__goback'>
              <Icon name='arrow-right-small-dark' className='p-student-element__container__menu__head__icon' />
              الرجوع لصفحة المادة
            </Link>
            <button className='p-student-element__container__menu__head__close' onClick={this._hideLessonMenu}>
              <Icon name='times-circle' />
            </button>
          </div>
          <div className='p-student-element__container__menu__content'>
            <LessonMenu noIntro onItemClick={this._onLessonClick}
              lessons={subject.lessons.filter(l => l.type === 'درس')} />
          </div>
        </div>
        <header className='p-student-element__header'>
          <div className='container'>
            <ElementHeader
              lessonName={lesson.name}
              subjectName={subject.name}
              elementType={element.type}
              onClick={lessonmenuvisible ? this._hideLessonMenu : this._showLessonMenu}
              alternateId={alternate ? alternate.id : 0}
              active={lessonmenuvisible}
              lessonOrder={lesson.lesson_order} />
            <div className='row'>
              <div
                className={
                  element.type === 'PDF'
                  ? 'p-student-element__content-col col-xs-12'
                  : 'col-xs-12 col-md-10 col-md-pull-1'
                }
              >
                <div
                  className={`${element.type === 'فيديو' && ' m-b-3'} embed-responsive 
              ${element.type === 'PDF' ? `embed-responsive-4by3 p-student-element__iframe ${subject.hasBook ? 'isNotDownloadable' : ''}` : 'embed-responsive-16by9'}`}
                >
                  {element.type === 'فيديو' && (
                    <div>
                      <Loading />
                      {browserHasDetach ? <div
                        style={operaStyle}>
                        المرجو استخدام متصفح كروم او فيرفركس
                      </div> : <ReactPlayer
                        onPlay={this._youtubeOnPlay}
                        onPause={this._youtubeOnPause}
                        onEnded={this._youtubeOnEnd}
                        onProgress={this.onProgress}
                        loop={false}
                        pip={false}
                        key={element.id}
                        playsinline
                        controls={(confirmEnabled && !element.watched)}
                        onReady={!element.watched ? this._onReady : () => {}}
                        url={`https://www.youtube.com/watch?v=${getYoutubeId(element.value)}`}
                        playing={playing}
                        config={{
                          youtube: {
                            playerVars: ({
                              ...playerVars,
                              ...{
                                playsinline: 1,
                                controls: (confirmEnabled && !element.watched) ? 0 : 1,
                                autoplay: false,
                                start: `${element.seek_minutes}`
                              }
                            })
                          }
                        }} />}
                      <VideoConfirmAvailability
                        refreshSeek={this.setCurrentLessonData}
                        enabled={!element.watched && confirmEnabled}
                        playVideo={this.playVideo}
                        pauseVideo={this.pauseVideo}
                        playing={playing}
                        currentTime={currentTime}
                        duration={duration}
                        key={`confirm${element.id}`}
                        watched={element.watched === 1}
                        seeked={element.seek_minutes}
                        id={element.id}
                      />
                    </div>
                  )}
                  {['PDF', 'SVG'].includes(element.type) &&
                    element.file && !(subject.hasBook && isUiWebView) && (
                      <div>
                        <Loading />

                        <iframe
                          loading='eager'
                          key={element.id}
                          className='embed-responsive-item'
                          src={`${!subject.hasBook ? 'https://admin.el-css.edu.om/uploads' : 'https://admin.el-css.edu.om/uploads/viewer/web/viewer.html?file=../../'}${element.file.original &&
                            element.file.original.replace('https://admin.el-css.edu.om/uploads', '')}`}
                          allowFullScreen
                        />
                        <div className='p-student-element__iframe-logo'>
                          <img src={logo} />
                        </div>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>
        </header>
        <div ref={this._commentRef} className={`container StudentElementNav ${commentActive && 'is-active'}`}>
          <StudentElementSwitch
            prevDisabled={activeLesson <= firstLessonIndex}
            elementType={element.type}
            fileUrl={element.file.original}
            selectedTitle={element.title}
            elements={lesson.elements}
            downloadable={!subject.hasBook}
            commentActive={commentActive}
            toggleComment={this._toggleComment}
            onPrevClick={this._onPrevLessonClick}
            onNextClick={this._onNextLessonClick}
            nextDisabled={activeLesson === subject.lessons.length - 1} />
          <hr className='m-a-0' />
          <div className='row m-t-3'>
            <div className='col-xs-12 col-md-6 col-md-pull-3'>
              <CommentForm
                id={element.id}
                form={`CommentForm${element.id}`}
                onSubmit={this._handleCreatePost}
                placeHolder={'إطرح سؤالا للنقاش...'}
                contentPlaceHolder='وصف السؤال أو النقاش'
                subjectPlaceHolder='عنوان السؤال أو النقاش'
              />
              <CommentList
                ownerType='students'
                ownerId={student.id}
                likingIds={likingIds}
                onSubmit={this._handleCreatePost}
                title='الأسئلة و النقاشات'
                handlePostLike={this._likePost}
                loadMore={this._loadMorePosts}
                insertingIds={insertingIds}
                posts={posts}
                pagination={pagination[params.id]}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
  _toggleComment = () => {
    const { commentActive } = this.state
    if (commentActive) {
      this._commentRef.current.scrollTop = 0
    }
    this._commentRef.current.style.overflow = !commentActive ? 'scroll' : 'hidden'
    this.setState((): Object => ({ commentActive: !commentActive }))
  }
  onProgress = (data) => {
    this.setState((): Object => ({ currentTime: parseInt(data.playedSeconds, 10) }))
  }

  playVideo = () => {
    const { params: { id }, currentWatchingElementId } = this.props
    if (+currentWatchingElementId === +id) {
      this.setState((): Object => ({ playing: true }))
    }
  }

  _onEnablePIP = () => {
    // console.log('pip has been enabled')
  }

  pauseVideo = () => {
    this.setState((): Object => ({ playing: false }))
  }

  _likePost = (postId = 0) => {
    const { likeElementPost } = this.props
    likeElementPost(postId)
  }

  _loadMorePosts = () => {
    const { params, getElementPosts, pagination } = this.props
    getElementPosts(params.id, pagination[params.id].currentPage + 1)
  }

  _showLessonMenu = () => {
    const { showLessonMenu } = this.props
    showLessonMenu()
  }

  _hideLessonMenu = () => {
    const { hideLessonMenu } = this.props
    hideLessonMenu()
  }

  _handleCreatePost = ({ subject, content, parentId }) => {
    const { createElementPost, params } = this.props
    createElementPost(params.id, subject, content, parentId)
  }

  _onLessonClick = (id: number) => {
    const { hideLessonMenu, setActiveSubjectLesson } = this.props
    const { subject } = this.state

    const { element, nextLesson } = this._findLessonById(id, subject.id)

    if (nextLesson) {
      hideLessonMenu()
      const nextelement = nextLesson.elements.find(e => e.title === element.title)
      if (nextelement) {
        setActiveSubjectLesson(id)
        browserHistory.push('/student/element/' + nextelement.id)
      }
    }
  }

  _onPrevLessonClick = () => {
    const { prevLesson } = this.state
    prevLesson && this._onLessonClick(prevLesson.id)
  }

  _onNextLessonClick = () => {
    const { nextLesson } = this.state
    nextLesson && this._onLessonClick(nextLesson.id)
  }

  _findLessonById = (id, subjectId = 0) => {
    const { subjects, params } = this.props
    let element, nextLesson
    subjects.map(s => {
      s.lessons.map((l, li) => {
        if (+l.id === +id && +s.id === +subjectId) {
          nextLesson = l
        }
        typeof l.elements !== 'undefined' && l.elements.map(e => {
          if (+e.id === +params.id) {
            element = e
          }
        })
      })
    })

    return { element, nextLesson }
  }

  _youtubeOnPlay = (data) => {
    const { startWatching, setWatchingElementId, params: { id } } = this.props
    setWatchingElementId(+id, true)
    this.setState((): Object => ({ playing: true }))
    startWatching()
  }

  _youtubeOnPause = (data) => {
    const { watchingPaused } = this.props
    watchingPaused()
  }

  _youtubeOnStateChange = (e: Object) => {
    this.setState((): Object => ({ playerState: e.data }))
  }

  _onReady = (data) => {
    const { element } = this.state
    if (element) {
      // data.seekTo(element.seek_minutes, true)
    }

    this.setState((): Object => ({ duration: parseInt(data.getDuration(), 10) }))
  }
  _youtubeOnEnd = () => {
    const { setVideoWatched, resetWatching, student,
      events, serverdate, watchedLoading } = this.props
    const { duration, currentTime } = this.state
    const { element, subject } = this.state

    const serverTime = moment(serverdate)
    const event = events.find(e => e.category === 'lesson_video_grade')
    const propConfirmEnabled = event && serverTime.isBetween(event.start_at, `${event.finish_at} 23:59:59`)

    const confirmEnabled = propConfirmEnabled ||
    (student.semester && student.semester.order === 'summer' && subject && subject.failed_before === 0 &&
      inArray(subject.id, [33, 37, 44, 125]) && !subject.is_quran)

    if (
      confirmEnabled &&
      !watchedLoading &&
      !element.watched &&
      currentTime >= (duration - 600)
    ) {
      setVideoWatched(element.id)
    } else {
      resetWatching()
    }
  }

  _onPageUnload = (): boolean => {
    return false
  }
}

export default Element
