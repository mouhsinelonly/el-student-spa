// @flow
import * as React from 'react'
//  import css
import './style.scss'
import Icon from 'components/Icon'

type PropsType = {
  classroom_session: Object,
  classroom_session_id: number,
  student_link: string,
  closeModal: Function,
  storeSessionClick: Function
};

const LiveSessionModal = (props: PropsType): React.Element<'div'> => {
  const {
    classroom_session: session,
    student_link: studentLink,
    closeModal,
    classroom_session_id: sessionId,
    storeSessionClick } = props

  const _closeModal = (e: Object) => {
    e.stopPropagation()
    storeSessionClick(sessionId)
    closeModal('documents')
  }

  if (typeof session === 'undefined' || typeof session.title === 'undefined') return <div />

  return (<div>
    <div className='modal-body shadow-modal p-a-2 text-xs-center p-a-3'>
      <span className='c-live-session-modal__indicator is-active'>
        <Icon name='classroom-teacher-avatar-medium' className='live-session-modal__icon' />
      </span>
      <h5 className='p-y-2 m-a-0'><b>لديك لقاء مباشر جاري حاليا</b></h5>
      <p className={'p-x-3'} style={{ lineHeight: 1.7 }}>
        {session.title} في مادة {session.subject.name} جاري الآن سارع بالدخول الآن
      </p>
      <a
        href={studentLink}
        target='_blank'
        onClick={_closeModal}
        className='btn btn-success btn-lg m-y-2 p-x-3'>
        أدخل الآن
      </a>
    </div>
  </div>)
}

export default LiveSessionModal
