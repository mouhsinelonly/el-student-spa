import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import SubNav from 'routes/Student/components/SubNav'
import moment from 'moment'

import './style.scss'
// import exams components
import QuranExamRow from './QuranExamRow'
import CenterChooser from './CenterChooser'
import ExamRow from './ExamRow'
import DemoExam from './DemoExam'

class Home extends Component {
  static propTypes = {
    events: PropTypes.array,
    subjects: PropTypes.array,
    serverdate: PropTypes.string,
    getSoftwares: PropTypes.func,
    toggleScheduleVisible: PropTypes.func,
    toggleExcuseVisible: PropTypes.func,
    getReasons: PropTypes.func,
    toggleResultVisible: PropTypes.func,
    showModal: PropTypes.func,
    recordings: PropTypes.object,
    profile: PropTypes.object,
    exams: PropTypes.object,
    schedulevisible: PropTypes.array,
    excusevisible: PropTypes.array,
    resultvisible: PropTypes.array,
    extendings: PropTypes.array
  }
  static defaultProps = {
    events: [],
    serverdate: '',
    subjects: []
  }
  componentDidMount () {
    const { getReasons, getSoftwares } = this.props
    getReasons()
    getSoftwares()
  }

  render () {
    const {
      events,
      profile: { id: studentId, centerName, gradesBlocked },
      subjects,
      serverdate,
      recordings,
      schedulevisible,
      extendings,
      showModal,
      exams,
      toggleScheduleVisible,
      toggleExcuseVisible,
      excusevisible,
      toggleResultVisible,
      resultvisible
    } = this.props

    const serverTime = moment(serverdate)

    const activityExcuseEvent = events.find(e => e.category === 'activity_excuse_order')
    const midtermExcuseEvent = events.find(e => e.category === 'mid_term_excuse_order')
    const finalExcuseEvent = events.find(e => e.category === 'excuse_test')

    const midTermEvent = events.find(e => e.category === 'mid_term_test')
    const activityEvent = events.find(e => e.category === 'short_test')
    const finalEvent = events.find(e => e.category === 'final_term_test')
    const summerEvent = events.find(e => e.category === 'final_term_test')
    const quranEvent = events.find(e => e.category === 'quran_test')
    const centersEvent = events.find(e => e.category === 'choose_centers')
    const refinalEvent = events.find(e => e.category === 'excuse_test')
    const resultEvent = events.find(e => e.category === 'result')
    const resultActivityEvent = events.find(e => e.category === 'activity_result')
    const resultMidtermEvent = events.find(e => e.category === 'midterm_result')
    const resultFinalEvent = events.find(e => e.category === 'filnal_result')

    const finalVideoPlaintEvent = events.find(e => e.category === 'final_video_plaint')
    const midtermVideoPlaintEvent = events.find(e => e.category === 'midterm_video_plaint')

    const enableResults = resultEvent && serverTime.isBetween(`${resultEvent.start_at} ${resultEvent.time_start_at}`,
      `${resultEvent.finish_at} 23:59:59`)
    
    const finalVideoPlaintEnabled = finalVideoPlaintEvent ? serverTime.isBetween(`${finalVideoPlaintEvent.start_at} ${finalVideoPlaintEvent.time_start_at}`,
      `${finalVideoPlaintEvent.finish_at} 23:59:59`) : false

    const midtermVideoPlaintEnabled = midtermVideoPlaintEvent ? serverTime.isBetween(`${midtermVideoPlaintEvent.start_at} ${midtermVideoPlaintEvent.time_start_at}`,
      `${midtermVideoPlaintEvent.finish_at} 23:59:59`) : false

    const enableActivityResults =
      resultActivityEvent &&
      serverTime.isBetween(`${resultActivityEvent.start_at} ${resultActivityEvent.time_start_at}`,
        `${resultActivityEvent.finish_at} 23:59:59`)

    const enableFinalResults = !gradesBlocked && resultFinalEvent && serverTime.isBetween(`${resultFinalEvent.start_at} ${resultFinalEvent.time_start_at}`, `${resultFinalEvent.finish_at} 23:59:59`)

    const enableMidtermResults = (resultMidtermEvent &&
      serverTime.isBetween(`${resultMidtermEvent.start_at} ${resultMidtermEvent.time_start_at}`,
        `${resultMidtermEvent.finish_at} ${resultMidtermEvent.time_finish_at}`))

    const activityExcuseEnabled =
      activityExcuseEvent &&
      serverTime.isBetween(`${activityExcuseEvent.start_at} ${activityExcuseEvent.time_start_at}`,
        `${activityExcuseEvent.finish_at} 23:59:59`, 'seconds')

    const midtermExcuseEnabled =
      midtermExcuseEvent &&
      serverTime.isBetween(`${midtermExcuseEvent.start_at} ${midtermExcuseEvent.time_start_at}`,
        `${midtermExcuseEvent.finish_at} 23:59:59`, 'seconds')

    const finalExcuseEnabled =
      !finalExcuseEvent || (finalExcuseEvent &&
      serverTime.isBetween(`${finalExcuseEvent.start_at} ${finalExcuseEvent.time_start_at}`,
        `${finalExcuseEvent.finish_at} 23:59:59`, 'seconds'))

    let runningExamsElements = []
    let passedExamsElements = []
    let futureExamsElements = []

    if (
      centersEvent &&
      serverTime.isBetween(centersEvent.start_at, `${centersEvent.finish_at} 23:59:59`, 'seconds')
    ) {
      runningExamsElements.push(<CenterChooser key='centerchooser' rechoosecenter />)
    }
    const examsKeys = Object.keys(exams)
    if (examsKeys.length) {
      let skipActivity = false
      let skipMidterm = false
      let skipSummer = false
      let skipFinal = false
      let skipRefinal = false
      for (let k of examsKeys) {
        if (
          exams[k].type === 'activity' &&
          !skipActivity &&
          activityEvent &&
          moment(activityEvent.start_at).isAfter(serverTime)
        ) {
          const activityExams = Object.keys(exams)
            .map(k => exams[k].type === 'activity' && exams[k])
            .filter(e => e !== false)
          futureExamsElements.push(
            <ExamRow
              onToggleSchedule={toggleScheduleVisible}
              onToggleExcuse={toggleExcuseVisible}
              showModal={showModal}
              enableResults={enableActivityResults}
              type='activity'
              enableExcuses={activityExcuseEnabled}
              excusevisible={excusevisible.findIndex(i => i === exams[k].id) > -1}
              schedulevisible={schedulevisible.findIndex(i => i === exams[k].id) > -1}
              key={'exams-activity'}
              exams={activityExams}
            />
          )
          skipActivity = true
        }
        if (exams[k].type === 'final' && !skipFinal &&
          ((finalEvent && moment(finalEvent.start_at).isAfter(serverTime)) || !finalEvent)) {
          const finalExams = Object.keys(exams)
            .map(k => exams[k].type === 'final' && exams[k])
            .filter(e => e !== false)
          futureExamsElements.push(
            <ExamRow
              onToggleSchedule={toggleScheduleVisible}
              onToggleExcuse={toggleExcuseVisible}
              showModal={showModal}
              enableResults={enableFinalResults}
              type='final'
              enableExcuses={finalExcuseEnabled}
              excusevisible={excusevisible.findIndex(i => i === exams[k].id) > -1}
              schedulevisible={schedulevisible.findIndex(i => i === exams[k].id) > -1}
              key={'exams-final'}
              exams={finalExams}
            />
          )
          skipFinal = true
        }
        if (
          exams[k].type === 'final' &&
          !skipFinal &&
          finalEvent &&
          moment(finalEvent.start_at).isBefore(serverTime) &&
          moment(finalEvent.finish_at).isAfter(serverTime)
        ) {
          const finalExams = Object.keys(exams)
            .map(k => exams[k].type === 'final' && exams[k])
            .filter(e => e !== false)
          runningExamsElements.push(
            <ExamRow
              onToggleSchedule={toggleScheduleVisible}
              onToggleExcuse={toggleExcuseVisible}
              showModal={showModal}
              enableResults={enableFinalResults}
              type='final'
              enableExcuses={finalExcuseEnabled}
              excusevisible={excusevisible.findIndex(i => i === exams[k].id) > -1}
              schedulevisible={schedulevisible.findIndex(i => i === exams[k].id) > -1}
              key={'exams-final'}
              exams={finalExams}
            />
          )
          skipFinal = true
        }
        if (
          exams[k].type === 'final' &&
          !skipFinal &&
          finalEvent &&
          moment(finalEvent.finish_at).isBefore(serverTime)
        ) {
          const finalExams = Object.keys(exams)
            .map(k => exams[k].type === 'final' && exams[k])
            .filter(e => e !== false)
          passedExamsElements.push(
            <ExamRow
              videoPlaintEnabled={finalVideoPlaintEnabled}
              onToggleSchedule={toggleScheduleVisible}
              onToggleExcuse={toggleExcuseVisible}
              onToggleResult={toggleResultVisible}
              showModal={showModal}
              enableResults={enableFinalResults}
              type='final'
              enableExcuses={finalExcuseEnabled}
              resultvisible={resultvisible.findIndex(i => i === exams[k].id) > -1}
              excusevisible={excusevisible.findIndex(i => i === exams[k].id) > -1}
              schedulevisible={schedulevisible.findIndex(i => i === exams[k].id) > -1}
              key={'exams-final'}
              exams={finalExams}
            />
          )
          skipFinal = true
        }
        // console.log(summerEvent)
        if (
          exams[k].type === 'summer' &&
          !skipSummer &&
          ((summerEvent && moment(summerEvent.start_at).isAfter(serverTime)) || !summerEvent)
        ) {
          const summerExams = Object.keys(exams)
            .map(k => exams[k].type === 'summer' && exams[k])
            .filter(e => e !== false)
          futureExamsElements.push(
            <ExamRow
              onToggleSchedule={toggleScheduleVisible}
              onToggleExcuse={toggleExcuseVisible}
              showModal={showModal}
              enableResults={enableFinalResults}
              type='summer'
              enableExcuses={finalExcuseEnabled}
              excusevisible={excusevisible.findIndex(i => i === exams[k].id) > -1}
              schedulevisible={schedulevisible.findIndex(i => i === exams[k].id) > -1}
              key={'exams-summer'}
              exams={summerExams}
            />
          )
          skipSummer = true
        }
        if (
          exams[k].type === 'summer' &&
          !skipSummer &&
          summerEvent &&
          moment(summerEvent.start_at).isBefore(serverTime) &&
          moment(summerEvent.finish_at).isAfter(serverTime)
        ) {
          const summerExams = Object.keys(exams)
            .map(k => exams[k].type === 'summer' && exams[k])
            .filter(e => e !== false)
          runningExamsElements.push(
            <ExamRow
              onToggleSchedule={toggleScheduleVisible}
              onToggleExcuse={toggleExcuseVisible}
              showModal={showModal}
              enableResults={enableFinalResults}
              type='summer'
              enableExcuses={finalExcuseEnabled}
              excusevisible={excusevisible.findIndex(i => i === exams[k].id) > -1}
              schedulevisible={schedulevisible.findIndex(i => i === exams[k].id) > -1}
              key={'exams-summer'}
              exams={summerExams}
            />
          )
          skipSummer = true
        }
        if (
          exams[k].type === 'summer' &&
          !skipSummer &&
          summerEvent &&
          moment(summerEvent.finish_at).isBefore(serverTime)
        ) {
          const summerExams = Object.keys(exams)
            .map(k => exams[k].type === 'summer' && exams[k])
            .filter(e => e !== false)
          passedExamsElements.push(
            <ExamRow
              videoPlaintEnabled={finalVideoPlaintEnabled}
              onToggleSchedule={toggleScheduleVisible}
              onToggleExcuse={toggleExcuseVisible}
              onToggleResult={toggleResultVisible}
              showModal={showModal}
              enableResults={enableFinalResults}
              type='summer'
              enableExcuses={finalExcuseEnabled}
              resultvisible={resultvisible.findIndex(i => i === exams[k].id) > -1}
              excusevisible={excusevisible.findIndex(i => i === exams[k].id) > -1}
              schedulevisible={schedulevisible.findIndex(i => i === exams[k].id) > -1}
              key={'exams-summer'}
              exams={summerExams}
            />
          )
          skipSummer = true
        }
        if (
          exams[k].type === 'midterm' &&
          !skipMidterm &&
          midTermEvent &&
          moment(midTermEvent.start_at).isBefore(serverTime) &&
          moment(midTermEvent.finish_at).isAfter(serverTime)
        ) {
          const midtermExams = Object.keys(exams)
            .map(k => exams[k].type === 'midterm' && exams[k])
            .filter(e => e !== false)
          runningExamsElements.push(
            <ExamRow
              onToggleSchedule={toggleScheduleVisible}
              onToggleExcuse={toggleExcuseVisible}
              showModal={showModal}
              enableResults={enableMidtermResults}
              hasChosenCenter
              type='midterm'
              enableExcuses={midtermExcuseEnabled}
              excusevisible={excusevisible.findIndex(i => i === exams[k].id) > -1}
              schedulevisible={schedulevisible.findIndex(i => i === exams[k].id) > -1}
              key={'exams-midterm'}
              exams={midtermExams}
            />
          )
          skipMidterm = true
        }
        if (
          exams[k].type === 'activity' &&
          !skipActivity &&
          activityEvent &&
          moment(activityEvent.start_at).isBefore(serverTime) &&
          moment(`${activityEvent.finish_at} 23:59:59`).isAfter(serverTime)
        ) {
          const activityExams = Object.keys(exams)
            .map(k => exams[k].type === 'activity' && exams[k])
            .filter(e => e !== false)
          runningExamsElements.push(
            <ExamRow
              onToggleSchedule={toggleScheduleVisible}
              onToggleExcuse={toggleExcuseVisible}
              showModal={showModal}
              enableResults={enableActivityResults}
              type='activity'
              enableExcuses={activityExcuseEnabled}
              excusevisible={excusevisible.findIndex(i => i === exams[k].id) > -1}
              schedulevisible={schedulevisible.findIndex(i => i === exams[k].id) > -1}
              key={'exams-activity'}
              exams={activityExams}
            />
          )
          skipActivity = true
        }
        if (
          exams[k].type === 'refinal' &&
          !skipRefinal &&
          refinalEvent &&
          moment(refinalEvent.start_at).isAfter(serverTime)
        ) {
          const refinalExams = Object.keys(exams)
            .map(k => exams[k].type === 'refinal' && exams[k])
            .filter(e => e !== false)
          futureExamsElements.push(
            <ExamRow
              onToggleSchedule={toggleScheduleVisible}
              onToggleExcuse={toggleExcuseVisible}
              showModal={showModal}
              enableResults={enableResults}
              type='refinal'
              excusevisible={excusevisible.findIndex(i => i === exams[k].id) > -1}
              schedulevisible={schedulevisible.findIndex(i => i === exams[k].id) > -1}
              key={'exams-refinal'}
              exams={refinalExams}
            />
          )
          skipRefinal = true
        }
        if (
          exams[k].type === 'refinal' &&
          !skipRefinal &&
          refinalEvent &&
          moment(refinalEvent.start_at).isBefore(serverTime) &&
          moment(refinalEvent.finish_at).isAfter(serverTime)
        ) {
          const refinalExams = Object.keys(exams)
            .map(k => exams[k].type === 'refinal' && exams[k])
            .filter(e => e !== false)
          runningExamsElements.push(
            <ExamRow
              onToggleSchedule={toggleScheduleVisible}
              onToggleExcuse={toggleExcuseVisible}
              showModal={showModal}
              enableResults={enableResults}
              type='refinal'
              excusevisible={excusevisible.findIndex(i => i === exams[k].id) > -1}
              schedulevisible={schedulevisible.findIndex(i => i === exams[k].id) > -1}
              key={'exams-refinal'}
              exams={refinalExams}
            />
          )
          skipRefinal = true
        }
        if (
          exams[k].type === 'midterm' &&
          !skipMidterm &&
          midTermEvent &&
          moment(midTermEvent.start_at).isAfter(serverTime)
        ) {
          const midtermExams = Object.keys(exams)
            .map(k => exams[k].type === 'midterm' && exams[k])
            .filter(e => e !== false)
          futureExamsElements.push(
            <ExamRow
              onToggleSchedule={toggleScheduleVisible}
              onToggleExcuse={toggleExcuseVisible}
              showModal={showModal}
              enableResults={enableMidtermResults}
              hasChosenCenter
              type='midterm'
              enableExcuses={midtermExcuseEnabled}
              excusevisible={excusevisible.findIndex(i => i === exams[k].id) > -1}
              schedulevisible={schedulevisible.findIndex(i => i === exams[k].id) > -1}
              key={'exams-midterm'}
              exams={midtermExams}
            />
          )
          skipMidterm = true
        }
        if (
          exams[k].type === 'midterm' &&
          !skipMidterm &&
          midTermEvent &&
          moment(midTermEvent.finish_at).isBefore(serverTime)
        ) {
          const midtermExams = Object.keys(exams)
            .map(k => exams[k].type === 'midterm' && exams[k])
            .filter(e => e !== false)
          passedExamsElements.push(
            <ExamRow
              videoPlaintEnabled={midtermVideoPlaintEnabled}
              onToggleSchedule={toggleScheduleVisible}
              onToggleExcuse={toggleExcuseVisible}
              onToggleResult={toggleResultVisible}
              showModal={showModal}
              enableResults={enableMidtermResults}
              hasChosenCenter
              type='midterm'
              enableExcuses={midtermExcuseEnabled}
              resultvisible={resultvisible.findIndex(i => i === exams[k].id) > -1}
              excusevisible={excusevisible.findIndex(i => i === exams[k].id) > -1}
              schedulevisible={schedulevisible.findIndex(i => i === exams[k].id) > -1}
              key={'exams-midterm'}
              exams={midtermExams}
            />
          )
          skipMidterm = true
        }
        if (
          exams[k].type === 'refinal' &&
          !skipRefinal &&
          refinalEvent &&
          moment(refinalEvent.finish_at).isBefore(serverTime)
        ) {
          const refinalExams = Object.keys(exams)
            .map(k => exams[k].type === 'refinal' && exams[k])
            .filter(e => e !== false)
          futureExamsElements.push(
            <ExamRow
              onToggleSchedule={toggleScheduleVisible}
              onToggleExcuse={toggleExcuseVisible}
              onToggleResult={toggleResultVisible}
              showModal={showModal}
              enableResults={enableResults}
              type='refinal'
              resultvisible={resultvisible.findIndex(i => i === exams[k].id) > -1}
              excusevisible={excusevisible.findIndex(i => i === exams[k].id) > -1}
              schedulevisible={schedulevisible.findIndex(i => i === exams[k].id) > -1}
              key={'exams-refinal'}
              exams={refinalExams}
            />
          )
          skipRefinal = true
        }
        if (
          exams[k].type === 'activity' &&
          !skipActivity &&
          activityEvent &&
          moment(`${activityEvent.finish_at} 23:59:59`).isBefore(serverTime)
        ) {
          const activityExams = Object.keys(exams)
            .map(k => exams[k].type === 'activity' && exams[k])
            .filter(e => e !== false)
          passedExamsElements.push(
            <ExamRow

              onToggleSchedule={toggleScheduleVisible}
              onToggleExcuse={toggleExcuseVisible}
              onToggleResult={toggleResultVisible}
              showModal={showModal}
              enableResults={enableActivityResults}
              type='activity'
              enableExcuses={activityExcuseEnabled}
              excusevisible={excusevisible.findIndex(i => i === exams[k].id) > -1}
              resultvisible={resultvisible.findIndex(i => i === exams[k].id) > -1}
              schedulevisible={schedulevisible.findIndex(i => i === exams[k].id) > -1}
              key={'exams-activity-past'}
              exams={activityExams}
            />
          )
          skipActivity = true
        }
      }
    }

    // start quran code

    const quranSubjects = subjects.filter(s => s.is_quran === 1 && s.tilawa_grade_old !== 'quran_recordings')

    if (quranEvent &&
      serverTime.isAfter(moment(`${quranEvent.start_at} ${quranEvent.time_start_at}`)) &&
      serverTime.isBefore(moment(`${quranEvent.finish_at} ${quranEvent.time_finish_at}`))) {
      for (const subject of quranSubjects) {
        if (subject.semester_id <= 9) continue
        let extend = extendings.find(e => e.subject_id === subject.id)
        if (!extend && !quranEvent) continue
        let startAt
        let finishAt

        if (extend) {
          startAt = extend ? extend.start_at : ''
          finishAt = extend ? extend.finish_at : ''
        } else {
          startAt = quranEvent.start_at
          finishAt = `${quranEvent.finish_at} ${quranEvent.time_finish_at}`
        }

        const recordingIndex = Object.keys(recordings).find(k => parseInt(recordings[k].subject_id, 10) === subject.id)
        let recording = recordings && recordingIndex ? recordings[recordingIndex] : {}

        runningExamsElements.push(
          <QuranExamRow
            key={subject.id}
            retries={extend ? extend.maximum_recordings : 0}
            recording={recording}
            studentId={studentId}
            subjectId={subject.id}
            startAt={startAt}
            rules={quranEvent.instructions}
            enableResults={enableResults}
            finishAt={finishAt}
            serverdate={serverdate}
            {...subject}
          />
        )
      }
    }
    if (quranEvent && moment(`${quranEvent.finish_at} ${quranEvent.time_finish_at}`).isBefore(serverTime)) {
      for (const subject of quranSubjects) {
        if (subject.semester_id <= 9) continue
        let extend = extendings.filter(e => e.subject_id === subject.id)
        if (!extend) continue
        extend = extend[extend.length - 1]
        let startAt
        let finishAt
        if (extend) {
          startAt = extend ? extend.start_at : ''
          finishAt = extend ? extend.finish_at : ''
        } else {
          startAt = quranEvent.start_at
          finishAt = `${quranEvent.finish_at} ${quranEvent.time_finish_at}`
        }

        const recordingIndex = Object.keys(recordings).find(k => parseInt(recordings[k].subject_id, 10) === subject.id)
        let recording = recordings && recordingIndex ? recordings[recordingIndex] : {}

        passedExamsElements.push(
          <QuranExamRow
            key={subject.id}
            recording={recording}
            studentId={studentId}
            subjectId={subject.id}
            startAt={startAt}
            enableResults={enableResults}
            finishAt={finishAt}
            serverdate={serverdate}
            {...subject}
          />
        )
      }
    }
    if ((quranEvent && moment(`${quranEvent.start_at} ${quranEvent.time_start_at}`).isAfter(serverTime)) ||
      (!quranEvent && extendings.length)) {
      for (const subject of quranSubjects) {
        if (subject.semester_id <= 9) continue
        let extend = extendings.filter(e => e.subject_id === subject.id)
        if (!extend) continue
        extend = extend[extend.length - 1]
        let startAt
        let finishAt
        if (extend) {
          startAt = extend ? extend.start_at : ''
          finishAt = extend ? extend.finish_at : ''
        } else if (quranEvent) {
          startAt = quranEvent.start_at
          finishAt = `${quranEvent.finish_at} ${quranEvent.time_finish_at}`
        }
        const recordingIndex = Object.keys(recordings).find(k => parseInt(recordings[k].subject_id, 10) === subject.id)
        let recording = recordings && recordingIndex ? recordings[recordingIndex] : {}
        futureExamsElements.push(
          <QuranExamRow
            key={subject.id}
            retries={extend ? extend.maximum_recordings : 0}
            recording={recording}
            studentId={studentId}
            subjectId={subject.id}
            startAt={startAt}
            enableResults={enableResults}
            finishAt={finishAt}
            serverdate={serverdate}
            {...subject}
          />
        )
      }
    }

    return (
      <div className='container p-y-3'>
        <div className='row'>
          <div className='col-xs-12 col-md-10 col-md-pull-1'>
            <DemoExam />
            <h6 className={!futureExamsElements.length ? 'hidden-xs-up' : ''}>اختبارات قادمة</h6>
            {futureExamsElements}
            <h6 className={!runningExamsElements.length ? 'hidden-xs-up' : ''}>اختبارات متاحة</h6>
            {runningExamsElements}
            <h6 className={!passedExamsElements.length ? 'hidden-xs-up' : ''}>اختبارات منتهية</h6>
            {passedExamsElements}
          </div>
        </div>
      </div>
    )
  }
}

export default Home
