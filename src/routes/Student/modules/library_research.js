// @flow
import update from 'immutability-helper'
import request from 'superagent'
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

export const TOGGLE_SEARCH_CATEGORIES_DROP_DOWN: string = 'library_research.TOGGLE_SEARCH_CATEGORIES_DROP_DOWN'

export const GET_BOOKS_LIST_REQUEST: string = 'library.GET_BOOKS_LIST_REQUEST'
export const GET_BOOKS_LIST_SUCCESS: string = 'library.GET_BOOKS_LIST_SUCCESS'

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

export function toggleHamza (state: boolean): Object {
  return {
    type: TOGGLE_SEARCH_HAMZA,
    payload: state
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

export function toggleSearchCategoryDropDown (): Object {
  return {
    type: TOGGLE_SEARCH_CATEGORIES_DROP_DOWN
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

export function getBooksList (): Object {
  return function (dispatch: Function, getState: Function): Function {
    dispatch(getBooksListRequest())
    const state = getState()
    const token = state.auth.token
    return request
      .get(APIBASE + '/api/studentlibrary/books/listall')
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
  ({ ...state, searchCategoryDropdownOpen: !state.searchCategoryDropdownOpen }),
  [GET_BOOKS_LIST_SUCCESS]: (state: Object, action: Object): Object =>
  ({ ...state, booksList: update(state.booksList, { $set: action.payload }) }),
  [SHOW_SEARCH_CATEGORIES]: (state: Object, action: Object): Object =>
  ({ ...state, searchSelectedCategory: action.payload }),
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
  searchType: 'normal',
  searchCategories: [],
  booksList: [],
  searchWords: [],
  searchSelectedCategory: 0,
  searchCategoriesBooks: [],
  searchCategoryDropdownOpen: false
}

export default function serverTimeReducer (state: Object = initialState, action: Object): Object {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
