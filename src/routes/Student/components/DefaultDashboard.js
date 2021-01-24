// @flow
import React, { useState } from 'react'
// import SubNav from './SubNav'
//  import components
import Icon from 'components/Icon'
import SubjectPlaceHolder from 'components/Placeholders/SubjectPlaceHolder'
import LineHeading from 'components/Ui'
import ThesisPortal from '../ThesisPortal'
import ThesisChat from '../ThesisPortal/components/Chat'
import ThesisSteps from '../ThesisPortal/components/Steps'
import Joyrides from './Joyrides'
import Sessions from './Sessions'
const Messages = React.lazy((): Function => import('./Messages'))
const ClassroomsChooser = React.lazy((): Function => import('./ClassroomsChooser'))
const ChooseCertificateDay = React.lazy((): Function => import('./ChooseCertificateDay'))
const SubjectBlock = React.lazy((): Function => import('./SubjectBlock'))

type PropType = {
  subjectsError: boolean,
  profile: Object,
  thesisAllVisible: boolean,
  subjectsloading: boolean,
  serverdate: string,
  subjects: Array<Object>,
  sessions: Array<Object>
};

const DefaultDashboard = (props: PropType): React.element<'div'> => {
  const [ thesisVisibility, setThesisVisibility ] = useState({ chat: false, steps: false })
  const {
    profile: { subjectsCount, semester, joyrides, system_semester_id: systemSemesterId, portalType, state },
    subjectsError,
    serverdate,
    profile,
    sessions,
    subjects,
    thesisAllVisible,
    subjectsloading } = props
  const isThesis = portalType === 'thesis'

  if (profile && profile.state === 'withdrawn') {
    return []
  }

  const handleToggleVisibility = (values: Object) => {
    setThesisVisibility(values)
  }
  const hasNormalSubject = subjects.findIndex((subject: Object): boolean => ![89, 90].includes(subject.id)) >= 0

  const heightStyle = isThesis ? { height: '100%' } : {}

  const studentIsActive = profile.state === 'active'

  return <div className={`container p-b-3`} style={heightStyle}>
    <div className='row' style={heightStyle}>
      {isThesis ? <ThesisSteps onToggleVisibility={handleToggleVisibility} visible={thesisVisibility.steps} preliminary={hasNormalSubject} /> : null }
      <div className={`col-xs-12 col-xl-10 col-xl-pull-1 col-lg-10 col-lg-pull-1`}>
        <div className=''>
          {portalType !== 'thesis' ? <Joyrides joyrides={joyrides}
            studentActive={studentIsActive}
            semester={semester}
            serverdate={serverdate} /> : null }
          <React.Suspense fallback={<div />}>
            <Messages />
          </React.Suspense>
          {(portalType !== 'thesis' || thesisAllVisible) &&
            <div><React.Suspense fallback={<div />}>
              <ClassroomsChooser />
            </React.Suspense>
              <Sessions /></div> }
        </div>
        <div className='clearfix' />
        { (portalType !== 'thesis' || thesisAllVisible) ? <div className={`${!studentIsActive ? 'hidden-xs-up' : ''} p-b-3 p-t-1`}>
          <div className='col-xs-12'>
            <LineHeading
              text='المواد الدراسية'
              className={`p-y-2 ${((!subjectsloading && !subjects.length) || semester.id !== systemSemesterId)
                ? 'hidden-xs-up' : ''}`}
            />
          </div>
          <SubjectPlaceHolder
            enabled={subjectsloading && semester.id === systemSemesterId}
            count={subjectsCount}
            className={!subjectsloading || semester.id !== systemSemesterId ? 'hidden-xs-up' : ''}
          />
          {subjectsError ? <div className='text text-danger text-xs-center m-y-3'>
            <Icon name='blocked-red' />
            <h5 style={{ color: '#bd1e20' }} className='m-t-2' >حدث خلل أثناء تحميل المواد.</h5>
          </div> : null}
          <div className='clearfix' />
          <React.Suspense fallback={<h1>loading</h1>}>
            {subjects
                .filter((s: Object): boolean => s.semester_id <= semester.id)
                .map((s: Object): React.Element<typeof SubjectBlock> => (
                  <SubjectBlock
                    disabled={false}
                    sessions={sessions.filter((session: Object): boolean =>
                      session.classroom_session.subject_subject_id === s.id)}
                    className='col-xs-12 col-md-4'
                    key={s.id}
                    {...s}
                  />
                ))}
          </React.Suspense>
          <div className='clearfix' />
        </div> : <ThesisPortal onToggleVisibility={handleToggleVisibility} /> }
      </div>
      {isThesis ? <ThesisChat onToggleVisibility={handleToggleVisibility} visible={thesisVisibility.chat} /> : null }
      <div className='col-xs-12'>
        <React.Suspense fallback={<div />}>
          { state === 'graduate' ? <ChooseCertificateDay /> : null }
        </React.Suspense>
      </div>
    </div>
  </div>
}

DefaultDashboard.defaultProps = {
  profile: {},
  homepagesessionlivevisible: true
}

export default DefaultDashboard
