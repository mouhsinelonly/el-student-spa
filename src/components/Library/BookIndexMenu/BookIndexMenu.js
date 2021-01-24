// @flow
import * as React from 'react'
import './style.scss'
import BookIndexes from 'components/Library/BookIndexes'
import BookMarks from 'components/Library/BookMarks'
import BookNotes from 'components/Library/BookNotes'

type PropsType = {
  visible?: boolean,
  tab: string,
  windowHeight: number,
  indexes: Array<Object>,
  bookmarks: Array<Object>,
  notes: Array<Object>,
  settings: Object,
  goToPage: Function,
  setVisibleIndexTab: Function,
  toggleBookIndexMenu: Function
};

class BookIndexMenu extends React.Component<PropsType> {
  static defaultProps = {
    visible: false,
    tab: 'indexes',
    notes: [],
    windowHeight: 600,
    bookmarks: [],
    settings: { theme: 'light' }
  }
  render (): React.Element<'div'> {
    const { visible, tab, indexes, windowHeight, settings: { theme }, bookmarks, notes,
    goToPage } = this.props
    return (
      <div className={`c-book-index-menu is-${theme} ${visible ? 'is-visible' : ''}`}>
        <div className='head' ref={(head) => { this.headContainer = head }}>
          <button className='c-book-index-menu__close' onClick={this._toggleBookIndexMenu}>
          &times;
          </button>
          <h1 className='c-book-index-menu__header p-a-2'>
            فهرس الكتاب
          </h1>
          <ul className='c-book-index-menu__tabs text-xs-center'>
            <li onClick={this._setIndexTabVisible}
              className={`c-book-index-menu__tabs__item p-y-1 ${tab === 'indexes' ? 'is-active' : ''}`}>
              الفهرس
            </li>
            <li onClick={this._setBookmarkTabVisible}
              className={`c-book-index-menu__tabs__item p-y-1 ${tab === 'bookmarks' ? 'is-active' : ''}`}>
              العلامات المرجعية
            </li>
            <li onClick={this._setNoteTabVisible}
              className={`c-book-index-menu__tabs__item p-y-1 ${tab === 'notes' ? 'is-active' : ''}`}>
              الملاحظات
            </li>
          </ul>
        </div>
        <div className='c-book-index-menu__content'
          style={{ height: (windowHeight - (this.headContainer ? this.headContainer.clientHeight : 125)) }}>
          {((): React.Node => {
            switch (tab) {
              case 'indexes':
                return <BookIndexes indexes={indexes} handleGoto={goToPage} />
              case 'bookmarks':
                return <BookMarks bookmarks={bookmarks} handleGoto={goToPage} />
              default:
                return <BookNotes notes={notes} handleGoto={goToPage} />
            }
          })()}
        </div>
      </div>
    )
  }
  _setIndexTabVisible = () => {
    const { setVisibleIndexTab } = this.props
    setVisibleIndexTab('indexes')
  }
  _setBookmarkTabVisible = () => {
    const { setVisibleIndexTab } = this.props
    setVisibleIndexTab('bookmarks')
  }
  _setNoteTabVisible = () => {
    const { setVisibleIndexTab } = this.props
    setVisibleIndexTab('notes')
  }
  _toggleBookIndexMenu = () => {
    const { toggleBookIndexMenu } = this.props
    toggleBookIndexMenu()
  }
}

export default BookIndexMenu
