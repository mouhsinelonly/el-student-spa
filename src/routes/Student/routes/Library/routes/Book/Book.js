// @flow
import * as React from 'react'
import Loading from 'components/Loading'
import Icon from 'components/Icon'
import './style.scss'
import { Link } from 'react-router'

type PropsType = {
  params: Object,
  getBook: Function,
  shelfingsid: Array<number>,
  borrowingids: Array<number>,
  loadedbooks: Array<Object>,
  loadingbooks: Array<number>,
  addBookToShelf: Function,
  removeBookFromShelf: Function,
  borrowBook: Function
};

class Book extends React.Component<PropsType> {
  static defaultProps = {
    loadedbooks: []
  }
  componentDidMount () {
    const { getBook, params: { id } } = this.props
    getBook(id)
  }
  render (): React.Element<'div'> {
    const { params: { id: paramsId }, loadedbooks, loadingbooks, shelfingsid, borrowingids } = this.props
    const loading = loadingbooks.findIndex((i: number): boolean => i === +paramsId) >= 0
    const book = loadedbooks.find((b: Object): boolean => b.id === +paramsId)
    if (loading || !book) {
      return <div className='p-y-3'>
        <Loading />
      </div>
    }
    const { id, cover, title, category_name: categoryName, author_name: authorName, subjects,
        publish_date: publishDate, description, licence, shelfed,
    borrow_link: borrowLink, borrowed, borrow_status: borrowStatus, file } = book

    const isFree = licence === 'free'
    const shelfLoading = shelfingsid.findIndex((i: number): boolean => i === id) >= 0
    const borrowLoading = (borrowingids.findIndex((i: number): boolean => i === id) >= 0) ||
    borrowStatus === 'generating'

    return (
      <div className='p-single-book'>
        <div className='p-single-book__header p-y-1 m-b-3'>
          <div className='container'>
            <div className='row col-xs-12 col-md-10 col-md-pull-1'>
              <Link to='/student/library' className='m-l-3'>
                <Icon name='library-back' />
              </Link>
              <span className='p-l-2 p-single-book__header-cat'>
                {categoryName}
              </span>
              <span className='p-r-2'>
                {title}
              </span>
            </div>
          </div>
        </div>
        <div className='container'>
          <div className='row'>
            <div className='col-xs-12 col-md-4 col-md-pull-1 col-lg-3 col-lg-pull-2'>
              <img src={cover ? cover.medium : null} alt={title} className='img-fluid p-single-book__cover m-b-2' />
              <Link to={`/student/library/browse/${id}`}
                className={`btn btn-block p-single-book__browse ${!isFree ? 'hidden-xs-up' : ''}`}>
                تصفح
              </Link>
              {isFree ? <a href={file} target='_blank' className='btn hidden-xs-up btn-block p-single-book__download'>
                تحميل
              </a> : null}
              {(!isFree && !borrowLink) ? <button disabled={borrowLoading} onClick={this._borrowBook}
                className='btn btn-block p-single-book__rent'>
                <Loading scale={12} stroke={1} width={25} height={25}
                  strokeColor='#fff'
                  className={`p-single-book__adding-loading ${!borrowLoading ? 'hidden-xs-up' : ''}`} />
                {borrowLoading ? 'جاري الاستعارة' : 'استعارة'}
              </button> : null }
              {(borrowLink && borrowed) ? <a href={borrowLink}
                className='btn btn-block p-single-book__rent'>
                تحميل
              </a> : null }
              <button disabled={shelfLoading} className={`btn btn-block p-single-book__add`}
                onClick={shelfed ? this._removeBookFromShelf : this._addBookToShelf}>
                <Loading scale={12} stroke={1} width={25} height={25}
                  strokeColor='#fff'
                  className={`p-single-book__adding-loading ${!shelfLoading ? 'hidden-xs-up' : ''}`} />
                {shelfed ? 'إزالة من المكتبة' : 'إضافة للمكتبة'}
              </button>
            </div>
            <div className='col-xs-12 col-md-6 col-md-pull-1 col-lg-5 col-lg-pull-2'>
              <h1>{title}</h1>
              <div className='p-single-book__meta'>
                <div className='p-y-1'>
                  <b>{authorName}</b>
                </div>
                <div className='p-y-1'>
                  الموضوع : {subjects.map((s: Object, i: number): React.Element<'span'> =>
                    <span key={i}>{s.name} {(i + 1) < subjects.length ? ',' : '.'}</span>)}
                </div>
                <div className='p-y-1'>
                  التصنيف : {categoryName}
                </div>
                <div className='p-y-1'>
                  سنة النشر : {publishDate}
                </div>
              </div>
              <div className='p-single-book__desc p-t-2'>
                <h5>التلخيص</h5>
                <p>
                  {description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  _addBookToShelf = () => {
    const { loadedbooks, addBookToShelf, params: { id: paramsId } } = this.props
    const { id } = loadedbooks.find((b: Object): boolean => b.id === +paramsId)
    addBookToShelf({ id })
  }

  _removeBookFromShelf = () => {
    const { loadedbooks, removeBookFromShelf, params: { id: paramsId } } = this.props
    const { id } = loadedbooks.find((b: Object): boolean => b.id === +paramsId)
    removeBookFromShelf({ id })
  }

  _borrowBook = () => {
    const { loadedbooks, borrowBook, params: { id: paramsId } } = this.props
    const { id } = loadedbooks.find((b: Object): boolean => b.id === +paramsId)
    borrowBook(id)
  }
}

export default Book
