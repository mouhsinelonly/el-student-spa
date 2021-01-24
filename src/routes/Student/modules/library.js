// @flow
import request from 'superagent'
import update from 'immutability-helper'
import { APIBASE, changeThemeColor } from 'utils'
// ------------------------------------
// Constants
// ------------------------------------
// library-${issue.student_id}:generated
export const LIBRARY_SET_VISIBLE_BOOK_PAGE: string = 'LIBRARY_SET_VISIBLE_BOOK_PAGE'

export const LIBRARY_SET_INVISIBLE_BOOK_PAGE: string = 'LIBRARY_SET_INVISIBLE_BOOK_PAGE'

export const SET_SHOW_SEARCH_PAGES: string = 'library.SET_SHOW_SEARCH_PAGES'

export const SHOW_SEARCH_SINGLE_PAGE: string = 'library.SHOW_SEARCH_SINGLE_PAGE'

export const LIBRARY_SET_BOOK_INDEX_TAB: string = 'library.LIBRARY_SET_BOOK_INDEX_TAB'

export const LIBRARY_GET_MY_LIBRARY_BOOK_REQUEST: string = 'library.LIBRARY_GET_MY_LIBRARY_BOOK_REQUEST'

export const LIBRARY_GET_MY_LIBRARY_BOOK_SUCCESS: string = 'library.LIBRARY_GET_MY_LIBRARY_BOOK_SUCCESS'

export const LIBRARY_SET_HILIGHTED_TEXT: string = 'library.LIBRARY_SET_HILIGHTED_TEXT'

export const LIBRARY_SHOW_HILIGHTED_POPUP: string = 'library.LIBRARY_SHOW_HILIGHTED_POPUP'

export const LIBRARY_BOOK_MARK_REQUEST: string = 'library.LIBRARY_BOOK_MARK_REQUEST'

export const LIBRARY_BOOK_MARK_SUCCESS: string = 'library.LIBRARY_BOOK_MARK_SUCCESS'

export const LIBRARY_BOOK_STORE_NOT_REQUEST: string = 'library.LIBRARY_BOOK_STORE_NOT_REQUEST'

export const LIBRARY_BOOK_STORE_NOT_SUCCESS: string = 'library.LIBRARY_BOOK_STORE_NOT_SUCCESS'

export const LIBRARY_UNBOOK_MARK_REQUEST: string = 'library.LIBRARY_UNBOOK_MARK_REQUEST'

export const LIBRARY_UNBOOK_MARK_SUCCESS: string = 'library.LIBRARY_UNBOOK_MARK_SUCCESS'

export const LIBRARY_SEARCH_SINGLE_BOOK_REQUEST: string = 'library.LIBRARY_SEARCH_SINGLE_BOOK_REQUEST'

export const LIBRARY_SEARCH_SINGLE_BOOK_SUCCESS: string = 'library.LIBRARY_SEARCH_SINGLE_BOOK_SUCCESS'

export const LIBRARY_OPEN_BOOK_INDEX_MENU: string = 'library.LIBRARY_OPEN_BOOK_INDEX_MENU'

export const LIBRARY_OPEN_BOOK_SEARCH_MENU: string = 'library.LIBRARY_OPEN_BOOK_SEARCH_MENU'

export const TOGGLE_LIBRARY_VISIBILITY: string = 'TOGGLE_LIBRARY_VISIBILITY'

export const LIBRARY_GOTO_PAGE: string = 'library.LIBRARY_GOTO_PAGE'

export const SET_LIBRARY_BROWSE_THEME: string = 'SET_LIBRARY_BROWSE_THEME'
export const SET_LIBRARY_BROWSE_FONT_SIZE: string = 'SET_LIBRARY_BROWSE_FONT_SIZE'

export const LIBRARY_GET_CATEGRIES_REQUEST: string = 'LIBRARY_GET_CATEGRIES_REQUEST'
export const LIBRARY_GET_CATEGRIES_SUCCESS: string = 'LIBRARY_GET_CATEGRIES_SUCCESS'

export const LIBRARY_SEARCH_BOOKS_REQUEST: string = 'LIBRARY_SEARCH_BOOKS_REQUEST'
export const LIBRARY_SEARCH_BOOKS_SUCCESS: string = 'LIBRARY_SEARCH_BOOKS_SUCCESS'
export const LIBRARY_SEARCH_BOOKS_DONE_LOADING: string = 'library.LIBRARY_SEARCH_BOOKS_DONE_LOADING'

export const LIBRARY_SEARCH_BOOKS_RESET: string = 'library.SEARCH_BOOKS_RESET'

export const LIBRARY_FILTER_BOOKS_REQUEST: string = 'library.LIBRARY_FILTER_BOOKS_REQUEST'

export const LIBRARY_ADD_BOOK_TO_SHELF_SUCCESS: string = 'library.ADD_BOOK_TO_SHELF_SUCCESS'
export const LIBRARY_ADD_BOOK_TO_SHELF_REQUEST: string = 'library.ADD_BOOK_TO_SHELF_REQUEST'

export const LIBRARY_GET_BOOK_SUCCESS: string = 'library.GET_BOOK_SUCCESS'
export const LIBRARY_GET_BOOK_REQUEST: string = 'library.GET_BOOK_REQUEST'

export const LIBRARY_REMOVE_BOOK_FROM_SHELF_SUCCESS: string = 'library.REMOVE_BOOK_FROM_SHELF_SUCCESS'
export const LIBRARY_REMOVE_BOOK_FROM_SHELF_REQUEST: string = 'library.REMOVE_BOOK_FROM_SHELF_REQUEST'

export const LIBRARY_GENERATE_ISSUE_SUCCESS: string = 'library.GENERATE_ISSUE_SUCCESS'

export const LIBRARY_BORROW_BOOK_SUCCESS: string = 'library.BORROW_BOOK_SUCCESS'
export const LIBRARY_BORROW_BOOK_REQUEST: string = 'library.BORROW_BOOK_REQUEST'

export const LIBRARY_SUGGEST_BOOK_SUCCESS: string = 'library.SUGGEST_BOOK_SUCCESS'
export const LIBRARY_SUGGEST_BOOK_REQUEST: string = 'library.SUGGEST_BOOK_REQUEST'

export const LIBRARY_GET_BOOK_PAGE_SUCCESS: string = 'library.GET_BOOK_PAGE_SUCCESS'
export const LIBRARY_GET_BOOK_PAGE_EMPTY: string = 'library.GET_BOOK_PAGE_EMPTY'
export const LIBRARY_GET_BOOK_PAGE_REQUEST: string = 'library.GET_BOOK_PAGE_REQUEST'
// ------------------------------------
// Actions
// ------------------------------------
//

export function setBrowseTheme (theme: string = 'white'): Object {
  return {
    type: SET_LIBRARY_BROWSE_THEME,
    payload: theme
  }
}

export function loadMore (visible: boolean = true): Object {
  return (dispatch: Function, getState: Function) => {
    const { pagination, booksloading } = getState().library
    if (visible && !booksloading) {
      dispatch(getBookSend({ page: pagination.currentPage + 1, guard: 'libraryuser' }))
    }
  }
}

export function goToPage (pageNumber: number = 0): Object {
  const page = document.getElementById(`pageRenderer${pageNumber}`)
  if (typeof page !== 'undefined' &&
    page !== null &&
    document && pageNumber) {
    page.scrollIntoView()
  }
  return {
    type: LIBRARY_GOTO_PAGE
  }
}

export function showSearchSinglePage (bookId: number = 0, pageNumber: number = 0): Object {
  return {
    type: SHOW_SEARCH_SINGLE_PAGE,
    payload: {
      bookId,
      pageNumber
    }
  }
}

export function setVisibleIndexTab (tab: string = 'indexes'): Object {
  return (dispatch: Function): Function => {
    return dispatch({
      type: LIBRARY_SET_BOOK_INDEX_TAB,
      payload: tab
    })
  }
}

export function setHilightedText (text: string = '', page: number = 0, x: number = 0, y: number = 0): Object {
  return {
    type: LIBRARY_SET_HILIGHTED_TEXT,
    payload: {
      text,
      page,
      x,
      y
    }
  }
}

export function setHilightedPopUpVisibility (visible: boolean = false): Object {
  return {
    type: LIBRARY_SHOW_HILIGHTED_POPUP,
    payload: visible
  }
}

export function toggleBookIndexMenu (): Object {
  return {
    type: LIBRARY_OPEN_BOOK_INDEX_MENU
  }
}

export function setShowSearchBookPages (id: number = 0): Object {
  return {
    type: SET_SHOW_SEARCH_PAGES,
    payload: id
  }
}

export function toggleBookSearchMenu (): Object {
  return {
    type: LIBRARY_OPEN_BOOK_SEARCH_MENU
  }
}

export function setBrowseFontSize (size: number = 16): Object {
  return {
    type: SET_LIBRARY_BROWSE_FONT_SIZE,
    payload: size
  }
}

export function setVisiblePage (pageId: number = 0): Object {
  return {
    type: LIBRARY_SET_VISIBLE_BOOK_PAGE,
    payload: pageId
  }
}
export function setInvisiblePage (pageId: number = 0): Object {
  return {
    type: LIBRARY_SET_INVISIBLE_BOOK_PAGE,
    payload: pageId
  }
}

export function resetSearch (): Object {
  return {
    type: LIBRARY_SEARCH_BOOKS_RESET
  }
}

export function generateIssueSuccess (issue: Object = {}): Object {
  return {
    type: LIBRARY_GENERATE_ISSUE_SUCCESS,
    payload: issue
  }
}

export function addBookToShelfSuccess (id: number = 0) {
  return {
    type: LIBRARY_ADD_BOOK_TO_SHELF_SUCCESS,
    payload: id
  }
}

export function addBookToShelfRequest (id: number = 0) {
  return {
    type: LIBRARY_ADD_BOOK_TO_SHELF_REQUEST,
    payload: id
  }
}

export function addBookToShelf ({ id = 0, guard }: Object): Object {
  return function (dispatch: Function, getState: Function): Object {
    dispatch(addBookToShelfRequest(id))
    const { token, librarytoken } = getState().auth
    return request
      .post(APIBASE + '/api/studentlibrary/books/shelfit/' + id)
      .set('x-access-token', guard === 'students' ? token : librarytoken)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end((err: Object, res: Object) => {
        if (!err && res.ok) {
          dispatch(addBookToShelfSuccess(id))
        } else {
        }
      })
  }
}

export function bookMarkSuccess (id: number = 0, pageNumber: number = 0): Object {
  return {
    type: LIBRARY_BOOK_MARK_SUCCESS,
    payload: {
      book_id: id,
      page_number: pageNumber
    }
  }
}

export function bookMarkRequest (id: number = 0, pageNumber: number = 0): Object {
  return {
    type: LIBRARY_BOOK_MARK_REQUEST,
    payload: {
      book_id: id,
      page_number: pageNumber
    }
  }
}

export function bookMark (id: number = 0, pageNumber: number = 0): Object {
  return function (dispatch: Function, getState: Function): Function {
    dispatch(bookMarkRequest(id, pageNumber))
    const state = getState()
    const token = state.auth.token
    return request
      .post(APIBASE + '/api/studentlibrary/books/bookmarkit/' + id)
      .set('x-access-token', token)
      .send({ page_number: pageNumber })
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end((err: Object, res: Object) => {
        if (!err && res.ok) {
          dispatch(bookMarkSuccess(id, pageNumber))
        } else {
        }
      })
  }
}

export function unBookMarkSuccess (id: number = 0, pageNumber: number = 0): Object {
  return {
    type: LIBRARY_UNBOOK_MARK_SUCCESS,
    payload: {
      book_id: id,
      page_number: pageNumber
    }
  }
}

export function unBookMarkRequest (id: number = 0, pageNumber: number = 0): Object {
  return {
    type: LIBRARY_UNBOOK_MARK_REQUEST,
    payload: {
      book_id: id,
      page_number: pageNumber
    }
  }
}

export function unBookMark (id: number = 0, pageNumber: number = 0): Object {
  return function (dispatch: Function, getState: Function): Object {
    dispatch(unBookMarkRequest(id, pageNumber))
    const state = getState()
    const token = state.auth.token
    return request
      .post(APIBASE + '/api/studentlibrary/books/unbookmarkit/' + id)
      .set('x-access-token', token)
      .send({ page_number: pageNumber })
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end((err: Object, res: Object) => {
        if (!err && res.ok) {
          dispatch(unBookMarkSuccess(id, pageNumber))
        } else {
        }
      })
  }
}

export function storeNoteSuccess (note: Object = {}): Object {
  return {
    type: LIBRARY_BOOK_STORE_NOT_SUCCESS,
    payload: note
  }
}

export function storeNoteRequest (): Object {
  return {
    type: LIBRARY_BOOK_STORE_NOT_REQUEST
  }
}

export function storeNote (values: Object = {}): Object {
  return function (dispatch, getState) {
    dispatch(storeNoteRequest())
    const state = getState()
    const token = state.auth.token
    return request
      .post(APIBASE + '/api/studentlibrary/books/addnote')
      .set('x-access-token', token)
      .send(values)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        if (!err && res.ok) {
          dispatch(storeNoteSuccess(res.body))
        } else {
        }
      })
  }
}

export function searchInBookContentSuccess (result): Object {
  return {
    type: LIBRARY_SEARCH_SINGLE_BOOK_SUCCESS,
    payload: result
  }
}

export function searchInBookContentRequest (query = '', bookId = 0) {
  return {
    type: LIBRARY_SEARCH_SINGLE_BOOK_REQUEST,
    payload: {
      query,
      book_id: bookId
    }
  }
}

export function searchInBookContent (query = '', bookId = 0) {
  return function (dispatch, getState) {
    dispatch(searchInBookContentRequest(query, bookId))
    const state = getState()
    const token = state.auth.token
    return request
      .get(APIBASE + '/api/studentlibrary/books/searchpages/' + bookId)
      .set('x-access-token', token)
      .query({ query, book_id: bookId })
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        if (!err && res.ok) {
          dispatch(searchInBookContentSuccess(res.body))
        } else {
        }
      })
  }
}

export function getBookPageSuccess (page = {}) {
  return {
    type: LIBRARY_GET_BOOK_PAGE_SUCCESS,
    payload: Object.assign(page, { loading: false })
  }
}

export function getBookPageEmpty (bookId = 0, number = 0) {
  return {
    type: LIBRARY_GET_BOOK_PAGE_SUCCESS,
    payload: {
      loading: false,
      content: '',
      book_id: bookId,
      number
    }
  }
}

export function getBookPageRequest (bookId = 0, number = 0) {
  return {
    type: LIBRARY_GET_BOOK_PAGE_REQUEST,
    payload: {
      book_id: bookId,
      number
    }
  }
}

export function getBookPage (bookId = 0, number = 0): Object {
  return function (dispatch: Function, getState: Function): Object {
    dispatch(getBookPageRequest(bookId, number))
    const state = getState()
    const token = state.auth.token
    return request
      .get(APIBASE + '/api/studentlibrary/books/page')
      .set('x-access-token', token)
      .query({ book_id: bookId, number })
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        if (!err && res.ok) {
          if (res.body !== null) {
            dispatch(getBookPageSuccess(res.body))
          } else {
            dispatch(getBookPageEmpty(bookId, number))
          }
        } else {
        }
      })
  }
}

export function getBookSuccess (book = {}): Object {
  return {
    type: LIBRARY_GET_BOOK_SUCCESS,
    payload: book
  }
}

export function getBookRequest (id = 0): Object {
  return {
    type: LIBRARY_GET_BOOK_REQUEST,
    payload: id
  }
}

export function getBook ({ id = 0, guard = 'student' }: Object): Object {
  return function (dispatch: Function, getState: Function): Object {
    dispatch(getBookRequest(id))
    const state = getState()
    if (state.library.loadedbooks.findIndex((b: Object): boolean => b.id === +id) >= 0) {
      return {}
    }
    const { token: studenttoken, librarytoken } = getState().auth
    const token = (guard: string): Object => ({
      'student': studenttoken,
      'students': studenttoken,
      'libraryuser': librarytoken,
      'libraryusers': librarytoken
    })[guard]
    return request
      .get(`${APIBASE}/api/studentlibrary/books/show/${id}`)
      .set('x-access-token', token(guard))
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end((err: Object, res: Object) => {
        if (!err && res.ok) {
          dispatch(getBookSuccess(res.body))
        } else {
        }
      })
  }
}

export function suggestBookSuccess (): Object {
  return {
    type: LIBRARY_SUGGEST_BOOK_SUCCESS
  }
}

export function suggestBookRequest (): Object {
  return {
    type: LIBRARY_SUGGEST_BOOK_REQUEST
  }
}

export function suggestBook () {
  return function (dispatch, getState) {
    dispatch(suggestBookRequest())
    const state = getState()
    const token = state.auth.token
    const title = state.library.search.query
    return request
      .post(APIBASE + '/api/studentlibrary/books/suggest')
      .set('x-access-token', token)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({ title: title })
      .end((err, res) => {
        if (!err && res.ok) {
          dispatch(suggestBookSuccess())
        } else {
        }
      })
  }
}

export function borrowBookSuccess (id = 0) {
  return {
    type: LIBRARY_BORROW_BOOK_SUCCESS,
    payload: id
  }
}

export function borrowBookRequest (id = 0) {
  return {
    type: LIBRARY_BORROW_BOOK_REQUEST,
    payload: id
  }
}

export function borrowBook (id = 0) {
  return function (dispatch, getState) {
    dispatch(borrowBookRequest(id))
    const state = getState()
    const token = state.auth.token
    return request
      .post(APIBASE + '/api/studentlibrary/books/borrow/' + id)
      .set('x-access-token', token)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        if (!err && res.ok) {
          dispatch(borrowBookSuccess(id))
        } else {
        }
      })
  }
}

export function removeBookFromShelfSuccess (id = 0) {
  return {
    type: LIBRARY_REMOVE_BOOK_FROM_SHELF_SUCCESS,
    payload: id
  }
}

export function removeBookFromShelfRequest (id = 0) {
  return {
    type: LIBRARY_REMOVE_BOOK_FROM_SHELF_REQUEST,
    payload: id
  }
}

export function removeBookFromShelf ({ id = 0, guard = 'students' }: Object): Object {
  return function (dispatch: Function, getState: Function): Object {
    dispatch(removeBookFromShelfRequest(id))
    const { token, librarytoken } = getState().auth
    return request
      .post(APIBASE + '/api/studentlibrary/books/unshelfit/' + id)
      .set('x-access-token', guard === 'students' ? token : librarytoken)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end((err: Object, res: Object) => {
        if (!err && res.ok) {
          dispatch(removeBookFromShelfSuccess(id))
        } else {
        }
      })
  }
}

export function getMyBooksSuccess (data = []) {
  return {
    type: LIBRARY_GET_MY_LIBRARY_BOOK_SUCCESS,
    payload: data
  }
}

export function getMyBooksRequest (): Object {
  return {
    type: LIBRARY_GET_MY_LIBRARY_BOOK_REQUEST
  }
}

export function getMyBooks ({ guard = 'student' }: Object): Object {
  return function (dispatch: Function, getState: Function): Object {
    const { token: studenttoken, librarytoken } = getState().auth
    const token = (guard: string): Object => ({
      'student': studenttoken,
      'libraryuser': librarytoken
    })[guard]
    return request
      .get(APIBASE + '/api/studentlibrary/books/all')
      .set('x-access-token', token(guard))
      .query({ mybooks: 1 })
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end((err: Object, res: Object) => {
        if (!err && res.ok) {
          dispatch(getMyBooksSuccess(res.body.rows))
        } else {
        }
      })
  }
}
// get search books
export function getBooksSuccess (data = {}) {

  return dispatch => {
    for (let book of data.rows) {
      if (book.borrow_status === 'generating') {
        dispatch(borrowBookRequest(book.id))
      }
    }
    dispatch({
      type: LIBRARY_SEARCH_BOOKS_SUCCESS,
      payload: data
    })
  }
}

export function getBooksRequest ({ query = '', category_id: categoryId = 0, type = 'subjects', page }: Object) {
  return {
    type: LIBRARY_SEARCH_BOOKS_REQUEST,
    payload: {
      type,
      category_id: +categoryId,
      query,
      page
    }
  }
}

export function getBooks ({
  guard = 'students',
  page = 1,
  query = '',
  category_id: categoryId = 0,
  type = 'subjects',
  author_id: authorId = 0 }: Object) {
  return function (dispatch: Function) {
    dispatch(getBooksRequest({ query, category_id: categoryId, type, author_id: authorId }))
    dispatch(getBookSend({ page, reset: page === 1, guard }))
  }
}

export function getBooksFilter (values) {
  return dispatch => {
    new Promise(resolve => {
      dispatch({
        type: LIBRARY_FILTER_BOOKS_REQUEST,
        payload: values
      })
      resolve()
    }).then(() => {
      dispatch(getBookSend({ page: 1, reset: true, guard: values.guard }))
    })
  }
}

export function getBookSend ({ page = 1, reset = false, guard = 'students' }: Object): Object {
  return function (dispatch: Function, getState: Function): Object {
    const state = getState()
    const token = ((): Object => {
      switch (guard) {
        case 'libraryuser':
          return state.auth.librarytoken
        default:
          return state.auth.token
      }
    })()

    const { library: { pagination } } = getState()

    if ((pagination.currentPage >= page && pagination.totalPages >= page) && !reset) {
      dispatch(getBooksDoneLoading())
      return {}
    }

    const { query, category_id: categoryId, type, orderby, author_id: authorId } = state.library.search
    const { searchCategories: catsIds, searchCategoriesBooks: booksIds, searchWords,
    searchHamza: stem, searchConnected } = state.library_research

    dispatch(getBooksRequest({ query, category_id: categoryId, type, author_id: authorId, page }))

    return request
      .get(APIBASE + '/api/studentlibrary/books/all')
      .set('x-access-token', token)
      .query({
        query,
        catsIds,
        stem,
        searchConnected,
        'words[]': searchWords
        .reduce((total: Array<string>, next: Object): Array<string> => total.concat(next.value), []),
        'booksIds[]': booksIds
        .reduce((total: Array<number>, next: Object): Array<number> => total.concat(next.id), []),
        category_id: categoryId,
        author_id: authorId,
        type,
        orderby,
        page
      })
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end((err: Object, res: Object) => {
        if (!err && res.ok) {
          dispatch(getBooksSuccess(res.body))
        } else {
        }
      })
  }
}

export function getBooksDoneLoading () {
  return {
    type: LIBRARY_SEARCH_BOOKS_DONE_LOADING
  }
}

export function getCategoriesSuccess (categories = []) {
  return {
    type: LIBRARY_GET_CATEGRIES_SUCCESS,
    payload: categories
  }
}
export function getCategoriesRequest () {
  return {
    type: LIBRARY_GET_CATEGRIES_REQUEST
  }
}

export function getCategories ({ guard = 'student' }: Object): Object {
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

    return request
      .get(`${APIBASE}/api/public_library/categories/all`)
      .set('x-access-token', token)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end((err: Object, res: Object) => {
        if (!err && res.ok) {
          dispatch(getCategoriesSuccess(res.body))
        } else {
        }
      })
  }
}

export function toggleLibraryVisibility (visible = false) {
  changeThemeColor(visible ? '#2e221a' : '#344142')
  return {
    type: TOGGLE_LIBRARY_VISIBILITY,
    payload: visible
  }
}

export const actions = {
  toggleLibraryVisibility,
  getCategories,
  getBooks,
  removeBookFromShelf,
  addBookToShelf,
  resetSearch,
  getBooksFilter,
  setBrowseTheme,
  goToPage,
  toggleBookIndexMenu,
  setHilightedPopUpVisibility,
  getBookPage,
  setVisibleIndexTab,
  setHilightedText,
  setVisiblePage,
  setInvisiblePage,
  searchInBookContent,
  bookMark,
  storeNote,
  getMyBooks,
  unBookMark
}

// LIBRARY_BOOK_STORE_NOT_REQUEST
// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LIBRARY_SET_VISIBLE_BOOK_PAGE]: (state, action) => {
    return Object.assign({}, state, { visiblePages: update(state.visiblePages, { $push: [action.payload] }) })
  },
  [LIBRARY_BOOK_STORE_NOT_SUCCESS]: (state, action) => {
    const index = state.loadedbooks.findIndex(b => b.id === action.payload.book_id)
    return Object.assign({}, state, {
      loadedbooks: update(state.loadedbooks, {
        [index]: { notes: { $push: [action.payload] } }
      }),
      hilighted: { x: 0, y: 0, popup: false, text: '', page: 0 }
    })
  },
  [LIBRARY_SET_INVISIBLE_BOOK_PAGE]: (state, action) => {
    // const spliceFirstOrLast = action.payload === state.visiblePages[0] ? 0 : 1
    return Object.assign({}, state, {
      visiblePages: update(state.visiblePages, {
        $splice: [[0, 1]]
        // $splice: [[state.visiblePages.findIndex(i => i === action.payload), 1]]
      })
    })
  },
  [TOGGLE_LIBRARY_VISIBILITY]: (state, action) => {
    return Object.assign({}, state, { visible: action.payload })
  },
  [LIBRARY_GET_CATEGRIES_REQUEST]: (state, action) => {
    return Object.assign({}, state, { categories: [], categoriesloading: true })
  },
  [LIBRARY_GET_CATEGRIES_SUCCESS]: (state, action) => {
    return Object.assign({}, state, { categories: action.payload, loading: false })
  },
  [LIBRARY_SEARCH_BOOKS_DONE_LOADING]: (state, action) => {
    return Object.assign({}, state, { booksloading: false})
  },
  [LIBRARY_SEARCH_BOOKS_SUCCESS]: (state, action) => {
    return Object.assign({}, state, {
      books: update(state.books, action.payload.current_page === 1
        ? { $set: action.payload.rows }
        : { $push: action.payload.rows }),
      pagination: update(state.pagination, { $set: {
        currentPage: action.payload.current_page,
        total: action.payload.total,
        totalPages: action.payload.last_page
      } }),
      count: action.payload.total,
      booksloading: false
    })
  },
  [LIBRARY_GET_MY_LIBRARY_BOOK_REQUEST]: (state, action) => {
    return Object.assign({}, state, {
      myBooks: [],
      myBooksLoading: true
    })
  },
  [LIBRARY_GET_MY_LIBRARY_BOOK_SUCCESS]: (state, action) => {
    return Object.assign({}, state, {
      myBooks: action.payload,
      myBooksLoading: false
    })
  },
  [LIBRARY_SEARCH_BOOKS_RESET]: (state, action) => {
    return Object.assign({}, state, {
      search: { query: '', category_id: 0, page: 0, author_id: 0 },
      suggestingState: 'waiting'
    })
  },
  [LIBRARY_SEARCH_BOOKS_REQUEST]: (state, action) => {
    return Object.assign({}, state, {
      search: Object.assign(state.search, {
        query: action.payload.query,
        category_id: action.payload.category_id,
        type: action.payload.type
      }),
      ...(action.payload.page === 1 && ({
        pagination: {
          totalPages: 0,
          total: 0,
          currentPage: 0,
          pages: {}
        },
        count: 0
      })),
      booksloading: true,
      books: action.payload.page === 1 ? [] : state.books
    })
  },
  [LIBRARY_FILTER_BOOKS_REQUEST]: (state, action) => {
    return Object.assign({}, state, {
      search: Object.assign(state.search, action.payload),
      booksloading: true
    })
  },
  [LIBRARY_BOOK_MARK_REQUEST]: (state, action) => {
    return Object.assign({}, state, {
      markingids: update(state.markingids, { $push: [action.payload.book_id] })
    })
  },
  [LIBRARY_BOOK_MARK_SUCCESS]: (state, action) => {
    const { book_id: bookId, page_number: pageNumber } = action.payload
    const content = state.loadedPages[`${bookId}-${pageNumber}`]['content'].substr(0, 200)
    const index = state.markingids.findIndex(id => id === bookId)
    const loadedBookIndex = state.loadedbooks.findIndex(b => b.id === bookId)

    return ({ ...state,
      loadedbooks: update(state.loadedbooks, {
        [loadedBookIndex]: {
          bookmarks: {
            $push: [{ page_number: pageNumber, content }]
          }
        }
      }),
      markingids: update(state.markingids, { $splice: [[index, 1]] })
    })
  },
  [LIBRARY_UNBOOK_MARK_REQUEST]: (state, action) => {
    return Object.assign({}, state, {
      markingids: update(state.markingids, { $push: [action.payload.book_id] })
    })
  },
  [LIBRARY_UNBOOK_MARK_SUCCESS]: (state, action) => {
    const { book_id: bookId, page_number: pageNumber } = action.payload
    const book = state.loadedbooks.find(b => b.id === bookId)
    const bookmarkIndex = book.bookmarks.findIndex(b => b.page_number === pageNumber)
    const index = state.markingids.findIndex(id => id === bookId)
    const loadedBookIndex = state.loadedbooks.findIndex(b => b.id === bookId)

    return Object.assign({}, state, {
      loadedbooks: update(state.loadedbooks, {
        [loadedBookIndex]: {
          bookmarks: {
            $splice: [[bookmarkIndex, 1]]
          }
        }
      }),
      markingids: update(state.markingids, { $splice: [[index, 1]] })
    })
  },
  [LIBRARY_ADD_BOOK_TO_SHELF_REQUEST]: (state, action) => {
    return Object.assign({}, state, {
      shelfingsid: update(state.shelfingsid, { $push: [action.payload] })
    })
  },
  [SHOW_SEARCH_SINGLE_PAGE]: (state, action) => {
    return Object.assign({}, state, {
      searchSinglePage: { ...action.payload }
    })
  },
  [LIBRARY_ADD_BOOK_TO_SHELF_SUCCESS]: (state, action) => {
    const bookIndex = state.books.findIndex(b => b.id === action.payload)
    const singleBookIndex = state.loadedbooks.findIndex(b => b.id === action.payload)
    let newState = Object.assign({}, state, {
      shelfingsid: update(state.shelfingsid, { $splice: [[state.shelfingsid.findIndex(i => i === action.payload), 1]] })
    })
    if (bookIndex >= 0) {
      newState = Object.assign({}, newState, {
        books: update(newState.books, { [bookIndex]: { $merge: { shelfed: 1 } } })
      })
    }
    if (singleBookIndex >= 0) {
      newState = Object.assign({}, newState, {
        loadedbooks: update(newState.loadedbooks, { [singleBookIndex]: { $merge: { shelfed: 1 } } })
      })
    }
    return newState
  },
  [LIBRARY_REMOVE_BOOK_FROM_SHELF_REQUEST]: (state, action) => {
    return Object.assign({}, state, {
      shelfingsid: update(state.shelfingsid, { $push: [action.payload] })
    })
  },
  [LIBRARY_SUGGEST_BOOK_REQUEST]: (state, action) => {
    return Object.assign({}, state, {
      suggestingState: 'suggesting'
    })
  },
  [LIBRARY_SUGGEST_BOOK_SUCCESS]: (state, action) => {
    return Object.assign({}, state, {
      suggestingState: 'suggested'
    })
  },
  [LIBRARY_SET_BOOK_INDEX_TAB]: (state, action) => {
    return Object.assign({}, state, {
      visibleIndexTab: action.payload
    })
  },
  [SET_LIBRARY_BROWSE_THEME]: (state, action) => {
    return Object.assign({}, state, {
      settings: update(state.settings, { $merge: { theme: action.payload } })
    })
  },
  [SET_LIBRARY_BROWSE_FONT_SIZE]: (state, action) => {
    return Object.assign({}, state, {
      settings: update(state.settings, { $merge: { fontSize: action.payload } })
    })
  },
  [LIBRARY_OPEN_BOOK_INDEX_MENU]: (state, action) => {
    return Object.assign({}, state, {
      bookIndexVisible: !state.bookIndexVisible
    })
  },
  [LIBRARY_OPEN_BOOK_SEARCH_MENU]: (state, action) => {
    return Object.assign({}, state, {
      bookSearchVisible: !state.bookSearchVisible
    })
  },
  [LIBRARY_GET_BOOK_REQUEST]: (state, action) => {
    return Object.assign({}, state, {
      loadingbooks: update(state.loadingbooks, { $push: [action.payload] })
    })
  },
  [LIBRARY_SET_HILIGHTED_TEXT]: (state, action) => {
    return Object.assign({}, state, {
      hilighted: update(state.hilighted, { $merge: action.payload })
    })
  },
  [LIBRARY_SHOW_HILIGHTED_POPUP]: (state, action) => {
    return Object.assign({}, state, {
      hilighted: update(state.hilighted, { popup: { $set: action.payload } })
    })
  },
  [LIBRARY_GET_BOOK_SUCCESS]: (state, action) => {
    return Object.assign({}, state, {
      loadedbooks: update(state.loadedbooks, { $push: [action.payload] }),
      loadingbooks: update(state.loadingbooks, { $splice: [[state.loadedbooks.findIndex(id => action.payload.id), 1]] })
    })
  },
  [LIBRARY_REMOVE_BOOK_FROM_SHELF_SUCCESS]: (state, action) => {
    const bookIndex = state.books.findIndex(b => b.id === action.payload)
    const singleBookIndex = state.loadedbooks.findIndex(b => b.id === action.payload)
    const myBookIndex = state.myBooks.findIndex(b => b.id === action.payload)
    let newState = Object.assign({}, state, {
      shelfingsid: update(state.shelfingsid, { $splice: [[state.shelfingsid.findIndex(i => i === action.payload), 1]] })
    })

    if (bookIndex >= 0) {
      newState = Object.assign({}, newState, {
        books: update(newState.books, { [bookIndex]: { $merge: { shelfed: 0 } } })
      })
    }
    if (myBookIndex >= 0) {
      newState = Object.assign({}, newState, {
        myBooks: update(newState.myBooks, { $splice: [[myBookIndex, 1]] })
      })
    }
    if (singleBookIndex >= 0) {
      newState = Object.assign({}, newState, {
        loadedbooks: update(newState.loadedbooks, { [singleBookIndex]: { $merge: { shelfed: 0 } } })
      })
    }
    return newState
  },
  [LIBRARY_BORROW_BOOK_REQUEST]: (state, action) => {
    // const bookIndex = state.books.findIndex(b => b.id === action.payload)
    return Object.assign({}, state, {
      // books: update(state.books, {[bookIndex]: {$merge: {borrowed: 0}}}),
      borrowingids: update(state.borrowingids, { $push: [action.payload] })
    })
  },
  [LIBRARY_GET_BOOK_PAGE_REQUEST]: (state, action) => {
    return Object.assign({}, state, {
      loadedPages: update(state.loadedPages, {
        $merge: {
          [`${action.payload.book_id}-${action.payload.number}`]: { loading: true }
        }
      })
    })
  },
  [LIBRARY_GET_BOOK_PAGE_SUCCESS]: (state, action) => {
    return Object.assign({}, state, {
      loadedPages: update(state.loadedPages, {
        $merge: {
          [`${action.payload.book_id}-${action.payload.number}`]: action.payload
        }
      })
    })
  },
  [LIBRARY_SEARCH_SINGLE_BOOK_SUCCESS]: (state, action) => {
    return Object.assign({}, state, {
      singleSearchResult: update(state.singleSearchResult, { $set: action.payload }),
      singleSearchLoading: false
    })
  },
  [LIBRARY_SEARCH_SINGLE_BOOK_REQUEST]: (state, action) => {
    return Object.assign({}, state, {
      singleSearchResult: [],
      singleQuery: action.payload.query,
      singleSearchLoading: true
    })
  },
  [SET_SHOW_SEARCH_PAGES]: (state, action) => {
    return Object.assign({}, state, {
      showBookPages: action.payload === state.showBookPages ? 0 : action.payload
    })
  },
  [LIBRARY_BORROW_BOOK_SUCCESS]: (state, action) => {
    const bookIndex = state.books.findIndex(b => b.id === action.payload)
    let currentState
    const singleBookIndex = state.loadedbooks.findIndex(b => b.id === action.payload)
    currentState = Object.assign({}, state, {
      books: update(state.books, { [bookIndex]: { $merge: { borrow_status: 'generating', borrow_link: '' } } })
    })

    if (singleBookIndex >= 0) {
      currentState = Object.assign({}, state, {
        loadedbooks: singleBookIndex
          ? update(state.loadedbooks, {
            [singleBookIndex]: {
              $merge: {
                borrow_status: 'generating',
                borrow_link: ''
              }
            }
          })
          : state.loadedbooks
      })
    }

    return currentState
  },
  [LIBRARY_GENERATE_ISSUE_SUCCESS]: (state, action) => {
    const bookIndex = state.books.findIndex(b => b.id === action.payload.book_id)
    return Object.assign({}, state, {
      books: update(state.books, {
        [bookIndex]: {
          $merge: {
            borrow_status: 'generated',
            borrowed: 1,
            borrow_link: action.payload.link
          }
        }
      }),
      borrowingids: update(state.borrowingids, {
        $splice: [[state.borrowingids.findIndex(i => i === action.payload.book_id), 1]]
      })
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  visible: false,
  categories: [],
  count: 0,
  books: [],
  pagination: {
    totalPages: 0,
    total: 0,
    currentPage: 0,
    pages: {}
  },
  showBookPages: 0,
  settings: { fontSize: 14, theme: 'white' },
  suggestingState: 'waiting',
  shelfingsid: [],
  markingids: [],
  borrowingids: [],
  loadedbooks: [],
  loadingbooks: [],
  loadedPages: {},
  visiblePages: [1],
  searchSinglePage: {
    bookId: 0,
    pageNumber: 0
  },
  myBooks: [],
  myBooksLoading: true,
  visibleIndexTab: 'indexes',
  bookIndexVisible: false,
  bookSearchVisible: false,
  categoriesloading: false,
  booksloading: false,
  singleQuery: '',
  hilighted: { x: 0, y: 0, text: '', page: 0, popup: false },
  singleSearchLoading: false,
  singleSearchResult: [],
  search: { query: '', category_id: 0, type: '', page: 0, orderby: 'title', author_id: 0 }
}

export default function libraryReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
