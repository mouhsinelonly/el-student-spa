// @flow
import { APIBASE } from 'utils'
import request from 'superagent'
import { showModal } from 'modules/modals'
import React from 'react'
// ------------------------------------
// Constants
// ------------------------------------
export const GET_STEPS_REQUEST = 'thesis.GET_STEPS_REQUEST'
export const GET_STEPS_SUCCESS = 'thesis.GET_STEPS_SUCCESS'

export const GET_TEACHERS_REQUEST = 'thesis.GET_TEACHERS_REQUEST'
export const GET_TEACHERS_SUCCESS = 'thesis.GET_TEACHERS_SUCCESS'

export const GET_CHOSEN_TEACHERS_REQUEST = 'thesis.GET_CHOSEN_TEACHERS_REQUEST'
export const GET_CHOSEN_TEACHERS_SUCCESS = 'thesis.GET_CHOSEN_TEACHERS_SUCCESS'

export const POST_TEACHER_REQUEST = 'thesis.POST_TEACHER_REQUEST'
export const POST_TEACHER_SUCCESS = 'thesis.POST_TEACHER_SUCCESS'

export const GET_INSTRUCTIONS_SUCCESS = 'thesis.GET_INSTRUCTIONS_SUCCESS'
export const GET_INSTRUCTIONS_REQUEST = 'thesis.GET_INSTRUCTIONS_REQUEST'

export const GET_SESSIONS_SUCCESS = 'thesis.GET_SESSIONS_SUCCESS'
export const GET_SESSIONS_REQUEST = 'thesis.GET_SESSIONS_REQUEST'

export const CHOOSE_TITLE_SUCCESS = 'thesis.CHOOSE_TITLE_SUCCESS'
export const CHOOSE_TITLE_REQUEST = 'thesis.CHOOSE_TITLE_REQUEST'

export const GET_TITLES_SUCCESS = 'thesis.GET_TITLES_SUCCESS'
export const GET_TITLES_REQUEST = 'thesis.GET_TITLES_REQUEST'

export const GET_NOTES_SUCCESS = 'thesis.GET_NOTES_SUCCESS'
export const GET_NOTES_REQUEST = 'thesis.GET_NOTES_REQUEST'

export const GET_MESSAGES_SUCCESS = 'thesis.GET_MESSAGES_SUCCESS'
export const GET_MESSAGES_REQUEST = 'thesis.GET_MESSAGES_REQUEST'

export const GET_RESOURCES_SUCCESS = 'thesis.GET_RESOURCES_SUCCESS'
export const GET_RESOURCES_REQUEST = 'thesis.GET_RESOURCES_REQUEST'

export const GET_DRAFTS_SUCCESS = 'thesis.GET_DRAFTS_SUCCESS'
export const GET_DRAFT_SUCCESS = 'thesis.GET_DRAFT_SUCCESS'
export const GET_DRAFT_REQUEST = 'thesis.GET_DRAFT_REQUEST'
export const GET_DRAFTS_REQUEST = 'thesis.GET_DRAFTS_REQUEST'

export const SET_CHAT_TEACHER_ID = 'thesis.SET_CHAT_TEACHER_ID'

export const SEND_MESSAGE_SUCCESS = 'thesis.SEND_MESSAGE_SUCCESS'
export const SEND_MESSAGE_REQUEST = 'thesis.SEND_MESSAGE_REQUEST'
// ------------------------------------
// Actions
// ------------------------------------
//
// get resources
export function setTeacherId (id: Object): Object {
  return {
    type: SET_CHAT_TEACHER_ID,
    payload: id
  }
}

function getResourcesSuccess (payload: Object): Object {
  return {
    type: GET_RESOURCES_SUCCESS,
    payload
  }
}

function getResourcesRequest (): Object {
  return {
    type: GET_RESOURCES_REQUEST
  }
}

export function getResources ({ reload = false }: Object = {}): Function {
  return (dispatch: Function, getState: Function): Function => {
    const { auth: { token } } = getState()

    dispatch(getResourcesRequest())
    return request.get(`${APIBASE}/api/thesis/resources`)
    .set('x-access-token', token)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .end((error: Object, response: Object) => {
      if (!error) {
        dispatch(getResourcesSuccess(response.body))
      }
    })
  }
}
// titles
function getTitlesSuccess (payload: Object): Object {
  return {
    type: GET_TITLES_SUCCESS,
    payload
  }
}

function getTitlesRequest (): Object {
  return {
    type: GET_TITLES_REQUEST
  }
}

export function getTitles ({ reload = false }: Object = {}): Function {
  return (dispatch: Function, getState: Function): Function => {
    const { auth: { token }, thesis: { titles } } = getState()
    if (titles.length && !reload) {
      return () => {}
    }
    dispatch(getTitlesRequest())
    return request.get(`${APIBASE}/api/thesis/titles`)
    .set('x-access-token', token)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .end((error: Object, response: Object) => {
      if (!error) {
        dispatch(getTitlesSuccess(response.body))
      }
    })
  }
}
// get steps
function getMessagesSuccess (payload: Object): Object {
  return {
    type: GET_MESSAGES_SUCCESS,
    payload
  }
}

function getMessagesRequest (): Object {
  return {
    type: GET_MESSAGES_REQUEST
  }
}

export function getMessages ({ reload = false }: Object = {}): Function {
  return (dispatch: Function, getState: Function): Function => {
    const { auth: { token }, thesis: { steps } } = getState()
    if (steps.length && !reload) {
      return () => {}
    }

    dispatch(getMessagesRequest())
    return request.get(`${APIBASE}/api/thesis/messages`)
    .set('x-access-token', token)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .end((error: Object, response: Object) => {
      if (!error) {
        dispatch(getMessagesSuccess(response.body))
      }
    })
  }
}
// get steps
function getStepsSuccess (payload: Object): Object {
  return {
    type: GET_STEPS_SUCCESS,
    payload
  }
}

function getStepsRequest (): Object {
  return {
    type: GET_STEPS_REQUEST
  }
}

function getSteps ({ reload = false }: Object = {}): Function {
  return (dispatch: Function, getState: Function): Function => {
    const { auth: { token }, thesis: { steps } } = getState()
    if (steps.length && !reload) {
      return () => {}
    }

    dispatch(getStepsRequest())
    return request.get(`${APIBASE}/api/thesis/steps`)
    .set('x-access-token', token)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .end((error: Object, response: Object) => {
      if (!error) {
        dispatch(getStepsSuccess(response.body))
      }
    })
  }
}
// get steps
function updateDraftSuccess (payload: Object): Object {
  return {
    type: GET_DRAFT_SUCCESS,
    payload
  }
}

function updateDraftRequest (): Object {
  return {
    type: GET_DRAFT_REQUEST
  }
}

export function updateDraft ({ id, status = 'review', description }: Object = {}): Function {
  return (dispatch: Function, getState: Function): Function => {
    const { auth: { token } } = getState()
    dispatch(updateDraftRequest())
    return request.post(`${APIBASE}/api/thesis/draft/${id}`)
    .set('x-access-token', token)
    .send({ status, description })
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .end((error: Object, response: Object) => {
      if (!error) {
        dispatch(updateDraftSuccess(response.body))
      }
    })
  }
}
// get steps
function sendMessageSuccess (payload: Object): Object {
  return {
    type: SEND_MESSAGE_SUCCESS,
    payload
  }
}

function sendMessageRequest (): Object {
  return {
    type: SEND_MESSAGE_REQUEST
  }
}

export function sendMessage ({ content }: Object = {}): Function {
  return (dispatch: Function, getState: Function): Function => {
    const { auth: { token }, thesis: { activeTeacherId: teacherId } } = getState()
    dispatch(sendMessageRequest())
    return request.post(`${APIBASE}/api/thesis/messages`)
    .set('x-access-token', token)
    .send({ content, teacherId })
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .end((error: Object, response: Object) => {
      if (!error) {
        dispatch(sendMessageSuccess(response.body))
      }
    })
  }
}
// get steps
function getDraftsSuccess (payload: Object): Object {
  return {
    type: GET_DRAFTS_SUCCESS,
    payload
  }
}

function getDraftsRequest (): Object {
  return {
    type: GET_DRAFTS_REQUEST
  }
}

export function getDrafts ({ reload = false }: Object = {}): Function {
  if (!reload) ({ type: 'NONE' })
  return (dispatch: Function, getState: Function): Function => {
    const { auth: { token } } = getState()
    dispatch(getDraftsRequest())
    return request.get(`${APIBASE}/api/thesis/drafts`)
    .set('x-access-token', token)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .end((error: Object, response: Object) => {
      if (!error) {
        dispatch(getDraftsSuccess(response.body))
      }
    })
  }
}
// get draft notes
function getDraftNotesSuccess ({ notes, id }: Object): Object {
  return {
    type: GET_NOTES_SUCCESS,
    payload: {
      notes,
      id
    }
  }
}

function getDraftNotesRequest (): Object {
  return {
    type: GET_NOTES_REQUEST
  }
}

export function getDraftNotes ({ id }: Object = {}): Function {
  return (dispatch: Function, getState: Function): Function => {
    const { auth: { token } } = getState()
    dispatch(getDraftNotesRequest())
    return request.get(`${APIBASE}/api/thesis/notes/${id}`)
    .set('x-access-token', token)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .end((error: Object, response: Object) => {
      if (!error) {
        dispatch(getDraftNotesSuccess({
          notes: response.body,
          id
        }))
      }
    })
  }
}
// get teachers
function getTeachersSuccess (payload: Object): Object {
  return {
    type: GET_TEACHERS_SUCCESS,
    payload
  }
}

function getTeachersRequest (): Object {
  return {
    type: GET_TEACHERS_REQUEST
  }
}

function getTeachers (): Function {
  return (dispatch: Function, getState: Function): Function => {
    const { auth: { token }, thesis: { teachers } } = getState()
    if (teachers.length) {
      return () => {}
    }

    dispatch(getTeachersRequest())
    return request.get(`${APIBASE}/api/thesis/teachers`)
    .set('x-access-token', token)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .end((error: Object, response: Object) => {
      if (!error) {
        dispatch(getTeachersSuccess(response.body))
      }
    })
  }
}
// get teachers
function getInstructionsSuccess (payload: Object): Object {
  return {
    type: GET_INSTRUCTIONS_SUCCESS,
    payload
  }
}

function getInstructionsRequest (): Object {
  return {
    type: GET_INSTRUCTIONS_REQUEST
  }
}

export function getInstructions (): Function {
  return (dispatch: Function, getState: Function): Function => {
    const { auth: { token }, thesis: { instructions } } = getState()
    if (instructions.length) {
      return () => {}
    }

    dispatch(getInstructionsRequest())
    return request.get(`${APIBASE}/api/thesis/instructions`)
    .set('x-access-token', token)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .end((error: Object, response: Object) => {
      if (!error) {
        dispatch(getInstructionsSuccess(response.body))
      }
    })
  }
}
// get teachers
function getSessionsSuccess (payload: Object): Object {
  return {
    type: GET_SESSIONS_SUCCESS,
    payload
  }
}

function getSessionsRequest (): Object {
  return {
    type: GET_SESSIONS_REQUEST
  }
}

export function getSessions (): Function {
  return (dispatch: Function, getState: Function): Function => {
    const { auth: { token }, thesis: { sessions } } = getState()
    if (sessions.length) {
      return () => {}
    }

    dispatch(getSessionsRequest())
    return request.get(`${APIBASE}/api/thesis/sessions`)
    .set('x-access-token', token)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .end((error: Object, response: Object) => {
      if (!error) {
        dispatch(getSessionsSuccess(response.body))
      }
    })
  }
}
// get chosen teachers
function getChosenTeachersSuccess (payload: Object): Object {
  return {
    type: GET_CHOSEN_TEACHERS_SUCCESS,
    payload
  }
}

function getChosenTeachersRequest (): Object {
  return {
    type: GET_CHOSEN_TEACHERS_REQUEST
  }
}

export function postConfirmTeacher (): Function {
  return (dispatch: Function, getState: Function): Function => {
    const { auth: { token } } = getState()
    return request.post(`${APIBASE}/api/thesis/teacher_confirmed`)
    .set('x-access-token', token)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .end((response: Object) => {
      dispatch(getChosenTeachers())
      dispatch(getSteps())
    })
  }
}
export function postChooseTitleSuccess (): Object {
  return {
    type: CHOOSE_TITLE_SUCCESS
  }
}
export function postChooseTitleRequest (): Object {
  return {
    type: CHOOSE_TITLE_REQUEST
  }
}
export function postChooseTitle ({ id }: Object): Function {
  return (dispatch: Function, getState: Function): Function => {
    const { auth: { token } } = getState()
    dispatch(postChooseTitleRequest())
    return request.post(`${APIBASE}/api/thesis/titles`)
    .set('x-access-token', token)
    .set('Accept', 'application/json')
    .send({ id })
    .set('Content-Type', 'application/json')
    .end((error: Object, response: Object) => {
      if (!error) {
        dispatch(postChooseTitleSuccess())
        dispatch(getTitlesSuccess(response.body))
      }
    })
  }
}
export function confirmTitle ({ id }: Object): Object {
  return (dispatch: Function) => {
    dispatch(showModal('yesno', {
      titleId: id,
      tag: 'THESIS_TITLE_CHOSEN',
      accept: 'نعم٫ احجز العنوان',
      refuse: 'لا٫ تراجع',
      body: 'لن تستطيع تعديل حجزك للعنوان بعد تأكيد اختيارك',
      title: 'هل تود تأكيد حجز العنوان'
    }, true, true))
  }
}

function getChosenTeachers (): Function {
  return (dispatch: Function, getState: Function): Function => {
    const { auth: { token }, thesis: { chosenTeachers: teachers }, student: { profile: { joyrides } } } = getState()
    // console.log('got')
    if (teachers.length > 0) {
      return () => {}
    }

    dispatch(getChosenTeachersRequest())
    return request.get(`${APIBASE}/api/thesis/chosen_teachers`)
    .set('x-access-token', token)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .end((error: Object, response: Object) => {
      if (!error) {
        // console.log('got inside')
        const hasTeacher = response.body.findIndex((teacher: Object): boolean => teacher.status === 'accepted') >= 0

        if (hasTeacher && !joyrides.some((joyride: Object): boolean => joyride.slug === 'thesis_teacher_confirmed')) {
          dispatch(showModal('yes', {
            children: <div className='text-xs-right'
              style={{ border: 'solid #e0e0e0 1px', backgroundColor: '#f7f8fa' }}>
              {Object.keys(response.body).map((key: sstring): React.Element<'div'> => <div style={{ display: 'flex' }}
                className='p-a-2'
                key={key}>
                <img style={{ borderRadius: '50%', width: 60, height: 60 }}
                  src={response.body[key].photoUrl} alt={response.body[key].name} />
                <div className='p-r-2'>
                  <h5 style={{ fontSize: 16 }} >{response.body[key].name}</h5>
                  <p style={{ fontSize: 14 }} >{response.body[key].degree}</p>
                </div>
              </div>)}
            </div>,
            tag: 'THESIS_TEACHER_CHOSEN',
            accept: 'حسنا',
            refuse: 'لا٫ تراجع',
            body: 'تم اختيار تأكيد إختيارك للمشرف يمكنك الأن التواصل معه',
            title: 'تم تعيين المشرف'
          }, true, true))
        }
        dispatch(getChosenTeachersSuccess(response.body))
      }
    })
  }
}
// choose teacher
function postChooseTeacherSuccess (payload: Object): Object {
  return {
    type: POST_TEACHER_SUCCESS,
    payload
  }
}

function postChooseTeacherRequest (): Object {
  return {
    type: POST_TEACHER_REQUEST
  }
}

function postChooseTeacher (id: number): Function {
  return (dispatch: Function, getState: Function): Function => {
    const { auth: { token } } = getState()

    dispatch(postChooseTeacherRequest())
    return request.post(`${APIBASE}/api/thesis/teachers`)
    .set('x-access-token', token)
    .set('Accept', 'application/json')
    .send({ id })
    .set('Content-Type', 'application/json')
    .end((error: Object, response: Object) => {
      if (!error && response.body.success === 1) {
        dispatch(getSteps({ reload: true }))
        dispatch(getChosenTeachers())
        dispatch(postChooseTeacherSuccess(response.body))
      }
    })
  }
}
export const actions = {
  getSteps,
  postChooseTeacher,
  getChosenTeachers,
  getTeachers
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_TEACHERS_REQUEST]: (state: Object, action: Object): Object => Object.assign({}, state, {
    loadingTeachers: true
  }),
  [GET_STEPS_REQUEST]: (state: Object, action: Object): Object => Object.assign({}, state, {
    loadingSteps: true
  }),
  [GET_STEPS_SUCCESS]: (state: Object, action: Object): Object => {
    return Object.assign({}, state, {
      steps: action.payload,
      loadingSteps: false
    })
  },
  [GET_TEACHERS_SUCCESS]: (state: Object, action: Object): Object => {
    return Object.assign({}, state, {
      teachers: action.payload,
      loadingTeachers: false
    })
  },
  [GET_CHOSEN_TEACHERS_SUCCESS]: (state: Object, action: Object): Object => ({
    ...state,
    chosenTeachers: action.payload,
    loadingChosenTeachers: false
  }),
  [GET_CHOSEN_TEACHERS_REQUEST]: (state: Object, action: Object): Object => ({
    ...state,
    loadingChosenTeachers: true
  }),
  [GET_INSTRUCTIONS_REQUEST]: (state: Object, action: Object): Object => ({
    ...state,
    instructionsLoading: true
  }),
  [GET_INSTRUCTIONS_SUCCESS]: (state: Object, action: Object): Object => ({
    ...state,
    instructions: action.payload,
    instructionsLoading: false
  }),
  [GET_DRAFTS_REQUEST]: (state: Object, action: Object): Object => ({
    ...state,
    draftsLoading: true
  }),
  [GET_DRAFTS_SUCCESS]: (state: Object, action: Object): Object => ({
    ...state,
    drafts: action.payload,
    draftsLoading: false
  }),
  [GET_DRAFT_SUCCESS]: (state: Object, action: Object): Object => {
    const oldDrafts = (Object.keys(state.drafts).filter(key => key !== `next-${action.payload.id}`).reduce((all: Object, nextKey: Object): Object => ({
      ...all,
      [`next-${state.drafts[nextKey].id}`]: ({ ...state.drafts[nextKey], last: 0 })
    }), {}))

    return ({
      ...state,
      drafts: {
        [`next-${action.payload.id}`]: action.payload,
        ...oldDrafts
      }
    })
  },
  [GET_NOTES_SUCCESS]: (state: Object, action: Object): Object => ({
    ...state,
    drafts: {
      ...state.drafts,
      [`item-${action.payload.id}`]: {
        ...state.drafts[`item-${action.payload.id}`],
        notes: action.payload.notes
      }
    }
  }),
  [GET_MESSAGES_SUCCESS]: (state: Object, action: Object): Object => ({
    ...state,
    messagesLoading: false,
    messages: action.payload
  }),
  [GET_RESOURCES_SUCCESS]: (state: Object, action: Object): Object => ({
    ...state,
    resources: action.payload
  }),
  [SET_CHAT_TEACHER_ID]: (state: Object, action: Object): Object => ({
    ...state,
    activeTeacherId: action.payload
  }),
  [SEND_MESSAGE_SUCCESS]: (state: Object, action: Object): Object => ({
    ...state,
    messages: { ...state.messages, ...action.payload }
  }),
  [GET_TITLES_REQUEST]: (state: Object, action: Object): Object => ({
    ...state,
    laodingTitles: true
  }),
  [GET_TITLES_SUCCESS]: (state: Object, action: Object): Object => ({
    ...state,
    laodingTitles: false,
    titles: action.payload
  }),
  [CHOOSE_TITLE_SUCCESS]: (state: Object, action: Object): Object => ({
    ...state,
    chooseTitleLoading: false
  }),
  [CHOOSE_TITLE_REQUEST]: (state: Object, action: Object): Object => ({
    ...state,
    chooseTitleLoading: true
  }),
  [GET_SESSIONS_SUCCESS]: (state: Object, action: Object): Object => ({
    ...state,
    sessions: action.payload
  })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  steps: [],
  teachers: [],
  activeTeacherId: 0,
  drafts: {},
  messagesLoading: false,
  messages: {},
  draftsLoading: false,
  instructions: [],
  chooseTitleLoading: false,
  titles: [],
  sessions: [],
  sessionsLoading: false,
  laodingTitles: false,
  resources: [],
  chosenTeachers: [],
  loadingSteps: true,
  loadingTeachers: true,
  loadingChosenTeachers: true,
}

export default function documentsReducer (state: Object = initialState, action: Object): Object {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
