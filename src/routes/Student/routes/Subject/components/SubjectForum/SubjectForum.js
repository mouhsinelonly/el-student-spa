// @flow
import * as React from 'react'
import './style.scss'
import moment from 'moment'
import Editor from 'components/Editor'
import Modal from 'react-responsive-modal'

type PropsType = {
  id: number,
  studentId: number,
  name: string,
  submitForumPost: Function,
  teacherName: string,
  teacherPhoto: string,
  startAtDate: string,
  serverdate: string,
  forums: Array<Object>,
  events: Array<Object>,
  loading: boolean,
  subject_subject_id: number
};

const SubjectForum = ({ subject_subject_id: subjectId, name, loading, forums,
  teacherName, teacherPhoto, startAtDate, events, studentId,
  serverdate,
  submitForumPost }: PropsType): Array<React.Node> | null => {
  let myPost
  let otherPosts = []

  const event = events.find((e: Object): boolean => e.category === 'subject_forum')

  const resultEvent = events.find((e: Object): boolean => e.category === 'subject_forum_publish_results')

  const forum = forums.find((f: Object): boolean => +f.subject_id === +subjectId)

  if (!event) return null

  if (forum) {
    myPost = forum.posts.find((p: Object): boolean => +p.ownerId === +studentId && p.owner_type === 'students')
    otherPosts = forum.posts.filter((p: Object): boolean => p.ownerId !== +studentId && p.owner_type === 'students')
  }

  const momentServerTime = moment(serverdate)
  const [postContent, setPostContent] = React.useState(myPost ? myPost.content : '')
  const [actionsVisible, setActionVisible] = React.useState(false)
  const [confirmationOpen, toggleConfirmation] = React.useState(false)
  const [editorVisible, setEditorVisbility] = React.useState(false)

  const values = { content: postContent, id: myPost ? myPost.id : null, forumId: forum ? forum.id : null }
  const submitPublish = () => {
    submitForumPost({ ...values, published: 1 })
    toggleConfirmation(false)
  }
  const submitDraft = () => {
    setEditorVisbility(false)
    submitForumPost({ ...values, published: 0 })
  }
  const showEditor = (!myPost || (myPost && !myPost.published && editorVisible)) && forum && (event.isCurrent)

  return [
    <Modal
      open={confirmationOpen}
      key='modal'
      center
      styles={{ modal: {
        padding: 0,
        borderRadius: 5,
        boxShadow: 'none',
        backgroundColor: 'transparent' } }}
      closeOnOverlayClick={false}
      onClose={() => {}}
      showCloseIcon={false}
      closeOnEsc={false}>
      <div className='my-panel-white p-a-3 text-xs-center' style={{ minWidth: 600 }}>
        <h4 className='font-weight-bold'>هل تود فعلا اعتماد الواجب</h4>
        <p className='p-y-2'>عند اعتماد ارسال واجب المنتدى، لن تستطيع تعديل محتواه</p>
        <div className='col-xs-6'>
          <button className='btn-block btn btn-gray btn-md pull-sm-left'
            onClick={(): typeof undefined => toggleConfirmation(false)}>
            تراجع
          </button>
        </div>
        <div className='col-xs-6'>
          <button className='btn-block btn btn-success btn-md pull-sm-left' onClick={submitPublish}>
            نعم اعتمد
          </button>
        </div>
        <div className='clearfix' />
      </div>
    </Modal>,
    <h5 key='header' className='m-y-3 text-xs-center font-weight-bold c-SubjectForum__header'>موضوع منتدى النقاش</h5>,
    <div key='content' className='my-panel-white shadow-1 c-SubjectForum__panel text-xs-center'>
      {event.isFuture ? <CommingHeader date={startAtDate} /> : null }
      {forum && event.isPast ? <CurrentHeader {...forum} /> : null }
      <div className='c-SubjectForum__avatar-cont text-xs-right m-t-3'>
        <img src={teacherPhoto} alt={teacherName} className='c-SubjectForum__avatar' />
        <h5 className='c-SubjectForum__teacherName'>{teacherName}</h5>
        <span className='c-SubjectForum__teacherPos'>محاضر المادة</span>
      </div>
    </div>,
    showEditor
    ? <div key='editor' className='m-b-2 p-a-0 m-x-3 m-t-2'>
      <Editor onChange={(html: string): typeof undefined => setPostContent(html)}
        html={myPost ? myPost.content : ''}
        handleFocus={setActionVisible}
        className='m-b-2' />
      {actionsVisible ? <><button key='draft' className='btn btn-success btn-md pull-sm-left'
        onClick={(): typeof undefined => toggleConfirmation(true)}>اعتماد و ارسال</button>
        <button key='publish' className='btn btn-gray btn-md pull-sm-left m-l-2' onClick={submitDraft}>
          حفظ كمسودة
        </button>
      </> : null}
      <div className='clearfix' />
    </div>
    : null,
    ((myPost && myPost.published) || !showEditor) && myPost ? <div key='mypost' className='p-a-0 m-x-3 m-t-3'>
      <h5 className='c-SubjectForum__subheader'>{myPost.published ? 'مشاركتك' : 'مسودة مشاركتك'}</h5>
      <div className='shadow-1 my-panel-white'>
        <PostItem {...myPost}
          showResult={myPost.published && resultEvent && resultEvent.isCurrent}
          resultDate={myPost.published && resultEvent && resultEvent.isFuture ? resultEvent.start_at : null}
          momentServerTime={momentServerTime}
        />
        {(myPost && !myPost.published && event.isCurrent) ? <div className='row p-a-3'>
          <div className='col-xs-4 col-xs-pull-2'>
            <button className='btn-block btn btn-lg btn-gray btn-md pull-sm-left'
              onClick={(): typeof undefined => setEditorVisbility(true)}>
              تحرير المسودة
            </button>
          </div>
          <div className='col-xs-4 col-xs-pull-2'>
            <button className='btn-block btn btn-lg btn-success btn-md pull-sm-left'
              onClick={(): typeof undefined => toggleConfirmation(true)}>
              اعتماد وإرسال
            </button>
          </div>
        </div> : null }
      </div>
    </div> : null,
    (event.isFinished && !myPost ? <NotParticipated key='noprticipation' /> : null),
    <h5 key='header2' className={`c-SubjectForum__subheader p-a-0 m-x-3 m-t-2 ${event.isFuture ? 'hidden-xs-up' : ''}`}>
      مشاركات باقي الطلبة
    </h5>,
    <ul key='posts' className={`p-a-0 my-panel-white m-x-3  shadow-1 ${event.isFuture ? 'hidden-xs-up' : ''}`}>
      {otherPosts.map((f: Object): React.Element<typeof PostItem> => <PostItem {...f}
        momentServerTime={momentServerTime}
        key={f.id} />)}
    </ul>
  ]
}

const PostItem = (props: Object): * => <li
  className={`m-t-2 p-x-3 p-y-2 c-SubjectForum__post ${props.owner_type === 'teachers' ? 'is-teacher' : ''}
  ${props.child ? 'is-child' : ''}`}>
  { props.child ? <img src={props.photo} alt={props.ownerName} className='c-SubjectForum__post-avatar' /> : null }
  <h6 className={`font-weight-bold c-SubjectForum__post-title`}>{props.ownerName}</h6>
  {props.owner_type === 'teachers' ? <div className='c-SubjectForum__post-teacher'>محاضر المادة</div> : null}
  <p className='p-t-2' dangerouslySetInnerHTML={{ __html: props.content }} />
  <small className='c-SubjectForum__post-created m-t-2'>
    {moment(props.created_at).from(moment(props.momentServerTime))}
  </small>
  {props.resultDate ? <ResultShowDate className='m-t-2' date={props.resultDate} /> : null }
  {props.showResult ? <YourGrade className='m-t-2' grade={props.grade} /> : null }
  <div className='clearfix' />
  {props.replies.length ? <ul className='p-a-0 m-a-0 c-SubjectForum__post-replies'>
    {props.replies.map((p: Object): React.Element<typeof PostItem> =>
      <PostItem {...p} key={p.id} child />)}</ul> : null}
</li>

PostItem.defaultProps = {
  replies: []
}

const ResultShowDate = (props: Object): React.Element<'div'> => {
  const dateMoment = moment(props.date)
  return (<div className={`c-SubjectForum__post-result ${props.className}`}>
    <i className='material-icons'>new_releases</i> ستظهر النتيجة يوم {dateMoment.format('dddd ')}
    {dateMoment.locale('en-us').format('D')}
    {dateMoment.locale('ar-SA').format(' MMMM ')}
  </div>)
}

const NotParticipated = (): React.Element<'div'> => <div
  className='my-panel-white shadow-1 m-t-3 p-a-3 text-xs-center m-x-3 c-SubjectForum__nopart'>
  <h4 className='c-SubjectForum__nopart-title'>لم تشارك في المنتدى</h4>
  <p className='c-SubjectForum__nopart-content'>
    للأسف لم تقم بالمشاركة في المنتدى في الفترة المخصصة للإرسال،
  </p>
  <YourGrade className='m-t-1' />
</div>

const YourGrade = (props: Object): React.Element<'div'> => <div
  className={`c-SubjectForum-YourGrade ${props.className}`}>
  نتيجتك <b>{props.grade}</b>
</div>

YourGrade.defaultProps = {
  grade: 0,
  className: ''
}

const CommingHeader = (props: Object): * => [
  <div key='title' className='c-SubjectForum__title'>سيتم نشر موضوع النقاش بتاريخ</div>,
  <h3 key='date' className='p-y-1 c-SubjectForum__start p-t-2'>{props.date}</h3>
]

const CurrentHeader = (props: Object): * => [
  <div key='title' className='c-SubjectForum__title'>{ props.subject }</div>,
]
export default SubjectForum
