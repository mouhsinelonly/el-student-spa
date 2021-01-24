// @flow
import * as React from 'react'
import PagesRenderer from 'components/Library/PagesRenderer'
import BookIndexMenu from 'components/Library/BookIndexMenu'
import BookSearchMenu from 'components/Library/BookSearchMenu'
// import AddNote from './components/AddNote'
import Loading from 'components/Loading'
import './style.scss'
import Menu from 'components/Library/Menu'

type PropsType = {
  hideStudentNavbar: Function,
  showStudentNavbar: Function,
  searchInBookContent: Function,
  getBook: Function,
  query: string,
  visiblePages: Array<Object>,
  params: Object,
  guard: string,
  settings: Object,
  loadedbooks: Array<Object>,
  loadingbooks: Array<number>
};

class Browse extends React.Component<PropsType> {
  static defaultProps = {
    guard: 'students',
    loadedbooks: []
  }
  componentDidMount () {
    const { hideStudentNavbar, getBook, params: { id }, guard } = this.props
    hideStudentNavbar()
    getBook({ id, guard })
  }

  componentWillUnmount () {
    const { showStudentNavbar } = this.props
    showStudentNavbar()
  }
  render (): React.Element<'div'> {
    const { loadedbooks, loadingbooks, params: { id: paramsId }, visiblePages, settings: { theme }, query,
    guard } = this.props

    const loading = loadingbooks.findIndex((i: number): boolean => i === +paramsId) >= 0
    const book = loadedbooks.find((b: Object): boolean => b.id === +paramsId)
    if (loading || !book) {
      return (
        <div className='p-y-3'>
          <Loading />
        </div>
      )
    }
    const { id, pages, indexes, bookmarks, notes } = book
    const visiblePage = visiblePages[visiblePages.length - 1]

    return (
      <div className={`p-book-browse is-${theme}`}>
        <BookIndexMenu indexes={indexes} notes={notes} bookmarks={bookmarks} />
        <BookSearchMenu onSubmit={this._search} initialValues={{ query: query, book_id: id }} />
        <div className='container'>
          <Menu bookmarks={bookmarks} bookId={id} guard={guard} />
          <div className='row'>
            <div className='col-xs-12 col-md-10 col-md-pull-2 col-lg-6 col-lg-pull-3'>
              <PagesRenderer
                bookId={id}
                pages={pages}
                visiblePages={visiblePages} />
            </div>
          </div>
        </div>
        <div className={`p-book-browse__footer p-b-2 is-${theme}`}>
          <div className='row'>
            <div className='col-xs-12 col-md-8 col-md-pull-2 col-lg-6 col-lg-pull-3'>
              <span className={`p-book-browse__footer__current is-${theme}`}>{visiblePage}</span>
            </div>
          </div>
          <div className={`p-book-browse__footer__pages  is-${theme}`}>
            {visiblePage} من {pages}
          </div>
        </div>
      </div>
    )
  }
  _search = (values: Object) => {
    const { searchInBookContent } = this.props
    const { query, book_id: bookId } = values
    searchInBookContent(query, bookId)
  }
}

export default Browse
