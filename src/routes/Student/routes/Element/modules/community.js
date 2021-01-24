import request from 'superagent'
import update from 'immutability-helper'
import { APIBASE } from 'utils'
import laroute from 'utils/laroute.js'

// ------------------------------------
// Constants
// ------------------------------------

export const LIKE_ELEMENT_POST_REQUEST = 'LIKE_ELEMENT_POST_REQUEST'
export const LIKE_ELEMENT_POST_SUCCESS = 'LIKE_ELEMENT_POST_SUCCESS'

export const CREATE_ELEMENT_POST_REQUEST = 'CREATE_ELEMENT_POST_REQUEST'
export const CREATE_ELEMENT_POST_SUCCESS = 'CREATE_ELEMENT_POST_SUCCESS'

export const GET_ELEMENT_POSTS_LOADING = 'GET_ELEMENT_POSTS_LOADING'
export const GET_ELEMENT_POSTS_SUCCESS = 'GET_ELEMENT_POSTS_SUCCESS'

// ------------------------------------
// Actions
// ------------------------------------

// like existing element

export function likeElementPost (postId = 0) {
  return function (dispatch, getState) {
    dispatch(likeElementPostRequest(postId))
    const token = getState().auth.token
    return request.post(laroute.route('api.v1.student.community.likes.store'))
            .set('Accept', 'application/json')
           .set('Authorization', 'Bearer ' + token)
            .send({post_id: postId})
            .set('Content-Type', 'application/json')
            .then(response => {
              dispatch(likeElementPostSuccess(response.body))
            })
            .catch(error => {
//              console.log(error)
            })
  }
}

export function likeElementPostRequest (postId = 0) {
  return {
    type: LIKE_ELEMENT_POST_REQUEST,
    payload: postId
  }
}

export function likeElementPostSuccess (like = {}) {
  return {
    type: LIKE_ELEMENT_POST_SUCCESS,
    payload: like
  }
}

// create new element

export function createElementPost (elementId = 0, subject = '', content = '', parentId = null) {
  return function (dispatch, getState) {
    dispatch(createElementPostRequest(elementId))
    const token = getState().auth.token
    return request.post(laroute.route('api.v1.student.community.posts.store'))
            .set('Accept', 'application/json')
           .set('Authorization', 'Bearer ' + token)
            .send({ type: 'element', id: elementId, subject, content, parent_id: parentId })
            .set('Content-Type', 'application/json')
            .then(response => {
              dispatch(createElementPostSuccess(response.body))
            })
            .catch(error => {

            })
  }
}

export function createElementPostRequest (elementId = 0) {
  return {
    type: CREATE_ELEMENT_POST_REQUEST,
    payload: elementId
  }
}

export function createElementPostSuccess (post = {}) {
  return {
    type: CREATE_ELEMENT_POST_SUCCESS,
    payload: post
  }
}

// get elements
export function getElementPostsSuccess (id = 0, page = 1, response = {}) {
  return {
    type: GET_ELEMENT_POSTS_SUCCESS,
    payload: {
      response,
      id,
      page
    }
  }
}
export function getElementPostsLoading (id = 0, page = 1) {
  return {
    type: GET_ELEMENT_POSTS_LOADING,
    payload: {
      id,
      page
    }
  }
}

export function getElementPosts (id = 0, page = 1) {
  return function (dispatch, getState) {
    const exist = getState().element_community.pagination[id]
    if (exist && exist.currentPage >= page) return

    dispatch(getElementPostsLoading(id, page))
    const token = getState().auth.token
    return request
            // .get(laroute.route('api.v1.student.community.posts.index'))
            // .set('Authorization', 'Bearer ' + token)
            .get(APIBASE + '/api/community/posts')
            .set('x-access-token', token)
            .query({ postable: 'element', id, page, 'except[]': Object.keys(getState().element_community.posts)})
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .then(response => {
              dispatch(getElementPostsSuccess(id, page, response.body))
            })
            .catch(error => {
              if (error) {

              }
            })
  }
}

export const actions = {
  getElementPosts
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [CREATE_ELEMENT_POST_SUCCESS]: (state, action) => {
    const postable = state.pagination[action.payload.postable_id]
    let currentPage = 1
    Object.keys(state.pagination).map(e => {
      Object.keys(state.pagination[e].pages).map(l => {
        if (state.pagination[e].pages[l].ids.findIndex(id =>
          id === (!action.payload.parent_id ? action.payload.id : action.payload.parent_id)) > -1) {
          currentPage = parseInt(l, 10)
        }
      })
    })
    // const newtotal = parseInt(page.total + 1, 10)
    return Object.assign({}, state, {
      inserting: update(state.inserting, {$splice:
        [[state.inserting.findIndex(i => i === action.payload.parent_id || action.payload.id), 1]]
      }),
      posts: {...state.posts, [!action.payload.parent_id ? action.payload.id : action.payload.parent_id]:
        !action.payload.parent_id
        ? action.payload
        : update(state.posts[action.payload.parent_id], {replies: {$push: [action.payload]}})},
      pagination: update(state.pagination, {$merge: {
        [action.payload.postable_id]: {
          total: postable.total + (action.payload.parent_id ? 0 : 1),
          totalPages: postable.totalPages,
          currentPage: postable.currentPage,
          pages: {
            ...state.pagination[action.payload.postable_id].pages,
            [currentPage]: {
              ids: !action.payload.parent_id
                ? update(postable.pages[currentPage].ids, {$unshift: [action.payload.id]})
                : postable.pages[currentPage].ids
            }
          }
        }
      }
      })
    })
  },
  [GET_ELEMENT_POSTS_SUCCESS]: (state, action) => {
    let _posts = {}

    for (let post of action.payload.response.data) {
      _posts = {
        ..._posts,
        [post.id]: post
      }
    }

    const pagination = update(state.pagination, {
      [action.payload.id]: {
        $set: {
          totalPages: action.payload.response.last_page,
          total: action.payload.response.total,
          currentPage: action.payload.response.current_page,
          pages: {
            ...state.pagination[action.payload.id].pages,
            [action.payload.page]: {
              ids: action.payload.response.data.map(post => post.id),
              isFetching: false
            }
          }
        }
      }
    })

    return Object.assign({}, state, {
      posts: {...state.posts, ..._posts},
      pagination
    })
  },
  [CREATE_ELEMENT_POST_REQUEST]: (state, action) => {
    return Object.assign(state, {inserting: update(state.inserting, {$push: [action.payload]})})
  },
  [LIKE_ELEMENT_POST_REQUEST]: (state, action) => {
    return Object.assign(state, {liking: update(state.liking, {$push: [action.payload]})})
  },
  [LIKE_ELEMENT_POST_SUCCESS]: (state, action) => {
    return Object.assign(state, {posts:
      update(state.posts, {
        [action.payload.post_id]: {
          likes: {
            $push: [action.payload]
          }
        }
      }
      ),
      liking: update(state.liking, {$splice:
        [[state.liking.findIndex(i => i === action.payload.post_id), 1]]
      })
    })
  },
  [GET_ELEMENT_POSTS_LOADING]: (state, action) => {
    let _pages = []
    const exist = state.pagination[action.payload.id]
    if (exist) {
      _pages = update(_pages, {$set: exist.pages})
    }
    return Object.assign({}, state, {
      pagination: update(state.pagination, {
        [action.payload.id]: {
          $set: {
            totalPages: exist ? exist.totalPages : 0,
            total: exist ? exist.total : 0,
            currentPage: action.payload.page,
            pages: {
              ..._pages,
              [action.payload.page]: {
                ids: [],
                isFetching: true
              }
            }
          }
        }
      }
      )
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  inserting: [],
  liking: [],
  posts: {},
  pagination: {}
}

export default function ElementPostsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
