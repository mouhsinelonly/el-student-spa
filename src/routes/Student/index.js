import React from 'react'
import { injectReducer } from 'store/reducers'
import Session from './routes/Session'
import Subject from './routes/Subject'
import Element from './routes/Element'
import Community from './routes/Community'
import Profile from './routes/Profile'
import UploadPhoto from './routes/UploadPhoto'
import Payments from './routes/Payments'
import Docs from './routes/Docs'
import Orders from './routes/Orders'
import Exams from './routes/Exams'
import ExamRecordingPlaint from './routes/ExamRecordingPlaint'
import Library from './routes/Library'
import Schedule from './routes/Schedule'
import Results from './routes/Results'
import Vlog from './routes/Vlog'
import Market from './routes/Market'
import ThesisTitles from './routes/ThesisTitles'
import ThesisDraft from './routes/ThesisDraft'
import Softwares from './routes/Softwares'
import Messages from './routes/Messages'
import Guides from './routes/Guides'
import Research from './routes/Research'
import FaceMatching from './routes/FaceMatching'
import LessonDownload from './routes/LessonDownload'
import FAQ from './routes/FAQ'
import PaymentError from './routes/PaymentError'
import { getCountries } from 'modules/countries'

export default store => ({
  path: 'student',
  childRoutes: [
    LessonDownload(store),
    FaceMatching(store),
    Market(store),
    Vlog(store),
    UploadPhoto(store),
    Subject(store),
    Community(store),
    Docs(store),
    Profile(store),
    Payments(store),
    Element(store),
    Session(store),
    Exams(store),
    ExamRecordingPlaint(store),
    Orders(store),
    Library(store),
    Schedule(store),
    Messages(store),
    Research(store),
    Softwares(store),
    FAQ(store),
    Guides(store),
    Results(store),
    ThesisTitles(store),
    ThesisDraft(store),
    PaymentError(store)
  ],
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure(
      [],
      require => {
        /*  Webpack - use require callback to define
          dependencies for bundling   */
        const Student = require('./containers/StudentContainer').default

        const reducer = require('./modules/student').default

        /*  Add the reducer to the store on key 'student'  */
        injectReducer(store, { key: 'student', reducer })

        const registrations = require('./modules/registrations').default
        /*  Add the reducer to the store on key 'student'  */
        injectReducer(store, { key: 'registrations', reducer: registrations })

        const windowReducer = require('modules/window').default

        injectReducer(store, { key: 'window', reducer: windowReducer })

        const communiyReducer = require('./modules/community').default
        /*  Add the reducer to the store on key 'programme'  */
        injectReducer(store, { key: 'studentCommunity', reducer: communiyReducer })

        const chatBoxReducer = require('modules/chatbox').default

        const ticketsReducer = require('./modules/tickets').default

        const classroomsReducer = require('./modules/classrooms').default

        injectReducer(store, { key: 'classrooms', reducer: classroomsReducer })

        const excusesReducer = require('./modules/excuses').default

        injectReducer(store, { key: 'excuses', reducer: excusesReducer })

        const semesterEventsReducer = require('./modules/semester_events').default

        injectReducer(store, { key: 'semester_events', reducer: semesterEventsReducer })

        const quranReducer = require('./modules/quran').default

        injectReducer(store, { key: 'quran', reducer: quranReducer })

        const netWorkReducer = require('modules/network').default

        injectReducer(store, { key: 'network', reducer: netWorkReducer })

        const gcmReducer = require('./modules/gcm').default

        injectReducer(store, { key: 'gcm', reducer: gcmReducer })

        const countriesReducer = require('modules/countries').default

        injectReducer(store, { key: 'countries', reducer: countriesReducer })

        const summerReducer = require('./modules/summer').default

        injectReducer(store, { key: 'summer', reducer: summerReducer })

        const studentSettingsReducer = require('./modules/settings').default

        injectReducer(store, { key: 'settings', reducer: studentSettingsReducer })

        const faceMatchReducer = require('./modules/facematching').default

        injectReducer(store, { key: 'facematching', reducer: faceMatchReducer })

        const libraryReducer = require('./modules/library').default

        injectReducer(store, { key: 'library', reducer: libraryReducer })

        const elementVideoReducer = require('./modules/element_video').default

        injectReducer(store, { key: 'elementvideo', reducer: elementVideoReducer })

        injectReducer(store, { key: 'chatbox', reducer: chatBoxReducer })

        injectReducer(store, { key: 'tickets', reducer: ticketsReducer })

        const subjectsReducer = require('./modules/subjects').default

        const thesisReducer = require('./modules/thesis').default

        injectReducer(store, { key: 'thesis', reducer: thesisReducer })

        const lessonsReducer = require('./modules/lessons').default

        injectReducer(store, { key: 'lessons', reducer: lessonsReducer })

        const softwareReducer = require('routes/Student/modules/softwares').default

        injectReducer(store, { key: 'softwares', reducer: softwareReducer })

        const sessionsReducer = require('./modules/sessions').default

        injectReducer(store, { key: 'sessions', reducer: sessionsReducer })

        const uploadProgressReducer = require('modules/upload').default

        injectReducer(store, { key: 'uploadProgress', reducer: uploadProgressReducer })

        const documentsReducer = require('./modules/documents').default

        injectReducer(store, { key: 'documents', reducer: documentsReducer })

        const examsReducer = require('./modules/exams').default

        injectReducer(store, { key: 'exams', reducer: examsReducer })

        const researchesReducer = require('./modules/researches').default

        injectReducer(store, { key: 'researches', reducer: researchesReducer })

        const ordersReducer = require('./modules/orders').default

        injectReducer(store, { key: 'orders', reducer: ordersReducer })

        const semestersReducer = require('./modules/semesters').default

        injectReducer(store, { key: 'semesters', reducer: semestersReducer })

        const gradesReducer = require('./modules/grades').default

        injectReducer(store, { key: 'grades', reducer: gradesReducer })

        const examCenterReducers = require('./modules/exam_centers').default

        injectReducer(store, { key: 'examcenters', reducer: examCenterReducers })

        const scheduleReducer = require('./modules/schedule').default

        injectReducer(store, { key: 'schedule', reducer: scheduleReducer })

        const messagesReducer = require('./modules/messages').default

        injectReducer(store, { key: 'messages', reducer: messagesReducer })

        const paymentViewReducer = require('modules/paymentview').default

        injectReducer(store, { key: 'paymentview', reducer: paymentViewReducer })

        const serverDateReducer = require('./modules/serverdate').default

        injectReducer(store, { key: 'serverdate', reducer: serverDateReducer })

        const modalsReducer = require('modules/modals').default

        injectReducer(store, { key: 'modals', reducer: modalsReducer })

        const paymentsReducer = require('./modules/payments').default

        const uiReducer = require('./modules/ui').default

        injectReducer(store, { key: 'studentui', reducer: uiReducer })

        const faqReducer = require('./modules/faq').default

        injectReducer(store, { key: 'faq', reducer: faqReducer })

        injectReducer(store, { key: 'subjects', reducer: subjectsReducer })

        injectReducer(store, { key: 'payments', reducer: paymentsReducer })

        store.dispatch(getCountries())

        /*  Return getComponent   */
        cb(null, Student)

        /* Webpack named bundle   */
      },
      'student'
    )
  }
})
