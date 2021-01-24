// @flow
import React, { useEffect } from 'react'
import moment from 'moment'
import { useSelector, useDispatch } from 'react-redux'
import { actions, getDrafts, getResources, setTeacherId, getSessions } from 'routes/Student/modules/thesis'
import PresenterChooser from './components/PresenterChooser'
import WaitingMessage from './components/WaitingMessage'
import PresenterBlock from './components/PresenterBlock'
import Instructions from './components/Instructions'
import UploadDraft from './components/UploadDraft'
import WorkSteps from './components/WorkSteps'
import DraftBlock from './components/DraftBlock'
import ThesisSessionBlock from './components/ThesisSessionBlock'
import SiminarSession from './components/SiminarSession'
import Loading from 'components/Loading'

const { getSteps, getChosenTeachers } = actions

const waitingTeacherMessage = `ستقوم اللجنة بمراجعة اتقراحك، حيث ستقوم إما بالموافقة عليه أو 
تغيير المشرف أو إضافة مشرف مساعد لدواعي جودة البحث`

const waitingSiminarMessage = `جاري مراجعة خطة البحث، وترتيب متطلبات السيمينار من تحديد قائمة المجلس
وتاريخ ووقت السيمينار`

type PropertiesType = {
  onToggleVisibility: Function
};

const inlineStyle = { display: 'inline-block', verticalAlign: 'middle' }

const ThesisPortal = ({ onToggleVisibility }: PropertiesType): React.Element<'div'> => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getSessions())
    dispatch(getDrafts())
    dispatch(getSteps())
    dispatch(getResources())
    dispatch(getChosenTeachers())
  }, [])
  const {
    steps,
    drafts,
    sessions,
    draftsLoading,
    loadingSteps,
    loadingChosenTeachers,
    chosenTeachers
  } = useSelector((state: Object): Object => state.thesis)

  useEffect(() => {
    if (chosenTeachers.length > 0) {
      dispatch(setTeacherId(chosenTeachers[0].id))
    }
  }, [chosenTeachers])
  const activeStep = steps.find((step: Object): boolean => step.active === 1)

  const isPresenterStep = steps.some((step: Object): boolean => step.active === 1 && step.step === 'presenter')

  const isUploadStep = steps.some((step: Object): boolean => step.active === 1 && step.step === 'upload')

  const isWorkStep = steps.some((step: Object): boolean => step.active === 1 && step.step === 'work')

  const isSiminarStep = steps.some((step: Object): boolean => step.active === 1 && step.step === 'siminar')

  const showHeadings = (isUploadStep || isWorkStep)

  const { data: events } = useSelector((state: Object): Object => state.semester_events)

  const serverdate = useSelector((state: Object): Object => state.serverdate)

  const serverTime = moment(serverdate)

  const choosePresenterEvent = events.find((e: Object): boolean => e.category === 'choose_thesis_presenter')

  const enableChoosePresenter =
      choosePresenterEvent &&
      serverTime.isBetween(`${choosePresenterEvent.start_at} ${choosePresenterEvent.time_start_at}`,
        `${choosePresenterEvent.finish_at} 23:59:59`)

  if (loadingSteps) {
    return <Loading />
  }

  if (!choosePresenterEvent && steps.length === 0) {
    return <div />
  }

  if (isPresenterStep || (steps.length === 0 && !loadingSteps)) {
    if (!enableChoosePresenter) {
      return <div>انتهت فترة اختيار المشرف</div>
    }
    return <PresenterChooser finishAt={choosePresenterEvent ? choosePresenterEvent.finish_at : null} />
  }
  const draftApproved = Object.keys(drafts).some((draftKey: Object): boolean => drafts[draftKey].approved)

  const isTeacherWaiting = !loadingChosenTeachers && chosenTeachers
  .some((teacher: Object): boolean => teacher.status === 'waiting')

  const sessionsData = !isTeacherWaiting ? <React.Fragment>
    {showHeadings ? <h6 className='font-weight-bold p-b-2'>اللقائات</h6> : null }
    {(isUploadStep || isWorkStep) ? sessions.map((session: Object): React.Node => <ThesisSessionBlock
      link={session.link}
      key={session.id}
      recording={session.recordingLink}
      status={session.status}
      photoUrl={session.photoUrl}
      startAt={session.startAt}
      teacherName={session.teacherName} />) : null}
  </React.Fragment> : null

  return <div className='p-a-2 col-xs-12 col-sm-10 col-sm-pull-1' style={{ overflow: 'scroll', height:'100%' }}>
    <button className='btn hidden-sm-up btn-white pull-xs-left'
      onClick={(): Function => onToggleVisibility({ chat: true, steps: false })}>
      <i className='material-icons' style={inlineStyle}>comment</i> المراسلات
    </button>
    <button className='btn hidden-sm-up btn-white'
      onClick={(): Function => onToggleVisibility({ chat: false, steps: true })}>
      <i className='material-icons' style={inlineStyle}>done_all</i> المراحل
    </button>
    {isWorkStep ? <WorkSteps /> : null }
    <div className='clearfix' />
    {(!isTeacherWaiting && !draftsLoading && !draftApproved && isUploadStep) ? <UploadDraft /> : null }
    {sessionsData}
    {showHeadings ? <h6 className='font-weight-bold p-b-2'>{isTeacherWaiting ? 'حائط التحديثات' : 'حائط التسليمات'}</h6> : null }
    {isTeacherWaiting
    ? <div>
      <WaitingMessage title='جاري مراجعة اقتراحك' description={waitingTeacherMessage} />
      {chosenTeachers.map((teacher: Object): React.Element<typeof PresenterBlock> =>
        <PresenterBlock
          key={teacher.id}
          name={teacher.name}
          photoUrl={teacher.photoUrl}
          cvFileUrl={teacher.cvFileUrl}
          degree={teacher.degree} />)}
    </div> : null }
    {isSiminarStep && sessions.length === 0
      ? <WaitingMessage title='جاري تحديد موعد السيمينار' description={waitingSiminarMessage} />
      : null
    }
    {
      isSiminarStep ? <React.Fragment>
        {sessions.map((session: Object): boolean => <SiminarSession
          status={session.status}
          startAt={session.startAt}
          link={session.link}
          recording={session.recordingLink}
          days={session.days}
          key={session.id} />)}
      </React.Fragment> : null
    }
    {!isTeacherWaiting ? <div>
      {Object.keys(drafts).map((key: string): React.Element<'div'> => <DraftBlock heading={drafts[key].heading}
        filetype={drafts[key].filetype}
        filePath={drafts[key].filePath}
        status={drafts[key].status}
        id={drafts[key].id}
        stepType={isWorkStep ? 'work' : 'upload'}
        isSiminar={isSiminarStep}
        approved={drafts[key].approved}
        totalNotes={drafts[key].totalNotes}
        description={drafts[key].description}
        last={drafts[key].last === 1}
        createdAt={drafts[key].createdAtAr}
        key={drafts[key].id} />)}
      <Instructions key='0' />
    </div> : null }
  </div>
}

export default ThesisPortal
