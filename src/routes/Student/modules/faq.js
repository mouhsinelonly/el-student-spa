import request from 'superagent'
import { APIBASE, searchString } from 'utils'
// ------------------------------------
// Constants
// ------------------------------------
export const GET_FAQ_CATEGORIES_REQUEST = 'faq.GET_FAQ_CATEGORIES_REQUEST'
export const GET_FAQ_CATEGORIES_SUCCESS = 'faq.GET_FAQ_CATEGORIES_SUCCESS'

export const SET_FAQ_CATEGORY = 'faq.SET_FAQ_CATEGORY'
export const UNSET_FAQ_CATEGORY = 'faq.UNSET_FAQ_CATEGORY'

export const SET_FAQ_QUERY = 'faq.SET_FAQ_QUERY'
export const UNSET_FAQ_QUERY = 'faq.UNSET_FAQ_QUERY'

export const GET_FAQ_QUESTIONS_REQUEST = 'faq.GET_FAQ_QUESTIONS_REQUEST'
export const GET_FAQ_QUESTIONS_SUCCESS = 'faq.GET_FAQ_QUESTIONS_SUCCESS'

const questions = []
// ------------------------------------
// Actions
// ------------------------------------
//
export function setCategory (id = 0) {
  return (dispatch) => {
    dispatch({ type: SET_FAQ_CATEGORY, payload: id })
    dispatch({ type: GET_FAQ_QUESTIONS_SUCCESS, payload: questions })
  }
}

export function setQuery (query = '') {
  return (dispatch) => {
    dispatch({ type: SET_FAQ_QUERY, payload: query })
    dispatch({ type: GET_FAQ_QUESTIONS_SUCCESS, payload: questions })
  }
}

export function getFAQCategoriesSuccess (data = []) {
  return {
    type: GET_FAQ_CATEGORIES_SUCCESS,
    payload: data
  }
}
export function getFAQCategoriesRequest () {
  return {
    type: GET_FAQ_CATEGORIES_REQUEST
  }
}

export function getFAQCategories () {
  return function (dispatch, getState) {
    const token = getState().auth.token
    dispatch(getFAQCategoriesRequest())
    return request.get(`${APIBASE}/api/faq/categories`)
      .set('x-access-token', token)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        if (!err && res.ok) {
          dispatch(getFAQCategoriesSuccess(res.body))
          // dispatch(showChooseClassrooms(res.body))
        } else {

        }
      })
  }
}

// for questions

export function getFAQQuestionsSuccess (data = []) {
  return {
    type: GET_FAQ_QUESTIONS_SUCCESS,
    payload: data
  }
}
export function getFAQQuestionsRequest () {
  return {
    type: GET_FAQ_QUESTIONS_REQUEST
  }
}

export function getFAQQuestions () {
  return function (dispatch, getState) {
    const token = getState().auth.token
    dispatch(getFAQQuestionsRequest())
    return request.get(`${APIBASE}/api/faq/questions`)
      .set('x-access-token', token)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        if (!err && res.ok) {
          Object.assign(questions, res.body)
          dispatch(getFAQQuestionsSuccess(res.body))
        } else {

        }
      })
  }
}
// for answers

export function getFAQAnswersSuccess (data = []) {
  return {
    type: GET_FAQ_QUESTIONS_SUCCESS,
    payload: data
  }
}
export function getFAQAnswersRequest () {
  return {
    type: GET_FAQ_QUESTIONS_REQUEST
  }
}

export const actions = {
  getFAQCategories,
  getFAQQuestions
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_FAQ_CATEGORIES_REQUEST]: (state, action) => Object.assign({}, state, {
    loadingcategories: true
  }),
  [GET_FAQ_CATEGORIES_SUCCESS]: (state, action) => Object.assign({}, state, {
    categories: action.payload,
    loadingcategories: false
  }),
  [GET_FAQ_QUESTIONS_REQUEST]: (state, action) => Object.assign({}, state, {
    loadingquestions: true
  }),
  [GET_FAQ_QUESTIONS_SUCCESS]: (state, action) => {
    const filteredQuestions = questions.filter(q => {
      if (state.categoryId && state.query) {
        return Number(q.cat_id) === Number(state.categoryId) && searchString(q.question, state.query)
      } else if (state.categoryId) {
        return Number(q.cat_id) === Number(state.categoryId)
      } else if (state.query) {
        return searchString(q.question, state.query)
      }

      return true
    })
    return Object.assign({}, state, {
      questions: filteredQuestions,
      loadingquestions: false
    })
  },
  [SET_FAQ_CATEGORY]: (state, action) => Object.assign({}, state, {
    categoryId: action.payload
  }),
  [SET_FAQ_QUERY]: (state, action) => Object.assign({}, state, {
    query: action.payload
  })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  categories: [],
  questions: [],
  query: '',
  categoryId: 0,
  loadingcategories: false,
  loadingquestions: false
}

export default function faqsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
