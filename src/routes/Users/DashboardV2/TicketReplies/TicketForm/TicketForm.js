// @flow
import React, { useRef, useCallback, useState, useEffect, useMemo } from 'react'
import { reduxForm } from 'redux-form'
import { useSelector } from 'react-redux'
import validation from './validation'
import Typing from 'components/Svg/Typing'
import { domOnlyProps } from 'utils'
import TextareaAutosize from 'react-autosize-textarea'
import Loading from 'components/Loading'
import './style.scss'
const OpenViduCall = React.lazy((): Function => import('components/OpenViduCall'))
const RepliesTemplates = React.lazy((): Function => import('../RepliesTemplates'))
const FavoriteReplies = React.lazy((): Function => import('../FavoriteReplies'))
const Videos = React.lazy((): Function => import('../Videos'))

const fields = ['body', 'ticket_id', 'reply']

type PropsType = {
  fields: Object,
  id: number,
  userStartedTyping: Function,
  userStopedTyping: Function,
  setActiveTicket: Function,
  setTicketSeen: Function,
  getStudent: Function,
  toggleFavoritesVisibility: Function,
  setActiveStudentDetails: Function,
  studentId: number,
  userId: number,
  studentCallId: number,
  nextId: number,
  prevId: number,
  enabled: boolean,
  calling: boolean,
  templatesVisible: boolean,
  loadingReply: boolean,
  templatesLoading: boolean,
  templates: Array<Object>,
  onlineIDS: Array<number>,
  toggleTemplatesVisiblity: Function,
  startOVSession: Function,
  toggleVideosVisibility: Function,
  setStudentCallId: Function,
  resetForm: Function,
  stopOVSession: Function,
  storeTicket: Function,
  handleSubmit: Function
};

const TicketForm = (props: PropsType): React.Element<'div'> => {
  // $FlowFixMe
  const bodyRef = useRef()
  const currentIdReference = useRef()
  const { typings } = useSelector(state => state.user_tickets)
  const [youtubeId, setYoutubeId] = useState('')
  const [callActive, setCallActive] = useState(false)
  const { fields: { body, ticket_id: ticketId }, studentId, id, handleSubmit,
    loadingReply, enabled, templatesVisible, onlineIDS,
    toggleVideosVisibility, toggleFavoritesVisibility, toggleTemplatesVisiblity,
    userStartedTyping, userStopedTyping, resetForm, userId, startOVSession, stopOVSession } = props
  const _toggleCallState = useCallback(() => {
    if (!callActive) {
      startOVSession(studentId, userId)
    } else {
      stopOVSession(studentId, userId)
    }
    setCallActive(!callActive)
  }, [callActive, studentId, userId])

  const isOnline = useMemo((): Function => {
    return onlineIDS.findIndex((o: number): boolean => +o === +studentId) >= 0
  }, [onlineIDS, studentId])
  useEffect((): Function => {
    if (currentIdReference.current) {
      userStopedTyping(currentIdReference.current)
    }
    if (bodyRef.current) {
      setTimeout(() => {
        bodyRef.current.textarea.focus()
        body.onChange('و عليكم السلام و رحمة الله و بركاته...')
      }, 50)
    }
    currentIdReference.current = id
    return () => {
      setCallActive(false)
    }
  }, [id])

  const _toggleComment = useCallback(() => {
    toggleTemplatesVisiblity()
  }, [])

  const isUserTyping = typeof typings !== 'undefined' && typeof typings[`ticket-${id}`] !== 'undefined'
  const typingName = isUserTyping
  ? <span style={{ color: '#e32f54', fontSize: 12, background: '#fff', borderRadius: 5, padding: '5px 0 5px 10px' }}>
    <Typing /> {typings[`ticket-${id}`].name} يرد على الرسالة...</span> : null

  const _handleKeyUp = useCallback((e: Object) => {
    let myEvent
    if (typeof e !== 'undefined' && typeof e.target !== 'undefined' &&
      typeof e.target.value !== 'undefined' && e.target.value.length > 0 && !isUserTyping) {
      myEvent = new CustomEvent('userStartedTyping', {})
      userStartedTyping(id)
      // setIsTyping(true)
    } else if (typeof e !== 'undefined' && typeof e.target !== 'undefined' &&
      typeof e.target.value !== 'undefined' && e.target.value.length === 0 && isUserTyping) {
      myEvent = new CustomEvent('userStopedTyping', {})
      userStopedTyping(id)
    }
    if (myEvent) {
      document.dispatchEvent(myEvent)
    }
  }, [id, isUserTyping])

  const _handleKeyPressed = useCallback((e: Object) => {
    let url = ''
    if (e !== 'undefined' && e.target !== 'undefined') {
      url = e.target.value
    }
    const youtubeString = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/)
    const youtubeId = youtubeString !== null ? youtubeString[1] : ''
    setYoutubeId(youtubeId)
    if (e.charCode === 13 && !e.shiftKey) {
      _handleSendReply()
      userStopedTyping(id)
    }
  }, [])

  const _pasteResponse = useCallback((value: string) => {
    setImmediate(() => {
      body.onChange(value)
      bodyRef.current.textarea.focus()
      _handleKeyUp({})
    })
    toggleTemplatesVisiblity(false)
    toggleVideosVisibility(false)
  }, [])
  const _handleSendReply = useCallback(() => {
    handleSubmit()
    setYoutubeId('')
    resetForm()
    setImmediate(() => {
      body.onChange('')
    })
  }, [])

  if (!enabled) return <div />

  return (
    <form className='v2-ticket-form'
      onSubmit={handleSubmit(_handleSendReply)}>
      <input type='hidden' {...domOnlyProps(ticketId)} value={id} />
      <img className={`${!youtubeId ? 'hidden-xs-up' : ''} v2-ticket-form__video-thumb`}
        src={youtubeId ? `https://i3.ytimg.com/vi/${youtubeId}/hqdefault.jpg` : undefined} height='70px' />
      {typingName}
      <TextareaAutosize
        {...domOnlyProps(body)}
        ref={bodyRef}
        autoFocus
        onKeyPress={_handleKeyPressed}
        onKeyUp={_handleKeyUp}
        placeholder='أكتب ردك...'
        className='form-control p-a-2' />
      <React.Suspense fallback={<Loading width={24} height={24} />}>
        {callActive && isOnline && +userId === 1 &&
          <OpenViduCall streamName={`support_ticket_${userId}_${studentId}`} />}
      </React.Suspense>
      <div className='v2-ticket-form__actions'>
        <button type='button' className='v2-ticket-form__action is-rotate'>
          <i className='material-icons'>attach_file</i>
        </button>
        <React.Suspense fallback={<Loading width={24} height={24} />}>
          <RepliesTemplates onItemSelected={_pasteResponse} />
          <Videos onItemSelected={_pasteResponse} />
          <FavoriteReplies onItemSelected={_pasteResponse} />
        </React.Suspense>
        <button type='button' className={`v2-ticket-form__action m-r-2 ${templatesVisible ? 'is-active' : ''}`}
          onClick={_toggleComment}>
          <i className='material-icons'>comment</i>
        </button>
        <button onClick={toggleVideosVisibility} type='button' className='v2-ticket-form__action m-r-2'>
          <i className='material-icons'>video_library</i>
        </button>
        <button onClick={toggleFavoritesVisibility} type='button' className='v2-ticket-form__action m-r-2'>
          <i className='material-icons'>stars</i>
        </button>
        {isOnline && <button onClick={_toggleCallState} type='button' className='v2-ticket-form__action m-r-2'>
          <i className={`${!callActive ? 'text-success' : 'text-danger'} material-icons`}>{callActive ? 'phone_disabled' : 'phone'}</i>
        </button> }
        {/* <button onClick={_startCall}
          type='button'
          disabled={calling}
          className={`v2-ticket-form__action m-r-2
            is-small
            ${onlineIDS.findIndex((o: number): boolean => studentId === o) >= 0 ? 'is-normal' : ''}`}>
          <i className={`${studentCallId === 0 ? '' : 'text-danger'} material-icons`}>
            {studentCallId === 0 ? 'call_end' : 'call'}
          </i>
        </button> */}
      </div>
      <button className='v2-ticket-form__send btn btn-info'
        type='submit'
        disabled={loadingReply} >
        {loadingReply ? <Loading strokeColor='#0082fb' /> : <i className='material-icons md-36'>send</i> }
      </button>
    </form>)
}

export default reduxForm({
  form: 'newticketform',
  fields,
  validate: validation,
  destroyOnUnmount: true
})(TicketForm)
