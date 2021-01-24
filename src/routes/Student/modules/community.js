import request from 'superagent'
import update from 'immutability-helper'
import { APIBASE } from 'utils'
import laroute from 'utils/laroute.js'

// ------------------------------------
// Constants
// ------------------------------------

export const SET_COMMUNITY_SEARCH_QUERY = 'SET_COMMUNITY_SEARCH_QUERY'
export const SET_COMMUNITY_TAB = 'SET_COMMUNITY_TAB'

export const CREATE_COMMUNITY_POST_REQUEST = 'CREATE_COMMUNITY_POST_REQUEST'
export const CREATE_COMMUNITY_POST_SUCCESS = 'CREATE_COMMUNITY_POST_SUCCESS'

export const GET_COMMUNITY_POSTS_LOADING = 'GET_COMMUNITY_POSTS_LOADING'
export const GET_COMMUNITY_POSTS_SUCCESS = 'GET_COMMUNITY_POSTS_SUCCESS'

export const GET_MY_COMMUNITY_POSTS_LOADING = 'GET_MY_COMMUNITY_POSTS_LOADING'
export const GET_MY_COMMUNITY_POSTS_SUCCESS = 'GET_MY_COMMUNITY_POSTS_SUCCESS'

// ------------------------------------
// Actions
// ------------------------------------

// set search query
export function setCommunityTab (key = '') {
  return {
    type: SET_COMMUNITY_TAB,
    payload: key
  }
}

export function setCommunitySearchQuery (query) {
  return function (dispatch) {
    dispatch(setCommunitySearchQuerySuccess(query))
    dispatch(getCommunityPosts(1))
  }
}

export function setCommunitySearchQuerySuccess (query) {
  return {
    type: SET_COMMUNITY_SEARCH_QUERY,
    payload: query
  }
}

// create new element

export function createCommunityPost ({ subject = '', content = '', parentId = null }) {
  return function (dispatch, getState) {
    dispatch(createCommunityPostRequest())
    const token = getState().auth.token
    return request
      .post(laroute.route('api.v1.student.community.posts.store'))
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + token)
      .send({ subject, content, parent_id: parentId })
      .set('Content-Type', 'application/json')
      .then(response => {
        dispatch(createCommunityPostSuccess(response.body))
      })
      .catch(error => {
        // console.log(error)
      })
  }
}

export function createCommunityPostRequest (elementId = 0) {
  return {
    type: CREATE_COMMUNITY_POST_REQUEST
  }
}

export function createCommunityPostSuccess (post = {}) {
  return {
    type: CREATE_COMMUNITY_POST_SUCCESS,
    payload: post
  }
}

// get my posts
export function getMyCommunityPostsSuccess (page = 1, response = {}) {
  return {
    type: GET_MY_COMMUNITY_POSTS_SUCCESS,
    payload: {
      response,
      page
    }
  }
}
export function getMyCommunityPostsLoading (page = 1) {
  return {
    type: GET_MY_COMMUNITY_POSTS_LOADING,
    payload: {
      page
    }
  }
}

export function getMyCommunityPosts (page = 1) {
  return function (dispatch, getState) {
    const state = getState().studentCommunity.mypagination
    if (state.currentPage >= page) return

    dispatch(getMyCommunityPostsLoading(page))
    const token = getState().auth.token
    return request
      .get(APIBASE + '/api/community/posts')
      .set('x-access-token', token)
      .query({ postable: 'community', page, query: getState().studentCommunity.query, my: 1 })
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .then(response => {
        dispatch(getMyCommunityPostsSuccess(page, response.body))
      })
      .catch(error => {
        if (error) {
        }
      })
  }
}
// get posts
export function getCommunityPostsSuccess (page = 1, response = {}) {
  return {
    type: GET_COMMUNITY_POSTS_SUCCESS,
    payload: {
      response,
      page
    }
  }
}
export function getCommunityPostsLoading (page = 1) {
  return {
    type: GET_COMMUNITY_POSTS_LOADING,
    payload: {
      page
    }
  }
}

export function getCommunityPosts (page = 1) {
  return function (dispatch, getState) {
    const { studentCommunity: { pagination } } = getState()
    if (pagination.currentPage >= page) return

    dispatch(getCommunityPostsLoading(page))
    const token = getState().auth.token
    return request
      .get(APIBASE + '/api/community/posts')
      .set('x-access-token', token)
      .query({ postable: 'community', page, query: getState().studentCommunity.query })
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .then(response => {
        dispatch(getCommunityPostsSuccess(page, response.body))
      })
      .catch(error => {
        if (error) {
        }
      })
  }
}

export const actions = {
  getCommunityPosts,
  createCommunityPost,
  setCommunitySearchQuery,
  setCommunityTab
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [CREATE_COMMUNITY_POST_SUCCESS]: (state, action) => {
    let _post
    let _index
    // console.log(action.payload)
    if (action.payload.parent_id) {
      _post = update(state.posts['post-' + action.payload.parent_id], { replies: { $push: [action.payload] } })
      _index = action.payload.parent_id
    } else {
      _post = action.payload
      _index = action.payload.id
    }

    return Object.assign({}, state, {
      inserting: false,
      posts: update(state.posts, { $merge: { ['post-' + _index]: _post } }),
      pagination: update(state.pagination, {
        $merge: {
          total: state.pagination.total + 1,
          pages: {
            ...state.pagination.pages,
            1: {
              ids: [_index, ...(state.pagination.pages[1] ? state.pagination.pages[1].ids : [])],
              isFetching: false
            }
          }
        }
      }),
      mypagination: update(state.mypagination, {
        $merge: {
          total: state.mypagination.total + 1,
          pages: {
            ...state.mypagination.pages,
            1: {
              ids: [_index, ...(state.mypagination.pages[1] ? state.mypagination.pages[1].ids : [])],
              isFetching: false
            }
          }
        }
      })
    })
  },
  [GET_COMMUNITY_POSTS_SUCCESS]: (state, action) => {
    let _posts = {}

    for (let post of action.payload.response.data) {
      _posts = {
        ..._posts,
        ['post-' + post.id]: post
      }
    }

    const pagination = update(state.pagination, {
      $set: {
        totalPages: action.payload.response.last_page,
        total: action.payload.response.total,
        currentPage: action.payload.response.current_page,
        pages: {
          ...state.pagination.pages,
          [action.payload.page]: {
            ids: action.payload.response.data.map(post => post.id),
            isFetching: false
          }
        }
      }
    })

    return Object.assign({}, state, {
      posts: update(state.posts, { $merge: { ..._posts } }),
      pagination
    })
  },
  [GET_MY_COMMUNITY_POSTS_SUCCESS]: (state, action) => {
    let _posts = {}

    for (let post of action.payload.response.data) {
      //      console.log(post)
      _posts = {
        ..._posts,
        ['post-' + post.id]: post
      }
    }

    const mypagination = update(state.mypagination, {
      $set: {
        totalPages: action.payload.response.last_page,
        total: action.payload.response.total,
        currentPage: action.payload.response.current_page,
        pages: {
          ...state.mypagination.pages,
          [action.payload.page]: {
            ids: action.payload.response.data.map(post => post.id),
            isFetching: false
          }
        }
      }
    })

    return Object.assign({}, state, {
      posts: update(state.posts, { $merge: { ..._posts } }),
      mypagination
    })
  },
  [CREATE_COMMUNITY_POST_REQUEST]: (state, action) => {
    return Object.assign(state, { inserting: true })
  },
  [SET_COMMUNITY_TAB]: (state, action) => {
    return update(state, { tab: { $set: action.payload } })
  },
  [SET_COMMUNITY_SEARCH_QUERY]: (state, action) => {
    return Object.assign(state, {
      posts: {},
      query: action.payload,
      pagination: {
        totalPages: 0,
        total: 0,
        currentPage: 0,
        pages: {}
      }
    })
  },
  [GET_COMMUNITY_POSTS_LOADING]: (state, action) => {
    return Object.assign({}, state, {
      pagination: update(state.pagination, {
        $merge: {
          currentPage: action.payload.page,
          pages: {
            ...state.pagination.pages,
            [action.payload.page]: {
              ids: [],
              isFetching: true
            }
          }
        }
      })
    })
  },
  [GET_MY_COMMUNITY_POSTS_LOADING]: (state, action) => {
    return Object.assign({}, state, {
      mypagination: update(state.mypagination, {
        $merge: {
          currentPage: action.payload.page,
          pages: {
            ...state.mypagination.pages,
            [action.payload.page]: {
              ids: [],
              isFetching: true
            }
          }
        }
      })
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  tab: 'new',
  inserting: false,
  liking: [],
  query: '',
  posts: {},
  pagination: {
    totalPages: 0,
    total: 0,
    currentPage: 0,
    pages: {}
  },
  mypagination: {
    totalPages: 0,
    total: 0,
    currentPage: 0,
    pages: {}
  }
}

export default function communityPostsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
