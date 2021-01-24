import request from 'superagent'
import laroute from 'utils/laroute.js'

// ------------------------------------
// Constants
// ------------------------------------
export const GET_BLOG_POST = 'GET_BLOG_POST'
export const GET_BLOG_POST_LOADING = 'GET_BLOG_POST_LOADING'
export const GET_BLOG_POST_SUCCESS = 'GET_BLOG_POST_SUCCESS'

// ------------------------------------
// Actions
// ------------------------------------
//
export function getBlogPostSuccess (response) {
  return {
    type: GET_BLOG_POST_SUCCESS,
    payload: {
      data: response.post,
      next: response.next,
      previous: response.previous
    }
  }
}
export function getBlogPostLoading () {
  return {
    type: GET_BLOG_POST_LOADING
  }
}

export function getBlogPost (id = 0) {
  return function (dispatch, getState) {
    dispatch(getBlogPostLoading())
    return request.get(laroute.route('api.v1.blog.posts.show', { posts: id }))
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .then(response => {
              dispatch(getBlogPostSuccess(response.body))
            })
            .catch(error => {
            })
  }
}

export const actions = {
  getBlogPost
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_BLOG_POST]: (state, action) => Object.assign({}, state, {
    data: {},
    previous: {},
    next: {},
    loading: true
  }),
  [GET_BLOG_POST_SUCCESS]: (state, action) => {
    return Object.assign({}, state, {
      data: action.payload.data,
      previous: action.payload.previous,
      next: action.payload.next,
      loading: false
    })
  },
  [GET_BLOG_POST_LOADING]: (state, action) => {
    return Object.assign({}, state, {
      loading: true
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  data: {},
  next: {},
  previous: {},
  loading: false
}

export default function blogPostReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
