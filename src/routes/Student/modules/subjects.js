// @flow
import request from 'superagent'
import { APIBASE, theSessionNumberToString } from 'utils'
import { ELEMENT_SET_VIDEO_WATCHED_SUCCESS, ELEMENT_SET_VIDEO_SEEKED_SUCCESS } from './element_video'
import { GET_SESSIONS_SUCCESS } from './sessions'
import update from 'immutability-helper'
import { showModal, closeModal } from 'modules/modals'
import moment from 'moment'
// ------------------------------------
// Constants
// ------------------------------------
export const GET_SUBJECTS = 'subjects.GET_SUBJECTS'
export const GET_SUBJECTS_LOADING = 'subjects.GET_SUBJECTS_LOADING'
export const GET_SUBJECTS_SUCCESS = 'subjects.GET_SUBJECTS_SUCCESS'
export const GET_SUBJECTS_FAILURE = 'subjects.GET_SUBJECTS_FAILURE'

export const GET_SUBJECTS_LESSONS_REQUEST = 'subjects.GET_SUBJECTS_LESSONS_REQUEST'
export const GET_SUBJECTS_LESSONS_SUCCESS = 'subjects.GET_SUBJECTS_LESSONS_SUCCESS'
export const GET_SUBJECTS_LESSONS_FAILURE = 'subjects.GET_SUBJECTS_LESSONS_FAILURE'

export const GET_SUBJECTS_FORUMS_SUCCESS = 'subjects.GET_SUBJECTS_FORUMS_SUCCESS'
export const GET_SUBJECTS_FORUMS_REQUEST = 'subjects.GET_SUBJECTS_FORUMS_REQUEST'

export const GET_FAIL_SUBJECTS_SUCCESS = 'subjects.GET_FAIL_SUBJECTS_SUCCESS'
export const GET_FAIL_SUBJECTS_REQUEST = 'subjects.GET_FAIL_SUBJECTS_REQUEST'

export const STORE_FAIL_SUBJECTS_SUCCESS = 'subjects.STORE_FAIL_SUBJECTS_SUCCESS'
export const STORE_FAIL_SUBJECTS_REQUEST = 'subjects.STORE_FAIL_SUBJECTS_REQUEST'

export const SUBMIT_SUBJECT_FORUM_POST_SUCCESS = 'subjects/SUBMIT_SUBJECT_FORUM_POST_SUCCESS'
export const SUBMIT_SUBJECT_FORUM_POST_REQUEST = 'subjects/SUBMIT_SUBJECT_FORUM_POST_REQUEST'

export const SET_SUBJECT_HAS_PLAINT = 'subjects.SET_SUBJECT_HAS_PLAINT'
// ------------------------------------
// Actions
// ------------------------------------
//

const getDiscussLessons = (order: number, hours: number, total: number): Object => ({
  [`1-3`]: '1 \u00A0\u00A0.\u00A0\u00A0 2 \u00A0\u00A0.\u00A0\u00A0 3 \u00A0\u00A0.\u00A0\u00A0 4',
  [`2-3`]: '5 \u00A0\u00A0.\u00A0\u00A0 6 \u00A0\u00A0.\u00A0\u00A0 7 \u00A0\u00A0.\u00A0\u00A0 8',
  [`3-3`]: '9 \u00A0\u00A0.\u00A0\u00A0 10 \u00A0\u00A0.\u00A0\u00A0 11 \u00A0\u00A0.\u00A0\u00A0 12',
  [`4-3`]: '13 \u00A0\u00A0.\u00A0\u00A0 14 \u00A0\u00A0.\u00A0\u00A0 15 \u00A0\u00A0.\u00A0\u00A0 16',
  [`5-3`]: `17 إلى ${total}`,
  [`6-3`]: 'مراجعة شاملة',
  [`1-2`]: '1 \u00A0\u00A0.\u00A0\u00A0 2 \u00A0\u00A0.\u00A0\u00A0 3',
  [`2-2`]: '4 \u00A0\u00A0.\u00A0\u00A0 5 \u00A0\u00A0.\u00A0\u00A0 6 \u00A0\u00A0.\u00A0\u00A0 7',
  [`3-2`]: '8 \u00A0\u00A0.\u00A0\u00A0 9 \u00A0\u00A0.\u00A0\u00A0 10',
  [`4-2`]: '11 \u00A0\u00A0.\u00A0\u00A0 12 \u00A0\u00A0.\u00A0\u00A0 13 \u00A0\u00A0.\u00A0\u00A0 14',
  [`5-2`]: 'مراجعة شاملة'
})[`${order}-${hours}`]

const getSessionPosition = (index: number | string, hours: number, total: number): Object => ({
  [`4-3`]: 1,
  [`8-3`]: 2,
  [`12-3`]: 3,
  [`16-3`]: 4,
  [`${total}-3`]: 5,
  [`extra-3`]: 6,
  [`3-2`]: 1,
  [`7-2`]: 2,
  [`10-2`]: 3,
  [`14-2`]: 4,
  [`extra-2`]: 5
})[`${index}-${hours}`]

function mergeSessionsWithSubjects (sessions: Array<Object> = [], subjects: Array<Object> = []): Array<Object> {
  let updatedSubjects = [...subjects]
  for (const subjectIdx in updatedSubjects) {
    if (updatedSubjects.length && +updatedSubjects[+subjectIdx].semester_id === 33) {
      continue
    }
    const subject = updatedSubjects[+subjectIdx]
    const lessonsArray = [...Array(subject.lessons.length).keys()]
    lessonsArray.push('extra')

    for (const lessonIdx of lessonsArray) {
      const updateSubject = updatedSubjects[+subjectIdx]
      const sessionOrder = getSessionPosition(typeof lessonIdx === 'number'
        ? +lessonIdx + 1
        : lessonIdx, subject.hour, subject.total_lessons)
      if (typeof sessionOrder !== 'undefined') {
        const session = sessions.sort((a: Object, b: Object): number => b.attended > a.attended ? 1 : 0)
        .find((s: Object): boolean => s.order === +sessionOrder &&
          +s.subject_id === +subject.id && +s.classroom_session.canceled === 0)
        let subtitle
        if (typeof session !== 'undefined') {
          const startAtMoment = moment(session.start_at)
          subtitle = `يوم
            ${startAtMoment.locale('en-us').format('D')}
            ${startAtMoment.locale('ar-SA').format(' MMMM ')}
            | ${startAtMoment.locale('en-us').format(' h:mm ')}
            ${startAtMoment.locale('en-us').format('a') === 'am' ? 'صباحا' : 'مساءا'}`
        }
        const newSubject = {
          ...updateSubject,
          ...{ lessons:
          [...updateSubject.lessons, new LessonMenuObject({
            id: Math.floor(Math.random() * 100000) +
            (typeof lessonIdx === 'number' ? +lessonIdx + 1 : subject.total_lessons + 1) +
            subjectIdx,
            name: theSessionNumberToString(+sessionOrder),
            subtitle,
            order: sessionOrder,
            discuss: getDiscussLessons(+sessionOrder,
              subject.hour,
              subject.total_lessons),
            subject_subject_id: updateSubject.id,
            lesson_order: typeof lessonIdx === 'number' ? +lessonIdx + 1 : subject.total_lessons + 1,
            type: 'session',
            elements: [],
            session
          }, 'session')] } }
        updatedSubjects = [
          ...updatedSubjects.slice(0, +subjectIdx),
          { ...newSubject },
          ...updatedSubjects.slice(+subjectIdx + 1)]
      }
    }
  }
  return updatedSubjects
}

const LessonMenuObject = (obj: Object, ItemType: string = 'lesson'): Object => {
  return {
    ...obj,
    ItemType
  }
}
export function setSubjectHasPlaint (plaints = []) {
  return {
    type: SET_SUBJECT_HAS_PLAINT,
    payload: plaints
  }
}

export function getSubjectsSuccess (data) {
  return function (dispatch, getState) {
    const state = getState()
    const isSummer = (state.student && state.student.profile && state.student.profile.semester &&
      state.student.profile.semester.order === 'summer')
    if (data.length && (data.filter(s => s.state !== 'uncomplete')
      .findIndex(s => s.chosen_summer === 0) >= 0) && isSummer) {
      dispatch(showModal('ChooseSummerSubjects', {}, false))
    }

    if (data.length === 0) {
      dispatch(getChooseSubjects())
    }

    dispatch({
      type: GET_SUBJECTS_SUCCESS,
      payload: {
        data: data,
        sessions: state.sessions.data
      }
    })
  }
}

export function getSubjectsLoading () {
  return {
    type: GET_SUBJECTS_LOADING
  }
}

export function getSubjectsError () {
  return {
    type: GET_SUBJECTS_FAILURE
  }
}

export function getSubjects (reload = false) {
  return function (dispatch, getState) {
    const state = getState()
    const token = state.auth.token
    let lastUpdated = state.subjects.lastUpdated
    if (lastUpdated !== null && !reload) {
      const now = new Date()
      const dif = lastUpdated - now.getTime()
      const secondsFrom = dif / 1000
      const secondsBetween = Math.abs(secondsFrom)
      if (secondsBetween <= (60 * 60)) {
        dispatch(getSubjectsSuccess(state.subjects.data))
        return {}
      }
    }
    dispatch(getSubjectsLoading())
    return request.get(APIBASE + '/api/subjects/all')
       .set('Authorization', 'Bearer ' + token)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        if (!err && res.ok) {
          dispatch(getSubjectsSuccess(res.body))
        } else {
          dispatch(getSubjectsError())
        }
      })
  }
}
// store fail subjects choice
function storeChooseSubjectsLoading (): Function {
  return {
    type: STORE_FAIL_SUBJECTS_REQUEST
  }
}

function storeChooseSubjectsSuccess (subjects: Array<Object>): Function {
  return {
    type: STORE_FAIL_SUBJECTS_SUCCESS,
  }
}

export function storeChooseSubjects (ids: Array<number> = []): Function {
  return function (dispatch: Function, getState: Function): Object {
    const state = getState()
    const token = state.auth.token
    dispatch(storeChooseSubjectsLoading())
    return request.post(`${APIBASE}/api/subjects/store_chosen_subjects`)
      .set('x-access-token', token)
      .send({ ids })
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end((err: Object, res: Object) => {
        if (!err && res.ok) {
          dispatch(storeChooseSubjectsSuccess())
          dispatch(closeModal())
          dispatch(getSubjects())
        } else {
          // dispatch(getSubjectsForumsError())
        }
      })
  }
}
// get fail subjects
function getChooseSubjectsLoading (): Function {
  return {
    type: GET_FAIL_SUBJECTS_REQUEST
  }
}

function getChooseSubjectsSuccess (subjects: Array<Object>): Function {
  return {
    type: GET_FAIL_SUBJECTS_SUCCESS,
    payload: subjects
  }
}

export function getChooseSubjects (): Function {
  return function (dispatch: Function, getState: Function): Object {
    const state = getState()
    const token = state.auth.token
    dispatch(getChooseSubjectsLoading())
    return request.get(`${APIBASE}/api/subjects/choose`)
       .set('x-access-token', token)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end((err: Object, res: Object) => {
        if (!err && res.ok) {
          dispatch(getChooseSubjectsSuccess(res.body))
          if (res.body.length > 0) {
            dispatch(showModal('ChooseFailSubjects', { closable: true }, true))
          }
        } else {
          // dispatch(getSubjectsForumsError())
        }
      })
  }
}
// get subjects forum
export function getSubjectsForumsLoading () {
  return {
    type: GET_SUBJECTS_FORUMS_REQUEST
  }
}

export function getSubjectsForumsSuccess (forums) {
  return {
    type: GET_SUBJECTS_FORUMS_SUCCESS,
    payload: forums
  }
}

export function getSubjectsForums (reload = false) {
  return function (dispatch, getState) {
    const state = getState()
    const token = state.auth.token
    dispatch(getSubjectsForumsLoading())
    return request.get(`${APIBASE}/api/subject_forums/all`)
       .set('x-access-token', token)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        if (!err && res.ok) {
          dispatch(getSubjectsForumsSuccess(res.body))
        } else {
          // dispatch(getSubjectsForumsError())
        }
      })
  }
}

function submitForumPostLoading (): Object {
  return {
    type: SUBMIT_SUBJECT_FORUM_POST_REQUEST
  }
}

function submitForumPostSuccess (post: Object): Object {
  // console.log('success called')
  return {
    type: SUBMIT_SUBJECT_FORUM_POST_SUCCESS,
    payload: post
  }
}

export function submitForumPost (values: Object = {}): Object {
  return function (dispatch: Function, getState: Function): Object {
    const state = getState()
    const token = state.auth.token
    dispatch(submitForumPostLoading())
    return request.post(`${APIBASE}/api/subject_forums/store`)
      .set('x-access-token', token)
      .send(values)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end((err: Object, res: Object) => {
        if (!err && res.ok) {
          // console.log('everything is good')
          dispatch(submitForumPostSuccess(res.body))
        } else {
          // console.log('error is bad')
          // dispatch(getSubjectsForumsError())
        }
      })
  }
}

export function getSubjectLessonsSuccess (subjectId, data) {
  return {
    type: GET_SUBJECTS_LESSONS_SUCCESS,
    payload: {
      data,
      subjectId
    }
  }
}

export function getSubjectLessonsLoading () {
  return {
    type: GET_SUBJECTS_LESSONS_REQUEST
  }
}

export function getSubjectLessonsError () {
  return {
    type: GET_SUBJECTS_LESSONS_FAILURE
  }
}

export function getSubjectLessons (subjectId = 0) {
  return function (dispatch, getState) {
    const state = getState()
    const { token } = state.auth

    dispatch(getSubjectLessonsLoading())
    return request.get(`${APIBASE}/api/subjects/${subjectId}/lessons`)
       .set('Authorization', 'Bearer ' + token)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        if (!err && res.ok) {
          dispatch(getSubjectLessonsSuccess(subjectId, res.body))
        } else {
          dispatch(getSubjectLessonsError())
        }
      })
  }
}

export const actions = {
  getSubjects,
  getSubjectsSuccess
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_SUBJECTS]: (state, action) => Object.assign({}, state, {
    data: [],
    loading: true
  }),
  [ELEMENT_SET_VIDEO_WATCHED_SUCCESS]: (state, action) => {
    let elementIndex
    let lessonIndex
    let subjectIndex

    state.data.map((s, si) => s.lessons.map((l, li) => typeof l.elements !== 'undefined' &&
    l.elements.map((e, ei) => {
      if (+e.id === +action.payload) {
        elementIndex = ei
        lessonIndex = li
        subjectIndex = si
      }
    })))
    const data = update(state.data, {
      [subjectIndex]: {
        lessons: { [lessonIndex]: {
          elements: {
            [elementIndex]: {
              $merge: {
                watched: 1
              }
            }
          }
        }
        }
      }
    })
    // console.log(data)
    return Object.assign({}, state, { data })
  },
  [ELEMENT_SET_VIDEO_SEEKED_SUCCESS]: (state, action) => {
    let elementIndex
    let lessonIndex
    let subjectIndex
    state.data.map((s, si) => s.lessons.map((l, li) => typeof l.elements !== 'undefined' &&
    l.elements.map((e, ei) => {
      if (e.id === +action.payload.id) {
        elementIndex = ei
        lessonIndex = li
        subjectIndex = si
      }
    })))

    // console.log('got that index from subjects.js', subjectIndex, lessonIndex, elementIndex, action.payload.minutes)
    const data = update(state.data, {
      [subjectIndex]: {
        lessons: { [lessonIndex]: {
          elements: {
            [elementIndex]: {
              $merge: {
                seek_minutes: action.payload.minutes
              }
            }
          }
        }
        }
      }
    })
    return ({ ...state, data: data })
  },
  [GET_SUBJECTS_SUCCESS]: (state, action) => {
    const mergedWithSessions = mergeSessionsWithSubjects(action.payload.sessions, action.payload.data)
    return Object.assign({}, state, {
      data: mergedWithSessions,
      loading: false,
      lastUpdated: action.payload.data.length ? new Date().getTime() : null
    })
  },
  [GET_SUBJECTS_LESSONS_SUCCESS]: (state, action) => {
    const data = state.data.map(s => {
      // console.log(s.id, Number(action.payload.subjectId))
      if (s.id === Number(action.payload.subjectId)) {
        s.lessons = action.payload.data
      }
      return s
    })
    return Object.assign({}, state, {
      data,
      loadingLessons: false
    })
  },
  [GET_SUBJECTS_FAILURE]: (state, action) => {
    return Object.assign({}, state, {
      loading: false,
      error: true
    })
  },
  [GET_SUBJECTS_LESSONS_REQUEST]: (state, action) => {
    return Object.assign({}, state, {
      loadingLessons: true
    })
  },
  [GET_SUBJECTS_LOADING]: (state, action) => {
    return Object.assign({}, state, {
      loading: true,
      error: false,
      data: []
    })
  },
  [SET_SUBJECT_HAS_PLAINT]: (state, action) => {
    const subjects = state.data.map(s => {
      const plaint = action.payload.find(p => p.subject_id === s.id)
      if (plaint) {
        s.plaints.push(plaint)
      }
      return s
    })
    return Object.assign({}, state, {
      data: subjects
    })
  },
  [GET_SESSIONS_SUCCESS]: (state: Object, action: Object): Object => {
    mergeSessionsWithSubjects(action.payload.data, state.data)
    return state
  },
  [GET_FAIL_SUBJECTS_SUCCESS]: (state: Object, action: Object): Object =>
  ({ ...state, failSubjects: action.payload }),
  [GET_SUBJECTS_FORUMS_REQUEST]: (state: Object, action: Object): Object =>
  ({ ...state, loadingForums: true, forums: [] }),
  [GET_SUBJECTS_FORUMS_SUCCESS]: (state: Object, action: Object): Object =>
  ({ ...state, loadingForums: false, forums: action.payload }),
  [SUBMIT_SUBJECT_FORUM_POST_REQUEST]: (state: Object, action: Object): Object =>
  ({ ...state, loadingPost: true }),
  [SUBMIT_SUBJECT_FORUM_POST_SUCCESS]: (state: Object, action: Object): Object => {
    let postIndex = -1
    const forums = [ ...state.forums ]
    let forumIndex = -1
    forumIndex = state.forums.findIndex((f: Object): boolean => +f.id === +action.payload.forum_id)
    if (forumIndex >= 0) {
      postIndex = state.forums[forumIndex].posts.findIndex((p: Object): boolean => +p.id === action.payload.id)
    }
    if (postIndex >= 0) {
      forums[forumIndex].posts[postIndex] = action.payload
    } else {
      forums[forumIndex].posts = [...forums[forumIndex].posts, action.payload]
    }
    // console.log(forums)
    return ({ ...state, loadingPost: false, forums })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  data: [],
  loading: false,
  loadingForums: false,
  forums: [],
  failSubjects: [],
  loadingPost: false,
  loadingLessons: false,
  error: false,
  lastUpdated: null
}

export default function subjectsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
