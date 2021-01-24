// @flow
import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import QuranRecordingPlayer from 'components/Players/QuranRecordingPlayer'
import ErrorBoundary from 'components/ErrorBoundries'
import { triesNumberToString, unserialize } from 'utils'
import './style.scss'
import { postExtendRecording } from 'routes/Users/modules/tilawa'

type PropsType = {
  recordings: Array<Object>
};

const StudentTilawa = (Properties: PropsType): React.Element<'div'> => {
  const { updatingRecording, activeStudentRecordings: recordings } =
  useSelector((state: Object): Object => state.user_tilawa)
  return (
    <div className='v2-ticket-student-tilawa p-b-2'>
      <h1 className='v2-ticket-student-tilawa__title is-active p-y-2 p-x-2'>التلاوة</h1>
      <div>
        {recordings.map((r: Object): React.Element<typeof Record> =>
          <Record updating={updatingRecording} {...r} key={r.id} />)}
      </div>
      <div className={`${!recordings.length ? '' : 'hidden-xs-up'} v2-ticket-student-tilawa__notilawa p-x-2`}>
        لا يوجد
      </div>
      <div className='clearfix' />
    </div>
  )
}

type RecordType = {
  subject_name: string,
  quran_video: string,
  student_id: number,
  id: number,
  updating: boolean,
  tilawa_note: string,
  tilawa_grade: number,
  extra_tries: number,
  remaining: number
};

const Record = (Properties: RecordType): React.Element<'div'> => {
  const dispatch = useDispatch()

  const {
    subject_name: subjectName,
    quran_video: streamName,
    remaining,
    extra_tries: extraTries,
    student_id: studentId,
    id,
    valid,
    updating,
    tilawa_grade: grade,
    tilawa_note:
    note } = Properties

  const onIncrement = () => {
    dispatch(postExtendRecording(id, studentId))
  }

  const notes = unserialize(note)
  const notesKeys = notes ? Object.keys(notes) : []
  return <div className='row p-x-0 m-x-0 v2-ticket-student-tilawa__row p-y-2'>
    <div className='col-xs-4 p-x-0 p-r-1'>
      <QuranRecordingPlayer
        streamName={streamName}
        className='v2-ticket-student-tilawa__video'
        height={90}
        controls
        autoPlay={false} />
    </div>
    <div className='col-xs-8 p-l-1'>
      <div className='v2-ticket-student-tilawa__record-subjectname m-b-1'>
        <b>{subjectName}</b> { valid ? <i className='material-icons text-success' style={{
          verticalAlign: 'middle',
          display: 'inline-block',
          textSize: 10
        }}>check_circle</i> : ''}
      </div>
      <div className='col-xs-6 p-x-0'>
        {triesNumberToString(remaining)}
      </div>
      <div className='col-xs-6 p-l-0'>
        <div className='v2-ticket-student-tilawa__record-controls'>
          <button onClick={onIncrement} className='v2-ticket-student-tilawa__record-control is-plus'
            disabled={remaining > 3 || updating || extraTries >= 3}>+</button>
        </div>
      </div>
      <div className='clearfix m-b-1' />
      <div className={`${!grade ? 'col-xs-12' : 'col-xs-4'} p-x-0`}>
        {!grade ? 'لم يقوم بعد...' : 'التقويم'}
      </div>
    </div>
    <div className='clearfix' />
    <ErrorBoundary>
      <ol className={`v2-ticket-student-tilawa__comment p-a-1 p-r-2 m-t-1
          ${!notesKeys.length ? 'hidden-xs-up' : ''}`}>
        {notesKeys.map((n: string, i: number): React.Element<'li'> =>
          <li key={i}>{notes[n]}</li>)}
      </ol>
    </ErrorBoundary>
  </div>
}

export default StudentTilawa
