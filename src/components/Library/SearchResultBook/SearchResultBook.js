// @flow
import * as React from 'react'
import './style.scss'
import Loading from 'components/Loading'
import { timesNumberToString } from 'utils'
import { Link } from 'react-router'
import defaultCover from 'static/img/book-cover.png'
import ResultPage from 'components/Library/ResultPage'

type BookType = {
  id: number,
  shelfingsid: Array<number>,
  borrowingids: Array<number>,
  title: string,
  shelfed: number,
  author_name: string,
  description: string,
  publish_date: string,
  borrowed: number,
  guard: string,
  bpages: Array<Object>,
  pages: number,
  isSubscribed: boolean,
  showBookPages: number,
  licence: string,
  borrow_link: string,
  file: string,
  borrow_status: string,
  subjects: Array<Object>,
  showSearchSinglePage: Function,
  setShowSearchBookPages: Function,
  addBookToShelf: Function,
  borrowBook: Function,
  removeBookFromShelf: Function,
  cover: Object,
  singleBookLink: string
};

const colors = [
  { bg: 'd3edcf', color: '647662' },
  { bg: 'ecedcf', color: '797a62' },
  { bg: 'ecd9e4', color: '8c6e7f' },
  { bg: 'cfedec', color: '788c8b' },
  { bg: 'e2e2e2', color: '7d7d7d' }
]

class SearchResultBook extends React.Component<BookType> {
  static defaultProps = {
    bpages: [],
    showBookPages: 0,
    isSubscribed: true,
    shelfingsid: [],
    borrowingids: [],
    singleBookLink: '/student/library'
  }
  render (): React.Element<'div'> {
    const {
      id,
      showSearchSinglePage,
      cover,
      title,
      author_name: authorName,
      subjects,
      publish_date: publishDate,
      bpages: pages,
      // pages: num,
      description,
      licence,
      shelfed,
      showBookPages,
      shelfingsid,
      borrowingids,
      borrow_link: borrowLink,
      borrowed,
      borrow_status: borrowStatus,
      file,
      singleBookLink,
      isSubscribed
    } = this.props

    const hasPages = pages ? pages.length : null

    const isFree = licence === 'free'
    const showPages = showBookPages === id
    const shelfLoading = shelfingsid.findIndex((i: number): boolean => i === id) >= 0
    const borrowLoading = borrowingids.findIndex((i: number): boolean => i === id) >= 0 || borrowStatus === 'generating'
    let coverPic = null
    const hasPic = (typeof cover !== 'undefined')
    if (!hasPic) {
      coverPic = defaultCover
    } else {
      coverPic = cover ? cover.medium : null
    }
    const randomColorIndex = Math.floor(Math.random() * (4) + 1)
    return (
      <div className='c-library-search-result-book clearfix p-y-3'>
        <div className='col-xs-12 col-md-3'>
          <Link to={`${singleBookLink}/${id}`} className='c-library-search-result-book__cover-container'>
            <img
              style={{ backgroundColor: `#${colors[randomColorIndex].bg}` }}
              src={coverPic}
              alt={title}
              className='c-library-search-result-book__cover img-fluid'
            />
            {!hasPic ? <span style={{ color: `#${colors[randomColorIndex].color}` }}
              className='c-library-search-result-book__cover-title'>{title}</span> : ''}
            {!hasPic ? <div style={{ backgroundColor: `#${colors[randomColorIndex].bg}` }}
              className='c-library-search-result-book__cover-overlay' /> : null }
          </Link>
        </div>
        <div className='col-xs-12 col-md-9'>
          <h1 className='c-library-search-result-book__title m-a-0 c-library-search-result-book__padding'>{title}</h1>
          <h2 className='c-library-search-result-book__author-name m-a-0 c-library-search-result-book__padding'>
            {authorName}
          </h2>
          <div className='c-library-search-result-book__padding is-gray'>
            الموضوع :{' '}
            {subjects.map((s: Object, i: number): React.Element<'span'> => (
              <span key={i}>
                {s.name} {i + 1 < subjects.length ? ',' : '.'}
              </span>
            ))}
          </div>
          <div className='c-library-search-result-book__padding is-gray'>
            سنة النشر : {publishDate !== 'Invalid date' ? publishDate : 'غير محدد' }
          </div>
          <div className='c-library-search-result-book__padding c-library-search-result-book__desc is-gray p-b-2'>
            نبذة : {description}
          </div>
          {isSubscribed ? <Link
            to={`${singleBookLink}/${id}`}
            className={`btn c-library-search-result-book__browse ${!isFree ? 'hidden-xs-up' : ''}`}
          >
            تصفح
          </Link> : null }
          {isFree && isSubscribed ? (
            <a href={file} target='_blank' className='btn hidden-xs-up c-library-search-result-book__download'>
              تحميل
            </a>
          ) : null}
          {!isFree && !borrowLink ? (
            <button
              disabled={borrowLoading}
              onClick={this._borrowBook}
              className='btn c-library-search-result-book__rent'
            >
              <Loading
                scale={12}
                stroke={1}
                width={25}
                height={25}
                strokeColor='#fff'
                className={`c-library-search-result-book__adding-loading ${!borrowLoading ? 'hidden-xs-up' : ''}`}
              />
              {borrowLoading ? 'جاري الاستعارة' : 'استعارة'}
            </button>
          ) : null}
          {borrowLink && borrowed ? (
            <a href={borrowLink} className='btn c-library-search-result-book__rent'>
              تحميل
            </a>
          ) : null}
          <button
            disabled={shelfLoading}
            className={`btn c-library-search-result-book__add`}
            onClick={shelfed ? this._removeBookFromShelf : this._addBookToShelf}
          >
            <Loading
              scale={12}
              stroke={1}
              width={25}
              height={25}
              strokeColor='#fff'
              className={`c-library-search-result-book__adding-loading ${!shelfLoading ? 'hidden-xs-up' : ''}`}
            />
            {shelfed ? 'إزالة من المكتبة' : 'إضافة للمكتبة'}
          </button>
          {!isSubscribed ? <Link
            to='/library/plans'
            className='btn btn-purple-outline'>ترقية الخطة لعرض الكتاب</Link> : null }
        </div>
        <div className='clearfix' />
        <div className={`col-xs-12 col-md-3 text-xs-center p-t-3 ${!hasPages ? 'hidden-xs-up' : ''} is-sticky`} >
          <div className='c-library-search-result-book__sticky'>
            <div>ذكرت في الكتاب</div>
            <div><b className='c-library-search-result-book__times'>
              {timesNumberToString(pages ? pages.length : null)}</b>
            </div>
            <button onClick={this._togglePages}
              className='btn btn-white m-t-2 c-library-search-result-book__more-pages'>
              {showPages ? 'إخفاء النتائج' : 'إظهار النتائج'}
            </button>
          </div>
        </div>
        <div className='col-xs-12 col-md-9'>
          {pages.map((p: Object, i: number): React.Element<typeof ResultPage> =>
            <ResultPage
              showAll={showPages}
              key={i}
              {...p}
              i={i}
              bookId={id}
              showPage={showSearchSinglePage} />)}
        </div>
      </div>
    )
  }

  _togglePages = () => {
    const { id, setShowSearchBookPages } = this.props
    setShowSearchBookPages(id)
  }
  _addBookToShelf = () => {
    const { addBookToShelf, id, guard } = this.props
    addBookToShelf({ id, guard })
  }

  _removeBookFromShelf = () => {
    const { removeBookFromShelf, id, guard } = this.props
    removeBookFromShelf({ id, guard })
  }

  _borrowBook = () => {
    const { borrowBook, id } = this.props
    borrowBook(id)
  }
}

export default SearchResultBook
