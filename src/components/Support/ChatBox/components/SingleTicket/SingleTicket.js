// @flow
import * as React from 'react'
import TextareaAutosize from 'react-autosize-textarea'
import './style.scss'
import moment from 'moment'
import { reduxForm } from 'redux-form'
import { domOnlyProps } from 'utils'
import validation from './validation'
import Icon from 'components/Icon'
import Youtube from 'components/Players/Youtube'

const fields = [
  'ticketId',
  'body'
]

type PropsType = {
  subject: string,
  replies: Array<Object>,
  handleSubmit: Function,
  onUpload: Function,
  resetForm: Function,
  fields: Object
};

class SingleTicket extends React.Component<PropsType> {
  componentDidMount () {
    this._scrollToBottom()
  }
  componentDidUpdate (prevProps: Object) {
    const { replies } = this.props
    if (prevProps.replies.length < replies.length) {
      this._scrollToBottom()
    }
  }

  render (): React.Element<'div'> {
    const { subject, fields: { body, ticketId }, handleSubmit, remainingTickets } = this.props

    return (<div className='c-ticket-single'>
      <h1 className='text-xs-center c-ticket-single__header'>{subject}</h1>
      <div className='c-ticket-single__replies-scroll' ref='scroll'>
        <ul className='c-ticket-single__replies m-a-0 p-a-2'>
          {this._renderReplies()}
        </ul>
      </div>
      <form onSubmit={handleSubmit(this._handleSendReply)} className='p-a-2 c-ticket-single__form'>
        <input type='hidden' {...domOnlyProps(ticketId)} />
        <div className='c-ticket-single__form__cont'>
          {/* <DropZone multiple={false} accept={'image/*'}
            className='c-input-file__select-file'
            onDrop={this._handleSendFile}>
            <Icon name='clip-normal c-ticket-single__form__clip' />
          </DropZone> */}
          <TextareaAutosize
            {...domOnlyProps(body)}
            onKeyPress={this._handleKeyPressed}
            placeholder='أضف رد ...'
            autoFocus
            disabled={remainingTickets <= 0}
            className='c-ticket-single__input form-control' />
        </div>
        <p className='text-xs-center m-b-0 m-t-1'>اضغط Enter لإرسال الرد</p>
      </form>
    </div>)
  }

  _handleKeyPressed = (e: Object) => {
    if (e.charCode === 13) {
      this._handleSendReply()
    }
  }

  _handleSendFile = (files: Array<Object>) => {
    const { onUpload, fields: { ticketId } } = this.props
    onUpload(files, ticketId.value)
  }

  _handleSendReply = () => {
    const { handleSubmit, resetForm, fields: { body } } = this.props
    handleSubmit()
    resetForm()
    setTimeout(() => {
      body.onChange('')
    }, 50)
  }

  _scrollToBottom = () => {
    const scrollDiv = this.refs['scroll']
    scrollDiv.scrollTop = scrollDiv.scrollHeight
  }

  _renderReplies = (): Array<React.Element<typeof TicketReply>> => {
    const { replies } = this.props

    return replies.map((r: Object, i: number): React.Element<typeof TicketReply> =>
      <TicketReply {...r} key={r.id} />)
  }
}
type ReplyPropsType = {
  owner_type: string,
  deleted: boolean,
  body: string,
  seen: number,
  created_at: string
};

function TicketReply (props: ReplyPropsType): React.Element<'li'> {
  const youtubeString = props.body.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/)
  const youtubeId = (!youtubeString) ? '' : youtubeString[1]

  return <li className={props.owner_type !== 'students' ? 'text-xs-left ' : ''}>
    <div className={`c-ticket-single__replies__reply
          m-t-1
          ${props.deleted ? 'is-deleted hidden-xs-up' : ''}
          ${props.owner_type === 'students' ? 'is-mine m-l-2' : 'is-other shadow-1 m-r-2'}`} >
      <Youtube id={youtubeId} width={360} height={240} />
      {props.deleted ? <i>هذه الرسالة تم حذفها</i> : props.body}
    </div>
    <div className='c-ticket-single__replies__reply__time'>
      <Icon name={(props.owner_type === 'students' && props.seen === 1)
      ? 'message-seen-check'
      : 'message-sent-check'}
        className={props.owner_type !== 'students' ? 'hidden-xs-up' : 'c-ticket-single__replies__reply-check'} />
      {moment(props.created_at).locale('en').format('HH:mm, D ') +
          moment(props.created_at).locale('ar-SA').format('MMMM')}</div>
  </li>
}
export default reduxForm({
  form: 'ticketreplyform',
  fields,
  validate: validation,
  destroyOnUnmount: true
})(SingleTicket)
