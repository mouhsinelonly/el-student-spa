import request from 'superagent'
import { APIBASE, cache } from 'utils'
// ------------------------------------
// Constants
// ------------------------------------
export const SEARCH_NEWS = 'SEARCH_NEWS'
export const GET_NEWS = 'GET_NEWS'
export const GET_NEWS_LOADING = 'GET_NEWS_LOADING'
export const GET_NEWS_SUCCESS = 'GET_NEWS_SUCCESS'

const NEWS_CACHE_TAG = 'news.NEWS_CACHE_TAG'
// ------------------------------------
// Actions
// ------------------------------------
//
export function setSearchQuery (query = '') {
  return {
    type: SEARCH_NEWS,
    payload: {
      query
    }
  }
}

export function getNewsSuccess (response) {
  return {
    type: GET_NEWS_SUCCESS,
    payload: {
      data: response.data,
      currentPage: response.current_page,
      total: response.total,
      totalPages: response.last_page
    }
  }
}
export function getNewsLoading () {
  return {
    type: GET_NEWS_LOADING
  }
}

export function getNews (page = 1, query = '') {
  return function (dispatch) {
    dispatch(getNewsLoading())
    if (cache.has(NEWS_CACHE_TAG + page)) {
      dispatch(getNewsSuccess(cache.get(NEWS_CACHE_TAG + page)))
      return
    }
    return request.get(APIBASE + '/api/blog/posts')
    .query({ page, query })
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
     .end((err, res) => {
       if (!err && res.ok) {
         cache.set(NEWS_CACHE_TAG + page, res.body)
         dispatch(getNewsSuccess(res.body))
       } else {

       }
     })
  }
}

export const actions = {
  getNews,
  setSearchQuery
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_NEWS]: (state, action) => Object.assign({}, state, {
    data: [],
    loading:true
  }),
  [GET_NEWS_SUCCESS]: (state, action) => {
    return Object.assign({}, state, {
      data: action.payload.data,
      total: action.payload.total,
      currentPage: action.payload.currentPage,
      totalPages: action.payload.totalPages,
      loading:false
    })
  },
  [GET_NEWS_LOADING]: (state, action) => {
    return Object.assign({}, state, {
      loading:true
    })
  },
  [SEARCH_NEWS]: (state, action) => {
    return Object.assign({}, state, {
      query:action.payload.query
    })
  }
}
// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  data: [],
  total: 0,
  query: '',
  currentPage: 1,
  loading: false,
  totalPages: 0
}

export default function newsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
