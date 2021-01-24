// @flow
import update from 'immutability-helper'
import request from 'superagent'
import { getBooks } from 'routes/Student/modules/library'
import { APIBASE } from 'utils'
// ------------------------------------
// Constants
// ------------------------------------
export const SET_SEARCH_TYPE: string = 'library_research.SET_SEARCH_TYPE'

export const SET_SEARCH_CATEGORIES: string = 'library_research.SET_SEARCH_CATEGORIES'

export const SET_SEARCH_SELECTED_CATEGORIES: string = 'library_research.SET_SEARCH_SELECTED_CATEGORIES'

export const SHOW_SEARCH_CATEGORIES: string = 'library_research.SHOW_SEARCH_CATEGORIES'

export const SET_SEARCH_WORDS: string = 'library_research.SET_SEARCH_WORDS'

export const TOGGLE_SEARCH_HAMZA: string = 'library_research.TOGGLE_SEARCH_HAMZA'

export const SET_SEARCH_SELECTED_BOOKS: string = 'library_research.SET_SEARCH_SELECTED_BOOKS'

export const SET_TOGGLE_FORM_VISIBILITY: string = 'library_research.SET_TOGGLE_FORM_VISIBILITY'

export const TOGGLE_SEARCH_CATEGORIES_DROP_DOWN: string = 'library_research.TOGGLE_SEARCH_CATEGORIES_DROP_DOWN'

export const SET_SEARCH_CONNECTED: string = 'library_research.SET_SEARCH_CONNECTED'

export const GET_BOOKS_LIST_REQUEST: string = 'library.GET_BOOKS_LIST_REQUEST'
export const GET_BOOKS_LIST_SUCCESS: string = 'library.GET_BOOKS_LIST_SUCCESS'

export const GET_FOLDERS_REQUEST: string = 'library_research.GET_FOLDERS_REQUEST'
export const GET_FOLDERS_SUCCESS: string = 'library_research.GET_FOLDERS_SUCCESS'

export const ADD_TO_FOLDER_REQUEST: string = 'library_research.ADD_TO_FOLDER_REQUEST'
export const ADD_TO_FOLDER_SUCCESS: string = 'library_research.ADD_TO_FOLDER_SUCCESS'

export const REMOVE_PAGE_FROM_FOLDER_REQUEST: string = 'library_research.REMOVE_PAGE_FROM_FOLDER_REQUEST'
export const REMOVE_PAGE_FROM_FOLDER_SUCCESS: string = 'library_research.REMOVE_PAGE_FROM_FOLDER_SUCCESS'

// ------------------------------------
// Actions
// ------------------------------------
//
export function setSearchType (type: string): Object {
  return {
    type: SET_SEARCH_TYPE,
    payload: type
  }
}

export function toggleHamza (state: boolean, guard: string = 'students'): Object {
  return (dispatch: Function, getState: Function): Object => {
    dispatch({ type: TOGGLE_SEARCH_HAMZA, payload: state })
    dispatch(getBooks({ guard, type: 'pages' }))
  }
}

export function toggleFormVisibility (visible: boolean): Object {
  return {
    type: SET_TOGGLE_FORM_VISIBILITY,
    payload: visible
  }
}

export function toggleSearchCategory (int: number): Object {
  return {
    type: SET_SEARCH_CATEGORIES,
    payload: int
  }
}

export function setSearchWords (words: Array<Object>): Object {
  return {
    type: SET_SEARCH_WORDS,
    payload: words
  }
}

export function showSearchCategory (int: number): Object {
  return {
    type: SHOW_SEARCH_CATEGORIES,
    payload: int
  }
}

export function setSearchCategory (int: number): Object {
  return {
    type: SET_SEARCH_SELECTED_CATEGORIES,
    payload: int
  }
}

export function setSearchBook (id: number, catId: number): Object {
  return {
    type: SET_SEARCH_SELECTED_BOOKS,
    payload: {
      id,
      catId
    }
  }
}

export function toggleSearchCategoryDropDown (visible = null): Object {
  return {
    type: TOGGLE_SEARCH_CATEGORIES_DROP_DOWN,
    payload: visible
  }
}

export const actions = {
  setSearchType
}

export function getBooksListSuccess (books: Array<Object>): Object {
  return {
    type: GET_BOOKS_LIST_SUCCESS,
    payload: books
  }
}

export function getBooksListRequest (): Object {
  return {
    type: GET_BOOKS_LIST_REQUEST
  }
}

export function setSearchConnected (status: number = 0): Object {
  return {
    type: SET_SEARCH_CONNECTED,
    payload: status
  }
}

export function getBooksList ({ guard = 'student' }: Object): Object {
  return function (dispatch: Function, getState: Function): Object {
    const { token: studenttoken, librarytoken } = getState().auth
    const token = ((): Object => {
      switch (guard) {
        case 'libraryuser':
          return librarytoken
        default:
          return studenttoken
      }
    })()
    if (getState().library_research.booksList.length) {
      return {}
    }
    dispatch(getBooksListRequest())

    return request
      .get(APIBASE + '/api/public_library/books/listall')
      .set('x-access-token', token)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end((err: Object, res: Object) => {
        if (!err && res.ok) {
          dispatch(getBooksListSuccess(res.body))
        } else {
        }
      })
  }
}

export function getFoldersSuccess (folders: Array<Object>): Object {
  return {
    type: GET_FOLDERS_SUCCESS,
    payload: folders
  }
}

export function getFoldersRequest (): Object {
  return {
    type: GET_FOLDERS_REQUEST
  }
}

export function getFolders ({ guard = 'student' }: Object): Object {
  return (dispatch: Function, getState: Function): Object => {
    const { token: studenttoken, librarytoken } = getState().auth
    const token = ((): Object => {
      switch (guard) {
        case 'libraryuser':
          return librarytoken
        default:
          return studenttoken
      }
    })()

    dispatch(getFoldersRequest())

    return request
      .get(`${APIBASE}/api/public_library/folders/all`)
      .set('x-access-token', token)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end((err: Object, res: Object) => {
        if (!err && res.ok) {
          dispatch(getFoldersSuccess(res.body))
        } else {
        }
      })
  }
}
export function addToFolderSuccess (folder: Object): Object {
  return {
    type: ADD_TO_FOLDER_SUCCESS,
    payload: folder
  }
}

export function addToFolderRequest (): Object {
  return {
    type: ADD_TO_FOLDER_REQUEST
  }
}

export function addToFolder ({ guard = 'student', folderNameOrId = 0, pageNumber = 0, pageId = 0, bookId = 0 }: Object): Object {
  return (dispatch: Function, getState: Function): Object => {
    const { token: studenttoken, librarytoken } = getState().auth
    const token = ((): Object => {
      switch (guard) {
        case 'libraryuser':
          return librarytoken
        default:
          return studenttoken
      }
    })()

    dispatch(addToFolderRequest())
    const { searchWords: keywords, searchHamza: hamza, searchConnected: connected } = getState().library_research

    return request
      .post(`${APIBASE}/api/public_library/folders/store`)
      .set('x-access-token', token)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({ folderNameOrId, pageId, bookId, keywords, hamza, connected, pageNumber })
      .end((err: Object, res: Object) => {
        if (!err && res.ok) {
          dispatch(addToFolderSuccess(res.body))
        } else {
        }
      })
  }
}
export function removePageFromFolderSuccess (id: number): Object {
  return {
    type: REMOVE_PAGE_FROM_FOLDER_SUCCESS,
    payload: id
  }
}

export function removePageFromFolderRequest (): Object {
  return {
    type: REMOVE_PAGE_FROM_FOLDER_REQUEST
  }
}

export function removePageFromFolder ({ guard = 'student', id = 0 }: Object): Object {
  return (dispatch: Function, getState: Function): Object => {
    const { token: studenttoken, librarytoken } = getState().auth
    const token = ((): Object => {
      switch (guard) {
        case 'libraryuser':
          return librarytoken
        default:
          return studenttoken
      }
    })()

    dispatch(removePageFromFolderRequest())

    return request
      .post(`${APIBASE}/api/public_library/folders/delete/${id}`)
      .set('x-access-token', token)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end((err: Object, res: Object) => {
        if (!err && res.ok) {
          dispatch(removePageFromFolderSuccess({ id }))
        } else {}
      })
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_SEARCH_SELECTED_BOOKS]: (state: Object, action: Object): Object => {
    const bookIndex = state.searchCategoriesBooks.findIndex((book: Object): boolean => book.id === action.payload.id)
    const searchCategoriesBooks = bookIndex < 0
    ? update(state.searchCategoriesBooks, { $push: [action.payload] })
    : update(state.searchCategoriesBooks, { $splice: [[bookIndex, 1]] })

    const addCategory = searchCategoriesBooks.findIndex((book: Object): boolean =>
      book.catId === action.payload.catId) >= 0
    const hasCategory = state.searchCategories.findIndex((id: number): boolean => id === action.payload.catId) >= 0
    return ({ ...state,
      searchCategoriesBooks,
      searchCategories: addCategory && !hasCategory
      ? update(state.searchCategories, { $push: [action.payload.catId] })
      : state.searchCategories })
  },
  [SET_SEARCH_TYPE]: (state: Object, action: Object): Object =>
  ({ ...state, searchType: action.payload }),
  [SET_SEARCH_WORDS]: (state: Object, action: Object): Object =>
  ({ ...state, searchWords: action.payload }),
  [TOGGLE_SEARCH_HAMZA]: (state: Object, action: Object): Object =>
  ({ ...state, searchHamza: action.payload }),
  [TOGGLE_SEARCH_CATEGORIES_DROP_DOWN]: (state: Object, action: Object): Object =>
  ({ ...state,
    searchCategoryDropdownOpen: action.payload !== null
    ? action.payload
    : !state.searchCategoryDropdownOpen }),
  [GET_BOOKS_LIST_SUCCESS]: (state: Object, action: Object): Object =>
  ({ ...state, booksList: update(state.booksList, { $set: action.payload }), booksListLoading: false }),
  [SHOW_SEARCH_CATEGORIES]: (state: Object, action: Object): Object =>
  ({ ...state, searchSelectedCategory: action.payload }),
  [SET_SEARCH_CONNECTED]: (state: Object, action: Object): Object =>
  ({ ...state, searchConnected: action.payload }),
  [GET_BOOKS_LIST_REQUEST]: (state: Object, action: Object): Object =>
  ({ ...state, booksListLoading: true }),
  [SET_TOGGLE_FORM_VISIBILITY]: (state: Object, action: Object): Object =>
  ({ ...state, hideForm: action.payload }),
  [REMOVE_PAGE_FROM_FOLDER_SUCCESS]: (state: Object, action: Object): Object => {
    const index = state.folders.findIndex((folder: Object): boolean => +folder.id === +action.payload)
    return ({
      ...state,
      folders: update(state.folders, { $splice: [[index, 1]] })
    })
  },
  [GET_FOLDERS_SUCCESS]: (state: Object, action: Object): Object =>
  ({ ...state, folders: action.payload }),
  [SET_SEARCH_CATEGORIES]: (state: Object, action: Object): Object => {
    const catIndex = state.searchCategories.findIndex((id: number): boolean => id === action.payload)
    let books = state.searchCategoriesBooks

    for (const book of books) {
      if (book.catId === action.payload && catIndex >= 0) {
        const bookIndex = books.findIndex((book: Object): boolean => book.catId === action.payload)
        books = update(books, { $splice: [[bookIndex, 1]] })
      }
    }

    return ({ ...state,
      searchCategoriesBooks: books,
      searchSelectedCategory: action.payload,
      searchCategories: catIndex >= 0
      ? update(state.searchCategories, { $splice: [[catIndex, 1]] })
      : update(state.searchCategories, { $push: [action.payload] }) })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  searchHamza: false,
  hideForm: false,
  searchType: 'normal',
  searchConnected: 0,
  searchCategories: [],
  booksList: [],
  booksListLoading: false,
  searchWords: [],
  folders: [],
  searchSelectedCategory: 0,
  searchCategoriesBooks: [],
  searchCategoryDropdownOpen: false
}

export default function serverTimeReducer (state: Object = initialState, action: Object): Object {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
